// src/config/db.js
import mysql from 'mysql2/promise';
import 'dotenv/config'; // Loads .env variables

// Create the connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'hackday',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Helper to check connection
const testConnection = async () => {
    try {
        await pool.query('SELECT 1');
        console.log('✅ MySQL Database Connected');
    } catch (err) {
        console.error('❌ Database Connection Failed:', err.message);
    }
};

// Named exports
export { pool, testConnection };