// Quick WebSocket connection test
import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000';

console.log('🧪 Testing WebSocket Connection...\n');

const socket = io(SOCKET_URL, {
  transports: ['websocket', 'polling'],
  reconnection: false,
  timeout: 5000
});

let testsPassed = 0;
let testsFailed = 0;

const testGameId = 'test-game-' + Date.now();

socket.on('connect', () => {
  console.log('✅ WebSocket Connected:', socket.id);
  testsPassed++;
  
  // Test 1: Join game room
  console.log('\n📝 Test 1: Joining game room...');
  socket.emit('join_game', testGameId);
  
  // Test 2: Send player info
  setTimeout(() => {
    console.log('📝 Test 2: Sending player info...');
    socket.emit('player_info', { gameId: testGameId, playerId: 'test-player-1' });
  }, 500);
  
  // Test 3: Send emoji message
  setTimeout(() => {
    console.log('📝 Test 3: Sending emoji message...');
    socket.emit('emoji_message', {
      gameId: testGameId,
      playerId: 'test-player-1',
      emoji: '🎮',
      timestamp: Date.now()
    });
    testsPassed++;
  }, 1000);
  
  // Test 4: Send pattern info
  setTimeout(() => {
    console.log('📝 Test 4: Sending pattern info...');
    socket.emit('pattern_info', {
      gameId: testGameId,
      playerId: 'test-player-1',
      patternType: 'pattern',
      info: { type: 'spiral', direction: 'clockwise' },
      timestamp: Date.now()
    });
    testsPassed++;
  }, 1500);
  
  // Complete tests after a delay
  setTimeout(() => {
    console.log('\n📊 Test Results:');
    console.log(`✅ Passed: ${testsPassed}`);
    console.log(`❌ Failed: ${testsFailed}`);
    console.log('\n✅ WebSocket tests completed!');
    socket.disconnect();
    process.exit(testsFailed > 0 ? 1 : 0);
  }, 2500);
});

socket.on('connect_error', (error) => {
  console.error('❌ WebSocket Connection Failed:', error.message);
  console.error('💡 Make sure the server is running: npm run dev in server directory');
  testsFailed++;
  process.exit(1);
});

socket.on('player_joined', (data) => {
  console.log('✅ Received player_joined event:', data);
  testsPassed++;
});

socket.on('emoji_received', (data) => {
  console.log('✅ Received emoji_received event:', data);
  testsPassed++;
});

socket.on('pattern_info_received', (data) => {
  console.log('✅ Received pattern_info_received event:', data);
  testsPassed++;
});

// Timeout after 10 seconds
setTimeout(() => {
  if (socket.connected) {
    console.log('\n⏱️  Test timeout - disconnecting...');
    socket.disconnect();
  } else {
    console.error('\n❌ Connection timeout');
    testsFailed++;
  }
  process.exit(testsFailed > 0 ? 1 : 0);
}, 10000);
