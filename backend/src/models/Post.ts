import mongoose, { Document, Schema } from 'mongoose';

export interface IPost extends Document {
  title: string;
  description: string;
  type: 'sell' | 'rent' | 'service' | 'help' | 'work';
  category: string;
  price?: string;
  budget?: string;
  location: string;
  images: string[];
  features?: string[];
  condition?: string;
  urgency?: 'low' | 'medium' | 'high';
  requirements?: string[];
  isResolved?: boolean;
  isActive: boolean;
  author: mongoose.Types.ObjectId;
  contact: {
    phone?: string;
    email?: string;
    name?: string;
  };
  views: number;
  savedBy: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new Schema<IPost>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  type: {
    type: String,
    required: [true, 'Post type is required'],
    enum: {
      values: ['sell', 'rent', 'service', 'help', 'work'],
      message: 'Type must be one of: sell, rent, service, help, work'
    }
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true
  },
  price: {
    type: String,
    trim: true
  },
  budget: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  images: [{
    type: String,
    validate: {
      validator: function(v: string) {
        return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(v);
      },
      message: 'Invalid image URL format'
    }
  }],
  features: [String],
  condition: {
    type: String,
    enum: ['new', 'like-new', 'good', 'fair', 'poor'],
    trim: true
  },
  urgency: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  requirements: [String],
  isResolved: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Author is required']
  },
  contact: {
    phone: String,
    email: String,
    name: String
  },
  views: {
    type: Number,
    default: 0
  },
  savedBy: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

// Indexes for better query performance
postSchema.index({ type: 1, category: 1 });
postSchema.index({ location: 1 });
postSchema.index({ author: 1 });
postSchema.index({ createdAt: -1 });
postSchema.index({ isActive: 1, isResolved: 1 });
postSchema.index({ title: 'text', description: 'text' }); // For text search

// Virtual for formatted date
postSchema.virtual('postedDate').get(function() {
  return this.createdAt.toISOString().split('T')[0];
});

// Virtual for time ago
postSchema.virtual('timeAgo').get(function() {
  const now = new Date();
  const diffMs = now.getTime() - this.createdAt.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);
  
  if (diffDays > 0) {
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  } else if (diffHours > 0) {
    return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  } else {
    return 'Less than an hour ago';
  }
});

// Ensure virtuals are included in JSON
postSchema.set('toJSON', { virtuals: true });

export const Post = mongoose.model<IPost>('Post', postSchema); 