import { Request, Response } from 'express';
import { Post } from '../models/Post';
import { User } from '../models/User';
import { validationResult } from 'express-validator';

interface AuthRequest extends Request {
  userId?: string;
}

// Create new post
export const createPost = async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { type, title, description, price, location, contactMethod, images, urgency, date, time, budget, isRent } = req.body;

    // Validate post type
    if (!['sell', 'help', 'work'].includes(type)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid post type. Must be sell, help, or work'
      });
    }

    // Get user info
    const user = await User.findById(req.userId).select('name avatar location');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Create post data based on type
    let postData: any = {
      type,
      author: req.userId,
      location: location || user.location,
      contactMethod: contactMethod || 'chat',
      createdAt: new Date(),
      isActive: true
    };

    switch (type) {
      case 'sell':
        if (!title || !description || !price) {
          return res.status(400).json({
            success: false,
            message: 'Title, description, and price are required for sell posts'
          });
        }
        postData = {
          ...postData,
          title,
          description,
          price: parseFloat(price),
          isRent: isRent || false,
          images: images || [],
          category: 'general', // You can add category logic later
          condition: 'good' // Default condition
        };
        break;

      case 'help':
        if (!description) {
          return res.status(400).json({
            success: false,
            message: 'Description is required for help posts'
          });
        }
        postData = {
          ...postData,
          title: description.substring(0, 50) + (description.length > 50 ? '...' : ''),
          description,
          urgency: urgency || 'today',
          isResolved: false,
          images: images ? [images] : []
        };
        break;

      case 'work':
        if (!title || !description) {
          return res.status(400).json({
            success: false,
            message: 'Title and description are required for work posts'
          });
        }
        postData = {
          ...postData,
          title,
          description,
          budget: budget ? parseFloat(budget) : null,
          date: date || null,
          time: time || null,
          requirements: [], // Can be added later
          category: 'general'
        };
        break;
    }

    // Create and save post
    const post = new Post(postData);
    await post.save();

    // Populate author info for response
    await post.populate('author', 'name avatar location');

    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      data: { post }
    });

  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating post'
    });
  }
};

// Get all posts (home feed)
export const getPosts = async (req: Request, res: Response) => {
  try {
    const { type, category, location, search, page = 1, limit = 20 } = req.query;

    // Build filter query
    const filter: any = { isActive: true };
    
    if (type && ['sell', 'help', 'work'].includes(type as string)) {
      filter.type = type;
    }
    
    if (category) {
      filter.category = category;
    }
    
    if (location) {
      filter.location = { $regex: location, $options: 'i' };
    }
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Calculate pagination
    const skip = (Number(page) - 1) * Number(limit);

    // Get posts with author info
    const posts = await Post.find(filter)
      .populate('author', 'name avatar location isExpert')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    // Get total count for pagination
    const total = await Post.countDocuments(filter);

    res.json({
      success: true,
      data: {
        posts,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / Number(limit))
        }
      }
    });

  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching posts'
    });
  }
};

// Get specific post by ID
export const getPostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id)
      .populate('author', 'name avatar location phone email isExpert');

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    res.json({
      success: true,
      data: { post }
    });

  } catch (error) {
    console.error('Get post by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching post'
    });
  }
};

// Update post
export const updatePost = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Find post and check ownership
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    if (post.author.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this post'
      });
    }

    // Update post
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { ...updates, updatedAt: new Date() },
      { new: true, runValidators: true }
    ).populate('author', 'name avatar location');

    res.json({
      success: true,
      message: 'Post updated successfully',
      data: { post: updatedPost }
    });

  } catch (error) {
    console.error('Update post error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating post'
    });
  }
};

// Delete post
export const deletePost = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    if (post.author.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this post'
      });
    }

    await Post.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Post deleted successfully'
    });

  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting post'
    });
  }
};

// Get user's posts
export const getUserPosts = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 20 } = req.query;

    const skip = (Number(page) - 1) * Number(limit);

    const posts = await Post.find({ author: userId, isActive: true })
      .populate('author', 'name avatar location')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Post.countDocuments({ author: userId, isActive: true });

    res.json({
      success: true,
      data: {
        posts,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / Number(limit))
        }
      }
    });

  } catch (error) {
    console.error('Get user posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching user posts'
    });
  }
};

// Mark help post as resolved
export const resolveHelpPost = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    if (post.type !== 'help') {
      return res.status(400).json({
        success: false,
        message: 'Only help posts can be marked as resolved'
      });
    }

    if (post.author.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to resolve this post'
      });
    }

    post.isResolved = true;
    await post.save();

    res.json({
      success: true,
      message: 'Help post marked as resolved',
      data: { post }
    });

  } catch (error) {
    console.error('Resolve help post error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error resolving post'
    });
  }
};

// Search posts
export const searchPosts = async (req: Request, res: Response) => {
  try {
    const { q, type, location, minPrice, maxPrice, page = 1, limit = 20 } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    // Build search filter
    const filter: any = {
      isActive: true,
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } }
      ]
    };

    if (type && ['sell', 'help', 'work'].includes(type as string)) {
      filter.type = type;
    }

    if (location) {
      filter.location = { $regex: location, $options: 'i' };
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const skip = (Number(page) - 1) * Number(limit);

    const posts = await Post.find(filter)
      .populate('author', 'name avatar location isExpert')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Post.countDocuments(filter);

    res.json({
      success: true,
      data: {
        posts,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / Number(limit))
        }
      }
    });

  } catch (error) {
    console.error('Search posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error searching posts'
    });
  }
}; 