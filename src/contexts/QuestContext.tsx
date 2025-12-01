import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Quest, DailyQuest, WeeklyQuest, LifeCategory, QuestDifficulty } from '../types';
import { questApi } from '../services/quest.api';
import { useUser } from './UserContext';

interface QuestContextType {
  quests: Quest[];
  loading: boolean;
  addQuest: (quest: Omit<Quest, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateQuest: (id: string, updates: Partial<Quest>) => Promise<void>;
  deleteQuest: (id: string) => Promise<void>;
  completeQuest: (id: string) => Promise<{ xp: number; category: LifeCategory }>;
  toggleQuestComplete: (id: string) => Promise<void>;
  resetDailyQuests: () => Promise<void>;
  resetWeeklyQuests: () => Promise<void>;
  refreshQuests: () => Promise<void>;
}

const QuestContext = createContext<QuestContextType | undefined>(undefined);

// Calculate XP reward based on difficulty
const calculateXpReward = (difficulty: QuestDifficulty): number => {
  switch (difficulty) {
    case QuestDifficulty.EASY:
      return 10;
    case QuestDifficulty.MEDIUM:
      return 20;
    case QuestDifficulty.HARD:
      return 35;
    case QuestDifficulty.EPIC:
      return 50;
    default:
      return 10;
  }
};

// Mock quests for development
const createMockQuests = (): Quest[] => [
  {
    id: '1',
    title: 'Attend Morning Lecture',
    description: 'Show up to 9 AM class on time',
    category: 'academics',
    difficulty: QuestDifficulty.EASY,
    xpReward: 10,
    type: 'daily',
    completed: false,
    streak: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  } as DailyQuest,
  {
    id: '2',
    title: 'Gym Workout',
    description: '30 minutes of exercise',
    category: 'fitness',
    difficulty: QuestDifficulty.MEDIUM,
    xpReward: 20,
    type: 'daily',
    completed: false,
    streak: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  } as DailyQuest,
  {
    id: '3',
    title: 'Creative Project Work',
    description: 'Spend 1 hour on side project',
    category: 'creativity',
    difficulty: QuestDifficulty.MEDIUM,
    xpReward: 20,
    type: 'daily',
    completed: false,
    streak: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  } as DailyQuest,
  {
    id: '4',
    title: 'Complete Assignment',
    description: 'Finish problem set due Friday',
    category: 'academics',
    difficulty: QuestDifficulty.HARD,
    xpReward: 35,
    type: 'weekly',
    completed: false,
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  } as WeeklyQuest,
  {
    id: '5',
    title: 'Explore New Campus Area',
    description: 'Visit a new building or location',
    category: 'exploration',
    difficulty: QuestDifficulty.EASY,
    xpReward: 10,
    type: 'weekly',
    completed: false,
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  } as WeeklyQuest,
];

export const QuestProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, refreshProfile } = useUser();

  useEffect(() => {
    if (isAuthenticated) {
      refreshQuests();
    }
  }, [isAuthenticated]);

  const refreshQuests = async () => {
    if (!isAuthenticated) return;
    
    setLoading(true);
    try {
      const fetchedQuests = await questApi.getQuests();
      setQuests(fetchedQuests);
    } catch (error) {
      console.error('Error loading quests:', error);
    } finally {
      setLoading(false);
    }
  };

  const addQuest = async (quest: Omit<Quest, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const difficulty = quest.difficulty as string;
      const newQuest = await questApi.createQuest({
        title: quest.title,
        description: quest.description,
        category: quest.category.toUpperCase(),
        type: quest.type.toUpperCase() as 'DAILY' | 'WEEKLY',
        difficulty: difficulty.toUpperCase(),
        dueDate: quest.type === 'weekly' && (quest as WeeklyQuest).dueDate 
          ? new Date((quest as WeeklyQuest).dueDate) 
          : undefined,
      });
      setQuests([...quests, newQuest]);
    } catch (error) {
      console.error('Error adding quest:', error);
      throw error;
    }
  };

  const updateQuest = async (id: string, updates: Partial<Quest>) => {
    try {
      const updatedQuest = await questApi.updateQuest(id, updates);
      setQuests(quests.map(q => q.id === id ? updatedQuest : q));
    } catch (error) {
      console.error('Error updating quest:', error);
      throw error;
    }
  };

  const deleteQuest = async (id: string) => {
    try {
      await questApi.deleteQuest(id);
      setQuests(quests.filter(q => q.id !== id));
    } catch (error) {
      console.error('Error deleting quest:', error);
      throw error;
    }
  };

  const completeQuest = async (id: string): Promise<{ xp: number; category: LifeCategory }> => {
    try {
      const result = await questApi.completeQuest(id);
      
      // Update local quest state
      setQuests(quests.map(q => q.id === id ? result.quest : q));
      
      // Refresh user profile to get updated XP
      await refreshProfile();
      
      return { 
        xp: result.xpGained, 
        category: result.category.toLowerCase() as LifeCategory 
      };
    } catch (error) {
      console.error('Error completing quest:', error);
      throw error;
    }
  };

  const toggleQuestComplete = async (id: string) => {
    const quest = quests.find(q => q.id === id);
    if (!quest) return;

    if (quest.completed) {
      // Just toggle locally (API doesn't support uncompleting)
      await updateQuest(id, { completed: false });
    } else {
      // Complete via API to gain XP
      await completeQuest(id);
    }
  };

  const resetDailyQuests = async () => {
    try {
      await questApi.resetDailyQuests();
      await refreshQuests();
    } catch (error) {
      console.error('Error resetting daily quests:', error);
      throw error;
    }
  };

  const resetWeeklyQuests = async () => {
    try {
      await questApi.resetWeeklyQuests();
      await refreshQuests();
    } catch (error) {
      console.error('Error resetting weekly quests:', error);
      throw error;
    }
  };

  return (
    <QuestContext.Provider
      value={{
        quests,
        loading,
        addQuest,
        updateQuest,
        deleteQuest,
        completeQuest,
        toggleQuestComplete,
        resetDailyQuests,
        resetWeeklyQuests,
        refreshQuests,
      }}
    >
      {children}
    </QuestContext.Provider>
  );
};

export const useQuests = () => {
  const context = useContext(QuestContext);
  if (context === undefined) {
    throw new Error('useQuests must be used within a QuestProvider');
  }
  return context;
};
