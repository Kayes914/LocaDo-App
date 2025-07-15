import { Request, Response, NextFunction } from 'express';
import { body, param, query, validationResult } from 'express-validator';
import { HTTP_STATUS, MESSAGES, POST_CATEGORIES, EXPERT_PROFESSIONS } from '../utils/constants';

// Handle validation results
export const handleValidationErrors = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({
      success: false,
      message: MESSAGES.VALIDATION_ERROR,
      errors: errors.array()
    });
    return;
  }
  
  next();
};

// User validation rules
export const validateUserRegistration = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  
  body('phone')
    .trim()
    .isMobilePhone('any')
    .withMessage('Please provide a valid phone number'),
  
  body('location')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Location must be between 2 and 100 characters'),
  
  handleValidationErrors
];

export const validateUserLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  
  handleValidationErrors
];

export const validateUserProfileUpdate = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  
  body('phone')
    .optional()
    .trim()
    .isMobilePhone('any')
    .withMessage('Please provide a valid phone number'),
  
  body('location')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Location must be between 2 and 100 characters'),
  
  body('avatar')
    .optional()
    .isURL()
    .withMessage('Avatar must be a valid URL'),
  
  handleValidationErrors
];

// Post validation rules
export const validatePostCreation = [
  body('title')
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage('Title must be between 5 and 100 characters'),
  
  body('description')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Description must be between 10 and 2000 characters'),
  
  body('type')
    .isIn(['sell', 'rent', 'service', 'help', 'work'])
    .withMessage('Type must be one of: sell, rent, service, help, work'),
  
  body('category')
    .trim()
    .notEmpty()
    .withMessage('Category is required'),
  
  body('location')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Location must be between 2 and 100 characters'),
  
  body('price')
    .optional()
    .trim()
    .matches(/^\d+(\.\d{1,2})?$/)
    .withMessage('Price must be a valid number'),
  
  body('budget')
    .optional()
    .trim()
    .matches(/^\d+(\.\d{1,2})?$/)
    .withMessage('Budget must be a valid number'),
  
  body('urgency')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Urgency must be low, medium, or high'),
  
  body('condition')
    .optional()
    .isIn(['new', 'like-new', 'good', 'fair', 'poor'])
    .withMessage('Condition must be one of: new, like-new, good, fair, poor'),
  
  body('images')
    .optional()
    .isArray({ max: 4 })
    .withMessage('Maximum 4 images allowed'),
  
  body('images.*')
    .optional()
    .isURL()
    .withMessage('Each image must be a valid URL'),
  
  handleValidationErrors
];

export const validatePostUpdate = [
  param('id')
    .isMongoId()
    .withMessage('Invalid post ID'),
  
  body('title')
    .optional()
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage('Title must be between 5 and 100 characters'),
  
  body('description')
    .optional()
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Description must be between 10 and 2000 characters'),
  
  body('price')
    .optional()
    .trim()
    .matches(/^\d+(\.\d{1,2})?$/)
    .withMessage('Price must be a valid number'),
  
  body('urgency')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Urgency must be low, medium, or high'),
  
  handleValidationErrors
];

// Expert validation rules
export const validateExpertRegistration = [
  body('profession')
    .isIn(EXPERT_PROFESSIONS)
    .withMessage(`Profession must be one of: ${EXPERT_PROFESSIONS.join(', ')}`),
  
  body('experience')
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Experience must be between 10 and 500 characters'),
  
  body('area')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Service area must be between 2 and 100 characters'),
  
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description cannot exceed 1000 characters'),
  
  body('skills')
    .optional()
    .isArray({ max: 10 })
    .withMessage('Maximum 10 skills allowed'),
  
  body('hourlyRate')
    .optional()
    .isNumeric()
    .withMessage('Hourly rate must be a number'),
  
  handleValidationErrors
];

// Chat validation rules
export const validateChatCreation = [
  body('otherUserId')
    .isMongoId()
    .withMessage('Invalid user ID'),
  
  body('relatedPostId')
    .optional()
    .isMongoId()
    .withMessage('Invalid post ID'),
  
  handleValidationErrors
];

export const validateMessageSend = [
  param('chatId')
    .isMongoId()
    .withMessage('Invalid chat ID'),
  
  body('text')
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Message must be between 1 and 1000 characters'),
  
  body('messageType')
    .optional()
    .isIn(['text', 'image', 'system'])
    .withMessage('Message type must be text, image, or system'),
  
  body('imageUrl')
    .optional()
    .isURL()
    .withMessage('Image URL must be valid'),
  
  handleValidationErrors
];

// Query parameter validation
export const validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  
  handleValidationErrors
];

export const validateSearch = [
  query('q')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Search query must be between 2 and 100 characters'),
  
  query('category')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Category cannot be empty'),
  
  query('location')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Location must be between 2 and 100 characters'),
  
  query('type')
    .optional()
    .isIn(['sell', 'rent', 'service', 'help', 'work'])
    .withMessage('Type must be one of: sell, rent, service, help, work'),
  
  handleValidationErrors
];

// MongoDB ID validation
export const validateMongoId = (paramName: string = 'id') => [
  param(paramName)
    .isMongoId()
    .withMessage(`Invalid ${paramName}`),
  
  handleValidationErrors
]; 