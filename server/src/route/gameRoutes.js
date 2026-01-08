// gameRoutes.js
import express from 'express';
import {
  startGame,
  joinGame,
  submitQuestion,
  replyQuestion,
  getGameStatus
} from '../controller/gameController.js';

const router = express.Router();

// Create new game
router.post('/start', startGame);

// Join existing game
router.post('/join', joinGame);

// Submit a question
router.post('/guess', submitQuestion);

// Reply Yes/No
router.post('/reply', replyQuestion);

// Get game status
router.get('/status/:gameId', getGameStatus);

export default router;
