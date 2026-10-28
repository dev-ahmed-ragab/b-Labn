const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

// الحصول على جميع المنتجات (متاح للجميع)
router.get('/all', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({ message: 'تم استرجاع المنتجات بنجاح!', products });
  } catch (error) {
    console.error('Fetch products error:', error);
    res.status(500).json({ message: 'خطأ في الخادم.', error: error.message });
  }
});

// الحصول على منتج محدد بالمعرف
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'المنتج غير موجود.' });
    }
    res.json({ product });
  } catch (error) {
    console.error('Fetch product by id error:', error);
    res.status(500).json({ message: 'خطأ في الخادم.', error: error.message });
  }
});

// إضافة منتج جديد (يتطلب تسجيل دخول كإداري)
router.post('/add', [authMiddleware, adminMiddleware], async (req, res) => {
  const { name, price, description, image } = req.body;

  if (!name || price === undefined || price === null || !description || !image) {
    return res.status(400).json({
      message: 'جميع الحقول مطلوبة: الاسم، السعر، الوصف، ورابط الصورة.',
    });
  }

  const numericPrice = Number(price);
  if (isNaN(numericPrice) || numericPrice < 0) {
    return res.status(400).json({ message: 'السعر يجب أن يكون رقماً موجباً.' });
  }

  try {
    const product = new Product({
      name: name.trim(),
      price: numericPrice,
      description: description.trim(),
      image: image.trim(),
    });

    await product.save();
    res.status(201).json({ message: 'تمت إضافة المنتج بنجاح!', product });
  } catch (error) {
    console.error('Add product error:', error);
    res.status(500).json({ message: 'خطأ في الخادم.', error: error.message });
  }
});

// تعديل منتج قائم (يتطلب تسجيل دخول كإداري)
router.put('/:id', [authMiddleware, adminMiddleware], async (req, res) => {
  const { name, price, description, image } = req.body;

  if (!name || price === undefined || price === null || !description || !image) {
    return res.status(400).json({
      message: 'جميع الحقول مطلوبة: الاسم، السعر، الوصف، ورابط الصورة.',
    });
  }

  const numericPrice = Number(price);
  if (isNaN(numericPrice) || numericPrice < 0) {
    return res.status(400).json({ message: 'السعر يجب أن يكون رقماً موجباً.' });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: name.trim(),
        price: numericPrice,
        description: description.trim(),
        image: image.trim(),
      },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'المنتج غير موجود.' });
    }

    res.json({ message: 'تم تعديل المنتج بنجاح!', product: updatedProduct });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ message: 'خطأ أثناء تعديل المنتج.', error: error.message });
  }
});

// حذف منتج (يتطلب تسجيل دخول كإداري)
router.delete('/:id', [authMiddleware, adminMiddleware], async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'المنتج غير موجود.' });
    }
    res.json({ message: 'تم حذف المنتج بنجاح!', product: deletedProduct });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: 'خطأ أثناء حذف المنتج.', error: error.message });
  }
});

module.exports = router;
