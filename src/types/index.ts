// LifeQuest Common Types

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface NavigationParams {
  questId?: string;
  userId?: string;
  category?: string;
}

// Notification types for LifeQuest
export enum NotificationType {
  ACHIEVEMENT_UNLOCKED = 'ACHIEVEMENT_UNLOCKED',
  LEVEL_UP = 'LEVEL_UP',
  STREAK_MILESTONE = 'STREAK_MILESTONE',
  LEADERBOARD_RANK_UP = 'LEADERBOARD_RANK_UP',
  NEW_BADGE = 'NEW_BADGE',
}

export interface Notification {
  id: string;
  type: NotificationType;
  data: any;
  seen: boolean;
  timestamp: string;
}

// Quest completion result
export interface QuestCompletionResult {
  xpEarned: number;
  newLevel: number;
  leveledUp: boolean;
  achievementsUnlocked: string[];
  newRank?: number;
}

export * from './task.types';
export * from './user.types';
