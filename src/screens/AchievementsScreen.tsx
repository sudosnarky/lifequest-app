import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Achievement, LifeCategory } from '../types';
import { colors, spacing, borderRadius, shadows, typography } from '../theme';

// Mock achievements data
const mockAchievements: Achievement[] = [
  {
    id: 'ach-1',
    title: 'First Steps',
    description: 'Complete your first quest',
    icon: 'footsteps',
    category: 'academics',
    requirement: 'Complete 1 quest',
    unlocked: true,
    unlockedAt: new Date().toISOString(),
  },
  {
    id: 'ach-2',
    title: 'Academic Excellence',
    description: 'Reach Level 5 in Academics',
    icon: 'school',
    category: 'academics',
    requirement: 'Earn 500 Academics XP',
    unlocked: false,
  },
  {
    id: 'ach-3',
    title: 'Fitness Fanatic',
    description: 'Complete 10 fitness quests',
    icon: 'barbell',
    category: 'fitness',
    requirement: 'Complete 10 Fitness quests',
    unlocked: false,
  },
  {
    id: 'ach-4',
    title: 'Creative Mind',
    description: 'Earn 300 Creativity XP',
    icon: 'color-palette',
    category: 'creativity',
    requirement: 'Earn 300 Creativity XP',
    unlocked: false,
  },
  {
    id: 'ach-5',
    title: 'Explorer',
    description: 'Visit 5 new campus locations',
    icon: 'compass',
    category: 'exploration',
    requirement: 'Complete 5 Exploration quests',
    unlocked: true,
    unlockedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'ach-6',
    title: 'Well-Being Warrior',
    description: 'Maintain a 7-day wellness streak',
    icon: 'heart',
    category: 'wellness',
    requirement: 'Complete 7 consecutive Wellness dailies',
    unlocked: false,
  },
  {
    id: 'ach-7',
    title: 'Rising Star',
    description: 'Reach Level 10',
    icon: 'star',
    category: 'academics',
    requirement: 'Reach Level 10',
    unlocked: false,
  },
  {
    id: 'ach-8',
    title: 'Dedicated Student',
    description: 'Complete 100 total quests',
    icon: 'medal',
    category: 'academics',
    requirement: 'Complete 100 quests',
    unlocked: false,
  },
];

type AchievementFilter = 'all' | 'unlocked' | 'locked' | LifeCategory;

export const AchievementsScreen = () => {
  const [selectedFilter, setSelectedFilter] = useState<AchievementFilter>('all');

  const filters: AchievementFilter[] = [
    'all',
    'unlocked',
    'locked',
    'academics',
    'fitness',
    'creativity',
    'exploration',
    'wellness',
  ];

  const filteredAchievements = mockAchievements.filter(achievement => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'unlocked') return achievement.unlocked;
    if (selectedFilter === 'locked') return !achievement.unlocked;
    return achievement.category === selectedFilter;
  });

  const unlockedCount = mockAchievements.filter(a => a.unlocked).length;
  const totalCount = mockAchievements.length;

  const getCategoryColor = (category: LifeCategory | 'general') => {
    if (category === 'general') return colors.navy.main;
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

  const formatFilter = (filter: AchievementFilter): string => {
    return filter.charAt(0).toUpperCase() + filter.slice(1);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Achievements</Text>
        <View style={styles.progressBadge}>
          <Ionicons name="trophy" size={16} color={colors.warning} />
          <Text style={styles.progressText}>
            {unlockedCount}/{totalCount}
          </Text>
        </View>
      </View>

      {/* Filter Pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterScroll}
        contentContainerStyle={styles.filterContainer}
      >
        {filters.map(filter => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterChip,
              selectedFilter === filter && styles.filterChipActive,
            ]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text
              style={[
                styles.filterChipText,
                selectedFilter === filter && styles.filterChipTextActive,
              ]}
            >
              {formatFilter(filter)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Achievements Grid */}
      <ScrollView style={styles.achievementList} contentContainerStyle={styles.achievementListContent}>
        {filteredAchievements.map(achievement => (
          <View
            key={achievement.id}
            style={[
              styles.achievementCard,
              !achievement.unlocked && styles.achievementCardLocked,
            ]}
          >
            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor: achievement.unlocked
                    ? getCategoryColor(achievement.category)
                    : colors.gray[400],
                },
              ]}
            >
              <Ionicons
                name={achievement.icon as any}
                size={32}
                color={colors.white}
              />
            </View>

            <View style={styles.achievementContent}>
              <Text
                style={[
                  styles.achievementTitle,
                  !achievement.unlocked && styles.lockedText,
                ]}
              >
                {achievement.title}
              </Text>
              <Text
                style={[
                  styles.achievementDescription,
                  !achievement.unlocked && styles.lockedText,
                ]}
              >
                {achievement.description}
              </Text>
              <Text style={styles.achievementRequirement}>
                {achievement.requirement}
              </Text>

              {achievement.unlocked && achievement.unlockedAt && (
                <View style={styles.unlockedBadge}>
                  <Ionicons name="checkmark-circle" size={14} color={colors.success} />
                  <Text style={styles.unlockedText}>
                    Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                  </Text>
                </View>
              )}

              {!achievement.unlocked && (
                <View style={styles.lockedBadge}>
                  <Ionicons name="lock-closed" size={14} color={colors.gray[500]} />
                  <Text style={styles.lockedBadgeText}>Locked</Text>
                </View>
              )}
            </View>
          </View>
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
  progressBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.beige.main,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    gap: spacing.xs,
  },
  progressText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold as any,
    color: colors.navy.dark,
  },
  filterScroll: {
    maxHeight: 40,
    marginBottom: spacing.md,
  },
  filterContainer: {
    paddingHorizontal: spacing.lg,
    gap: spacing.xs,
  },
  filterChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    backgroundColor: colors.beige.main,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.navy.light,
  },
  filterChipActive: {
    backgroundColor: colors.navy.main,
    borderColor: colors.navy.main,
  },
  filterChipText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium as any,
    color: colors.navy.main,
  },
  filterChipTextActive: {
    color: colors.white,
  },
  achievementList: {
    flex: 1,
  },
  achievementListContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  achievementCard: {
    flexDirection: 'row',
    backgroundColor: colors.beige.main,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginVertical: spacing.xs,
    ...shadows.sm,
  },
  achievementCardLocked: {
    opacity: 0.6,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold as any,
    color: colors.navy.dark,
    marginBottom: spacing.xs,
  },
  achievementDescription: {
    fontSize: typography.fontSize.sm,
    color: colors.gray[600],
    marginBottom: spacing.xs,
  },
  achievementRequirement: {
    fontSize: typography.fontSize.xs,
    color: colors.gray[500],
    fontStyle: 'italic',
    marginBottom: spacing.xs,
  },
  lockedText: {
    color: colors.gray[500],
  },
  unlockedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  unlockedText: {
    fontSize: typography.fontSize.xs,
    color: colors.success,
    fontWeight: typography.fontWeight.medium as any,
  },
  lockedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  lockedBadgeText: {
    fontSize: typography.fontSize.xs,
    color: colors.gray[500],
    fontWeight: typography.fontWeight.medium as any,
  },
});
