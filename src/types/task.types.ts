// LifeQuest Quest Types

// Categories of student life
export type LifeCategory = 'academics' | 'fitness' | 'creativity' | 'exploration' | 'wellness';

export enum QuestDifficulty {
  EASY = 1,
  MEDIUM = 1.5,
  HARD = 2,
  EPIC = 3,
}

// Generic quest base
export interface BaseQuest {
  id: string;
  title: string;
  description?: string;
  category: LifeCategory;
  xpReward: number;
  createdAt: string;
  updatedAt: string;
  difficulty: QuestDifficulty;
}

// Daily quests - reset every day
export interface DailyQuest extends BaseQuest {
  type: 'daily';
  completed: boolean;
  completedToday?: boolean;
  lastCompletedAt?: string;
  streak: number;
}

// Weekly quests - reset every week
export interface WeeklyQuest extends BaseQuest {
  type: 'weekly';
  completed: boolean;
  completedThisWeek?: boolean;
  lastCompletedAt?: string;
  weeklyStreak?: number;
  dueDate: string;
}

// One-off achievements
export interface Achievement {
  id: string;
  title: string;
  description?: string;
  category: LifeCategory | 'general';
  xpReward?: number;
  requirement?: string;
  unlocked: boolean;
  unlockedAt?: string;
  icon?: string;
}

// Union type for all quests
export type Quest = DailyQuest | WeeklyQuest;
