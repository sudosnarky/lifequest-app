import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LeaderboardEntry } from '../types';
import { colors, spacing, borderRadius, shadows, typography } from '../theme';

interface LeaderboardCardProps {
  entry: LeaderboardEntry;
  isCurrentUser?: boolean;
}

export const LeaderboardCard: React.FC<LeaderboardCardProps> = ({ entry, isCurrentUser }) => {
  const getRankColor = () => {
    switch (entry.rank) {
      case 1:
        return '#FFD700'; // Gold
      case 2:
        return '#C0C0C0'; // Silver
      case 3:
        return '#CD7F32'; // Bronze
      default:
        return colors.navy.light;
    }
  };

  const getRankIcon = () => {
    switch (entry.rank) {
      case 1:
        return 'trophy';
      case 2:
        return 'medal';
      case 3:
        return 'medal-outline';
      default:
        return null;
    }
  };

  return (
    <View style={[
      styles.container,
      isCurrentUser && styles.currentUserContainer,
    ]}>
      <View style={[styles.rankBadge, { backgroundColor: getRankColor() }]}>
        {entry.rank <= 3 && getRankIcon() ? (
          <Ionicons name={getRankIcon()!} size={20} color={colors.white} />
        ) : (
          <Text style={styles.rankText}>#{entry.rank}</Text>
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.name, isCurrentUser && styles.currentUserName]}>
            {entry.name}
            {isCurrentUser && ' (You)'}
          </Text>
          <View style={styles.levelBadge}>
            <Text style={styles.levelText}>Lvl {entry.level}</Text>
          </View>
        </View>

        <View style={styles.xpContainer}>
          <Ionicons name="flash" size={16} color={colors.warning} />
          <Text style={styles.xpText}>{entry.totalXp} Total XP</Text>
        </View>

        <View style={styles.categoriesContainer}>
          {Object.entries(entry.categoryXp)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 3)
            .map(([category, xp]) => (
              <View key={category} style={styles.categoryPill}>
                <Text style={styles.categoryPillText}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}: {xp}
                </Text>
              </View>
            ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.beige.main,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginVertical: spacing.xs,
    alignItems: 'center',
    ...shadows.sm,
  },
  currentUserContainer: {
    backgroundColor: colors.navy.light + '15',
    borderWidth: 2,
    borderColor: colors.navy.light,
  },
  rankBadge: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  rankText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold as any,
    color: colors.white,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  name: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold as any,
    color: colors.navy.dark,
    flex: 1,
  },
  currentUserName: {
    color: colors.navy.main,
    fontWeight: typography.fontWeight.bold as any,
  },
  levelBadge: {
    backgroundColor: colors.navy.main,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  levelText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold as any,
    color: colors.white,
  },
  xpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    gap: spacing.xs,
  },
  xpText: {
    fontSize: typography.fontSize.sm,
    color: colors.gray[600],
    fontWeight: typography.fontWeight.medium as any,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  categoryPill: {
    backgroundColor: colors.beige.light,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  categoryPillText: {
    fontSize: typography.fontSize.xs,
    color: colors.navy.dark,
  },
});
