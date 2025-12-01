const prisma = require('../config/database');
const { calculateLevel, calculateXpToNextLevel } = require('../utils/xpCalculator');

const getProfile = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      include: {
        badges: true,
        achievements: {
          include: {
            achievement: true
          }
        }
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { name, avatarUri, avatarColor } = req.body;
    
    const user = await prisma.user.update({
      where: { id: req.userId },
      data: {
        ...(name && { name }),
        ...(avatarUri !== undefined && { avatarUri }),
        ...(avatarColor && { avatarColor })
      },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        avatarUri: true,
        avatarColor: true,
        level: true,
        currentXp: true,
        totalXp: true
      }
    });

    res.json({ user });
  } catch (error) {
    next(error);
  }
};

const updateAvatar = async (req, res, next) => {
  try {
    const { avatarUri, avatarColor } = req.body;
    
    const user = await prisma.user.update({
      where: { id: req.userId },
      data: {
        ...(avatarUri !== undefined && { avatarUri }),
        ...(avatarColor && { avatarColor })
      }
    });

    res.json({ message: 'Avatar updated', avatarUri: user.avatarUri, avatarColor: user.avatarColor });
  } catch (error) {
    next(error);
  }
};

const gainExperience = async (req, res, next) => {
  try {
    const { amount, category } = req.body;

    if (!amount || amount < 0) {
      return res.status(400).json({ error: 'Invalid XP amount' });
    }

    // Get current user
    const currentUser = await prisma.user.findUnique({
      where: { id: req.userId }
    });

    const newTotalXp = currentUser.totalXp + amount;
    const newLevel = calculateLevel(newTotalXp);
    const newCurrentXp = newTotalXp - calculateXpToNextLevel(newLevel - 1);

    // Prepare update data
    const updateData = {
      totalXp: newTotalXp,
      level: newLevel,
      currentXp: newCurrentXp
    };

    // Add category XP if provided
    if (category) {
      const categoryField = `${category.toLowerCase()}Xp`;
      if (['academicsXp', 'fitnessXp', 'creativityXp', 'explorationXp', 'wellnessXp'].includes(categoryField)) {
        updateData[categoryField] = currentUser[categoryField] + amount;
      }
    }

    const user = await prisma.user.update({
      where: { id: req.userId },
      data: updateData
    });

    res.json({ 
      message: 'XP gained',
      newLevel: user.level,
      leveledUp: user.level > currentUser.level,
      currentXp: user.currentXp,
      totalXp: user.totalXp
    });
  } catch (error) {
    next(error);
  }
};

const addBadge = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Badge name is required' });
    }

    const badge = await prisma.badge.create({
      data: {
        userId: req.userId,
        name
      }
    });

    res.status(201).json({ badge });
  } catch (error) {
    next(error);
  }
};

const getStats = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: {
        level: true,
        currentXp: true,
        totalXp: true,
        academicsXp: true,
        fitnessXp: true,
        creativityXp: true,
        explorationXp: true,
        wellnessXp: true
      }
    });

    const xpToNextLevel = calculateXpToNextLevel(user.level);

    res.json({
      stats: {
        ...user,
        xpToNextLevel,
        categoryXp: {
          academics: user.academicsXp,
          fitness: user.fitnessXp,
          creativity: user.creativityXp,
          exploration: user.explorationXp,
          wellness: user.wellnessXp
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfile,
  updateProfile,
  updateAvatar,
  gainExperience,
  addBadge,
  getStats
};
