import { useState } from 'react';
import { gameService } from '../../services/api';

const GuesserPanel = ({ gameId, playerId, gameStatus }) => {
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);

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
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1 justify-center">
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
      
      <p className="text-center text-xs text-slate-500 mt-4">
        Tip: Ask Yes/No questions only!
      </p>
    </div>
  );
};

export default GuesserPanel;