// src/server.js
import http from 'http';
import { Server } from 'socket.io';
import app from './app.js';           // Note the .js extension is required in ESM!
import { testConnection } from './config/db.js'; // Note the .js extension!
import socketHandler from './socket.js'; // Note the .js extension!

// 1. Create the HTTP Server
const server = http.createServer(app);

// 2. Attach Socket.io
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

// 3. Initialize Game Logic
socketHandler(io);

// 4. Test DB and Start Server
const PORT = process.env.PORT || 3001;

// We wait for the DB check, then start listening
await testConnection(); 

server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});