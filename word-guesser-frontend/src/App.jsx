import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import Home from './pages/Home';
import Lobby from './pages/Lobby';
import GameRoom from './pages/GameRoom';
import NotFound from './pages/NotFound';
import './App.css'; 

function App() {
  return (
    <GameProvider>
      <Router>
        {/* Main Background Container */}
        <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-4 font-sans">
          
          <div className="w-full max-w-5xl">
            {/* App Title */}
            <h1 className="text-4xl md:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 mb-8 drop-shadow-sm select-none">
              🕵️ Word Guesser
            </h1>
            
            {/* Main Content Card */}
            <div className="bg-slate-800/50 backdrop-blur-sm p-4 md:p-8 rounded-3xl shadow-2xl border border-slate-700/50">
              <Routes>
                {/* Landing Page (Player 1 starts game) */}
                <Route path="/" element={<Home />} />
                
                {/* Join Page (Player 2 clicks link) */}
                <Route path="/join/:gameId" element={<Lobby />} />
                
                {/* Main Game Room (Shared view) */}
                <Route path="/game/:gameId" element={<GameRoom />} />
                
                {/* 404 Catch-all */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            
            {/* Simple Footer */}
            <div className="text-center mt-8 text-slate-500 text-xs uppercase tracking-widest">
              Hackathon Project
            </div>
          </div>
        </div>
      </Router>
    </GameProvider>
  );
}

export default App;