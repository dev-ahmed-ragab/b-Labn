const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const authMiddleware = require('../middleware/authMiddleware');

// إضافة منتج جديد (يتطلب تسجيل دخول كإداري)
router.post('/add', authMiddleware, async (req, res) => {
  //   if (req.user.role !== 'admin') {
  //     return res.status(403).json({ message: 'Access denied. Admins only.' });
  //   }

  const { name, price, description, image } = req.body;

  // التحقق من صحة البيانات المرسلة
  if (!name || !price || !description || !image) {
    return res.status(400).json({
      message: 'All fields are required: name, price, description, image.',
    });
  }

  try {
    const product = new Product({ name, price, description, image });
    await product.save();

    res.status(201).json({ message: 'Product added successfully!', product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// الحصول على جميع المنتجات (متاح للجميع)
router.get('/all', async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ message: 'Products retrieved successfully!', products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

module.exports = router;
