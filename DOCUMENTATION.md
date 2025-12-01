# Habitica React Native

A complete React Native implementation of the Habitica habit-building RPG app with a custom beige and navy blue color scheme.

## 🎨 Color Scheme

This implementation features a beautiful, calming color palette:

- **Navy Blue**: `#1e3a5f` (primary), `#2c5f8d` (secondary), `#4a8cc7` (accent)
- **Beige**: `#f5e6d3` (light), `#e8d5bd` (main), `#d4c4a8` (dark)

## ✨ Features

### Core Functionality
- ✅ **Task Management System**
  - Habits (with up/down tracking)
  - Dailies (with streak tracking)
  - To-Dos (with due dates)
  - Rewards (custom prizes)

- 📊 **RPG Mechanics**
  - Health, Mana, Experience bars
  - Gold currency system
  - Level progression
  - Attribute system (Strength, Intelligence, Constitution, Perception)

- 👤 **User Profile**
  - Character stats display
  - Achievement tracking
  - Profile customization

- 🎒 **Inventory System**
  - Equipment management
  - Items collection
  - Pets and mounts (placeholders)

- 👥 **Social Features**
  - Party system (placeholder)
  - Guilds (placeholder)
  - Challenges (placeholder)
  - Tavern (placeholder)

### Technical Features
- TypeScript for type safety
- Context API for state management
- AsyncStorage for data persistence
- React Navigation for seamless navigation
- Expo for cross-platform development

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn
- Expo CLI: `npm install -g expo-cli`

### Installation

```bash
cd habitica-rn
npm install
```

### Running the App

```bash
# Start the Expo development server
npm start

# Run on Android
npm run android

# Run on iOS (requires macOS)
npm run ios

# Run on web
npm run web
```

## 📁 Project Structure

```
habitica-rn/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── TaskCard.tsx    # Task display card
│   │   └── StatsBar.tsx    # Stats and health bars
│   ├── contexts/           # React Context providers
│   │   ├── UserContext.tsx # User state management
│   │   └── TaskContext.tsx # Task state management
│   ├── navigation/         # Navigation configuration
│   │   └── AppNavigator.tsx
│   ├── screens/            # Screen components
│   │   ├── TasksScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   ├── InventoryScreen.tsx
│   │   └── SocialScreen.tsx
│   ├── types/              # TypeScript type definitions
│   │   ├── task.types.ts
│   │   ├── user.types.ts
│   │   └── index.ts
│   └── theme/              # Theme configuration
│       └── index.ts        # Colors, typography, spacing
├── App.tsx                 # Root component
├── app.json               # Expo configuration
├── package.json           # Dependencies
└── tsconfig.json          # TypeScript configuration
```

## 🎮 How to Use

### Managing Tasks

1. **Habits**: Tap the + or - buttons to track positive or negative habits
2. **Dailies**: Check off dailies to build streaks
3. **To-Dos**: Mark todos as complete when finished
4. **Rewards**: Purchase rewards with earned gold

### Earning Experience and Gold

- Complete tasks to earn experience points (XP) and gold
- Higher difficulty tasks give more rewards
- Level up to become stronger!

### Viewing Progress

- Check your stats in the Profile tab
- Monitor your health, mana, experience, and gold
- Track your character attributes

## 🔧 Customization

### Changing Colors

Edit `/src/theme/index.ts` to modify the color scheme:

```typescript
export const colors = {
  navy: {
    dark: '#1e3a5f',      // Your primary navy
    main: '#2c5f8d',      // Your secondary navy
    light: '#4a8cc7',     // Your accent navy
  },
  beige: {
    light: '#f5e6d3',     // Your light background
    main: '#e8d5bd',      // Your card background
    dark: '#d4c4a8',      // Your borders
  },
  // ... more colors
};
```

## 📝 Future Enhancements

- [ ] Task creation and editing
- [ ] Quest system implementation
- [ ] Social features (parties, guilds)
- [ ] Equipment and gear system
- [ ] Pet and mount collections
- [ ] Challenge system
- [ ] Push notifications
- [ ] Backend API integration
- [ ] User authentication
- [ ] Data synchronization

## 🧪 Testing

```bash
npm test
```

## 📱 Supported Platforms

- ✅ iOS (11.0+)
- ✅ Android (5.0+)
- ✅ Web

## 🤝 Contributing

This is an educational project based on the original Habitica app. Contributions are welcome!

## 📄 License

This project is for educational purposes. Original Habitica is licensed under GPL-3.0.

## 🙏 Acknowledgments

- Inspired by [Habitica](https://habitica.com) - the original habit-building RPG
- Built with React Native and Expo
- Custom theme design with beige and navy blue palette

## 📧 Support

For issues or questions, please open an issue on GitHub.

---

**Note**: This is a standalone React Native implementation inspired by Habitica Android. Mock data is used for development purposes. To connect to the actual Habitica API, you would need to implement authentication and API integration.
