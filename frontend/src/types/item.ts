export interface BuySellItem {
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

export interface HelpPost {
  id: number;
  title: string;
  category: string;
  urgency: string;
  location: string;
  time: string;
  description?: string;
  budget?: string;
  postedBy?: string;
}

export interface WorkOffer {
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

export interface ChatMessage {
  id: number;
  text: string;
  timestamp: string;
  senderId: number;
  isRead: boolean;
}

export interface Conversation {
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