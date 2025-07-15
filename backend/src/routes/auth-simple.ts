import { Router } from 'express';
import { register, login, getProfile } from '../controllers/authController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Simple routes without complex validation
router.post('/register', register);
router.post('/login', login);
router.get('/me', authenticateToken, getProfile);

export default router; 