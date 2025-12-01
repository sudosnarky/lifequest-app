import apiClient from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: any;
}

export const authApi = {
  // Login user
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/login', credentials);
    const { token, user } = response.data;
    
    // Store token and user data
    await AsyncStorage.setItem('@lifequest_token', token);
    await AsyncStorage.setItem('@lifequest_user', JSON.stringify(user));
    
    return response.data;
  },

  // Register new user
  register: async (userData: RegisterRequest): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/register', userData);
    const { token, user } = response.data;
    
    // Store token and user data
    await AsyncStorage.setItem('@lifequest_token', token);
    await AsyncStorage.setItem('@lifequest_user', JSON.stringify(user));
    
    return response.data;
  },

  // Logout user
  logout: async (): Promise<void> => {
    await AsyncStorage.multiRemove(['@lifequest_token', '@lifequest_user']);
  },

  // Check if user is authenticated
  isAuthenticated: async (): Promise<boolean> => {
    try {
      const token = await AsyncStorage.getItem('@lifequest_token');
      return !!token;
    } catch {
      return false;
    }
  },

  // Get stored user data
  getStoredUser: async (): Promise<any | null> => {
    try {
      const userStr = await AsyncStorage.getItem('@lifequest_user');
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  },
};
