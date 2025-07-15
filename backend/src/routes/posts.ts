import { Router } from 'express';
import { body, query, param } from 'express-validator';
import { 
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  getUserPosts,
  resolveHelpPost,
  searchPosts
} from '../controllers/postController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Validation rules
const createPostValidation = [
  body('type')
    .isIn(['sell', 'help', 'work'])
    .withMessage('Post type must be sell, help, or work'),
  body('title')
    .optional()
    .isLength({ min: 5, max: 100 })
    .withMessage('Title must be between 5 and 100 characters')
    .trim(),
  body('description')
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters')
    .trim(),
  body('price')
    .optional()
    .isNumeric()
    .withMessage('Price must be a number'),
  body('location')
    .optional()
    .isLength({ min: 2, max: 100 })
    .withMessage('Location must be between 2 and 100 characters')
    .trim(),
  body('contactMethod')
    .optional()
    .isIn(['chat', 'phone', 'email'])
    .withMessage('Contact method must be chat, phone, or email'),
  body('images')
    .optional()
    .isArray({ max: 4 })
    .withMessage('Maximum 4 images allowed'),
  body('urgency')
    .optional()
    .isIn(['now', 'today', 'week'])
    .withMessage('Urgency must be now, today, or week'),
  body('budget')
    .optional()
    .isNumeric()
    .withMessage('Budget must be a number'),
  body('isRent')
    .optional()
    .isBoolean()
    .withMessage('isRent must be a boolean')
];

const updatePostValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid post ID'),
  body('title')
    .optional()
    .isLength({ min: 5, max: 100 })
    .withMessage('Title must be between 5 and 100 characters')
    .trim(),
  body('description')
    .optional()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters')
    .trim(),
  body('price')
    .optional()
    .isNumeric()
    .withMessage('Price must be a number'),
  body('location')
    .optional()
    .isLength({ min: 2, max: 100 })
    .withMessage('Location must be between 2 and 100 characters')
    .trim()
];

const getPostsValidation = [
  query('type')
    .optional()
    .isIn(['sell', 'help', 'work'])
    .withMessage('Type must be sell, help, or work'),
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit must be between 1 and 50')
];

const searchValidation = [
  query('q')
    .isLength({ min: 2, max: 100 })
    .withMessage('Search query must be between 2 and 100 characters')
    .trim(),
  query('type')
    .optional()
    .isIn(['sell', 'help', 'work'])
    .withMessage('Type must be sell, help, or work'),
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit must be between 1 and 50'),
  query('minPrice')
    .optional()
    .isNumeric()
    .withMessage('Min price must be a number'),
  query('maxPrice')
    .optional()
    .isNumeric()
    .withMessage('Max price must be a number')
];

// Public routes
router.get('/', getPostsValidation, getPosts);
router.get('/search', searchValidation, searchPosts);
router.get('/user/:userId', param('userId').isMongoId().withMessage('Invalid user ID'), getUserPosts);
router.get('/:id', param('id').isMongoId().withMessage('Invalid post ID'), getPostById);

// Protected routes (require authentication)
router.post('/', authenticateToken, createPostValidation, createPost);
router.put('/:id', authenticateToken, updatePostValidation, updatePost);
router.delete('/:id', authenticateToken, param('id').isMongoId().withMessage('Invalid post ID'), deletePost);
router.put('/:id/resolve', authenticateToken, param('id').isMongoId().withMessage('Invalid post ID'), resolveHelpPost);

export default router; 