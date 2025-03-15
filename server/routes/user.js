const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
// تأكد أن authMiddleware هو دالة استدعاء
router.get('/profile', authMiddleware, (req, res) => {
  res.json({ message: 'Welcome to your profile!', user: req.user });
});

module.exports = router;
