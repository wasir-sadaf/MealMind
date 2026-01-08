# Word Guesser Frontend

The React frontend for the MealMind word guessing game. Built with Vite, React 19, and Tailwind CSS.

## 🚀 Features

- **Real-time gameplay** with WebSocket integration
- **Responsive design** for all devices
- **Modern React** with hooks and context
- **Fast development** with Vite HMR
- **Styled with Tailwind CSS**

## 🛠️ Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Socket.io-client** - Real-time communication

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- Backend server running on port 5000

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production
```bash
npm run build
npm run preview
```

### Linting
```bash
npm run lint
```

## 📁 Project Structure

```
src/
├── components/
│   ├── game/           # Game-specific components
│   │   ├── GameHeader.jsx
│   │   ├── GuesserPanel.jsx
│   │   ├── HostPanel.jsx
│   │   └── QuestionHistory.jsx
│   └── ui/             # Reusable UI components
│       ├── Button.jsx
│       ├── Card.jsx
│       ├── Input.jsx
│       └── WinModal.jsx
├── context/
│   └── GameContext.jsx # Global game state
├── hooks/
│   ├── useGameStatus.js
│   └── useWebSocket.js # WebSocket connection hook
├── pages/
│   ├── GameRoom.jsx    # Main game interface
│   ├── Home.jsx        # Landing page
│   ├── Lobby.jsx       # Game lobby
│   └── NotFound.jsx    # 404 page
├── services/
│   └── api.js          # API service functions
└── utils/
    └── helpers.js      # Utility functions
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:5000
```

### Tailwind CSS
The project uses Tailwind CSS for styling. Configuration is in `tailwind.config.js`.

### ESLint
ESLint is configured for React development. See `eslint.config.js` for rules.

## 🎮 Game Flow

1. **Home Page** - Choose to start or join a game
2. **Lobby** - Wait for players or enter game details
3. **Game Room** - Real-time word guessing gameplay
4. **Win Modal** - Display winner and game results

## 🔌 WebSocket Events

The frontend listens for these WebSocket events:
- `game_player_joined` - When a second player joins
- `question_submitted` - When a question is asked
- `question_answered` - When a question is answered

## 📱 Responsive Design

The app is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🚀 Deployment

1. Build the project: `npm run build`
2. Serve the `dist` folder with any static server
3. Ensure the backend API is accessible
4. Update `VITE_API_BASE_URL` for production

## 🤝 Contributing

1. Follow the existing code style
2. Use React hooks and functional components
3. Test on multiple screen sizes
4. Ensure WebSocket functionality works correctly
