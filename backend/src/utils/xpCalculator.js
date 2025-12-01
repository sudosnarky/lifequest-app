/**
 * XP and Level Calculation Utilities
 */

// XP formula: XP needed for level N = 100 * N
const calculateXpToNextLevel = (currentLevel) => {
  return 100 * (currentLevel + 1);
};

// Calculate current level based on total XP
const calculateLevel = (totalXp) => {
  let level = 1;
  let xpRequired = 0;
  
  while (xpRequired + calculateXpToNextLevel(level - 1) <= totalXp) {
    xpRequired += calculateXpToNextLevel(level - 1);
    level++;
  }
  
  return level;
};

// Calculate XP reward based on quest difficulty
const calculateXpReward = (difficulty) => {
  const rewards = {
    EASY: 10,
    MEDIUM: 20,
    HARD: 35,
    EPIC: 50
  };
  
  return rewards[difficulty.toUpperCase()] || 10;
};

module.exports = {
  calculateLevel,
  calculateXpToNextLevel,
  calculateXpReward
};
