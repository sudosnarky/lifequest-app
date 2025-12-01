import apiClient from './api';
import { Achievement } from '../types/task.types';

export const achievementApi = {
  // Get all achievements (with status)
  getAllAchievements: async (category?: string): Promise<Achievement[]> => {
    const response = await apiClient.get('/achievements', {
      params: category ? { category } : undefined,
    });
    return response.data.achievements;
  },

  // Get user's unlocked achievements
  getUserAchievements: async (): Promise<Achievement[]> => {
    const response = await apiClient.get('/achievements/me');
    return response.data.achievements;
  },

  // Unlock an achievement
  unlockAchievement: async (id: string): Promise<{
    message: string;
    achievement: Achievement;
    xpGained: number;
  }> => {
    const response = await apiClient.post(`/achievements/${id}/unlock`);
    return response.data;
  },
};
