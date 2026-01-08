import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { gameService } from '../services/api';
import { useWebSocket } from '../hooks/useWebSocket';

// Sub-components
import HostPanel from '../components/game/HostPanel';
import GuesserPanel from '../components/game/GuesserPanel';
import QuestionHistory from '../components/game/QuestionHistory';
import GameHeader from '../components/game/GameHeader';
import WinModal from '../components/ui/WinModal';

const GameRoom = () => {
  const { gameId } = useParams();
  const { gameData } = useGame();
  
  // State
  const [questions, setQuestions] = useState([]);
  const [gameStatus, setGameStatus] = useState('ongoing'); // 'ongoing' or 'won'
  const [showWinModal, setShowWinModal] = useState(false);
  const [revealedSecretWord, setRevealedSecretWord] = useState('');
  
  // Get secret word from context (only available for host)
  const secretWord = gameData.role === 'host' ? (gameData.secretWord || '') : '';

  // Initialize WebSocket connection
  const { isConnected, onEvent, error: socketError } = useWebSocket(gameId, gameData.playerId);

  // Fetch initial game state
  useEffect(() => {
    const fetchState = async () => {
      try {
        const data = await gameService.getGameStatus(gameId);
        
        setGameStatus(data.status);
        setQuestions(data.questionHistory || []);
      } catch (error) {
        console.error("Failed to fetch game status:", error);
      }
    };

    if (gameId) {
      fetchState();
    }
  }, [gameId]);

  // Set up WebSocket event listeners for real-time updates
  useEffect(() => {
    if (!isConnected) return;

    // Listen for new questions
    const unsubscribeQuestion = onEvent('question_submitted', ({ question }) => {
      setQuestions(prev => {
        // Check if question already exists to avoid duplicates
        const exists = prev.some(q => q.index === question.index);
        if (exists) return prev;
        return [...prev, question];
      });
    });

    // Listen for question answers
    const unsubscribeAnswer = onEvent('question_answered', ({ questionIndex, answer, question }) => {
      setQuestions(prev => prev.map((q, idx) => 
        idx === questionIndex ? { ...q, answer } : q
      ));
    });

    // Listen for player joining
    const unsubscribeJoin = onEvent('game_player_joined', ({ playerCount }) => {
      console.log(`Player joined! Total players: ${playerCount}`);
    });

    // Listen for game won event
    const unsubscribeGameWon = onEvent('game_won', ({ secretWord, winningGuess, message }) => {
      console.log('🎉 Game won!', { secretWord, winningGuess });
      setGameStatus('won');
      setRevealedSecretWord(secretWord);
      setShowWinModal(true);
    });

    // Listen for final guess submitted (wrong guess)
    const unsubscribeFinalGuess = onEvent('final_guess_submitted', ({ guess, correct }) => {
      if (!correct) {
        console.log(`Wrong final guess: ${guess}`);
      }
    });

    // Listen for sync actions (for sync protocol game)
    const unsubscribeSyncSuccess = onEvent('sync_success', ({ actionType, timeDiff, message }) => {
      console.log(`✅ ${message} - Action: ${actionType}, Time diff: ${timeDiff}ms`);
    });

    const unsubscribeSyncFailed = onEvent('sync_failed', ({ actionType, timeDiff, message }) => {
      console.log(`❌ ${message} - Action: ${actionType}, Time diff: ${timeDiff}ms`);
    });

    // Cleanup listeners
    return () => {
      unsubscribeQuestion?.();
      unsubscribeAnswer?.();
      unsubscribeJoin?.();
      unsubscribeGameWon?.();
      unsubscribeFinalGuess?.();
      unsubscribeSyncSuccess?.();
      unsubscribeSyncFailed?.();
    };
  }, [isConnected, onEvent]);

  const isHost = gameData.role === 'host';

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* WebSocket connection status */}
      {socketError && (
        <div className="bg-red-900/30 border border-red-500 p-3 rounded-lg text-red-300 text-sm space-y-2">
          <div className="font-bold">WebSocket Connection Error:</div>
          <div>{socketError}</div>
          <div className="text-xs mt-2 text-red-400">
            💡 Make sure the backend server is running: <code className="bg-slate-900 px-2 py-1 rounded">npm run dev</code> in the server directory
          </div>
        </div>
      )}
      {!isConnected && !socketError && (
        <div className="bg-yellow-900/30 border border-yellow-500 p-3 rounded-lg text-yellow-300 text-sm">
          <span className="animate-pulse">⏳</span> Connecting to server...
        </div>
      )}
      {isConnected && (
        <div className="bg-green-900/30 border border-green-500 p-3 rounded-lg text-green-300 text-sm">
          ✅ Connected to server
        </div>
      )}

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
              onGameWon={(secretWord) => {
                setGameStatus('won');
                setRevealedSecretWord(secretWord);
                setShowWinModal(true);
              }}
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

      {/* Win Modal */}
      <WinModal
        isOpen={showWinModal}
        onClose={() => setShowWinModal(false)}
        secretWord={revealedSecretWord || secretWord}
        isHost={gameData.role === 'host'}
      />
    </div>
  );
};

export default GameRoom;