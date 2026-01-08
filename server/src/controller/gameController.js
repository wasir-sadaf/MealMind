// gameController.js
import { v4 as uuidv4 } from 'uuid';

// In-memory game storage
const games = {};

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

  return res.json({
    player2Id,
    message: 'Joined game successfully!'
  });
};

export const submitQuestion = (req, res) => {
  const { gameId, question } = req.body;

  if (!games[gameId]) return res.status(404).json({ error: 'Game not found' });

  const questionObj = { question, answer: null };
  games[gameId].questionHistory.push(questionObj);

  return res.json({ message: 'Question submitted!', question: questionObj });
};

export const replyQuestion = (req, res) => {
  const { gameId, questionIndex, answer } = req.body;

  if (!games[gameId]) return res.status(404).json({ error: 'Game not found' });
  if (!['Yes', 'No'].includes(answer)) return res.status(400).json({ error: 'Invalid answer' });

  games[gameId].questionHistory[questionIndex].answer = answer;

  return res.json({ message: 'Answer submitted!', question: games[gameId].questionHistory[questionIndex] });
};

export const getGameStatus = (req, res) => {
  const { gameId } = req.params;

  if (!games[gameId]) return res.status(404).json({ error: 'Game not found' });

  return res.json({
    status: games[gameId].status,
    questionHistory: games[gameId].questionHistory
  });
};
