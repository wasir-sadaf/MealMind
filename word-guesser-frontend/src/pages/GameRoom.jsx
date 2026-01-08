import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { gameService } from '../services/api';

// Sub-components
import HostPanel from '../components/game/HostPanel';
import GuesserPanel from '../components/game/GuesserPanel';
import QuestionHistory from '../components/game/QuestionHistory';
import GameHeader from '../components/game/GameHeader';

const GameRoom = () => {
  const { gameId } = useParams();
  const { gameData } = useGame();
  
  // State
  const [questions, setQuestions] = useState([]);
  const [gameStatus, setGameStatus] = useState('ongoing'); // 'ongoing' or 'won'
  const [secretWord, setSecretWord] = useState('');

  // Polling: Update game state every 2 seconds
  useEffect(() => {
    const fetchState = async () => {
      try {
        const data = await gameService.getGameStatus(gameId);
        
        setGameStatus(data.status);
        setQuestions(data.questions || []);
        
        // Only host sees secret word in response usually, but we check anyway
        if (data.secret_word) {
          setSecretWord(data.secret_word);
        }
      } catch (error) {
        console.error("Polling error:", error);
      }
    };

    fetchState(); // Run immediately
    const interval = setInterval(fetchState, 2000); // Run every 2s

    return () => clearInterval(interval); // Cleanup
  }, [gameId]);

  const isHost = gameData.role === 'host';

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      <GameHeader 
        isHost={isHost} 
        secretWord={secretWord} 
        gameStatus={gameStatus} 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Interaction Panel (Left) */}
        <div className="order-2 md:order-1 h-full">
          {isHost ? (
            <HostPanel 
              gameId={gameId} 
              questions={questions} 
              gameStatus={gameStatus} 
            />
          ) : (
            <GuesserPanel 
              gameId={gameId} 
              playerId={gameData.playerId} 
              gameStatus={gameStatus} 
            />
          )}
        </div>

        {/* History Panel (Right) */}
        <div className="order-1 md:order-2 h-[500px] bg-slate-800 rounded-xl border border-slate-700 flex flex-col overflow-hidden">
          <div className="p-3 bg-slate-900/50 border-b border-slate-700 font-bold text-slate-300 text-sm uppercase tracking-wide">
            History Log
          </div>
          <QuestionHistory questions={questions} />
        </div>
      </div>
    </div>
  );
};

export default GameRoom;