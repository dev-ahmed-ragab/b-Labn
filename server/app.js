const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// إعدادات Middleware
app.use(cors());
app.use(express.json());

// الاتصال بقاعدة البيانات
if (process.env.MONGO_URI) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.error('MongoDB connection error:', err.message));
} else {
  console.warn('تنبيه: لم يتم العثور على MONGO_URI في متغيرات البيئة.');
}

// استيراد المسارات
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const productRoutes = require('./routes/product');

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/product', productRoutes);

// نقطة فحص حالة الخادم (Health check)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'b-labn-backend', time: new Date().toISOString() });
});

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
