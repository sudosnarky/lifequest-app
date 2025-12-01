import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LeaderboardEntry, LifeCategory } from '../types';
import { leaderboardApi } from '../services/leaderboard.api';
import { useUser } from './UserContext';

interface LeaderboardContextType {
  leaderboard: LeaderboardEntry[];
  loading: boolean;
  refreshLeaderboard: () => Promise<void>;
  getLeaderboardByCategory: (category: LifeCategory) => Promise<LeaderboardEntry[]>;
  getUserRank: () => Promise<{ overall: number; categories: any }>;
}

const LeaderboardContext = createContext<LeaderboardContextType | undefined>(undefined);

// Mock leaderboard data for development
const createMockLeaderboard = (): LeaderboardEntry[] => [
  {
    userId: 'user-1',
    name: 'Student',
    level: 1,
    totalXp: 0,
    categoryXp: {
      academics: 0,
      fitness: 0,
      creativity: 0,
      exploration: 0,
      wellness: 0,
    },
    rank: 1,
  },
  {
    userId: 'user-2',
    name: 'Alex Chen',
    level: 8,
    totalXp: 1250,
    categoryXp: {
      academics: 450,
      fitness: 320,
      creativity: 180,
      exploration: 150,
      wellness: 150,
    },
    rank: 2,
  },
  {
    userId: 'user-3',
    name: 'Jordan Smith',
    level: 7,
    totalXp: 980,
    categoryXp: {
      academics: 380,
      fitness: 200,
      creativity: 150,
      exploration: 150,
      wellness: 100,
    },
    rank: 3,
  },
  {
    userId: 'user-4',
    name: 'Taylor Wu',
    level: 6,
    totalXp: 720,
    categoryXp: {
      academics: 250,
      fitness: 180,
      creativity: 120,
      exploration: 100,
      wellness: 70,
    },
    rank: 4,
  },
  {
    userId: 'user-5',
    name: 'Morgan Lee',
    level: 5,
    totalXp: 560,
    categoryXp: {
      academics: 200,
      fitness: 150,
      creativity: 100,
      exploration: 60,
      wellness: 50,
    },
    rank: 5,
  },
];

export const LeaderboardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, user } = useUser();

  useEffect(() => {
    if (isAuthenticated) {
      refreshLeaderboard();
    }
  }, [isAuthenticated]);

  const refreshLeaderboard = async () => {
    if (!isAuthenticated) return;
    
    setLoading(true);
    try {
      const data = await leaderboardApi.getOverallLeaderboard(50);
      // Convert API format to local format
      const formattedData: LeaderboardEntry[] = data.map((entry: any) => ({
        userId: entry.id,
        name: entry.name || entry.username,
        level: entry.level,
        totalXp: entry.totalXp,
        categoryXp: {
          academics: entry.academicsXp || 0,
          fitness: entry.fitnessXp || 0,
          creativity: entry.creativityXp || 0,
          exploration: entry.explorationXp || 0,
          wellness: entry.wellnessXp || 0,
        },
        rank: entry.rank,
      }));
      setLeaderboard(formattedData);
    } catch (error) {
      console.error('Error loading leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getLeaderboardByCategory = async (category: LifeCategory): Promise<LeaderboardEntry[]> => {
    try {
      const data = await leaderboardApi.getCategoryLeaderboard(category.toUpperCase(), 50);
      return data.map((entry: any) => ({
        userId: entry.id,
        name: entry.name || entry.username,
        level: entry.level,
        totalXp: entry.categoryXp || 0,
        categoryXp: {
          academics: 0,
          fitness: 0,
          creativity: 0,
          exploration: 0,
          wellness: 0,
          [category]: entry.categoryXp || 0,
        },
        rank: entry.rank,
      }));
    } catch (error) {
      console.error('Error loading category leaderboard:', error);
      return [];
    }
  };

  const getUserRank = async (): Promise<{ overall: number; categories: any }> => {
    try {
      return await leaderboardApi.getUserRank();
    } catch (error) {
      console.error('Error getting user rank:', error);
      return {
        overall: 0,
        categories: {
          academics: 0,
          fitness: 0,
          creativity: 0,
          exploration: 0,
          wellness: 0,
        },
      };
    }
  };

  return (
    <LeaderboardContext.Provider
      value={{
        leaderboard,
        loading,
        refreshLeaderboard,
        getLeaderboardByCategory,
        getUserRank,
      }}
    >
      {children}
    </LeaderboardContext.Provider>
  );
};

export const useLeaderboard = () => {
  const context = useContext(LeaderboardContext);
  if (context === undefined) {
    throw new Error('useLeaderboard must be used within a LeaderboardProvider');
  }
  return context;
};
