import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Quest, DailyQuest, WeeklyQuest, LifeCategory, QuestDifficulty } from '../types';
import { colors, spacing, borderRadius, shadows, typography } from '../theme';

interface QuestCardProps {
  quest: Quest;
  onPress: () => void;
  onComplete?: () => void;
}

export const QuestCard: React.FC<QuestCardProps> = ({ quest, onPress, onComplete }) => {
  const getCategoryColor = () => {
    switch (quest.category) {
      case 'academics':
        return colors.navy.main;
      case 'fitness':
        return '#e74c3c'; // Red
      case 'creativity':
        return '#9b59b6'; // Purple
      case 'exploration':
        return '#3498db'; // Blue
      case 'wellness':
        return '#2ecc71'; // Green
      default:
        return colors.navy.main;
    }
  };

  const getDifficultyIcon = () => {
    switch (quest.difficulty) {
      case QuestDifficulty.EASY:
        return 'star-outline';
      case QuestDifficulty.MEDIUM:
        return 'star-half-outline';
      case QuestDifficulty.HARD:
        return 'star';
      case QuestDifficulty.EPIC:
        return 'sparkles';
      default:
        return 'star-outline';
    }
  };

  const formatCategory = (category: LifeCategory): string => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  const renderQuestInfo = () => {
    if (quest.type === 'daily') {
      const dailyQuest = quest as DailyQuest;
      return (
        <View style={styles.infoRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Daily</Text>
          </View>
          {dailyQuest.streak > 0 && (
            <View style={[styles.badge, { backgroundColor: colors.success }]}>
              <Ionicons name="flame" size={12} color={colors.white} />
              <Text style={styles.badgeText}>{dailyQuest.streak}</Text>
            </View>
          )}
        </View>
      );
    }

    if (quest.type === 'weekly') {
      const weeklyQuest = quest as WeeklyQuest;
      const dueDate = new Date(weeklyQuest.dueDate);
      const daysLeft = Math.ceil((dueDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
      
      return (
        <View style={styles.infoRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Weekly</Text>
          </View>
          {daysLeft >= 0 && (
            <View style={[styles.badge, { backgroundColor: daysLeft <= 2 ? colors.danger : colors.navy.light }]}>
              <Ionicons name="time-outline" size={12} color={colors.white} />
              <Text style={styles.badgeText}>{daysLeft}d</Text>
            </View>
          )}
        </View>
      );
    }

    return null;
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={[styles.colorBar, { backgroundColor: getCategoryColor() }]} />
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <View style={styles.header}>
            <Text style={[styles.title, quest.completed && styles.completedText]}>
              {quest.title}
            </Text>
            <Ionicons 
              name={getDifficultyIcon()} 
              size={16} 
              color={getCategoryColor()} 
            />
          </View>
          
          {quest.description && (
            <Text style={styles.description}>{quest.description}</Text>
          )}
          
          <View style={styles.footer}>
            <View style={styles.categoryBadge}>
              <Text style={[styles.categoryText, { color: getCategoryColor() }]}>
                {formatCategory(quest.category)}
              </Text>
            </View>
            
            {renderQuestInfo()}
            
            <View style={styles.xpBadge}>
              <Ionicons name="flash" size={12} color={colors.warning} />
              <Text style={styles.xpText}>{quest.xpReward} XP</Text>
            </View>
          </View>
        </View>
        
        <TouchableOpacity
          style={[
            styles.completeButton,
            quest.completed && styles.completeButtonCompleted,
          ]}
          onPress={onComplete}
        >
          {quest.completed && (
            <Ionicons name="checkmark" size={24} color={colors.white} />
          )}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.beige.main,
    borderRadius: borderRadius.md,
    marginVertical: spacing.xs,
    overflow: 'hidden',
    ...shadows.sm,
  },
  colorBar: {
    width: 4,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    padding: spacing.md,
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  title: {
    flex: 1,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold as any,
    color: colors.navy.dark,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: colors.gray[500],
  },
  description: {
    fontSize: typography.fontSize.sm,
    color: colors.gray[600],
    marginBottom: spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  categoryBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    backgroundColor: colors.beige.light,
    borderRadius: borderRadius.sm,
  },
  categoryText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold as any,
  },
  infoRow: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    backgroundColor: colors.navy.light,
    borderRadius: borderRadius.sm,
    gap: 2,
  },
  badgeText: {
    fontSize: typography.fontSize.xs,
    color: colors.white,
    fontWeight: typography.fontWeight.medium as any,
  },
  xpBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    backgroundColor: colors.warning + '20',
    borderRadius: borderRadius.sm,
    gap: 2,
  },
  xpText: {
    fontSize: typography.fontSize.xs,
    color: colors.warning,
    fontWeight: typography.fontWeight.semibold as any,
  },
  completeButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    borderWidth: 2,
    borderColor: colors.navy.light,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.transparent,
    marginLeft: spacing.sm,
  },
  completeButtonCompleted: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
});
