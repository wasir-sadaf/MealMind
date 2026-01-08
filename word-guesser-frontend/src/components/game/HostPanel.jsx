import { useState } from 'react';
import { gameService } from '../../services/api';

const HostPanel = ({ gameId, questions, gameStatus }) => {
  const [loading, setLoading] = useState(false);

  // Find the most recent question that has NO answer yet
  // We reverse the array to find the latest one first, or filter.
  // Assuming 'questions' comes in chronological order.
  const currentQuestion = questions.find(q => q.answer === null);

  const handleAnswer = async (answer) => {
    if (!currentQuestion) return;
    setLoading(true);
    try {
      await gameService.answerQuestion(gameId, currentQuestion.question_id, answer);
    } catch (error) {
      console.error("Failed to answer", error);
    } finally {
      setLoading(false);
    }
  };

  if (gameStatus === 'won') {
    return (
      <div className="bg-green-900/30 border border-green-500 p-6 rounded-xl text-center">
        <h3 className="text-2xl font-bold text-green-400 mb-2">Game Over!</h3>
        <p className="text-slate-300">They guessed the word correctly! 🎉</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg h-full flex flex-col justify-center items-center text-center space-y-6">
      <h3 className="text-xl font-semibold text-teal-400 uppercase tracking-wider">
        Incoming Question
      </h3>

      {currentQuestion ? (
        <div className="w-full space-y-6 animate-fade-in">
          <div className="bg-slate-900 p-4 rounded-lg border border-slate-600">
            <p className="text-2xl text-white font-medium">
              "{currentQuestion.question_text}"
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full">
            <button
              onClick={() => handleAnswer('Yes')}
              disabled={loading}
              className="py-4 bg-green-600 hover:bg-green-500 text-white font-bold text-xl rounded-xl shadow-lg transition-transform active:scale-95 disabled:opacity-50"
            >
              YES
            </button>
            <button
              onClick={() => handleAnswer('No')}
              disabled={loading}
              className="py-4 bg-red-600 hover:bg-red-500 text-white font-bold text-xl rounded-xl shadow-lg transition-transform active:scale-95 disabled:opacity-50"
            >
              NO
            </button>
          </div>
        </div>
      ) : (
        <div className="text-slate-500 py-10">
          <p className="animate-pulse">Waiting for Player 2 to ask something...</p>
        </div>
      )}
    </div>
  );
};

export default HostPanel;