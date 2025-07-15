import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/User';
import { HTTP_STATUS, MESSAGES } from '../utils/constants';
import logger from '../utils/logger';

// Extend Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

interface JWTPayload {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: MESSAGES.ACCESS_DENIED,
        error: 'No token provided'
      });
      return;
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      logger.error('JWT_SECRET not found in environment variables');
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: MESSAGES.SERVER_ERROR
      });
      return;
    }

    // Verify token
    const decoded = jwt.verify(token, jwtSecret) as JWTPayload;
    
    // Find user in database
    const user = await User.findById(decoded.userId).select('-password');
    if (!user || !user.isActive) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: MESSAGES.TOKEN_INVALID,
        error: 'User not found or inactive'
      });
      return;
    }

    // Update last seen
    user.lastSeen = new Date();
    await user.save();

    // Attach user to request
    req.user = user;
    next();

  } catch (error) {
    logger.error('Authentication error', error);
    
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: MESSAGES.TOKEN_INVALID,
        error: 'Invalid token'
      });
    } else if (error instanceof jwt.TokenExpiredError) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: MESSAGES.TOKEN_INVALID,
        error: 'Token expired'
      });
    } else {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: MESSAGES.SERVER_ERROR
      });
    }
  }
};

// Optional authentication (for routes that work with or without auth)
export const optionalAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return next(); // Continue without user
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return next(); // Continue without user
    }

    const decoded = jwt.verify(token, jwtSecret) as JWTPayload;
    const user = await User.findById(decoded.userId).select('-password');
    
    if (user && user.isActive) {
      user.lastSeen = new Date();
      await user.save();
      req.user = user;
    }

    next();
  } catch (error) {
    // Silently continue without user if token is invalid
    next();
  }
};

// Check if user owns the resource
export const checkOwnership = (resourceField: string = 'author') => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: MESSAGES.ACCESS_DENIED
      });
      return;
    }

    // The ownership check will be done in the controller where we have access to the resource
    // This middleware just ensures user is authenticated
    next();
  };
};

// Admin only middleware (for future admin features)
export const adminOnly = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.user) {
    res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: MESSAGES.ACCESS_DENIED
    });
    return;
  }

  // For now, we don't have admin field in User model
  // This can be extended later when admin features are needed
  next();
}; 