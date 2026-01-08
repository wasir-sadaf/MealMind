// Quick test to verify server can start
import http from 'http';

const PORT = 5000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Server is running!\n');
});

server.listen(PORT, () => {
  console.log(`✅ Test server running on port ${PORT}`);
  console.log('✅ Server can start successfully');
  
  // Close after 2 seconds
  setTimeout(() => {
    server.close();
    console.log('✅ Test completed - server can start');
    process.exit(0);
  }, 2000);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`⚠️  Port ${PORT} is already in use - another server might be running`);
  } else {
    console.error('❌ Server error:', err);
  }
  process.exit(1);
});
