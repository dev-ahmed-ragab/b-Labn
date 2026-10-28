const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// إعدادات Middleware
app.use(cors());
app.use(express.json());

// نقطة فحص حالة الخادم (Health check)
app.get('/api/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.json({
    status: 'ok',
    service: 'b-labn-backend',
    database: dbStatus,
    time: new Date().toISOString()
  });
});

// إدارة الاتصال بقاعدة البيانات (متوافق مع البيئات السحابية و Serverless مثل Vercel)
let cachedConnection = null;

async function connectToDatabase() {
  if (cachedConnection && mongoose.connection.readyState === 1) {
    return cachedConnection;
  }

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is missing in environment variables');
  }

  cachedConnection = await mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
  });
  console.log('MongoDB connected successfully');
  return cachedConnection;
}

// التحقق من اتصال قاعدة البيانات قبل معالجة مسارات الـ API
app.use(async (req, res, next) => {
  if (req.path === '/api/health' || req.path === '/') {
    return next();
  }

  try {
    await connectToDatabase();
    next();
  } catch (err) {
    console.error('Database connection error:', err.message);
    return res.status(500).json({
      message: 'فشل الاتصال بقاعدة البيانات السحابية (MongoDB).',
      error: err.message,
      hint: 'يرجى التأكد من إضافة MONGO_URI في Vercel وتفعيل 0.0.0.0/0 في MongoDB Atlas Network Access.'
    });
  }
});

// استيراد المسارات
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const productRoutes = require('./routes/product');

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/product', productRoutes);

// معالج المسارات غير الموجودة (404)
app.use((req, res, next) => {
  res.status(404).json({ message: 'المسار المطلوب غير موجود.' });
});

// معالج الأخطاء المركزي (Central Error Handler)
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'حدث خطأ داخلي في الخادم.',
  });
});

module.exports = app;
