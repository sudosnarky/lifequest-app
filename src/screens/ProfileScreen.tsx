import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AvatarStats } from '../components/StatsBar';
import { useUser } from '../contexts/UserContext';
import { useLeaderboard } from '../contexts/LeaderboardContext';
import { colors, spacing, typography, borderRadius, shadows } from '../theme';

const ProfileScreen: React.FC = () => {
  const { user } = useUser();
  const { getUserRank } = useLeaderboard();
  const [currentRank, setCurrentRank] = useState(0);

  useEffect(() => {
    if (user) {
      getUserRank().then(result => setCurrentRank(result.overall));
    }
  }, [user]);

  if (!user) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={[
            styles.avatarPlaceholder,
            { backgroundColor: user.avatar.color || colors.navy.main }
          ]}>
            {user.avatar.uri ? (
              <Text>Image</Text>
            ) : (
              <Text style={styles.avatarText}>
                {user.name.charAt(0).toUpperCase()}
              </Text>
            )}
          </View>
          <Text style={styles.profileName}>{user.name}</Text>
          
          <View style={styles.rankContainer}>
            <Ionicons name="trophy" size={20} color={colors.warning} />
            <Text style={styles.rankText}>Rank #{currentRank}</Text>
          </View>
        </View>

        {/* Stats Card */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Progress</Text>
          <AvatarStats
            level={user.stats.level}
            currentXp={user.stats.currentXp}
            xpToNextLevel={user.stats.xpToNextLevel}
            totalXp={user.stats.totalXp}
            categoryXp={user.stats.categoryXp}
          />
        </View>

        {/* Badges Card */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Badges</Text>
            <View style={styles.badgeCount}>
              <Text style={styles.badgeCountText}>{user.badges.length}</Text>
            </View>
          </View>
          
          <View style={styles.badgesCard}>
            {user.badges.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="ribbon-outline" size={48} color={colors.gray[400]} />
                <Text style={styles.emptyStateText}>
                  No badges yet. Complete quests to earn badges!
                </Text>
              </View>
            ) : (
              <View style={styles.badgesGrid}>
                {user.badges.map((badge, index) => (
                  <View key={index} style={styles.badgeItem}>
                    <View style={styles.badgeIcon}>
                      <Ionicons name="ribbon" size={24} color={colors.navy.main} />
                    </View>
                    <Text style={styles.badgeText}>{badge}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* Settings Card */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.settingsCard}>
            <TouchableOpacity style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <Ionicons name="person-outline" size={20} color={colors.navy.main} />
                <Text style={styles.settingLabel}>Edit Profile</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.gray[400]} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <Ionicons name="notifications-outline" size={20} color={colors.navy.main} />
                <Text style={styles.settingLabel}>Notifications</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.gray[400]} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <Ionicons name="color-palette-outline" size={20} color={colors.navy.main} />
                <Text style={styles.settingLabel}>Customize Avatar</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.gray[400]} />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.settingRow, styles.lastSettingRow]}>
              <View style={styles.settingLeft}>
                <Ionicons name="help-circle-outline" size={20} color={colors.navy.main} />
                <Text style={styles.settingLabel}>Help & Support</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.gray[400]} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.beige.light,
  },
  content: {
    padding: spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
    backgroundColor: colors.beige.main,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    ...shadows.sm,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  avatarText: {
    fontSize: typography.fontSize['4xl'],
    color: colors.white,
    fontWeight: typography.fontWeight.bold as any,
  },
  profileName: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold as any,
    color: colors.navy.dark,
    marginBottom: spacing.sm,
  },
  rankContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.beige.dark,
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
  section: {
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold as any,
    color: colors.navy.dark,
  },
  badgeCount: {
    backgroundColor: colors.navy.main,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeCountText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold as any,
    color: colors.white,
  },
  badgesCard: {
    backgroundColor: colors.beige.main,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    ...shadows.sm,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  emptyStateText: {
    fontSize: typography.fontSize.base,
    color: colors.gray[600],
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  badgeItem: {
    alignItems: 'center',
    width: 80,
  },
  badgeIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.beige.dark,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  badgeText: {
    fontSize: typography.fontSize.xs,
    color: colors.navy.dark,
    textAlign: 'center',
  },
  settingsCard: {
    backgroundColor: colors.beige.main,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.sm,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.beige.dark,
  },
  lastSettingRow: {
    borderBottomWidth: 0,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  settingLabel: {
    fontSize: typography.fontSize.base,
    color: colors.navy.dark,
  },
});

export default ProfileScreen;
