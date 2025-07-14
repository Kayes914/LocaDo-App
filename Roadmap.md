# 🚀 Locado Backend Development Documentation

## 📱 **Project Overview**
Locado is a community marketplace React Native app built with Expo that enables local buying/selling, expert services, community help, and real-time chat functionality.

---

## 🏗️ **Frontend Architecture Analysis**

### **Tech Stack:**
- **Framework**: React Native + Expo (~53.0.17)
- **Language**: TypeScript
- **Navigation**: React Navigation v7
- **UI Components**: React Native Paper, Expo Vector Icons
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Real-time Chat**: react-native-gifted-chat
- **Image Handling**: Expo Image Picker
- **Location**: Expo Location
- **Storage**: AsyncStorage, Expo Secure Store
- **Maps**: React Native Maps, Expo Maps

### **App Features:**
1. **Authentication System** (login/register)
2. **Home Feed** (buy/sell items, help posts, work offers)
3. **Item Marketplace** (buy/sell/rent with images)
4. **Expert Services** (verified professionals: plumbers, tutors, etc.)
5. **Community Help** (people asking for assistance)
6. **Real-time Chat** (conversations about items/services)
7. **Post Creation** (sell/help/work tabs)
8. **Search & Filters** (location-based)
9. **User Profiles** (ratings, contact info)
10. **Image Uploads** (1-4 images per post)

---

## 🗂️ **Data Models (Frontend Types)**

### **User Interface:**
```typescript
interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  avatar?: string;
  isExpert: boolean;
  expertProfile?: {
    profession: string;
    experience: string;
    rating: number;
    reviews: number;
    verified: boolean;
    area: string;
  };
}
```

### **Post Types:**
```typescript
interface BuySellItem {
  id: number;
  title: string;
  price: string;
  location: string;
  image: string;
  type: 'sell' | 'rent' | 'service';
  description?: string;
  condition?: string;
  category?: string;
  postedBy?: string;
  postedDate?: string;
  contact?: {
    phone?: string;
    email?: string;
    name?: string;
  };
  features?: string[];
  images?: string[];
}

interface HelpPost {
  id: number;
  title: string;
  description: string;
  category: string;
  urgency: 'low' | 'medium' | 'high';
  location: string;
  time: string;
  author: string;
  avatar: string;
  isResolved: boolean;
}

interface WorkOffer {
  id: number;
  title: string;
  budget: string;
  category: string;
  location: string;
  time: string;
  description?: string;
  requirements?: string[];
  postedBy?: string;
}
```

### **Chat System:**
```typescript
interface ChatMessage {
  id: number;
  text: string;
  timestamp: string;
  senderId: number;
  isRead: boolean;
}

interface Conversation {
  id: number;
  otherUser: {
    id: number;
    name: string;
    avatar?: string;
    location: string;
  };
  item: {
    id: number;
    title: string;
    price: string;
    image: string;
    type: 'sell' | 'rent' | 'service';
  };
  lastMessage: ChatMessage;
  unreadCount: number;
  isActive: boolean;
}
```

---

## 🛠️ **Backend Requirements**

### **Technology Stack:**
- **Runtime**: Node.js + TypeScript
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT + bcryptjs
- **Real-time**: Socket.io
- **File Storage**: Cloudinary
- **File Uploads**: Multer
- **Security**: Helmet, CORS, express-rate-limit
- **Validation**: express-validator
- **Utilities**: compression, morgan, dotenv, uuid

### **Project Structure:**
```
backend/
├── src/
│   ├── models/           # MongoDB Schemas
│   │   ├── User.ts
│   │   ├── Post.ts       # All post types (sell/help/work)
│   │   ├── Expert.ts
│   │   ├── Chat.ts
│   │   ├── Message.ts
│   │   └── Image.ts
│   ├── routes/           # API Endpoints
│   │   ├── auth.ts       # Authentication
│   │   ├── posts.ts      # CRUD operations
│   │   ├── experts.ts    # Expert management
│   │   ├── chat.ts       # Chat endpoints
│   │   ├── users.ts      # Profile management
│   │   └── upload.ts     # Image uploads
│   ├── middleware/       # Custom middleware
│   │   ├── auth.ts       # JWT verification
│   │   ├── upload.ts     # File upload handling
│   │   ├── validation.ts # Request validation
│   │   └── rateLimiter.ts
│   ├── controllers/      # Business logic
│   │   ├── authController.ts
│   │   ├── postController.ts
│   │   ├── expertController.ts
│   │   ├── chatController.ts
│   │   └── userController.ts
│   ├── services/         # External services
│   │   ├── cloudinary.ts
│   │   ├── socket.ts
│   │   └── email.ts
│   ├── utils/           # Helper functions
│   │   ├── database.ts
│   │   ├── logger.ts
│   │   └── constants.ts
│   └── index.ts         # Server entry point
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript config
├── nodemon.json         # Development config
└── .env                 # Environment variables
```

---

## 🔗 **Required API Endpoints**

### **Authentication:**
```
POST   /api/auth/register     # User registration
POST   /api/auth/login        # User login
POST   /api/auth/logout       # User logout
GET    /api/auth/me           # Get current user
PUT    /api/auth/profile      # Update profile
POST   /api/auth/refresh      # Refresh JWT token
```

### **Posts Management:**
```
GET    /api/posts             # Get all posts (home feed)
POST   /api/posts             # Create new post
GET    /api/posts/:id         # Get specific post
PUT    /api/posts/:id         # Update post
DELETE /api/posts/:id         # Delete post
GET    /api/posts/search      # Search posts
GET    /api/posts/category/:category # Posts by category
GET    /api/posts/user/:userId # User's posts
PUT    /api/posts/:id/resolve # Mark help post as resolved
```

### **Expert Services:**
```
GET    /api/experts           # Get all experts
GET    /api/experts/:id       # Get expert profile
POST   /api/experts           # Register as expert
PUT    /api/experts/:id       # Update expert profile
GET    /api/experts/search    # Search experts
POST   /api/experts/:id/review # Add expert review
GET    /api/experts/categories # Get expert categories
```

### **Chat System:**
```
GET    /api/chats             # Get user's conversations
POST   /api/chats             # Start new conversation
GET    /api/chats/:id         # Get conversation details
GET    /api/chats/:id/messages # Get chat messages
POST   /api/chats/:id/messages # Send message
PUT    /api/chats/:id/read    # Mark messages as read
DELETE /api/chats/:id         # Delete conversation
```

### **File Upload:**
```
POST   /api/upload/images     # Upload images to Cloudinary
DELETE /api/upload/images/:id # Delete image
GET    /api/upload/images/:id # Get image metadata
```

### **User Management:**
```
GET    /api/users/profile     # Get user profile
PUT    /api/users/profile     # Update user profile
GET    /api/users/:id         # Get public user info
POST   /api/users/report      # Report user
GET    /api/users/stats       # User statistics
```

---

## 🔒 **Security Requirements**

### **Authentication & Authorization:**
- JWT tokens with refresh mechanism
- Password hashing with bcryptjs
- Rate limiting on auth endpoints
- Protected routes middleware

### **Data Validation:**
- Input sanitization
- File type validation for uploads
- Location data validation
- User permission checks

### **Security Headers:**
- Helmet.js for security headers
- CORS configuration
- Request size limits
- File upload restrictions

---

## 📱 **Real-time Features**

### **Socket.io Events:**
```javascript
// Client to Server
'join_chat'     // Join specific chat room
'send_message'  // Send new message
'typing_start'  // User started typing
'typing_stop'   // User stopped typing
'leave_chat'    // Leave chat room

// Server to Client
'new_message'   // New message received
'message_read'  // Message marked as read
'user_typing'   // Other user typing
'user_online'   // User came online
'user_offline'  // User went offline
```

---

## 🌍 **Location Features**

### **Location-based Services:**
- Store user locations (city/area level)
- Search posts by proximity
- Expert discovery by location
- Location validation and geocoding

---

## 📊 **Database Schema Design**

### **Key Collections:**
1. **users** - User profiles and authentication
2. **posts** - All types of posts (sell/help/work)
3. **experts** - Expert profiles and verification
4. **chats** - Conversation metadata
5. **messages** - Chat messages
6. **images** - Image metadata and URLs
7. **reviews** - Expert reviews and ratings

### **Indexes Required:**
- User email (unique)
- Post location + category
- Post creation date
- Chat participants
- Message timestamps

---

## 🚀 **Deployment Strategy**

### **Backend Hosting Options:**
1. **Railway** (Recommended - Easy deployment)
2. **Render** (Good free tier)
3. **DigitalOcean App Platform**
4. **AWS/Google Cloud** (Production scale)

### **Database Hosting:**
- **MongoDB Atlas** (Cloud MongoDB)
- **Railway PostgreSQL** (Alternative)

### **File Storage:**
- **Cloudinary** (Images/videos)
- **AWS S3** (Alternative)

### **Environment Variables:**
```
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb://...
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 📱 **Frontend Integration**

### **API Base URL Configuration:**
```typescript
// In frontend/src/services/api.ts
const API_BASE_URL = __DEV__ 
  ? 'http://localhost:3000/api'
  : 'https://your-backend.railway.app/api';
```

### **Authentication Flow:**
1. Store JWT in SecureStore
2. Add Authorization header to axios
3. Handle token refresh automatically
4. Redirect to login on 401 errors

---

## 🧪 **Testing Strategy**

### **Backend Testing:**
- Unit tests for controllers
- Integration tests for API endpoints
- Socket.io connection testing
- Database query testing

### **API Documentation:**
- Use Swagger/OpenAPI
- Postman collections
- Example requests/responses

---

## 📈 **Scalability Considerations**

### **Performance Optimizations:**
- Database indexing strategy
- Image optimization and CDN
- Caching for frequently accessed data
- Pagination for large datasets

### **Monitoring:**
- Error logging and tracking
- API response time monitoring
- Database performance metrics
- User analytics

---

## 🎯 **MVP vs Full Features**

### **MVP (Minimum Viable Product):**
1. User authentication
2. Basic post creation (sell/help)
3. Simple chat system
4. Expert listings
5. Image upload

### **Future Enhancements:**
1. Push notifications
2. Advanced search filters
3. Payment integration
4. Rating/review system
5. Admin dashboard
6. Analytics and reporting

---

## 📝 **Development Notes**

### **Current Backend Status:**
- Package.json ✅ Configured with all dependencies
- TypeScript ✅ Configured
- Nodemon ✅ Configured for development
- **Next Steps**: Create folder structure and implement API endpoints

### **Frontend Dependencies Already Installed:**
- Axios for HTTP requests
- AsyncStorage for local data
- Expo SecureStore for sensitive data
- React Navigation for routing
- Socket.io client ready for real-time features

### **Ready for Play Store:**
- Expo build system configured
- React Native 0.79.5 (latest stable)
- All required permissions configured
- App.json configured for Android builds

---

**This documentation serves as the complete blueprint for implementing the Locado backend API that will seamlessly integrate with the existing React Native frontend.**