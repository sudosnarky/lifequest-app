const prisma = require('../config/database');

const getOverallLeaderboard = async (req, res, next) => {
  try {
    const { limit = 50 } = req.query;

    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        name: true,
        avatarUri: true,
        avatarColor: true,
        level: true,
        totalXp: true
      },
      orderBy: {
        totalXp: 'desc'
      },
      take: parseInt(limit)
    });

    const leaderboard = users.map((user, index) => ({
      ...user,
      rank: index + 1
    }));

    res.json({ leaderboard });
  } catch (error) {
    next(error);
  }
};

const getCategoryLeaderboard = async (req, res, next) => {
  try {
    const { category } = req.params;
    const { limit = 50 } = req.query;

    const validCategories = ['academics', 'fitness', 'creativity', 'exploration', 'wellness'];
    if (!validCategories.includes(category.toLowerCase())) {
      return res.status(400).json({ error: 'Invalid category' });
    }

    const categoryField = `${category.toLowerCase()}Xp`;

    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        name: true,
        avatarUri: true,
        avatarColor: true,
        level: true,
        [categoryField]: true
      },
      orderBy: {
        [categoryField]: 'desc'
      },
      take: parseInt(limit)
    });

    const leaderboard = users.map((user, index) => ({
      id: user.id,
      username: user.username,
      name: user.name,
      avatarUri: user.avatarUri,
      avatarColor: user.avatarColor,
      level: user.level,
      categoryXp: user[categoryField],
      rank: index + 1
    }));

    res.json({ category, leaderboard });
  } catch (error) {
    next(error);
  }
};

const getUserRank = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get overall rank
    const overallRank = await prisma.user.count({
      where: {
        totalXp: { gt: user.totalXp }
      }
    }) + 1;

    // Get category ranks
    const categoryRanks = {};
    const categories = ['academics', 'fitness', 'creativity', 'exploration', 'wellness'];
    
    for (const category of categories) {
      const categoryField = `${category}Xp`;
      const rank = await prisma.user.count({
        where: {
          [categoryField]: { gt: user[categoryField] }
        }
      }) + 1;
      categoryRanks[category] = rank;
    }

    res.json({
      overall: overallRank,
      categories: categoryRanks
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOverallLeaderboard,
  getCategoryLeaderboard,
  getUserRank
};
