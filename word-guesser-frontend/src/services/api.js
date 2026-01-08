import axios from 'axios';

// ⚠️ IMPORTANT: Ensure this matches your Backend Server Port (3000, 5000, 8080?)
const API_BASE_URL = 'http://localhost:3000'; 

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const gameService = {
  // POST /start - Create a new game
  startGame: async (secretWord) => {
    // Expects backend to return: { game_id: "...", player1_id: "..." }
    const response = await api.post('/start', { secret_word: secretWord });
    return response.data; 
  },

  // POST /join - Join an existing game
  joinGame: async (gameId) => {
    // Expects backend to return: { player2_id: "..." }
    const response = await api.post('/join', { game_id: gameId });
    return response.data;
  },

  // GET /status - Get game state and questions
  getGameStatus: async (gameId) => {
    // Expects backend to return: { status: "ongoing", questions: [], secret_word: "..." }
    const response = await api.get(`/status?game_id=${gameId}`);
    return response.data;
  },

  // POST /guess - Player 2 asks a question
  askQuestion: async (gameId, playerId, questionText) => {
    const response = await api.post('/guess', {
      game_id: gameId,
      player2_id: playerId,
      question_text: questionText
    });
    return response.data;
  },

  // POST /reply - Player 1 answers Yes/No
  answerQuestion: async (gameId, questionId, answer) => {
    const response = await api.post('/reply', {
      game_id: gameId,
      question_id: questionId,
      answer: answer
    });
    return response.data;
  }
};