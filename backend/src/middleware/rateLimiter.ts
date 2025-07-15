import rateLimit from 'express-rate-limit';
import { RATE_LIMITS, HTTP_STATUS, MESSAGES } from '../utils/constants';

// General rate limiter for most endpoints
export const generalLimiter = rateLimit({
  windowMs: RATE_LIMITS.GENERAL.windowMs,
  max: RATE_LIMITS.GENERAL.max,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.',
    error: 'Rate limit exceeded'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Strict rate limiter for authentication endpoints
export const authLimiter = rateLimit({
  windowMs: RATE_LIMITS.AUTH.windowMs,
  max: RATE_LIMITS.AUTH.max,
  message: {
    success: false,
    message: 'Too many authentication attempts, please try again later.',
    error: 'Authentication rate limit exceeded'
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // Don't count successful requests
});

// Upload rate limiter for file uploads
export const uploadLimiter = rateLimit({
  windowMs: RATE_LIMITS.UPLOAD.windowMs,
  max: RATE_LIMITS.UPLOAD.max,
  message: {
    success: false,
    message: 'Too many upload attempts, please try again later.',
    error: 'Upload rate limit exceeded'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Chat rate limiter for message sending
export const chatLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60, // 60 messages per minute
  message: {
    success: false,
    message: 'Too many messages sent, please slow down.',
    error: 'Chat rate limit exceeded'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Post creation rate limiter
export const postLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // 10 posts per hour
  message: {
    success: false,
    message: 'Too many posts created, please try again later.',
    error: 'Post creation rate limit exceeded'
  },
  standardHeaders: true,
  legacyHeaders: false,
}); 