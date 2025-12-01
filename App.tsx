import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { UserProvider } from './src/contexts/UserContext';
import { QuestProvider } from './src/contexts/QuestContext';
import { LeaderboardProvider } from './src/contexts/LeaderboardContext';
import { AppNavigator } from './src/navigation/AppNavigator';

export default function App() {
  return (
    <UserProvider>
      <QuestProvider>
        <LeaderboardProvider>
          <AppNavigator />
          <StatusBar style="light" />
        </LeaderboardProvider>
      </QuestProvider>
    </UserProvider>
  );
}
