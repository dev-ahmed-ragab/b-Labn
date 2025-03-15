const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true }, // اسم المنتج (إجباري)
  price: { type: Number, required: true }, // السعر (إجباري)
  description: { type: String, required: true }, // الوصف (إجباري)
  image: { type: String, required: true }, // رابط الصورة أو نص يصف الصورة (إجباري)
});

module.exports = mongoose.model('Product', productSchema);
