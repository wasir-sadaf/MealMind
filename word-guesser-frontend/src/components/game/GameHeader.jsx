const GameHeader = ({ isHost, secretWord, gameStatus }) => {
  
  const copyLink = () => {
    const url = window.location.href.replace('game', 'join'); // Hacky but works for demo
    navigator.clipboard.writeText(url);
    alert('Link copied to clipboard! Send it to Player 2.');
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-md gap-4">
      
      {/* Secret Word Section */}
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 bg-teal-500 rounded-full flex items-center justify-center text-slate-900 font-bold text-lg shadow-lg">
          {isHost ? 'P1' : 'P2'}
        </div>
        <div>
          <p className="text-slate-400 text-xs uppercase tracking-wider font-bold">
            {isHost ? 'Your Secret Word' : 'You are guessing'}
          </p>
          <h1 className="text-2xl font-bold text-white">
            {isHost ? (secretWord || 'Loading...') : '???????'}
          </h1>
        </div>
      </div>

      {/* Status & Actions */}
      <div className="flex items-center gap-3">
        <div className={`px-4 py-1 rounded-full text-sm font-bold border
          ${gameStatus === 'won' 
            ? 'bg-green-900/50 text-green-400 border-green-500' 
            : 'bg-blue-900/50 text-blue-400 border-blue-500'
          }`}
        >
          {gameStatus === 'won' ? 'GAME WON' : 'GAME ONGOING'}
        </div>

        {isHost && gameStatus !== 'won' && (
          <button 
            onClick={copyLink}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 text-sm font-medium rounded-lg transition-colors"
          >
            🔗 Copy Invite Link
          </button>
        )}
      </div>
    </div>
  );
};

export default GameHeader;