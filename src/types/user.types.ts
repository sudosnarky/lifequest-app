// LifeQuest User Stats
export interface Stats {
  level: number;
  currentXp: number;
  xpToNextLevel: number;
  totalXp: number;
  // XP breakdown by category
  categoryXp: Record<LifeCategory, number>;
}

// Import LifeCategory only (Achievement is defined in task.types.ts)
import { LifeCategory } from './task.types';

// User Preferences
export interface UserPreferences {
  language: string;
  dayStart: number;
  automaticAllocation: boolean;
  allocationMode: 'flat' | 'classbased' | 'taskbased';
  costume: boolean;
  disableClasses: boolean;
  sleep: boolean;
  sound: 'off' | 'danielTheBard' | 'gokulTheMinstrel' | 'luneFoxTheBard' | 'wattsTheBard' | 'dewinTheBard';
}

// Removed old UserProfile - see new definition at end of file

// User Items/Inventory
export interface Items {
  gear: {
    equipped: Equipment;
    costume: Equipment;
  };
  currentMount?: string;
  currentPet?: string;
  lastDrop: {
    date: Date;
    count: number;
  };
}

// Equipment
export interface Equipment {
  weapon?: string;
  armor?: string;
  head?: string;
  shield?: string;
  back?: string;
  headAccessory?: string;
  eyewear?: string;
  body?: string;
}

// User Party/Group
export interface UserParty {
  _id: string;
  name: string;
  order: string;
}

// User Achievements
// Achievement interface moved to task.types.ts

// User Authentication
export interface Authentication {
  timestamps: {
    created: Date;
    loggedin: Date;
    updated: Date;
  };
}

// User Flags
export interface Flags {
  welcomed: boolean;
  newStuff: boolean;
  tour: {
    intro: number;
    classes: number;
    stats: number;
    tavern: number;
    party: number;
    guilds: number;
    challenges: number;
    market: number;
    pets: number;
    mounts: number;
    hall: number;
    equipment: number;
  };
  showTour: boolean;
  dropsEnabled: boolean;
  itemsEnabled: boolean;
  lastNewStuffRead: Date;
  rewrite: boolean;
  classSelected: boolean;
  rebirthEnabled: boolean;
  levelDrops: Record<string, boolean>;
}

// LifeQuest User Profile
// LifeQuest User Profile
export interface UserProfile {
  id: string;
  name: string;
  avatar: {
    uri: string;
    color: string;
  };
  stats: {
    level: number;
    currentXp: number;
    xpToNextLevel: number;
    totalXp: number;
    categoryXp: Record<LifeCategory, number>;
  };
  badges: string[];
}

// Leaderboard entry
export interface LeaderboardEntry {
  userId: string;
  name: string;
  userName?: string; // Deprecated, use name
  avatar?: string;
  rank: number;
  totalXp: number;
  categoryXp: Record<LifeCategory, number>;
  level: number;
}
