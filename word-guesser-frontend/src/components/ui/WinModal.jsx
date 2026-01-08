import { useEffect } from 'react';

const WinModal = ({ isOpen, onClose, secretWord, isHost }) => {
  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-slate-800 border-2 border-yellow-500 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Celebration Icon */}
        <div className="text-center mb-6">
          <div className="text-6xl mb-4 animate-bounce">🎉</div>
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-2">
            Game Won!
          </h2>
          <p className="text-slate-300 text-lg">
            {isHost 
              ? "The word was guessed correctly!" 
              : "Congratulations! You guessed it right!"}
          </p>
        </div>

        {/* Secret Word Reveal */}
        <div className="bg-slate-900/50 border border-yellow-500/50 rounded-xl p-6 mb-6 text-center">
          <p className="text-slate-400 text-sm uppercase tracking-wider mb-2">The Secret Word Was:</p>
          <p className="text-4xl font-bold text-yellow-400">{secretWord}</p>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-slate-900 font-bold text-lg rounded-xl shadow-lg transition-all transform hover:scale-105 active:scale-95"
        >
          Awesome! 🎊
        </button>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from { 
            opacity: 0;
            transform: scale(0.9);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default WinModal;
