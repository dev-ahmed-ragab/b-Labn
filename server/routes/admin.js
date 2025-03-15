const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

// لوحة التحكم الخاصة بالإداري
router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    const products = await Product.find();
    const users = await User.find({}, { password: 0 }); // استبعاد كلمة المرور
    res.json({ message: 'Welcome to the admin dashboard!', products, users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// جلب جميع المستخدمين
router.get('/users', authMiddleware, async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }); // استبعاد كلمة المرور
    res.json({ message: 'Users retrieved successfully!', users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

module.exports = router;
