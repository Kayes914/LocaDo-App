# Locado - Local Services Marketplace

A React Native mobile app with Express.js backend for connecting local service providers with people who need help, buy/sell items, and find experts in their area.

## 🚀 Features

- **Buy & Sell**: Post items for sale or rent with images and location
- **Help Requests**: Ask for help with various tasks and get responses
- **Expert Services**: Find and hire local service providers
- **Real-time Chat**: In-app messaging between users
- **Location-based**: GPS integration for location-aware services
- **User Profiles**: Trust scores, ratings, and verification
- **Notifications**: Stay updated on responses and activities

## 📱 Tech Stack

### Frontend (React Native + Expo)
- React Native with TypeScript
- Expo for development and deployment
- React Navigation for navigation
- React Native Paper for UI components
- React Native Maps for location features
- React Native Gifted Chat for messaging
- Expo Camera & Image Picker for photos
- AsyncStorage for local data

### Backend (Node.js + Express)
- Express.js with TypeScript
- MongoDB with Mongoose
- JWT authentication
- Socket.io for real-time chat
- Multer + Cloudinary for image uploads
- Express Rate Limiting & Security middleware

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ 
- MongoDB installed locally or MongoDB Atlas account
- Expo CLI (`npm install -g @expo/cli`)
- Android Studio (for Android) or Xcode (for iOS)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Copy environment template:
```bash
cp env.example .env
```

3. Update `.env` with your configuration:
   - Set MongoDB connection string
   - Generate JWT secret
   - Add Cloudinary credentials (for image uploads)

4. Install dependencies (already done):
```bash
npm install
```

5. Start development server:
```bash
npm run dev
```

The backend will run on http://localhost:3000

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Copy environment template:
```bash
cp env.example .env
```

3. Update `.env` with your configuration:
   - Set API_BASE_URL to your backend URL
   - Add Google Maps API key (optional)
   - Add Cloudinary settings

4. Install dependencies (already done):
```bash
npm install
```

5. Start Expo development server:
```bash
npx expo start
```

6. Use Expo Go app to scan QR code or run on simulator

## 📂 Project Structure

```
Locado/
├── frontend/          # React Native Expo app
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── screens/      # App screens/pages
│   │   ├── navigation/   # Navigation configuration
│   │   ├── services/     # API calls and utilities
│   │   ├── context/      # React Context for state
│   │   └── types/        # TypeScript type definitions
│   ├── assets/           # Images, fonts, etc.
│   └── app.json         # Expo configuration
├── backend/           # Express.js API server
│   ├── src/
│   │   ├── controllers/  # Route handlers
│   │   ├── models/       # MongoDB schemas
│   │   ├── routes/       # API routes
│   │   ├── middleware/   # Custom middleware
│   │   ├── services/     # Business logic
│   │   └── utils/        # Helper functions
│   └── dist/            # Compiled JavaScript
└── README.md
```

## 🌟 Key Features Implementation

### Authentication & User Management
- JWT-based authentication
- User registration with phone verification
- Profile management with trust scores
- Role-based access (user, expert, admin)

### Posting System
- Create posts for: selling items, help requests, job postings
- Image upload with Cloudinary
- Location-based posting and discovery
- Category filtering and search

### Communication
- Real-time in-app chat with Socket.io
- Push notifications for messages and updates
- Contact preferences (chat only, phone, both)

### Location Services
- GPS auto-detection
- Manual location selection with maps
- Distance-based search and filtering
- Location privacy controls

## 🔧 Development Commands

### Backend
```bash
npm run dev      # Start development server with nodemon
npm run build    # Compile TypeScript to JavaScript
npm start        # Run production server
```

### Frontend
```bash
npx expo start   # Start Expo development server
npm run android  # Run on Android emulator/device
npm run ios      # Run on iOS simulator (macOS only)
npm run web      # Run in web browser
```

## 📝 Environment Variables

See `env.example` files in both `frontend/` and `backend/` directories for all required environment variables.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License. 