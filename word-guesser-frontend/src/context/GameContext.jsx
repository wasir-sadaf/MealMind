import { createContext, useContext, useState, useEffect } from 'react';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  // Load from localStorage so you don't lose progress if you refresh
  const [gameData, setGameDataState] = useState(() => {
    const saved = localStorage.getItem('word_guesser_game');
    return saved ? JSON.parse(saved) : {
      gameId: null,
      playerId: null,
      role: null, // 'host' or 'guesser'
    };
  });

  const setGameData = (data) => {
    setGameDataState(prev => {
      const newState = { ...prev, ...data };
      localStorage.setItem('word_guesser_game', JSON.stringify(newState));
      return newState;
    });
  };

  const clearGameData = () => {
    localStorage.removeItem('word_guesser_game');
    setGameDataState({ gameId: null, playerId: null, role: null });
  };

  return (
    <GameContext.Provider value={{ gameData, setGameData, clearGameData }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};