import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gameService } from '../services/api';
import { useGame } from '../context/GameContext';

const Lobby = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const { setGameData } = useGame();
  
  const [status, setStatus] = useState('Joining game...');
  const [error, setError] = useState('');

  useEffect(() => {
    const joinSession = async () => {
      if (!gameId) {
        setError("Invalid link.");
        return;
      }

      try {
        const response = await gameService.joinGame(gameId);
        
        // Save Player 2 info
        setGameData({
          gameId: gameId,
          playerId: response.player2Id || `temp-p2-${Date.now()}`,
          role: 'guesser'
        });

        setStatus('Success! Entering room...');
        
        // Brief delay for UX
        setTimeout(() => {
          navigate(`/game/${gameId}`);
        }, 1000);

      } catch (err) {
        console.error(err);
        setError('Could not join game. It might be full or closed.');
      }
    };

    joinSession();
  }, [gameId, navigate, setGameData]);

  if (error) {
    return (
      <div className="text-center space-y-4">
        <h2 className="text-red-400 text-xl font-bold">Error</h2>
        <p className="text-slate-300">{error}</p>
        <button onClick={() => navigate('/')} className="text-teal-400 hover:underline">
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="text-center text-white text-xl animate-pulse flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
      {status}
    </div>
  );
};

export default Lobby;