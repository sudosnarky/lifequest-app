const prisma = require('../config/database');

const getAllAchievements = async (req, res, next) => {
  try {
    const { category } = req.query;

    const where = category ? { category: category.toUpperCase() } : {};

    const achievements = await prisma.achievement.findMany({
      where,
      orderBy: {
        createdAt: 'asc'
      }
    });

    // Check which achievements the user has unlocked
    const userAchievements = await prisma.userAchievement.findMany({
      where: { userId: req.userId },
      select: { achievementId: true, unlockedAt: true }
    });

    const unlockedMap = new Map(
      userAchievements.map(ua => [ua.achievementId, ua.unlockedAt])
    );

    const achievementsWithStatus = achievements.map(achievement => ({
      ...achievement,
      unlocked: unlockedMap.has(achievement.id),
      unlockedAt: unlockedMap.get(achievement.id) || null
    }));

    res.json({ achievements: achievementsWithStatus });
  } catch (error) {
    next(error);
  }
};

const getUserAchievements = async (req, res, next) => {
  try {
    const userAchievements = await prisma.userAchievement.findMany({
      where: { userId: req.userId },
      include: {
        achievement: true
      },
      orderBy: {
        unlockedAt: 'desc'
      }
    });

    res.json({ 
      achievements: userAchievements.map(ua => ({
        ...ua.achievement,
        unlockedAt: ua.unlockedAt
      }))
    });
  } catch (error) {
    next(error);
  }
};

const unlockAchievement = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if achievement exists
    const achievement = await prisma.achievement.findUnique({
      where: { id }
    });

    if (!achievement) {
      return res.status(404).json({ error: 'Achievement not found' });
    }

    // Check if already unlocked
    const existing = await prisma.userAchievement.findUnique({
      where: {
        userId_achievementId: {
          userId: req.userId,
          achievementId: id
        }
      }
    });

    if (existing) {
      return res.status(400).json({ error: 'Achievement already unlocked' });
    }

    // Unlock achievement
    const userAchievement = await prisma.userAchievement.create({
      data: {
        userId: req.userId,
        achievementId: id
      },
      include: {
        achievement: true
      }
    });

    // Award XP if achievement has reward
    if (achievement.xpReward > 0) {
      const user = await prisma.user.findUnique({
        where: { id: req.userId }
      });

      const { calculateLevel, calculateXpToNextLevel } = require('../utils/xpCalculator');
      
      const newTotalXp = user.totalXp + achievement.xpReward;
      const newLevel = calculateLevel(newTotalXp);
      const newCurrentXp = newTotalXp - calculateXpToNextLevel(newLevel - 1);

      await prisma.user.update({
        where: { id: req.userId },
        data: {
          totalXp: newTotalXp,
          level: newLevel,
          currentXp: newCurrentXp
        }
      });
    }

    res.status(201).json({
      message: 'Achievement unlocked',
      achievement: {
        ...userAchievement.achievement,
        unlockedAt: userAchievement.unlockedAt
      },
      xpGained: achievement.xpReward
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllAchievements,
  getUserAchievements,
  unlockAchievement
};
