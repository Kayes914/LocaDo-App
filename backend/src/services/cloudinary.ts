import { v2 as cloudinary } from 'cloudinary';
import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import logger from '../utils/logger';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface CloudinaryUploadResult {
  success: boolean;
  data?: {
    url: string;
    publicId: string;
    width: number;
    height: number;
    format: string;
    bytes: number;
  };
  error?: string;
}

interface CloudinaryDeleteResult {
  success: boolean;
  error?: string;
}

class CloudinaryService {
  // Upload image from buffer
  async uploadImage(
    buffer: Buffer,
    fileName: string,
    folder: string = 'locado'
  ): Promise<CloudinaryUploadResult> {
    try {
      return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            folder,
            public_id: `${folder}/${Date.now()}_${fileName}`,
            transformation: [
              { width: 1200, height: 1200, crop: 'limit' },
              { quality: 'auto:good' },
              { format: 'webp' }
            ]
          },
          (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
            if (error) {
              logger.error('Cloudinary upload error', error);
              resolve({
                success: false,
                error: error.message
              });
            } else if (result) {
              logger.info('Image uploaded to Cloudinary', {
                publicId: result.public_id,
                url: result.secure_url
              });
              
              resolve({
                success: true,
                data: {
                  url: result.secure_url,
                  publicId: result.public_id,
                  width: result.width,
                  height: result.height,
                  format: result.format,
                  bytes: result.bytes
                }
              });
            } else {
              resolve({
                success: false,
                error: 'Unknown upload error'
              });
            }
          }
        ).end(buffer);
      });
    } catch (error) {
      logger.error('Cloudinary service error', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Upload failed'
      };
    }
  }

  // Upload multiple images
  async uploadMultipleImages(
    files: { buffer: Buffer; originalname: string }[],
    folder: string = 'locado'
  ): Promise<CloudinaryUploadResult[]> {
    const uploadPromises = files.map(file => 
      this.uploadImage(file.buffer, file.originalname, folder)
    );
    
    return Promise.all(uploadPromises);
  }

  // Delete image by public ID
  async deleteImage(publicId: string): Promise<CloudinaryDeleteResult> {
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      
      if (result.result === 'ok') {
        logger.info('Image deleted from Cloudinary', { publicId });
        return { success: true };
      } else {
        logger.warn('Image deletion failed', { publicId, result });
        return {
          success: false,
          error: `Deletion failed: ${result.result}`
        };
      }
    } catch (error) {
      logger.error('Cloudinary delete error', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Delete failed'
      };
    }
  }

  // Delete multiple images
  async deleteMultipleImages(publicIds: string[]): Promise<CloudinaryDeleteResult[]> {
    const deletePromises = publicIds.map(publicId => this.deleteImage(publicId));
    return Promise.all(deletePromises);
  }

  // Generate optimized URL with transformations
  generateOptimizedUrl(publicId: string, options?: {
    width?: number;
    height?: number;
    quality?: string;
    format?: string;
  }): string {
    const { width = 800, height = 600, quality = 'auto:good', format = 'webp' } = options || {};
    
    return cloudinary.url(publicId, {
      width,
      height,
      crop: 'fill',
      quality,
      format
    });
  }

  // Generate thumbnail URL
  generateThumbnail(publicId: string): string {
    return cloudinary.url(publicId, {
      width: 200,
      height: 200,
      crop: 'fill',
      quality: 'auto:low',
      format: 'webp'
    });
  }

  // Check if Cloudinary is properly configured
  isConfigured(): boolean {
    return !!(
      process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
    );
  }

  // Get image details
  async getImageDetails(publicId: string) {
    try {
      const result = await cloudinary.api.resource(publicId);
      return {
        success: true,
        data: {
          publicId: result.public_id,
          url: result.secure_url,
          width: result.width,
          height: result.height,
          format: result.format,
          bytes: result.bytes,
          createdAt: result.created_at
        }
      };
    } catch (error) {
      logger.error('Failed to get image details', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get image details'
      };
    }
  }
}

export default new CloudinaryService(); 