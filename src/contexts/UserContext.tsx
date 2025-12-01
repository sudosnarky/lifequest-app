import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProfile, Stats, LifeCategory } from '../types';
import { authApi } from '../services/auth.api';
import { userApi } from '../services/user.api';

interface UserContextType {
  user: UserProfile | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, username: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (profile: Partial<UserProfile>) => Promise<void>;
  gainExperience: (amount: number, category: LifeCategory) => Promise<void>;
  updateAvatar: (avatar: { uri: string; color: string }) => Promise<void>;
  addBadge: (badge: string) => Promise<void>;
  refreshProfile: () => Promise<void>;
  initialized: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Calculate XP required for next level (100 * level)
const calculateXpForLevel = (level: number): number => {
  return 100 * (level + 1);
};

// Convert API user to UserProfile
const convertApiUser = (apiUser: any): UserProfile => {
  return {
    id: apiUser.id,
    name: apiUser.name,
    avatar: {
      uri: apiUser.avatarUri || '',
      color: apiUser.avatarColor || '#4a8cc7',
    },
    stats: {
      level: apiUser.level,
      currentXp: apiUser.currentXp,
      xpToNextLevel: calculateXpForLevel(apiUser.level),
      totalXp: apiUser.totalXp,
      categoryXp: {
        academics: apiUser.academicsXp,
        fitness: apiUser.fitnessXp,
        creativity: apiUser.creativityXp,
        exploration: apiUser.explorationXp,
        wellness: apiUser.wellnessXp,
      },
    },
    badges: apiUser.badges?.map((b: any) => b.name) || [],
  };
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const isAuth = await authApi.isAuthenticated();
      if (isAuth) {
        // Load user data from storage first (fast)
        const storedUser = await authApi.getStoredUser();
        if (storedUser) {
          setUser(convertApiUser(storedUser));
        }
        // Then refresh from API (accurate)
        await refreshProfile();
      }
      setInitialized(true);
    } catch (error) {
      console.error('Error checking auth:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await authApi.login({ email, password });
      setUser(convertApiUser(response.user));
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, username: string, password: string, name: string) => {
    setLoading(true);
    try {
      const response = await authApi.register({ email, username, password, name });
      setUser(convertApiUser(response.user));
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await authApi.logout();
    setUser(null);
  };

  const refreshProfile = async () => {
    try {
      const apiUser = await userApi.getProfile();
      setUser(convertApiUser(apiUser));
    } catch (error) {
      console.error('Error refreshing profile:', error);
    }
  };

  const updateProfile = async (profile: Partial<UserProfile>) => {
    if (!user) return;
    
    try {
      const updateData: any = {};
      if (profile.name) updateData.name = profile.name;
      if (profile.avatar?.uri !== undefined) updateData.avatarUri = profile.avatar.uri;
      if (profile.avatar?.color) updateData.avatarColor = profile.avatar.color;
      
      const apiUser = await userApi.updateProfile(updateData);
      setUser(convertApiUser(apiUser));
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  const gainExperience = async (amount: number, category: LifeCategory) => {
    if (!user) return;
    
    try {
      await userApi.gainExperience(amount, category);
      await refreshProfile();
    } catch (error) {
      console.error('Error gaining experience:', error);
      throw error;
    }
  };

  const updateAvatar = async (avatar: { uri: string; color: string }) => {
    if (!user) return;
    
    try {
      await userApi.updateAvatar(avatar.uri, avatar.color);
      setUser({
        ...user,
        avatar,
      });
    } catch (error) {
      console.error('Error updating avatar:', error);
      throw error;
    }
  };

  const addBadge = async (badge: string) => {
    if (!user) return;
    
    try {
      await userApi.addBadge(badge);
      setUser({
        ...user,
        badges: [...user.badges, badge],
      });
    } catch (error) {
      console.error('Error adding badge:', error);
      throw error;
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateProfile,
        gainExperience,
        updateAvatar,
        addBadge,
        refreshProfile,
        initialized,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
