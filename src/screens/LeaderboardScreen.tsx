import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LeaderboardCard } from '../components/LeaderboardCard';
import { useLeaderboard } from '../contexts/LeaderboardContext';
import { useUser } from '../contexts/UserContext';
import { LifeCategory } from '../types';
import { colors, spacing, borderRadius, typography } from '../theme';

type LeaderboardView = 'overall' | LifeCategory;

export const LeaderboardScreen = () => {
  const { leaderboard, getLeaderboardByCategory, getUserRank } = useLeaderboard();
  const { user } = useUser();
  const [activeView, setActiveView] = useState<LeaderboardView>('overall');
  const [categoryLeaderboard, setCategoryLeaderboard] = useState<any[]>([]);
  const [userRank, setUserRank] = useState(0);

  const categories: LeaderboardView[] = [
    'overall',
    'academics',
    'fitness',
    'creativity',
    'exploration',
    'wellness',
  ];

  useEffect(() => {
    if (activeView !== 'overall') {
      getLeaderboardByCategory(activeView).then(setCategoryLeaderboard);
    }
    if (user) {
      getUserRank().then(result => {
        if (activeView === 'overall') {
          setUserRank(result.overall);
        } else {
          setUserRank(result.categories[activeView] || 0);
        }
      });
    }
  }, [activeView, user]);

  const displayLeaderboard = activeView === 'overall' 
    ? leaderboard 
    : categoryLeaderboard;

  const currentUserRank = userRank;

  const getCategoryColor = (category: LeaderboardView) => {
    if (category === 'overall') return colors.navy.main;
    
    switch (category) {
      case 'academics':
        return colors.navy.main;
      case 'fitness':
        return '#e74c3c';
      case 'creativity':
        return '#9b59b6';
      case 'exploration':
        return '#3498db';
      case 'wellness':
        return '#2ecc71';
      default:
        return colors.navy.main;
    }
  };

  const formatCategory = (category: LeaderboardView): string => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Leaderboard</Text>
        <View style={styles.rankBadge}>
          <Ionicons name="trophy" size={16} color={colors.warning} />
          <Text style={styles.rankText}>Rank #{currentUserRank}</Text>
        </View>
      </View>

      {/* Category Selector */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
        contentContainerStyle={styles.categoryContainer}
      >
        {categories.map(category => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryChip,
              activeView === category && {
                backgroundColor: getCategoryColor(category),
              },
            ]}
            onPress={() => setActiveView(category)}
          >
            <Text
              style={[
                styles.categoryChipText,
                activeView === category && styles.categoryChipTextActive,
              ]}
            >
              {formatCategory(category)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Leaderboard List */}
      <ScrollView style={styles.leaderboardList} contentContainerStyle={styles.leaderboardListContent}>
        <View style={styles.infoCard}>
          <Ionicons name="information-circle" size={20} color={colors.navy.main} />
          <Text style={styles.infoText}>
            Rankings update based on {activeView === 'overall' ? 'total XP' : `${activeView} XP`}
          </Text>
        </View>

        {displayLeaderboard.map(entry => (
          <LeaderboardCard
            key={entry.userId}
            entry={entry}
            isCurrentUser={entry.userId === user?.id}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.beige.light,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  title: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold as any,
    color: colors.navy.dark,
  },
  rankBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.beige.main,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    gap: spacing.xs,
  },
  rankText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold as any,
    color: colors.navy.dark,
  },
  categoryScroll: {
    maxHeight: 40,
    marginBottom: spacing.md,
  },
  categoryContainer: {
    paddingHorizontal: spacing.lg,
    gap: spacing.xs,
  },
  categoryChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    backgroundColor: colors.beige.main,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.navy.light,
  },
  categoryChipText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium as any,
    color: colors.navy.main,
  },
  categoryChipTextActive: {
    color: colors.white,
  },
  leaderboardList: {
    flex: 1,
  },
  leaderboardListContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.navy.main + '15',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  infoText: {
    flex: 1,
    fontSize: typography.fontSize.sm,
    color: colors.navy.dark,
  },
});
