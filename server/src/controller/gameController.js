// gameController.js
import { v4 as uuidv4 } from 'uuid';
import { getIO } from '../socket.js';

// In-memory game storage
const games = {};

// Export games for socket access
export const getGames = () => games;

export const startGame = (req, res) => {
  const { secretWord } = req.body;
  const gameId = uuidv4();
  const player1Id = uuidv4();

  games[gameId] = {
    player1Id,
    player2Id: null,
    secretWord,
    questionHistory: [],
    status: 'ongoing'
  };

  return res.json({
    gameId,
    player1Id,
    message: 'Game created! Share the game ID with Player 2.'
  });
};

export const joinGame = (req, res) => {
  const { gameId } = req.body;
  const player2Id = uuidv4();

  if (!games[gameId]) return res.status(404).json({ error: 'Game not found' });

  games[gameId].player2Id = player2Id;

  // Emit socket event when player joins
  try {
    const io = getIO();
    io.to(gameId).emit('game_player_joined', {
      gameId,
      player2Id,
      playerCount: 2
    });
  } catch (err) {
    console.error('Socket not available:', err.message);
  }

  return res.json({
    player2Id,
    message: 'Joined game successfully!'
  });
};

export const submitQuestion = (req, res) => {
  const { gameId, question } = req.body;

  if (!games[gameId]) return res.status(404).json({ error: 'Game not found' });

  const questionObj = { question, answer: null, index: games[gameId].questionHistory.length };
  games[gameId].questionHistory.push(questionObj);

  // Emit socket event for real-time update
  try {
    const io = getIO();
    io.to(gameId).emit('question_submitted', {
      question: questionObj,
      gameId
    });
  } catch (err) {
    console.error('Socket not available:', err.message);
  }

  return res.json({ message: 'Question submitted!', question: questionObj });
};

export const replyQuestion = (req, res) => {
  const { gameId, questionIndex, answer } = req.body;

  if (!games[gameId]) return res.status(404).json({ error: 'Game not found' });
  if (!['Yes', 'No'].includes(answer)) return res.status(400).json({ error: 'Invalid answer' });

  games[gameId].questionHistory[questionIndex].answer = answer;

  // Emit socket event for real-time update
  try {
    const io = getIO();
    io.to(gameId).emit('question_answered', {
      questionIndex,
      answer,
      question: games[gameId].questionHistory[questionIndex],
      gameId
    });
  } catch (err) {
    console.error('Socket not available:', err.message);
  }

  return res.json({ message: 'Answer submitted!', question: games[gameId].questionHistory[questionIndex] });
};

export const submitFinalGuess = (req, res) => {
  const { gameId, guess } = req.body;

  if (!games[gameId]) return res.status(404).json({ error: 'Game not found' });
  if (games[gameId].status === 'won') return res.status(400).json({ error: 'Game already ended' });

  const game = games[gameId];
  const isCorrect = guess.trim().toLowerCase() === game.secretWord.toLowerCase();

  if (isCorrect) {
    // Game won! Update status
    game.status = 'won';
    game.winningGuess = guess.trim();
    game.wonAt = new Date().toISOString();

    // Emit socket event to notify both players
    try {
      const io = getIO();
      io.to(gameId).emit('game_won', {
        gameId,
        winningGuess: guess.trim(),
        secretWord: game.secretWord,
        message: 'Congratulations! The word was guessed correctly!'
      });
    } catch (err) {
      console.error('Socket not available:', err.message);
    }

    return res.json({
      correct: true,
      message: 'Congratulations! You guessed correctly!',
      secretWord: game.secretWord
    });
  } else {
    // Wrong guess - add to question history as a failed guess
    const guessObj = {
      question: `Final guess: "${guess.trim()}"`,
      answer: 'No',
      index: game.questionHistory.length,
      isFinalGuess: true
    };
    game.questionHistory.push(guessObj);

    // Emit socket event for real-time update
    try {
      const io = getIO();
      io.to(gameId).emit('final_guess_submitted', {
        guess: guess.trim(),
        correct: false,
        gameId
      });
      io.to(gameId).emit('question_submitted', {
        question: guessObj,
        gameId
      });
    } catch (err) {
      console.error('Socket not available:', err.message);
    }

    return res.json({
      correct: false,
      message: 'Wrong guess! Try asking more questions.',
      guess: guess.trim()
    });
  }
};

export const getGameStatus = (req, res) => {
  const { gameId } = req.params;

  if (!games[gameId]) return res.status(404).json({ error: 'Game not found' });

  return res.json({
    status: games[gameId].status,
    questionHistory: games[gameId].questionHistory,
    secretWord: games[gameId].status === 'won' ? games[gameId].secretWord : undefined
  });
};
