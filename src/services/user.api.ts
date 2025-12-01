import apiClient from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProfile } from '../types/user.types';

export const userApi = {
  // Get current user profile
  getProfile: async (): Promise<UserProfile> => {
    const response = await apiClient.get('/users/me');
    const user = response.data.user;
    
    // Update stored user data
    await AsyncStorage.setItem('@lifequest_user', JSON.stringify(user));
    
    return user;
  },

  // Update user profile
  updateProfile: async (data: Partial<UserProfile>): Promise<UserProfile> => {
    const response = await apiClient.put('/users/me', data);
    const user = response.data.user;
    
    // Update stored user data
    await AsyncStorage.setItem('@lifequest_user', JSON.stringify(user));
    
    return user;
  },

  // Update avatar
  updateAvatar: async (avatarUri: string | null, avatarColor: string): Promise<void> => {
    await apiClient.post('/users/me/avatar', { avatarUri, avatarColor });
  },

  // Gain experience
  gainExperience: async (amount: number, category?: string): Promise<any> => {
    const response = await apiClient.post('/users/me/xp', { amount, category });
    
    // Refresh user profile
    await userApi.getProfile();
    
    return response.data;
  },

  // Add badge
  addBadge: async (name: string): Promise<any> => {
    const response = await apiClient.post('/users/me/badges', { name });
    return response.data.badge;
  },

  // Get user stats
  getStats: async (): Promise<any> => {
    const response = await apiClient.get('/users/me/stats');
    return response.data.stats;
  },
};
