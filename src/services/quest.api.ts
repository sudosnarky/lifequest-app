import apiClient from './api';
import { DailyQuest, WeeklyQuest } from '../types/task.types';

type Quest = DailyQuest | WeeklyQuest;

export const questApi = {
  // Get all quests (with optional filters)
  getQuests: async (filters?: {
    type?: 'DAILY' | 'WEEKLY';
    category?: string;
    completed?: boolean;
  }): Promise<Quest[]> => {
    const response = await apiClient.get('/quests', { params: filters });
    return response.data.quests;
  },

  // Get single quest
  getQuest: async (id: string): Promise<Quest> => {
    const response = await apiClient.get(`/quests/${id}`);
    return response.data.quest;
  },

  // Create new quest
  createQuest: async (questData: {
    title: string;
    description?: string;
    category: string;
    type: 'DAILY' | 'WEEKLY';
    difficulty: string;
    dueDate?: Date;
  }): Promise<Quest> => {
    const response = await apiClient.post('/quests', questData);
    return response.data.quest;
  },

  // Update quest
  updateQuest: async (id: string, updates: Partial<Quest>): Promise<Quest> => {
    const response = await apiClient.put(`/quests/${id}`, updates);
    return response.data.quest;
  },

  // Delete quest
  deleteQuest: async (id: string): Promise<void> => {
    await apiClient.delete(`/quests/${id}`);
  },

  // Complete quest
  completeQuest: async (id: string): Promise<{
    quest: Quest;
    xpGained: number;
    category: string;
    leveledUp: boolean;
    newLevel: number;
  }> => {
    const response = await apiClient.post(`/quests/${id}/complete`);
    return response.data;
  },

  // Reset daily quests
  resetDailyQuests: async (): Promise<void> => {
    await apiClient.post('/quests/daily/reset');
  },

  // Reset weekly quests
  resetWeeklyQuests: async (): Promise<void> => {
    await apiClient.post('/quests/weekly/reset');
  },
};
