import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { QuestCard } from '../components/QuestCard';
import { useQuests } from '../contexts/QuestContext';
import { useUser } from '../contexts/UserContext';
import { Quest, LifeCategory } from '../types';
import { colors, spacing, borderRadius, typography } from '../theme';

type QuestTab = 'daily' | 'weekly';

export const QuestsScreen = () => {
  const { quests, completeQuest, toggleQuestComplete } = useQuests();
  const { gainExperience } = useUser();
  const [activeTab, setActiveTab] = useState<QuestTab>('daily');
  const [selectedCategory, setSelectedCategory] = useState<LifeCategory | 'all'>('all');

  const categories: (LifeCategory | 'all')[] = [
    'all',
    'academics',
    'fitness',
    'creativity',
    'exploration',
    'wellness',
  ];

  const filteredQuests = quests.filter(quest => {
    const matchesType = quest.type === activeTab;
    const matchesCategory = selectedCategory === 'all' || quest.category === selectedCategory;
    return matchesType && matchesCategory;
  });

  const handleCompleteQuest = async (questId: string) => {
    const quest = quests.find(q => q.id === questId);
    if (!quest || quest.completed) return;

    const { xp, category } = await completeQuest(questId);
    gainExperience(xp, category);
    
    // TODO: Show celebration animation or toast
  };

  const getCategoryColor = (category: LifeCategory | 'all') => {
    if (category === 'all') return colors.navy.main;
    
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
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>My Quests</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>

      {/* Tab Selector */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'daily' && styles.activeTab]}
          onPress={() => setActiveTab('daily')}
        >
          <Ionicons
            name="today"
            size={20}
            color={activeTab === 'daily' ? colors.white : colors.navy.main}
          />
          <Text
            style={[styles.tabText, activeTab === 'daily' && styles.activeTabText]}
          >
            Daily
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'weekly' && styles.activeTab]}
          onPress={() => setActiveTab('weekly')}
        >
          <Ionicons
            name="calendar"
            size={20}
            color={activeTab === 'weekly' ? colors.white : colors.navy.main}
          />
          <Text
            style={[styles.tabText, activeTab === 'weekly' && styles.activeTabText]}
          >
            Weekly
          </Text>
        </TouchableOpacity>
      </View>

      {/* Category Filter */}
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
              selectedCategory === category && {
                backgroundColor: getCategoryColor(category),
              },
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryChipText,
                selectedCategory === category && styles.categoryChipTextActive,
              ]}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Quest List */}
      <ScrollView style={styles.questList} contentContainerStyle={styles.questListContent}>
        {filteredQuests.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="checkmark-circle-outline" size={64} color={colors.gray[400]} />
            <Text style={styles.emptyStateText}>
              No {activeTab} quests{selectedCategory !== 'all' && ` in ${selectedCategory}`}
            </Text>
            <Text style={styles.emptyStateSubtext}>
              Tap the + button to add a new quest
            </Text>
          </View>
        ) : (
          filteredQuests.map(quest => (
            <QuestCard
              key={quest.id}
              quest={quest}
              onPress={() => {}}
              onComplete={() => handleCompleteQuest(quest.id)}
            />
          ))
        )}
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
  addButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    backgroundColor: colors.navy.main,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    backgroundColor: colors.beige.main,
    borderRadius: borderRadius.md,
    gap: spacing.xs,
  },
  activeTab: {
    backgroundColor: colors.navy.main,
  },
  tabText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold as any,
    color: colors.navy.main,
  },
  activeTabText: {
    color: colors.white,
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
  questList: {
    flex: 1,
  },
  questListContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing['3xl'],
  },
  emptyStateText: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold as any,
    color: colors.gray[600],
    marginTop: spacing.md,
  },
  emptyStateSubtext: {
    fontSize: typography.fontSize.sm,
    color: colors.gray[500],
    marginTop: spacing.xs,
  },
});
