# LifeQuest 🎓⚡

**Gamify Your Student Life**

A real-life RPG designed specifically for students to gamify their daily tasks, track progress across different life categories, and compete with peers through an engaging quest-based system. Features a calming beige and navy blue color scheme.

## Features

- 🎯 **Quest System**: Complete daily and weekly quests to earn XP
- 📚 **Five Life Categories**: Academics, Fitness, Creativity, Exploration, Wellness
- 🏆 **Competitive Leaderboards**: Global and category-specific rankings
- 🎖️ **Achievement System**: Unlock badges and track milestones
- 📊 **XP Progression**: Level up and track category-specific experience
- 🔥 **Streak Tracking**: Build consistency with daily quest completion
- 🎨 **Custom Theme**: Calming beige and navy blue color palette
- 📱 **Cross-Platform**: Works on iOS and Android

## Tech Stack

- React Native 0.73.6 with Expo SDK 50
- TypeScript 5.3
- React Navigation 6.x (Bottom Tabs + Stack)
- AsyncStorage 1.21.0 for local data persistence
- Context API for state management
- Expo Vector Icons (Ionicons)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI

### Installation

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start the development server
npx expo start

# Or use npm scripts
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios
```

## Screens

- **Quests**: View and complete daily/weekly quests, filter by category
- **Leaderboard**: Global and category rankings, track your position
- **Achievements**: Browse and unlock badges, track progress
- **Profile**: View stats, XP breakdown, badges, and rank

## Project Structure

```
habitica-rn/
├── src/
│   ├── components/     # Reusable UI components
│   ├── screens/        # Screen components
│   ├── navigation/     # Navigation configuration
│   ├── types/          # TypeScript type definitions
│   ├── contexts/       # React Context providers
│   ├── utils/          # Utility functions
│   └── theme/          # Theme configuration
├── assets/             # Images, fonts, etc.
└── App.tsx            # Root component
```

## Color Scheme

- **Primary Navy**: #1e3a5f (Dark navy blue for headers, buttons)
- **Secondary Navy**: #2c5f8d (Lighter navy for accents)
- **Accent Navy**: #4a8cc7 (Bright navy for highlights)
- **Primary Beige**: #f5e6d3 (Light beige background)
- **Secondary Beige**: #e8d5bd (Medium beige for cards)
- **Accent Beige**: #d4c4a8 (Darker beige for borders)

## License

This is an educational project inspired by Habitica. Original Habitica is open source under GPL-3.0.
