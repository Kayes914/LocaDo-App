import mongoose, { Document, Schema } from 'mongoose';

export interface IImage extends Document {
  url: string;
  publicId: string;
  cloudinaryId: string;
  originalName: string;
  mimeType: string;
  size: number;
  width?: number;
  height?: number;
  uploadedBy: mongoose.Types.ObjectId;
  relatedPost?: mongoose.Types.ObjectId;
  relatedChat?: mongoose.Types.ObjectId;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const imageSchema = new Schema<IImage>({
  url: {
    type: String,
    required: [true, 'Image URL is required'],
    validate: {
      validator: function(v: string) {
        return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(v);
      },
      message: 'Invalid image URL format'
    }
  },
  publicId: {
    type: String,
    required: [true, 'Cloudinary public ID is required'],
    unique: true
  },
  cloudinaryId: {
    type: String,
    required: [true, 'Cloudinary ID is required']
  },
  originalName: {
    type: String,
    required: [true, 'Original filename is required'],
    trim: true
  },
  mimeType: {
    type: String,
    required: [true, 'MIME type is required'],
    enum: {
      values: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
      message: 'Only JPEG, PNG, GIF, and WebP images are allowed'
    }
  },
  size: {
    type: Number,
    required: [true, 'File size is required'],
    max: [10485760, 'File size cannot exceed 10MB'] // 10MB limit
  },
  width: {
    type: Number,
    min: [1, 'Width must be positive']
  },
  height: {
    type: Number,
    min: [1, 'Height must be positive']
  },
  uploadedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Uploader is required']
  },
  relatedPost: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  },
  relatedChat: {
    type: Schema.Types.ObjectId,
    ref: 'Chat'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes for better query performance
imageSchema.index({ publicId: 1 });
imageSchema.index({ uploadedBy: 1 });
imageSchema.index({ relatedPost: 1 });
imageSchema.index({ relatedChat: 1 });
imageSchema.index({ createdAt: -1 });

// Virtual for file size in human readable format
imageSchema.virtual('sizeFormatted').get(function() {
  const size = this.size;
  if (size < 1024) {
    return `${size} B`;
  } else if (size < 1048576) {
    return `${(size / 1024).toFixed(1)} KB`;
  } else {
    return `${(size / 1048576).toFixed(1)} MB`;
  }
});

// Virtual for image dimensions
imageSchema.virtual('dimensions').get(function() {
  if (this.width && this.height) {
    return `${this.width} x ${this.height}`;
  }
  return 'Unknown';
});

// Ensure virtuals are included in JSON
imageSchema.set('toJSON', { virtuals: true });

export const Image = mongoose.model<IImage>('Image', imageSchema); 