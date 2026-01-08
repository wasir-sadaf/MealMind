import http from 'http';
import app from './app.js';
import { testConnection } from './config/db.js';
import { initSocket } from './socket.js'; // Import the new file

const server = http.createServer(app);

// 1. Initialize Socket.io passing the HTTP server
initSocket(server);

const PORT = process.env.PORT || 3001;

await testConnection();

server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});