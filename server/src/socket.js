import { Server } from 'socket.io';
import { getGames } from './controller/gameController.js';

let io;

// Store player info for synchronization
const playerActions = {}; // { gameId: { player1Id: { lastAction, timestamp }, player2Id: {...} } }
const SYNC_TOLERANCE_MS = 500; // 500ms tolerance for sync actions

export const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "*", // Allow all for hackathon
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log(`🔌 Socket Connected: ${socket.id}`);

        // Join a Game Room based on Game ID
        socket.on('join_game', (gameId) => {
            socket.join(gameId);
            console.log(`Socket ${socket.id} joined game: ${gameId}`);
            // Notify other players in the room
            socket.to(gameId).emit('player_joined', { socketId: socket.id });
        });

        // Store player info
        socket.on('player_info', ({ gameId, playerId }) => {
            socket.data = { ...socket.data, gameId, playerId };
            console.log(`Player ${playerId} info stored for game ${gameId}`);
        });

        // Handle sync actions (players must click at exact same time)
        socket.on('sync_action', ({ gameId, playerId, actionType, timestamp, ...data }) => {
            if (!playerActions[gameId]) {
                playerActions[gameId] = {};
            }

            playerActions[gameId][playerId] = {
                actionType,
                timestamp,
                data
            };

            const games = getGames();
            const game = games[gameId];
            if (!game) return;

            // Check if both players have performed the action
            const players = [game.player1Id, game.player2Id].filter(Boolean);
            const actionCount = players.filter(pId => 
                playerActions[gameId][pId]?.actionType === actionType
            ).length;

            // If both players performed the action
            if (actionCount === 2) {
                const actions = players.map(pId => playerActions[gameId][pId]);
                const timeDiff = Math.abs(actions[0].timestamp - actions[1].timestamp);

                if (timeDiff <= SYNC_TOLERANCE_MS) {
                    // Successful synchronization!
                    io.to(gameId).emit('sync_success', {
                        actionType,
                        timeDiff,
                        message: 'Perfect synchronization!',
                        ...data
                    });
                    // Clear actions for this game
                    delete playerActions[gameId];
                } else {
                    // Failed synchronization
                    io.to(gameId).emit('sync_failed', {
                        actionType,
                        timeDiff,
                        message: `Synchronization failed. Time difference: ${timeDiff}ms`
                    });
                    // Clear actions to allow retry
                    delete playerActions[gameId];
                }
            } else {
                // Wait for other player
                io.to(gameId).emit('sync_pending', {
                    actionType,
                    waitingFor: players.length - actionCount,
                    playerId
                });
            }
        });

        // Handle emoji/symbol messages (non-verbal communication)
        socket.on('emoji_message', ({ gameId, playerId, emoji, timestamp }) => {
            console.log(`Emoji from ${playerId} in game ${gameId}: ${emoji}`);
            // Broadcast to other players in the room
            socket.to(gameId).emit('emoji_received', {
                playerId,
                emoji,
                timestamp
            });
        });

        // Handle pattern info sharing (one player sees pattern, other sees color)
        socket.on('pattern_info', ({ gameId, playerId, patternType, info, timestamp }) => {
            console.log(`Pattern info from ${playerId}: ${patternType} - ${JSON.stringify(info)}`);
            // Store pattern info and share with other player
            const games = getGames();
            const game = games[gameId];
            if (!game) return;

            if (!game.patternData) {
                game.patternData = {};
            }
            game.patternData[patternType] = { playerId, info, timestamp };

            // If both pattern and color are received, emit combined info
            if (game.patternData.pattern && game.patternData.color) {
                io.to(gameId).emit('pattern_combined', {
                    pattern: game.patternData.pattern.info,
                    color: game.patternData.color.info
                });
            } else {
                // Send to other player
                socket.to(gameId).emit('pattern_info_received', {
                    patternType,
                    info
                });
            }
        });

        // Handle cipher answer submission
        socket.on('cipher_answer', ({ gameId, playerId, cipherAnswer, timestamp }) => {
            console.log(`Cipher answer from ${playerId} in game ${gameId}: ${cipherAnswer}`);
            // Broadcast to all players in the room for verification
            io.to(gameId).emit('cipher_answer_submitted', {
                playerId,
                cipherAnswer,
                timestamp
            });
        });

        // Handle disconnection
        socket.on('disconnect', () => {
            console.log(`Socket Disconnected: ${socket.id}`);
            const { gameId } = socket.data || {};
            if (gameId) {
                // Clean up player actions
                if (playerActions[gameId]) {
                    delete playerActions[gameId];
                }
                // Notify other players
                socket.to(gameId).emit('player_disconnected', { socketId: socket.id });
            }
        });
    });

    return io;
};

// This function lets Controllers get the active Socket instance
export const getIO = () => {
    if (!io) {
        throw new Error("Socket.io not initialized!");
    }
    return io;
};