import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

console.log('🚀 Starting minimal test server...');

app.get('/', (req, res) => {
  res.json({ message: 'Minimal server working!' });
});

app.listen(port, () => {
  console.log(`✅ Minimal server running on port ${port}`);
}); 