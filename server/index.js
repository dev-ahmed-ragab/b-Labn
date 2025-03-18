const app = require('./app');
const PORT = process.env.PORT || 5001;

// تشغيل الخادم
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
