# Quick Start Guide - Test Everything

## 🚀 Start Servers

### Terminal 1 - Backend
```bash
cd server
npm run dev
```
**Expected Output:**
```
🚀 Server running on port 5000
🔌 WebSocket server ready for connections
```

### Terminal 2 - Frontend  
```bash
cd word-guesser-frontend
npm run dev
```
**Expected Output:**
```
➜  Local:   http://localhost:3000/
```

## ✅ Automated Tests

### Test API Endpoints
```bash
cd server
npm run test:api
```

### Test WebSocket Connection
```bash
cd server
npm run test:ws
```

### Run All Tests
```bash
cd server
npm run test:all
```

## 🧪 Manual Testing Steps

### 1. Test WebSocket Connection ✅
1. Open browser: http://localhost:3000
2. Start a new game
3. Check browser console for:
   - `🔌 WebSocket Connected: [socket-id]`
   - `📥 Joined game room: [gameId]`
   - `👤 Sent player info: [playerId]`
4. Check UI for: `✅ Connected to server` status

### 2. Test Real-time Updates ✅
1. Open two browser windows (Player 1 & Player 2)
2. Player 2 asks a question
3. **Verify:** Question appears instantly in both windows (no refresh needed)
4. Player 1 answers
5. **Verify:** Answer appears instantly in both windows

### 3. Test Sync Protocol Features ✅
1. Both players click a button simultaneously
2. Check console for `sync_success` or `sync_failed` events
3. Time difference should be calculated and displayed

### 4. Test Emoji Communication ✅
1. Use `sendEmoji('🎮')` in browser console
2. Other player should receive `emoji_received` event
3. Verify emoji appears in other player's view

### 5. Test Pattern Sharing ✅
1. Player 1 sends pattern info
2. Player 2 sends color info  
3. Both players receive `pattern_combined` event
4. Combined information available to both

## 🔍 Verification Checklist

- [ ] Backend server starts without errors
- [ ] Frontend server starts without errors
- [ ] WebSocket connects successfully
- [ ] Connection status shows "✅ Connected"
- [ ] API endpoints respond correctly
- [ ] Real-time updates work (no polling)
- [ ] Questions appear instantly
- [ ] Answers appear instantly
- [ ] No errors in browser console
- [ ] No errors in server console

## 📊 Test Results

All tests should pass! Check `TEST-RESULTS.md` for detailed results.
