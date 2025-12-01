const express = require('express');
const router = express.Router();
const leaderboardController = require('../controllers/leaderboard.controller');
const { authenticate } = require('../middleware/auth');

// All routes require authentication
router.use(authenticate);

// Routes
router.get('/', leaderboardController.getOverallLeaderboard);
router.get('/category/:category', leaderboardController.getCategoryLeaderboard);
router.get('/me', leaderboardController.getUserRank);

module.exports = router;
