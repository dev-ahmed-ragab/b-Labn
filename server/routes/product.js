const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

// الحصول على جميع المنتجات (متاح للجميع)
router.get('/all', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({ message: 'Products retrieved successfully!', products });
  } catch (error) {
    console.error('Fetch products error:', error);
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// إضافة منتج جديد (يتطلب تسجيل دخول كإداري)
router.post('/add', [authMiddleware, adminMiddleware], async (req, res) => {
  const { name, price, description, image } = req.body;

  // التحقق من صحة البيانات المرسلة
  if (!name || price === undefined || !description || !image) {
    return res.status(400).json({
      message: 'All fields are required: name, price, description, image.',
    });
  }

  const numericPrice = Number(price);
  if (isNaN(numericPrice) || numericPrice < 0) {
    return res.status(400).json({
      message: 'Price must be a valid non-negative number.',
    });
  }

  try {
    const product = new Product({
      name: name.trim(),
      price: numericPrice,
      description: description.trim(),
      image: image.trim(),
    });
    await product.save();

    res.status(201).json({ message: 'Product added successfully!', product });
  } catch (error) {
    console.error('Add product error:', error);
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// حذف منتج (يتطلب تسجيل دخول كإداري)
router.delete('/:id', [authMiddleware, adminMiddleware], async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    res.json({ message: 'Product deleted successfully!', product: deletedProduct });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

module.exports = router;
