import { useEffect, useRef, useState, useCallback } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000';

export const useWebSocket = (gameId, playerId) => {
  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!gameId) {
      console.log('⏳ Waiting for gameId to connect WebSocket...');
      return;
    }

    console.log(`🔌 Initializing WebSocket connection to ${SOCKET_URL} for game ${gameId}`);
    
    // Initialize Socket.io connection
    const socketInstance = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: Infinity,
      timeout: 20000,
      forceNew: false,
      autoConnect: true
    });

    // Connection events
    socketInstance.on('connect', () => {
      console.log('🔌 WebSocket Connected:', socketInstance.id);
      setIsConnected(true);
      setError(null);
      
      // Join the game room
      if (gameId) {
        socketInstance.emit('join_game', gameId);
        console.log(`📥 Joined game room: ${gameId}`);
      }
      
      // Send player info if available
      if (playerId) {
        socketInstance.emit('player_info', { gameId, playerId });
        console.log(`👤 Sent player info: ${playerId}`);
      }
    });

    socketInstance.on('disconnect', () => {
      console.log('❌ WebSocket Disconnected');
      setIsConnected(false);
    });

    socketInstance.on('connect_error', (err) => {
      console.error('WebSocket Connection Error:', err);
      setError(err.message || 'Failed to connect to server. Make sure the backend is running on port 5000.');
      setIsConnected(false);
    });

    socketInstance.on('reconnect_attempt', () => {
      console.log('🔄 Attempting to reconnect...');
      setError('Reconnecting...');
    });

    socketInstance.on('reconnect', (attemptNumber) => {
      console.log(`✅ Reconnected after ${attemptNumber} attempts`);
      setError(null);
      setIsConnected(true);
    });

    socketInstance.on('reconnect_failed', () => {
      console.error('❌ Reconnection failed');
      setError('Failed to reconnect. Please refresh the page.');
    });

    setSocket(socketInstance);

    // Cleanup on unmount
    return () => {
      socketInstance.disconnect();
      setIsConnected(false);
    };
  }, [gameId, playerId]);

  // Emit sync action (for synchronization challenge)
  const emitSyncAction = useCallback((actionType, data = {}) => {
    if (socket && isConnected) {
      socket.emit('sync_action', {
        gameId,
        playerId,
        actionType,
        timestamp: Date.now(),
        ...data
      });
    }
  }, [socket, isConnected, gameId, playerId]);

  // Send emoji/symbol (non-verbal communication)
  const sendEmoji = useCallback((emoji) => {
    if (socket && isConnected) {
      socket.emit('emoji_message', {
        gameId,
        playerId,
        emoji,
        timestamp: Date.now()
      });
    }
  }, [socket, isConnected, gameId, playerId]);

  // Share visual pattern info (one player sees pattern, other sees color)
  const sharePatternInfo = useCallback((patternType, info) => {
    if (socket && isConnected) {
      socket.emit('pattern_info', {
        gameId,
        playerId,
        patternType, // 'pattern' or 'color'
        info,
        timestamp: Date.now()
      });
    }
  }, [socket, isConnected, gameId, playerId]);

  // Submit cipher answer
  const submitCipherAnswer = useCallback((cipherAnswer) => {
    if (socket && isConnected) {
      socket.emit('cipher_answer', {
        gameId,
        playerId,
        cipherAnswer,
        timestamp: Date.now()
      });
    }
  }, [socket, isConnected, gameId, playerId]);

  // Create event listeners helper
  const onEvent = useCallback((eventName, handler) => {
    if (!socket) return;
    
    socket.on(eventName, handler);
    
    return () => {
      socket.off(eventName, handler);
    };
  }, [socket]);

  return {
    socket,
    isConnected,
    error,
    emitSyncAction,
    sendEmoji,
    sharePatternInfo,
    submitCipherAnswer,
    onEvent
  };
};
