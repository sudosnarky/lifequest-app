const prisma = require('../config/database');
const { calculateXpReward } = require('../utils/xpCalculator');

const getQuests = async (req, res, next) => {
  try {
    const { type, category, completed } = req.query;

    const where = {
      userId: req.userId,
      ...(type && { type: type.toUpperCase() }),
      ...(category && { category: category.toUpperCase() }),
      ...(completed !== undefined && { completed: completed === 'true' })
    };

    const quests = await prisma.quest.findMany({
      where,
      orderBy: [
        { completed: 'asc' },
        { createdAt: 'desc' }
      ]
    });

    res.json({ quests });
  } catch (error) {
    next(error);
  }
};

const getQuest = async (req, res, next) => {
  try {
    const { id } = req.params;

    const quest = await prisma.quest.findFirst({
      where: {
        id,
        userId: req.userId
      }
    });

    if (!quest) {
      return res.status(404).json({ error: 'Quest not found' });
    }

    res.json({ quest });
  } catch (error) {
    next(error);
  }
};

const createQuest = async (req, res, next) => {
  try {
    const { title, description, category, type, difficulty, dueDate } = req.body;

    if (!title || !category || !type || !difficulty) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const xpReward = calculateXpReward(difficulty);

    const quest = await prisma.quest.create({
      data: {
        userId: req.userId,
        title,
        description,
        category: category.toUpperCase(),
        type: type.toUpperCase(),
        difficulty: difficulty.toUpperCase(),
        xpReward,
        ...(dueDate && { dueDate: new Date(dueDate) })
      }
    });

    res.status(201).json({ quest });
  } catch (error) {
    next(error);
  }
};

const updateQuest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, category, difficulty, dueDate } = req.body;

    // Verify ownership
    const existingQuest = await prisma.quest.findFirst({
      where: { id, userId: req.userId }
    });

    if (!existingQuest) {
      return res.status(404).json({ error: 'Quest not found' });
    }

    const updateData = {
      ...(title && { title }),
      ...(description !== undefined && { description }),
      ...(category && { category: category.toUpperCase() }),
      ...(dueDate && { dueDate: new Date(dueDate) })
    };

    if (difficulty) {
      updateData.difficulty = difficulty.toUpperCase();
      updateData.xpReward = calculateXpReward(difficulty);
    }

    const quest = await prisma.quest.update({
      where: { id },
      data: updateData
    });

    res.json({ quest });
  } catch (error) {
    next(error);
  }
};

const deleteQuest = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.quest.deleteMany({
      where: {
        id,
        userId: req.userId
      }
    });

    res.json({ message: 'Quest deleted' });
  } catch (error) {
    next(error);
  }
};

const completeQuest = async (req, res, next) => {
  try {
    const { id } = req.params;

    const quest = await prisma.quest.findFirst({
      where: {
        id,
        userId: req.userId
      }
    });

    if (!quest) {
      return res.status(404).json({ error: 'Quest not found' });
    }

    if (quest.completed) {
      return res.status(400).json({ error: 'Quest already completed' });
    }

    // Update quest
    const updatedQuest = await prisma.quest.update({
      where: { id },
      data: {
        completed: true,
        completedAt: new Date(),
        ...(quest.type === 'DAILY' && { streak: quest.streak + 1 })
      }
    });

    // Award XP to user
    const user = await prisma.user.findUnique({
      where: { id: req.userId }
    });

    const { calculateLevel, calculateXpToNextLevel } = require('../utils/xpCalculator');
    
    const newTotalXp = user.totalXp + quest.xpReward;
    const newLevel = calculateLevel(newTotalXp);
    const newCurrentXp = newTotalXp - calculateXpToNextLevel(newLevel - 1);

    const categoryField = `${quest.category.toLowerCase()}Xp`;
    const updatedUser = await prisma.user.update({
      where: { id: req.userId },
      data: {
        totalXp: newTotalXp,
        level: newLevel,
        currentXp: newCurrentXp,
        [categoryField]: user[categoryField] + quest.xpReward
      }
    });

    res.json({
      quest: updatedQuest,
      xpGained: quest.xpReward,
      category: quest.category,
      leveledUp: updatedUser.level > user.level,
      newLevel: updatedUser.level
    });
  } catch (error) {
    next(error);
  }
};

const resetDailyQuests = async (req, res, next) => {
  try {
    // Reset streaks for incomplete daily quests
    await prisma.quest.updateMany({
      where: {
        userId: req.userId,
        type: 'DAILY',
        completed: false
      },
      data: {
        streak: 0
      }
    });

    // Mark all daily quests as incomplete
    await prisma.quest.updateMany({
      where: {
        userId: req.userId,
        type: 'DAILY'
      },
      data: {
        completed: false,
        completedAt: null
      }
    });

    res.json({ message: 'Daily quests reset' });
  } catch (error) {
    next(error);
  }
};

const resetWeeklyQuests = async (req, res, next) => {
  try {
    // Mark all weekly quests as incomplete
    await prisma.quest.updateMany({
      where: {
        userId: req.userId,
        type: 'WEEKLY'
      },
      data: {
        completed: false,
        completedAt: null
      }
    });

    res.json({ message: 'Weekly quests reset' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getQuests,
  getQuest,
  createQuest,
  updateQuest,
  deleteQuest,
  completeQuest,
  resetDailyQuests,
  resetWeeklyQuests
};
