const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const User = require('../models/User');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

// لوحة التحكم الخاصة بالإداري
router.get('/dashboard', [authMiddleware, adminMiddleware], async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    const users = await User.find({}, { password: 0 }).sort({ createdAt: -1 });
    res.json({ message: 'Welcome to the admin dashboard!', products, users });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// جلب جميع المستخدمين (للمشرفين فقط)
router.get('/users', [authMiddleware, adminMiddleware], async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }).sort({ createdAt: -1 });
    res.json({ message: 'Users retrieved successfully!', users });
  } catch (error) {
    console.error('Fetch users error:', error);
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// حذف مستخدم (للمشرفين فقط)
router.delete('/users/:id', [authMiddleware, adminMiddleware], async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user.id === id) {
      return res.status(400).json({ message: 'You cannot delete your own admin account.' });
    }

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json({ message: 'User deleted successfully!' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

module.exports = router;
