// Quick API endpoint test
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/game';

console.log('🧪 Testing API Endpoints...\n');

let testsPassed = 0;
let testsFailed = 0;

async function testEndpoint(name, testFn) {
  try {
    console.log(`📝 Testing: ${name}...`);
    await testFn();
    console.log(`✅ ${name} - PASSED\n`);
    testsPassed++;
  } catch (error) {
    console.error(`❌ ${name} - FAILED:`, error.response?.data || error.message);
    console.error('');
    testsFailed++;
  }
}

async function runTests() {
  let gameId = null;
  let player1Id = null;
  let player2Id = null;
  let questionIndex = null;

  // Test 1: Start Game
  await testEndpoint('POST /api/game/start - Start Game', async () => {
    const response = await axios.post(`${API_BASE_URL}/start`, {
      secretWord: 'testword'
    });
    
    if (!response.data.gameId || !response.data.player1Id) {
      throw new Error('Missing gameId or player1Id in response');
    }
    
    gameId = response.data.gameId;
    player1Id = response.data.player1Id;
    console.log(`   Game ID: ${gameId}`);
    console.log(`   Player 1 ID: ${player1Id}`);
  });

  if (!gameId) {
    console.error('\n❌ Cannot continue tests without gameId');
    return;
  }

  // Test 2: Get Game Status
  await testEndpoint('GET /api/game/status/:gameId - Get Game Status', async () => {
    const response = await axios.get(`${API_BASE_URL}/status/${gameId}`);
    
    if (response.data.status !== 'ongoing') {
      throw new Error('Expected status to be ongoing');
    }
    
    console.log(`   Status: ${response.data.status}`);
  });

  // Test 3: Join Game
  await testEndpoint('POST /api/game/join - Join Game', async () => {
    const response = await axios.post(`${API_BASE_URL}/join`, {
      gameId: gameId
    });
    
    if (!response.data.player2Id) {
      throw new Error('Missing player2Id in response');
    }
    
    player2Id = response.data.player2Id;
    console.log(`   Player 2 ID: ${player2Id}`);
  });

  // Test 4: Submit Question
  await testEndpoint('POST /api/game/guess - Submit Question', async () => {
    const response = await axios.post(`${API_BASE_URL}/guess`, {
      gameId: gameId,
      question: 'Is it a living thing?'
    });
    
    if (!response.data.question) {
      throw new Error('Missing question in response');
    }
    
    questionIndex = response.data.question.index !== undefined 
      ? response.data.question.index 
      : 0;
    console.log(`   Question: ${response.data.question.question}`);
    console.log(`   Question Index: ${questionIndex}`);
  });

  // Test 5: Reply to Question
  await testEndpoint('POST /api/game/reply - Reply to Question', async () => {
    const response = await axios.post(`${API_BASE_URL}/reply`, {
      gameId: gameId,
      questionIndex: questionIndex,
      answer: 'Yes'
    });
    
    if (response.data.question.answer !== 'Yes') {
      throw new Error('Answer not set correctly');
    }
    
    console.log(`   Answer: ${response.data.question.answer}`);
  });

  // Test 6: Get Updated Game Status
  await testEndpoint('GET /api/game/status/:gameId - Get Updated Status', async () => {
    const response = await axios.get(`${API_BASE_URL}/status/${gameId}`);
    
    if (!response.data.questionHistory || response.data.questionHistory.length === 0) {
      throw new Error('Question history is empty');
    }
    
    if (response.data.questionHistory[0].answer !== 'Yes') {
      throw new Error('Answer not persisted correctly');
    }
    
    console.log(`   Questions in history: ${response.data.questionHistory.length}`);
    console.log(`   Last answer: ${response.data.questionHistory[0].answer}`);
  });

  // Summary
  console.log('\n📊 Test Results:');
  console.log(`✅ Passed: ${testsPassed}`);
  console.log(`❌ Failed: ${testsFailed}`);
  console.log(`\n${testsFailed === 0 ? '✅' : '❌'} All API tests ${testsFailed === 0 ? 'PASSED' : 'FAILED'}!`);
  
  process.exit(testsFailed > 0 ? 1 : 0);
}

// Run tests
runTests().catch((error) => {
  console.error('\n❌ Test suite error:', error.message);
  process.exit(1);
});
