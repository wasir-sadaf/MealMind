// src/socket.js
const socketHandler = (io) => {
    io.on('connection', (socket) => {
        console.log(`🔌 Player Connected: ${socket.id}`);

        // --- WONDER 2: JOINING A ROOM ---
        socket.on('join_room', (roomCode) => {
            socket.join(roomCode);
            console.log(`Player ${socket.id} joined room ${roomCode}`);
            socket.to(roomCode).emit('player_joined', socket.id);
        });

        // --- WONDER 2: SILENT SIGNALS ---
        socket.on('send_signal', (data) => {
            socket.to(data.room).emit('receive_signal', data.icon);
        });

        // --- WONDER 3: MIND SYNC ---
        socket.on('sync_click', (data) => {
            socket.to(data.room).emit('partner_click', data.time);
        });

        socket.on('disconnect', () => {
            console.log('Player Disconnected');
        });
    });
};

export default socketHandler;