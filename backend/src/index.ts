import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

// Import database connection
import connectDB from './utils/database';

// Import routes
import authRoutes from './routes/auth-simple';
import postRoutes from './routes/posts-simple';

// Load environment variables
dotenv.config();

const app = express();
const port = parseInt(process.env.PORT || '3002');

console.log('🚀 Starting server with database connection...');

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend-domain.com'] 
    : ['http://localhost:8081', 'http://localhost:19006', 'exp://192.168.0.167:8081', 'http://192.168.0.167:8081'],
  credentials: true
}));

// Request parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use(morgan('combined'));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Locado Backend API is running! 🎉',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    database: 'Connected to MongoDB'
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

// Global error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Global error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

console.log('✅ Routes configured');

// Start server with database connection
async function startServer() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await connectDB();
    console.log('✅ Database connected successfully');
    
    app.listen(port, () => {
      console.log('\n🎉 SUCCESS! Locado Backend API running!');
      console.log(`🚀 Server: http://localhost:${port}`);
      console.log(`🩺 Health: http://localhost:${port}/health`);
      console.log('✅ Database connected and ready!\n');
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer(); 