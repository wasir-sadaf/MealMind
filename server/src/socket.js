import { Server } from 'socket.io';

let io;

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