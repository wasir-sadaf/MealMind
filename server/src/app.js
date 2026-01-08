// src/app.js
import express from 'express';
import cors from 'cors';
import gameRoutes from './route/gameRoutes.js'; // import before using

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mount game routes
app.use('/api/game', gameRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('API is running...');
});

export default app;
