import { Router } from 'express';
import { createPost, getPosts } from '../controllers/postController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Simple routes without complex validation
router.get('/', getPosts);
router.post('/', createPost); // TEMPORARILY REMOVED AUTH for testing

export default router; 