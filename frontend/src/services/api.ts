import axios from 'axios';
import { getSecureItem, setSecureItem, deleteSecureItem } from '../utils/secureStorage';

// API Configuration
const API_BASE_URL = __DEV__ 
  ? 'http://192.168.0.167:3002/api'  // Your computer's IP address
  : 'https://your-production-backend.com/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await getSecureItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.log('Error getting auth token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      await deleteSecureItem('authToken');
      // You might want to redirect to login screen here
    }
    return Promise.reject(error);
  }
);

// Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
  location?: string;
}

export interface PostRequest {
  type: 'sell' | 'help' | 'work';
  title?: string;
  description: string;
  price?: string;
  isRent?: boolean;
  location?: string;
  contactMethod?: string;
  urgency?: string;
  date?: string;
  time?: string;
  budget?: string;
  images?: string[];
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

// Auth Services
export const authService = {
  async login(credentials: LoginRequest): Promise<ApiResponse> {
    try {
      const response = await api.post('/auth/login', credentials);
      
      if (response.data.success && response.data.data?.accessToken) {
        await setSecureItem('authToken', response.data.data.accessToken);
      }
      
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed',
        error: error.message,
      };
    }
  },

  async register(userData: RegisterRequest): Promise<ApiResponse> {
    try {
      const response = await api.post('/auth/register', userData);
      
      if (response.data.success && response.data.data?.accessToken) {
        await setSecureItem('authToken', response.data.data.accessToken);
      }
      
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed',
        error: error.message,
      };
    }
  },

  async logout(): Promise<void> {
    try {
      await deleteSecureItem('authToken');
    } catch (error) {
      console.log('Error during logout:', error);
    }
  },

  async getCurrentUser(): Promise<ApiResponse> {
    try {
      // Check if token exists before making request
      const token = await getSecureItem('authToken');
      if (!token) {
        return {
          success: false,
          message: 'No authentication token found',
          error: 'Not authenticated',
        };
      }

      const response = await api.get('/auth/me');
      return response.data;
    } catch (error: any) {
      console.log('getCurrentUser error:', error.response?.status, error.response?.data);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to get user info',
        error: error.message,
      };
    }
  },
};

// Post Services
export const postService = {
  async createPost(postData: PostRequest): Promise<ApiResponse> {
    try {
      console.log('Sending post to backend:', postData);
      const response = await api.post('/posts', postData);
      return response.data;
    } catch (error: any) {
      console.error('Error creating post:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to create post',
        error: error.message,
      };
    }
  },

  async getPosts(): Promise<ApiResponse> {
    try {
      const response = await api.get('/posts');
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch posts',
        error: error.message,
      };
    }
  },

  async getPost(id: string): Promise<ApiResponse> {
    try {
      const response = await api.get(`/posts/${id}`);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch post',
        error: error.message,
      };
    }
  },
};

// Export default instance
export default api; 