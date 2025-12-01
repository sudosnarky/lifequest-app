import apiClient from './api';
import { LeaderboardEntry } from '../types/user.types';

export const leaderboardApi = {
  // Get overall leaderboard
  getOverallLeaderboard: async (limit: number = 50): Promise<LeaderboardEntry[]> => {
    const response = await apiClient.get('/leaderboard', { params: { limit } });
    return response.data.leaderboard;
  },

  // Get category-specific leaderboard
  getCategoryLeaderboard: async (
    category: string,
    limit: number = 50
  ): Promise<LeaderboardEntry[]> => {
    const response = await apiClient.get(`/leaderboard/category/${category}`, {
      params: { limit },
    });
    return response.data.leaderboard;
  },

  // Get current user's ranks
  getUserRank: async (): Promise<{
    overall: number;
    categories: {
      academics: number;
      fitness: number;
      creativity: number;
      exploration: number;
      wellness: number;
    };
  }> => {
    const response = await apiClient.get('/leaderboard/me');
    return response.data;
  },
};
