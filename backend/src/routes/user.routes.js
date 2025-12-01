const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authenticate } = require('../middleware/auth');

// All routes require authentication
router.use(authenticate);

// Routes
router.get('/me', userController.getProfile);
router.put('/me', userController.updateProfile);
router.post('/me/avatar', userController.updateAvatar);
router.post('/me/xp', userController.gainExperience);
router.post('/me/badges', userController.addBadge);
router.get('/me/stats', userController.getStats);

module.exports = router;
