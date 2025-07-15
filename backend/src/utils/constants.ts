// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503
} as const;

// API Response Messages
export const MESSAGES = {
  // Auth
  LOGIN_SUCCESS: 'Login successful',
  LOGOUT_SUCCESS: 'Logout successful',
  REGISTER_SUCCESS: 'Registration successful',
  PROFILE_UPDATED: 'Profile updated successfully',
  INVALID_CREDENTIALS: 'Invalid email or password',
  USER_EXISTS: 'User already exists with this email',
  TOKEN_INVALID: 'Invalid or expired token',
  ACCESS_DENIED: 'Access denied',
  
  // Posts
  POST_CREATED: 'Post created successfully',
  POST_UPDATED: 'Post updated successfully',
  POST_DELETED: 'Post deleted successfully',
  POST_NOT_FOUND: 'Post not found',
  POSTS_FETCHED: 'Posts fetched successfully',
  
  // Chat
  CHAT_CREATED: 'Chat created successfully',
  MESSAGE_SENT: 'Message sent successfully',
  MESSAGES_FETCHED: 'Messages fetched successfully',
  CHAT_NOT_FOUND: 'Chat not found',
  
  // Experts
  EXPERT_REGISTERED: 'Expert profile created successfully',
  EXPERT_UPDATED: 'Expert profile updated successfully',
  EXPERTS_FETCHED: 'Experts fetched successfully',
  
  // Upload
  IMAGE_UPLOADED: 'Image uploaded successfully',
  IMAGE_DELETED: 'Image deleted successfully',
  INVALID_FILE_TYPE: 'Only image files are allowed',
  FILE_TOO_LARGE: 'File size exceeds limit',
  
  // General
  SERVER_ERROR: 'Internal server error',
  VALIDATION_ERROR: 'Validation error',
  NOT_FOUND: 'Resource not found'
} as const;

// Post Categories
export const POST_CATEGORIES = {
  SELL: [
    'Electronics',
    'Furniture',
    'Clothing',
    'Books',
    'Appliances',
    'Sports',
    'Automotive',
    'Tools',
    'Garden',
    'Toys',
    'Other'
  ],
  HELP: [
    'Moving',
    'Cleaning',
    'Pet Care',
    'Babysitting',
    'Elderly Care',
    'Food Delivery',
    'Shopping',
    'Transportation',
    'Technology Help',
    'Other'
  ],
  WORK: [
    'Freelance',
    'Part-time',
    'Contract',
    'Consulting',
    'Creative',
    'Technical',
    'Manual Labor',
    'Administrative',
    'Sales',
    'Other'
  ]
} as const;

// Expert Professions
export const EXPERT_PROFESSIONS = [
  'Plumber',
  'Electrician',
  'Handyman',
  'Tutor',
  'Cleaner',
  'Gardener',
  'Mechanic',
  'Painter',
  'Carpenter',
  'IT Support',
  'Personal Trainer',
  'Photographer',
  'Chef/Cook',
  'Pet Groomer',
  'Hair Stylist',
  'Massage Therapist',
  'Other'
] as const;

// File Upload Limits
export const UPLOAD_LIMITS = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  MAX_FILES_PER_POST: 4,
  ALLOWED_MIME_TYPES: [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp'
  ],
  ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.gif', '.webp']
} as const;

// Rate Limiting
export const RATE_LIMITS = {
  AUTH: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5 // 5 attempts per window
  },
  GENERAL: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // 100 requests per window
  },
  UPLOAD: {
    windowMs: 60 * 1000, // 1 minute
    max: 10 // 10 uploads per minute
  }
} as const;

// JWT Configuration
export const JWT_CONFIG = {
  ACCESS_TOKEN_EXPIRY: '7d',
  REFRESH_TOKEN_EXPIRY: '30d'
} as const;

// Socket.io Events
export const SOCKET_EVENTS = {
  // Client to Server
  JOIN_CHAT: 'join_chat',
  LEAVE_CHAT: 'leave_chat',
  SEND_MESSAGE: 'send_message',
  TYPING_START: 'typing_start',
  TYPING_STOP: 'typing_stop',
  
  // Server to Client
  NEW_MESSAGE: 'new_message',
  MESSAGE_READ: 'message_read',
  USER_TYPING: 'user_typing',
  USER_ONLINE: 'user_online',
  USER_OFFLINE: 'user_offline',
  ERROR: 'error'
} as const;

// Pagination Defaults
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100
} as const; 