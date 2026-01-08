import { useState, useEffect } from 'react';
import { gameService } from '../services/api';

// This hook abstracts the polling logic if you want to clean up GameRoom.jsx later
export const useGameStatus = (gameId) => {
  const [status, setStatus] = useState(null);
  const [questions, setQuestions] = useState([]);
  
  useEffect(() => {
    if (!gameId) return;

    const fetchIt = async () => {
      try {
        const data = await gameService.getGameStatus(gameId);
        setStatus(data.status);
        setQuestions(data.questions || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchIt();
    const interval = setInterval(fetchIt, 2000);
    return () => clearInterval(interval);
  }, [gameId]);

  return { status, questions };
};