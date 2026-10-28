const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// إنشاء حساب جديد
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'يرجى إدخال اسم المستخدم، البريد الإلكتروني، وكلمة المرور.' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'كلمة المرور يجب أن لا تقل عن 6 أحرف.' });
  }

  try {
    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase().trim() }, { username: username.trim() }],
    });

    if (existingUser) {
      const isEmail = existingUser.email === email.toLowerCase().trim();
      return res.status(400).json({
        message: isEmail
          ? 'البريد الإلكتروني مسجل بالفعل.'
          : 'اسم المستخدم مستخدم بالفعل.',
      });
    }

    const user = new User({
      username: username.trim(),
      email: email.toLowerCase().trim(),
      password,
      role: 'user', // دائماً مستخدم عادي عند التسجيل العام
    });

    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role, username: user.username },
      process.env.JWT_SECRET || 'b-labn-fallback-secret-2026',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'تم إنشاء الحساب بنجاح!',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'خطأ في الخادم أثناء إنشاء الحساب.', error: error.message });
  }
});

// تسجيل الدخول
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'يرجى إدخال البريد الإلكتروني وكلمة المرور.' });
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(400).json({ message: 'بيانات الاعتماد غير صحيحة.' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'بيانات الاعتماد غير صحيحة.' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role, username: user.username },
      process.env.JWT_SECRET || 'b-labn-fallback-secret-2026',
      { expiresIn: '7d' }
    );

    res.json({
      message: 'تم تسجيل الدخول بنجاح!',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'خطأ في الخادم أثناء تسجيل الدخول.', error: error.message });
  }
});

module.exports = router;
