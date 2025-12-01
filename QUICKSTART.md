# Habitica React Native - Quick Start Guide

## Installation Steps

1. **Install dependencies**:
   ```bash
   cd /home/snarky404/GitHubRepos/habitica-rn
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm start
   ```

3. **Run on your device**:
   - Scan the QR code with Expo Go app (Android/iOS)
   - Press `a` for Android emulator
   - Press `i` for iOS simulator (macOS only)
   - Press `w` for web browser

## Key Features Implemented

### ✅ Completed
- Task management system (Habits, Dailies, To-Dos, Rewards)
- User profile with stats tracking
- Experience and gold earning system
- Level progression
- Custom beige and navy blue theme
- Persistent storage with AsyncStorage
- Bottom tab navigation

### 🚧 Placeholders
- Inventory items (equipment, pets, mounts)
- Social features (parties, guilds, challenges)
- Quest system
- Backend API integration

## App Structure

```
Tasks Tab      → Manage your habits, dailies, and to-dos
Inventory Tab  → View your equipment and items
Social Tab     → Connect with parties and guilds
Profile Tab    → View your character stats and progress
```

## How Tasks Work

1. **Habits**: Click + to mark as done (positive), - for negative habits
2. **Dailies**: Check off to complete for the day (builds streaks)
3. **To-Dos**: Check when finished
4. **Rewards**: Purchase with earned gold

Completing tasks earns:
- 🌟 Experience (levels you up)
- 💰 Gold (buy rewards)

## Color Scheme

- **Primary Navy**: `#1e3a5f` - Headers, primary buttons
- **Secondary Navy**: `#2c5f8d` - Accents, active states  
- **Light Beige**: `#f5e6d3` - Background
- **Medium Beige**: `#e8d5bd` - Cards
- **Dark Beige**: `#d4c4a8` - Borders

## Mock Data

The app initializes with sample tasks:
- 1 Habit: "Exercise"
- 1 Daily: "Morning Routine"
- 1 To-Do: "Complete project report"
- 1 Reward: "Watch a movie"

Your progress is saved locally using AsyncStorage.

## Development Notes

- Written in TypeScript for type safety
- Uses React Context for state management
- Expo for easy cross-platform development
- All screens are functional with mock data
- Ready for backend integration

## Next Steps

To connect to actual Habitica API:
1. Add authentication flow
2. Implement API service layer
3. Replace mock data with API calls
4. Add real-time synchronization

Enjoy building better habits! 🎮✨
