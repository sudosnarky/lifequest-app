import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../theme';

interface StatsBarProps {
  label: string;
  value: number;
  maxValue: number;
  color: string;
  icon?: string;
}

export const StatsBar: React.FC<StatsBarProps> = ({
  label,
  value,
  maxValue,
  color,
}) => {
  const percentage = Math.min((value / maxValue) * 100, 100);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>
          {Math.round(value)} / {maxValue}
        </Text>
      </View>
      <View style={styles.barContainer}>
        <View
          style={[
            styles.barFill,
            {
              width: `${percentage}%`,
              backgroundColor: color,
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  label: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium as any,
    color: colors.navy.dark,
  },
  value: {
    fontSize: typography.fontSize.sm,
    color: colors.gray[600],
  },
  barContainer: {
    height: 24,
    backgroundColor: colors.beige.dark,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: borderRadius.md,
  },
});

interface AvatarStatsProps {
  level: number;
  currentXp: number;
  xpToNextLevel: number;
  totalXp: number;
  categoryXp: {
    academics: number;
    fitness: number;
    creativity: number;
    exploration: number;
    wellness: number;
  };
}

export const AvatarStats: React.FC<AvatarStatsProps> = ({
  level,
  currentXp,
  xpToNextLevel,
  totalXp,
  categoryXp,
}) => {
  const getCategoryColor = (category: string) => {
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

  return (
    <View style={avatarStyles.container}>
      <View style={avatarStyles.levelContainer}>
        <Text style={avatarStyles.levelLabel}>Level</Text>
        <Text style={avatarStyles.levelValue}>{level}</Text>
      </View>

      <View style={avatarStyles.statsContainer}>
        <StatsBar
          label="Experience"
          value={currentXp}
          maxValue={xpToNextLevel}
          color={colors.experience}
        />
        
        <View style={avatarStyles.totalXpContainer}>
          <Text style={avatarStyles.totalXpLabel}>Total XP</Text>
          <Text style={avatarStyles.totalXpValue}>{totalXp}</Text>
        </View>

        <View style={avatarStyles.categoryContainer}>
          <Text style={avatarStyles.categoryTitle}>Category XP</Text>
          {Object.entries(categoryXp).map(([category, xp]) => (
            <View key={category} style={avatarStyles.categoryRow}>
              <Text style={avatarStyles.categoryLabel}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Text>
              <View style={avatarStyles.categoryXpBadge}>
                <Text style={[avatarStyles.categoryXpText, { color: getCategoryColor(category) }]}>
                  {xp} XP
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const avatarStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.beige.main,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
  },
  levelContainer: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  levelLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.gray[600],
    marginBottom: spacing.xs,
  },
  levelValue: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold as any,
    color: colors.navy.dark,
  },
  statsContainer: {
    gap: spacing.md,
  },
  totalXpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.beige.dark,
    padding: spacing.sm,
    borderRadius: borderRadius.md,
  },
  totalXpLabel: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium as any,
    color: colors.navy.dark,
  },
  totalXpValue: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold as any,
    color: colors.navy.main,
  },
  categoryContainer: {
    backgroundColor: colors.beige.light,
    padding: spacing.sm,
    borderRadius: borderRadius.md,
  },
  categoryTitle: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold as any,
    color: colors.navy.dark,
    marginBottom: spacing.xs,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  categoryLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.gray[600],
  },
  categoryXpBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    backgroundColor: colors.white,
    borderRadius: borderRadius.sm,
  },
  categoryXpText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold as any,
  },
});
