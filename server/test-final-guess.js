// Quick test for final guess endpoint
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000/api/game';

async function testFinalGuess() {
  try {
    // Create a game
    const startRes = await axios.post(`${API_BASE_URL}/start`, {
      secretWord: 'Spiderman'
    });
    const gameId = startRes.data.gameId;
    console.log('✅ Game created:', gameId);

    // Test wrong guess
    console.log('\n📝 Testing wrong guess...');
    const wrongGuessRes = await axios.post(`${API_BASE_URL}/final-guess`, {
      gameId,
      guess: 'Batman'
    });
    console.log('Wrong guess result:', wrongGuessRes.data);

    // Test correct guess
    console.log('\n📝 Testing correct guess...');
    const correctGuessRes = await axios.post(`${API_BASE_URL}/final-guess`, {
      gameId,
      guess: 'Spiderman'
    });
    console.log('✅ Correct guess result:', correctGuessRes.data);

    // Check game status
    const statusRes = await axios.get(`${API_BASE_URL}/status/${gameId}`);
    console.log('\n✅ Game status:', statusRes.data.status);
    console.log('✅ Secret word revealed:', statusRes.data.secretWord);

    console.log('\n✅ All tests passed!');
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
    process.exit(1);
  }
}

testFinalGuess();
