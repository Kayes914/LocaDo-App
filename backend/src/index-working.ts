import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// Load environment variables
dotenv.config();

const app = express();
const port = parseInt(process.env.PORT || '3000');

console.log('🚀 Starting working server...');

// Basic middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend-domain.com'] 
    : ['http://localhost:8081', 'http://localhost:19006', 'exp://192.168.1.100:8081'],
  credentials: true
}));

// Request parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Basic auth routes (without complex middleware)
app.post('/api/auth/register', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Register endpoint working',
    data: { id: 1, email: req.body.email } 
  });
});

app.post('/api/auth/login', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Login endpoint working',
    data: { 
      token: 'fake-jwt-token',
      user: { id: 1, email: req.body.email }
    }
  });
});

// Basic posts routes
app.get('/api/posts', (req, res) => {
  res.json({
    success: true,
    message: 'Posts endpoint working',
    data: [
      { id: 1, title: 'Test Post', type: 'sell', price: '100' }
    ]
  });
});

app.post('/api/posts', (req, res) => {
  res.json({
    success: true,
    message: 'Post created successfully',
    data: { id: 2, ...req.body }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Locado Backend API is running! 🎉',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl
  });
});

// Start server
app.listen(port, () => {
  console.log('\n🎉 SUCCESS! Working Locado Backend API running!');
  console.log(`🚀 Server: http://localhost:${port}`);
  console.log(`🩺 Health: http://localhost:${port}/health`);
  console.log('✅ Ready for frontend integration!\n');
}); 