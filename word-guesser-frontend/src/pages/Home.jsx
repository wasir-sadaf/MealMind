import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gameService } from '../services/api';
import { useGame } from '../context/GameContext';

const Home = () => {
  const [secretWord, setSecretWord] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { setGameData } = useGame();

  const handleStartGame = async (e) => {
    e.preventDefault();
    if (!secretWord.trim()) return;

    setLoading(true);
    setError('');

    try {
      const response = await gameService.startGame(secretWord);
      
      // Save ID, Role, and Secret Word to Context
      setGameData({
        gameId: response.gameId,
        playerId: response.player1Id,
        role: 'host',
        secretWord: secretWord // Store secret word for host to see
      });

      // Navigate to Game Room
      navigate(`/game/${response.gameId}`);
      
    } catch (err) {
      console.error(err);
      setError('Failed to create game. Is backend running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-white">Create a New Game</h2>
      
      <form onSubmit={handleStartGame} className="w-full space-y-4">
        <div>
          <label className="block text-slate-400 mb-1 text-sm">Secret Word</label>
          <input
            type="text"
            value={secretWord}
            onChange={(e) => setSecretWord(e.target.value)}
            className="w-full p-4 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-all"
            placeholder="e.g. Spiderman"
            required
            autoFocus
          />
        </div>

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold py-3 rounded-lg transition-colors disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Start Game'}
        </button>
      </form>
    </div>
  );
};

export default Home;