const express = require('express');
const router = express.Router();
const questController = require('../controllers/quest.controller');
const { authenticate } = require('../middleware/auth');

// All routes require authentication
router.use(authenticate);

// Routes
router.get('/', questController.getQuests);
router.get('/:id', questController.getQuest);
router.post('/', questController.createQuest);
router.put('/:id', questController.updateQuest);
router.delete('/:id', questController.deleteQuest);
router.post('/:id/complete', questController.completeQuest);
router.post('/daily/reset', questController.resetDailyQuests);
router.post('/weekly/reset', questController.resetWeeklyQuests);

module.exports = router;
