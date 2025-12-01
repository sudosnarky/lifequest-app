const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { body } = require('express-validator');

// Validation middleware
const registerValidation = [
  body('email').isEmail().normalizeEmail(),
  body('username').trim().isLength({ min: 3, max: 20 }).isAlphanumeric(),
  body('password').isLength({ min: 6 }),
  body('name').trim().isLength({ min: 1, max: 50 })
];

const loginValidation = [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty()
];

// Routes
router.post('/register', registerValidation, authController.register);
router.post('/login', loginValidation, authController.login);

module.exports = router;
