# MealMind - Word Guessing Game

A real-time word guessing game built with React, Node.js, Express, and Socket.io. Players take turns asking yes/no questions to guess a secret word.

## 🚀 Features

- **Real-time multiplayer gameplay** using WebSocket connections
- **Interactive UI** built with React and Tailwind CSS
- **RESTful API** for game management
- **MySQL database support** (optional - falls back to in-memory storage)
- **Automated testing** for API and WebSocket functionality
- **Responsive design** for desktop and mobile

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Socket.io** - Real-time communication
- **MySQL2** - Database connectivity
- **JWT** - Authentication (future use)
- **bcryptjs** - Password hashing (future use)

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Socket.io-client** - Real-time client

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MySQL** (optional - for persistent storage)

## 🗄️ Database Setup (Optional)

If you want to use MySQL for persistent storage:

1. **Install MySQL** on your system
2. **Create a database** named `guess_db`
3. **Create a `.env` file** in the `server` directory:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=guess_db
PORT=5000
```

**Note:** The application will work without a database using in-memory storage.

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd MealMind
```

### 2. Install Backend Dependencies
```bash
cd server
npm install
```

### 3. Install Frontend Dependencies
```bash
cd ../word-guesser-frontend
npm install
```

### 4. Start the Development Servers

#### Terminal 1 - Backend Server
```bash
cd server
npm run dev
```
**Expected Output:**
```
✅ Database connected
🚀 Server running on port 5000
🔌 WebSocket server ready for connections
📡 API available at http://localhost:5000
```

#### Terminal 2 - Frontend Server
```bash
cd word-guesser-frontend
npm run dev
```
**Expected Output:**
```
VITE v7.x.x ready in xxx ms
➜ Local: http://localhost:3000/
```

## 🧪 Testing

### Automated Tests
```bash
cd server

# Test API endpoints
npm run test:api

# Test WebSocket connections
npm run test:ws

# Run all tests
npm run test:all
```

### Manual Testing
1. Open your browser and navigate to `http://localhost:3000`
2. Start a new game as Player 1
3. Copy the Game ID and open a new browser window/tab
4. Join the game as Player 2 using the Game ID
5. Test real-time communication by asking questions and answering

## 📁 Project Structure

```
MealMind/
├── server/                          # Backend Node.js application
│   ├── src/
│   │   ├── app.js                   # Express app setup
│   │   ├── server.js                # Server entry point
│   │   ├── socket.js                # WebSocket configuration
│   │   ├── config/
│   │   │   ├── db.js                # Database configuration
│   │   │   └── dotenv.config.js     # Environment variables
│   │   ├── controller/
│   │   │   └── gameController.js    # Game logic
│   │   └── route/
│   │       └── gameRoutes.js        # API routes
│   ├── test/                        # Test files
│   │   ├── gamecontrol.rest
│   │   ├── test-api.js
│   │   ├── test-final-guess.js
│   │   └── test-websocket.js
│   └── package.json
├── word-guesser-frontend/           # Frontend React application
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── components/
│   │   │   ├── game/
│   │   │   │   ├── GameHeader.jsx
│   │   │   │   ├── GuesserPanel.jsx
│   │   │   │   ├── HostPanel.jsx
│   │   │   │   └── QuestionHistory.jsx
│   │   │   └── ui/
│   │   │       ├── Button.jsx
│   │   │       ├── Card.jsx
│   │   │       ├── Input.jsx
│   │   │       └── WinModal.jsx
│   │   ├── context/
│   │   │   └── GameContext.jsx
│   │   ├── hooks/
│   │   │   ├── useGameStatus.js
│   │   │   └── useWebSocket.js
│   │   ├── pages/
│   │   │   ├── GameRoom.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Lobby.jsx
│   │   │   └── NotFound.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   └── utils/
│   │       └── helpers.js
│   ├── public/
│   └── package.json
├── QUICK-START.md                   # Quick start guide
├── TESTING.md                       # Detailed testing guide
├── TEST-RESULTS.md                  # Test results
└── README.md                        # This file
```

## 🔌 API Endpoints

### Game Management
- `POST /api/game/start` - Start a new game
- `POST /api/game/join` - Join an existing game
- `GET /api/game/status/:gameId` - Get game status
- `POST /api/game/guess` - Submit a question
- `POST /api/game/reply` - Answer a question

### WebSocket Events
- `game_player_joined` - Player joined the game
- `question_submitted` - New question asked
- `question_answered` - Question answered

## 🎮 How to Play

1. **Player 1** starts a new game by entering a secret word
2. **Player 1** shares the Game ID with Player 2
3. **Player 2** joins using the Game ID
4. Players take turns asking yes/no questions
5. The goal is to guess the secret word with as few questions as possible
6. Real-time updates ensure both players see questions and answers instantly

## 🔧 Development Scripts

### Backend
```bash
cd server
npm run dev          # Start development server with nodemon
npm start            # Start production server
npm run test:api     # Test API endpoints
npm run test:ws      # Test WebSocket connections
npm run test:all     # Run all tests
```

### Frontend
```bash
cd word-guesser-frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🚀 Deployment

### Backend Deployment
1. Set environment variables for production
2. Run `npm start` instead of `npm run dev`
3. Ensure MySQL database is accessible

### Frontend Deployment
1. Run `npm run build` to create production build
2. Serve the `dist` folder with any static file server
3. Update API base URL in production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests to ensure everything works
5. Submit a pull request

## 📝 License

This project is licensed under the ISC License.

## 📞 Support

For questions or issues, please check the testing guides or create an issue in the repository.
