import { Server as SocketIOServer, Socket } from 'socket.io';
import { Server as HTTPServer } from 'http';
import jwt from 'jsonwebtoken';
import { SOCKET_EVENTS } from '../utils/constants';
import { User, IUser } from '../models/User';
import { Chat } from '../models/Chat';
import { Message } from '../models/Message';
import logger from '../utils/logger';

interface AuthenticatedSocket extends Socket {
  user?: IUser;
}

interface JWTPayload {
  userId: string;
  email: string;
}

class SocketService {
  private io: SocketIOServer | null = null;
  private connectedUsers: Map<string, string> = new Map(); // userId -> socketId

  initialize(server: HTTPServer): void {
    this.io = new SocketIOServer(server, {
      cors: {
        origin: process.env.ALLOWED_ORIGINS?.split(',') || ["http://localhost:3000", "http://localhost:19006"],
        methods: ["GET", "POST"],
        credentials: true
      }
    });

    // Authentication middleware
    this.io.use(async (socket, next) => {
      try {
        const token = socket.handshake.auth?.token;
        
        if (!token) {
          return next(new Error('Authentication error: No token provided'));
        }

        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
          return next(new Error('Authentication error: JWT secret not configured'));
        }

        const decoded = jwt.verify(token, jwtSecret) as JWTPayload;
        const user = await User.findById(decoded.userId).select('-password');
        
        if (!user || !user.isActive) {
          return next(new Error('Authentication error: User not found or inactive'));
        }

        (socket as AuthenticatedSocket).user = user;
        next();
      } catch (error) {
        logger.error('Socket authentication error', error);
        next(new Error('Authentication error: Invalid token'));
      }
    });

    this.io.on('connection', (socket) => {
      this.handleConnection(socket as AuthenticatedSocket);
    });

    logger.info('Socket.IO server initialized');
  }

  private handleConnection(socket: AuthenticatedSocket): void {
    const user = socket.user;
    if (!user) return;

    const userId = user._id?.toString() || '';
    
    // Store user connection
    this.connectedUsers.set(userId, socket.id);
    
    logger.info('User connected', { userId, socketId: socket.id });

    // Broadcast user online status
    socket.broadcast.emit(SOCKET_EVENTS.USER_ONLINE, {
      userId,
      user: {
        id: user._id,
        name: user.name,
        avatar: user.avatar
      }
    });

    // Join user to their personal room
    socket.join(`user_${userId}`);

    // Handle joining chat rooms
    socket.on(SOCKET_EVENTS.JOIN_CHAT, async (data: { chatId: string }) => {
      try {
        const { chatId } = data;
        
        // Verify user is participant in this chat
        const chat = await Chat.findById(chatId);
        if (!chat || !chat.participants.includes(user._id as any)) {
          socket.emit(SOCKET_EVENTS.ERROR, { message: 'Not authorized to join this chat' });
          return;
        }

        socket.join(`chat_${chatId}`);
        logger.info('User joined chat', { userId, chatId });
      } catch (error) {
        logger.error('Error joining chat', error);
        socket.emit(SOCKET_EVENTS.ERROR, { message: 'Failed to join chat' });
      }
    });

    // Handle leaving chat rooms
    socket.on(SOCKET_EVENTS.LEAVE_CHAT, (data: { chatId: string }) => {
      const { chatId } = data;
      socket.leave(`chat_${chatId}`);
      logger.info('User left chat', { userId, chatId });
    });

    // Handle sending messages
    socket.on(SOCKET_EVENTS.SEND_MESSAGE, async (data: {
      chatId: string;
      text: string;
      messageType?: 'text' | 'image';
      imageUrl?: string;
    }) => {
      try {
        const { chatId, text, messageType = 'text', imageUrl } = data;
        
        // Verify user is participant in this chat
        const chat = await Chat.findById(chatId).populate('participants', 'name avatar');
        if (!chat || !chat.participants.some((p: any) => p._id.toString() === userId)) {
          socket.emit(SOCKET_EVENTS.ERROR, { message: 'Not authorized to send message to this chat' });
          return;
        }

        // Create new message
        const newMessage = new Message({
          chat: chatId,
          sender: userId,
          text,
          messageType,
          imageUrl
        });

        await newMessage.save();
        await newMessage.populate('sender', 'name avatar');

        // Update chat's last message
        chat.lastMessage = newMessage._id as any;
        chat.lastMessageTime = new Date();
        await chat.save();

        // Emit message to all participants in the chat room
        this.io?.to(`chat_${chatId}`).emit(SOCKET_EVENTS.NEW_MESSAGE, {
          message: newMessage,
          chat: {
            id: chat._id,
            participants: chat.participants
          }
        });

        logger.info('Message sent', { userId, chatId, messageId: newMessage._id });
      } catch (error) {
        logger.error('Error sending message', error);
        socket.emit(SOCKET_EVENTS.ERROR, { message: 'Failed to send message' });
      }
    });

    // Handle typing indicators
    socket.on(SOCKET_EVENTS.TYPING_START, (data: { chatId: string }) => {
      socket.to(`chat_${data.chatId}`).emit(SOCKET_EVENTS.USER_TYPING, {
        userId,
        user: {
          id: user._id,
          name: user.name,
          avatar: user.avatar
        },
        isTyping: true
      });
    });

    socket.on(SOCKET_EVENTS.TYPING_STOP, (data: { chatId: string }) => {
      socket.to(`chat_${data.chatId}`).emit(SOCKET_EVENTS.USER_TYPING, {
        userId,
        user: {
          id: user._id,
          name: user.name,
          avatar: user.avatar
        },
        isTyping: false
      });
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      this.connectedUsers.delete(userId);
      
      // Broadcast user offline status
      socket.broadcast.emit(SOCKET_EVENTS.USER_OFFLINE, {
        userId,
        user: {
          id: user._id,
          name: user.name,
          avatar: user.avatar
        }
      });

      logger.info('User disconnected', { userId, socketId: socket.id });
    });
  }

  // Send notification to specific user
  sendToUser(userId: string, event: string, data: any): void {
    const socketId = this.connectedUsers.get(userId);
    if (socketId && this.io) {
      this.io.to(socketId).emit(event, data);
    }
  }

  // Send notification to chat room
  sendToChat(chatId: string, event: string, data: any): void {
    if (this.io) {
      this.io.to(`chat_${chatId}`).emit(event, data);
    }
  }

  // Get online users
  getOnlineUsers(): string[] {
    return Array.from(this.connectedUsers.keys());
  }

  // Check if user is online
  isUserOnline(userId: string): boolean {
    return this.connectedUsers.has(userId);
  }

  // Get total connected users count
  getConnectedUsersCount(): number {
    return this.connectedUsers.size;
  }
}

export default new SocketService(); 