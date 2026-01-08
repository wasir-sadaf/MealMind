# Setup Instructions - Fix IPv6 Connection Issue

## Problem
The error `connect ECONNREFUSED ::1:5000` occurs because Windows is trying to use IPv6 (`::1`) instead of IPv4 (`127.0.0.1`).

## Solution Applied

### 1. Fixed Configuration Files

**vite.config.js** - Updated to use IPv4:
```javascript
server: {
  port: 3000,
  host: '127.0.0.1', // Force IPv4
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:5000',
      changeOrigin: true,
      secure: false,
    },
  },
}
```

**useWebSocket.js** - Updated WebSocket URL:
```javascript
const SOCKET_URL = 'http://127.0.0.1:5000';
```

### 2. Start Backend Server

**IMPORTANT**: The backend server must be running before starting the frontend!

```bash
# Terminal 1 - Start Backend
cd MealMind/server
npm start
```

You should see:
```
🚀 Server running on port 5000
🔌 WebSocket server ready for connections
📡 API available at http://localhost:5000
```

### 3. Start Frontend Server

```bash
# Terminal 2 - Start Frontend
cd MealMind/word-guesser-frontend
npm run dev
```

You should see:
```
➜  Local:   http://127.0.0.1:3000/
```

### 4. Verify Connection

1. Open browser: `http://127.0.0.1:3000`
2. Check browser console - should see "✅ Connected to server"
3. Try creating a game - should work without proxy errors

## Troubleshooting

### If you still see IPv6 errors:

1. **Clear Vite cache**:
   ```bash
   cd MealMind/word-guesser-frontend
   rm -rf node_modules/.vite
   npm run dev
   ```

2. **Check if backend is running**:
   ```bash
   netstat -ano | findstr ":5000"
   ```
   Should show a LISTENING process

3. **Restart both servers**:
   - Stop both servers (Ctrl+C)
   - Start backend first
   - Then start frontend

4. **Check firewall**:
   - Make sure Windows Firewall isn't blocking port 5000

## Current Configuration Summary

- **Backend**: `http://127.0.0.1:5000`
- **Frontend**: `http://127.0.0.1:3000`
- **WebSocket**: `http://127.0.0.1:5000`
- **API Proxy**: `/api` → `http://127.0.0.1:5000`

All connections now use IPv4 (`127.0.0.1`) instead of IPv6 (`::1` or `localhost`).
