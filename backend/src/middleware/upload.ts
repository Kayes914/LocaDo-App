import multer from 'multer';
import { Request, Response, NextFunction } from 'express';
import { UPLOAD_LIMITS, HTTP_STATUS, MESSAGES } from '../utils/constants';
import logger from '../utils/logger';

// Configure multer for memory storage (files will be stored in memory temporarily)
const storage = multer.memoryStorage();

// File filter function
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
): void => {
  // Check MIME type
  if (UPLOAD_LIMITS.ALLOWED_MIME_TYPES.includes(file.mimetype as any)) {
    cb(null, true);
  } else {
    cb(new Error(MESSAGES.INVALID_FILE_TYPE));
  }
};

// Configure multer
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: UPLOAD_LIMITS.MAX_FILE_SIZE,
    files: UPLOAD_LIMITS.MAX_FILES_PER_POST
  }
});

// Single file upload middleware
export const uploadSingle = upload.single('image');

// Multiple files upload middleware
export const uploadMultiple = upload.array('images', UPLOAD_LIMITS.MAX_FILES_PER_POST);

// Handle multer errors
export const handleUploadErrors = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (error instanceof multer.MulterError) {
    logger.error('Multer upload error', error);
    
    switch (error.code) {
      case 'LIMIT_FILE_SIZE':
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: MESSAGES.FILE_TOO_LARGE,
          error: `File size cannot exceed ${UPLOAD_LIMITS.MAX_FILE_SIZE / (1024 * 1024)}MB`
        });
        return;
        
      case 'LIMIT_FILE_COUNT':
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: 'Too many files',
          error: `Maximum ${UPLOAD_LIMITS.MAX_FILES_PER_POST} files allowed`
        });
        return;
        
      case 'LIMIT_UNEXPECTED_FILE':
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: 'Unexpected file field',
          error: 'File field name does not match expected field'
        });
        return;
        
      default:
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: 'File upload error',
          error: error.message
        });
        return;
    }
  } else if (error) {
    logger.error('Upload error', error);
    
    if (error.message === MESSAGES.INVALID_FILE_TYPE) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: MESSAGES.INVALID_FILE_TYPE,
        error: `Allowed file types: ${UPLOAD_LIMITS.ALLOWED_MIME_TYPES.join(', ')}`
      });
      return;
    }
    
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: MESSAGES.SERVER_ERROR,
      error: 'Upload processing failed'
    });
    return;
  }
  
  next();
};

// Validate uploaded files
export const validateUploadedFiles = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const files = req.files as Express.Multer.File[];
  const file = req.file as Express.Multer.File;
  
  // Check if any files were uploaded
  if (!files && !file) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: 'No files uploaded',
      error: 'At least one file is required'
    });
    return;
  }
  
  const filesToCheck = files || (file ? [file] : []);
  
  // Additional validation
  for (const uploadedFile of filesToCheck) {
    // Check file extension
    const fileExtension = uploadedFile.originalname.toLowerCase().match(/\.[^.]+$/)?.[0];
    if (!fileExtension || !UPLOAD_LIMITS.ALLOWED_EXTENSIONS.includes(fileExtension as any)) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: MESSAGES.INVALID_FILE_TYPE,
        error: `File extension not allowed: ${fileExtension}. Allowed: ${UPLOAD_LIMITS.ALLOWED_EXTENSIONS.join(', ')}`
      });
      return;
    }
    
    // Check if file has content
    if (uploadedFile.size === 0) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: 'Empty file',
        error: `File ${uploadedFile.originalname} is empty`
      });
      return;
    }
  }
  
  next();
}; 