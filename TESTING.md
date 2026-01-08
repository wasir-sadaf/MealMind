# Testing Guide

## Prerequisites
1. Backend server running on port 5000
2. Frontend server running on port 3000
3. Both servers have dependencies installed (`npm install`)

## Quick Test Commands

### 1. Start Backend Server
```bash
cd server
npm run dev
```

Expected output:
```
🚀 Server running on port 5000
🔌 WebSocket server ready for connections
```

### 2. Start Frontend Server
```bash
cd word-guesser-frontend
npm run dev
```

Expected output:
```
VITE v7.x.x ready in xxx ms
➜ Local: http://localhost:3000/
```

### 3. Test API Endpoints
In a new terminal:
```bash
cd server
npm run test:api
```

### 4. Test WebSocket Connection
In a new terminal:
```bash
cd server
npm run test:ws
```

### 5. Run All Tests
```bash
cd server
npm run test:all
```

## Manual Testing Checklist

### ✅ Backend API Tests

1. **Start Game**
   ```bash
   curl -X POST http://localhost:5000/api/game/start \
     -H "Content-Type: application/json" \
     -d '{"secretWord": "testword"}'
   ```
   - Should return: `{ gameId, player1Id, message }`

2. **Get Game Status**
   ```bash
   curl http://localhost:5000/api/game/status/{gameId}
   ```
   - Should return: `{ status: "ongoing", questionHistory: [] }`

3. **Join Game**
   ```bash
   curl -X POST http://localhost:5000/api/game/join \
     -H "Content-Type: application/json" \
     -d '{"gameId": "{gameId}"}'
   ```
   - Should return: `{ player2Id, message }`

4. **Submit Question**
   ```bash
   curl -X POST http://localhost:5000/api/game/guess \
     -H "Content-Type: application/json" \
     -d '{"gameId": "{gameId}", "question": "Is it a living thing?"}'
   ```
   - Should return: `{ message, question: { question, answer: null, index } }`

5. **Reply to Question**
   ```bash
   curl -X POST http://localhost:5000/api/game/reply \
     -H "Content-Type: application/json" \
     -d '{"gameId": "{gameId}", "questionIndex": 0, "answer": "Yes"}'
   ```
   - Should return: `{ message, question: { question, answer: "Yes" } }`

### ✅ WebSocket Tests

1. **Connection Test**
   - Open browser console on frontend
   - Navigate to a game room
   - Should see: `🔌 WebSocket Connected: [socket-id]`
   - Should see: `✅ Connected to server` in UI

2. **Join Game Room**
   - Check browser console for: `📥 Joined game room: [gameId]`

3. **Player Info**
   - Check browser console for: `👤 Sent player info: [playerId]`

4. **Real-time Updates**
   - Player 1 asks a question → Player 2 should see it immediately
   - Player 1 answers → Both players should see answer immediately
   - No polling required!

5. **WebSocket Events Test**
   - Open two browser tabs with different players
   - Test emoji messages: Should broadcast to other player
   - Test sync actions: Both players click simultaneously
   - Test pattern sharing: One sends pattern, other sends color

### ✅ Frontend-Backend Integration

1. **Start Game Flow**
   - Go to home page
   - Enter secret word
   - Click "Start Game"
   - Should redirect to game room
   - WebSocket should connect automatically

2. **Join Game Flow**
   - Get game ID from Player 1
   - Go to `/join/{gameId}`
   - Click "Join Game"
   - Should redirect to game room
   - WebSocket should connect automatically

3. **Game Play Flow**
   - Player 2 asks question → Appears in both players' history
   - Player 1 answers → Answer appears in both players' history
   - No page refresh needed!
   - WebSocket status indicator shows "✅ Connected"

### ✅ WebSocket Features for "The Sync Protocol"

1. **Sync Actions** (Synchronization Challenge)
   - Both players click button at same time
   - Server checks if within 500ms tolerance
   - Emits `sync_success` or `sync_failed` event

2. **Emoji Communication** (Non-verbal)
   - Player sends emoji → Other player receives `emoji_received`
   - No chat box, only emojis/symbols

3. **Pattern Sharing** (Visual Pattern)
   - Player 1 sees pattern → Sends `pattern_info` with type "pattern"
   - Player 2 sees color → Sends `pattern_info` with type "color"
   - Server combines both → Emits `pattern_combined` to both players

4. **Cipher Answer** (Historical Cipher)
   - Player submits cipher answer → All players see `cipher_answer_submitted`
   - Can verify together without revealing answer

## Troubleshooting

### Server won't start
- Check if port 5000 is available
- Check database connection (not required - server will start without DB)
- Check console for error messages

### WebSocket won't connect
- Verify backend is running on port 5000
- Check browser console for connection errors
- Check CORS settings in `server/src/socket.js`
- Try refreshing the page

### API calls fail
- Verify API base URL in `word-guesser-frontend/src/services/api.js`
- Check that routes are correct (`/api/game/*`)
- Check browser network tab for 404 errors

### Real-time updates not working
- Check WebSocket connection status indicator
- Verify event listeners are set up in `GameRoom.jsx`
- Check browser console for WebSocket events
- Ensure both players are in the same game room

## Success Criteria

✅ All API endpoints return correct responses
✅ WebSocket connects successfully
✅ Real-time updates work without polling
✅ No errors in browser console
✅ No errors in server console
✅ Frontend and backend communicate correctly
✅ All game features work end-to-end
