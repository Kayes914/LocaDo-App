const express = require('express');
const app = express();

// Basic middleware
app.use(express.json());

// Test route
app.get('/test', (req, res) => {
  res.json({ message: 'Test route working!' });
});

console.log('Testing basic Express server...');

app.listen(3001, () => {
  console.log('✅ Basic server running on port 3001');
}); 