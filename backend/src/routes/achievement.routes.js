const express = require('express');
const router = express.Router();
const achievementController = require('../controllers/achievement.controller');
const { authenticate } = require('../middleware/auth');

// All routes require authentication
router.use(authenticate);

// Routes
router.get('/', achievementController.getAllAchievements);
router.get('/me', achievementController.getUserAchievements);
router.post('/:id/unlock', achievementController.unlockAchievement);

module.exports = router;
