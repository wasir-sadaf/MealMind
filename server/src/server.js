import http from 'http';
import app from './app.js';
import { testConnection } from './config/db.js';
import { initSocket } from './socket.js'; // Import the new file

const server = http.createServer(app);

// 1. Initialize Socket.io passing the HTTP server
initSocket(server);

const PORT = process.env.PORT || 5000;

// Make database connection optional - don't block server startup
testConnection()
    .then(() => {
        console.log('✅ Database connected');
    })
    .catch((err) => {
        console.warn('⚠️  Database connection failed, continuing without DB:', err.message);
        console.log('ℹ️  Server will use in-memory storage only');
    })
    .finally(() => {
        // Start server regardless of DB connection status
        server.listen(PORT, '0.0.0.0', () => {
            console.log(`🚀 Server running on port ${PORT}`);
            console.log(`🔌 WebSocket server ready for connections`);
            console.log(`📡 API available at http://localhost:${PORT}`);
        });
    });