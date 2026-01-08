import { useState } from 'react';
import { gameService } from '../../services/api';

const GuesserPanel = ({ gameId, playerId, gameStatus, onGameWon }) => {
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [finalGuess, setFinalGuess] = useState('');
  const [submittingGuess, setSubmittingGuess] = useState(false);
  const [guessError, setGuessError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setSending(true);
    try {
      await gameService.askQuestion(gameId, input);
      setInput(''); // Clear input on success
    } catch (error) {
      console.error("Failed to send question", error);
    } finally {
      setSending(false);
    }
  };

  const handleFinalGuess = async (e) => {
    e.preventDefault();
    if (!finalGuess.trim()) {
      setGuessError('Please enter a guess');
      return;
    }

    setSubmittingGuess(true);
    setGuessError('');
    try {
      const result = await gameService.submitFinalGuess(gameId, finalGuess);
      if (result.correct) {
        // Game won - notify parent immediately and popup will be shown
        if (onGameWon) {
          onGameWon(result.secretWord);
        }
        setFinalGuess('');
      } else {
        setGuessError('Wrong guess! Try asking more questions.');
        setFinalGuess('');
      }
    } catch (error) {
      console.error("Failed to submit final guess", error);
      setGuessError(error.response?.data?.error || 'Failed to submit guess');
    } finally {
      setSubmittingGuess(false);
    }
  };

  if (gameStatus === 'won') {
    return (
      <div className="bg-green-900/30 border border-green-500 p-6 rounded-xl text-center">
        <h3 className="text-2xl font-bold text-green-400 mb-2">You Won! 🎉</h3>
        <p className="text-slate-300">You guessed the secret word correctly.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg h-full flex flex-col">
      <h3 className="text-xl font-semibold text-blue-400 mb-4">Ask a Question</h3>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Is it a living thing?&#10;Is it bigger than a breadbox?"
          className="w-full h-32 p-4 bg-slate-900 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
          disabled={sending}
        />
        
        <button
          type="submit"
          disabled={sending || !input}
          className={`w-full py-3 rounded-xl font-bold text-lg transition-all
            ${sending || !input
              ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg hover:shadow-blue-500/20'
            }`}
        >
          {sending ? 'Sending...' : 'Ask Question'}
        </button>
      </form>

      {/* Final Guess Section */}
      <div className="border-t border-slate-700 pt-6 mt-auto">
        <h4 className="text-lg font-semibold text-yellow-400 mb-3">Final Guess</h4>
        <form onSubmit={handleFinalGuess} className="flex flex-col gap-3">
          <input
            type="text"
            value={finalGuess}
            onChange={(e) => {
              setFinalGuess(e.target.value);
              setGuessError('');
            }}
            placeholder="Enter your final guess..."
            className="w-full p-3 bg-slate-900 border border-yellow-600 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            disabled={submittingGuess}
          />
          {guessError && (
            <p className="text-red-400 text-sm">{guessError}</p>
          )}
          <button
            type="submit"
            disabled={submittingGuess || !finalGuess.trim()}
            className={`w-full py-3 rounded-xl font-bold text-lg transition-all
              ${submittingGuess || !finalGuess.trim()
                ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                : 'bg-yellow-600 hover:bg-yellow-500 text-slate-900 shadow-lg hover:shadow-yellow-500/20'
              }`}
          >
            {submittingGuess ? 'Checking...' : 'Submit Final Guess'}
          </button>
        </form>
      </div>
      
      <p className="text-center text-xs text-slate-500 mt-4">
        Tip: Ask Yes/No questions first, then make your final guess!
      </p>
    </div>
  );
};

export default GuesserPanel;