import axios from 'axios';

// Use relative path to leverage Vite proxy (configured in vite.config.js)
// Vite proxy forwards /api requests to http://localhost:5000
const API_BASE_URL = '/api/game'; 

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const gameService = {
  // POST /start - Create a new game
  startGame: async (secretWord) => {
    // Expects backend to return: { gameId: "...", player1Id: "..." }
    const response = await api.post('/start', { secretWord });
    return response.data; 
  },

  // POST /join - Join an existing game
  joinGame: async (gameId) => {
    // Expects backend to return: { player2Id: "..." }
    const response = await api.post('/join', { gameId });
    return response.data;
  },

  // GET /status/:gameId - Get game state and questions
  getGameStatus: async (gameId) => {
    // Expects backend to return: { status: "ongoing", questionHistory: [] }
    const response = await api.get(`/status/${gameId}`);
    return response.data;
  },

  // POST /guess - Player 2 asks a question
  askQuestion: async (gameId, question) => {
    const response = await api.post('/guess', {
      gameId,
      question
    });
    return response.data;
  },

  // POST /reply - Player 1 answers Yes/No
  answerQuestion: async (gameId, questionIndex, answer) => {
    const response = await api.post('/reply', {
      gameId,
      questionIndex,
      answer
    });
    return response.data;
  }
};