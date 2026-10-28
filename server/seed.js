const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');
const Product = require('./models/Product');

const seedProducts = [
  {
    name: 'قشطوطة B-Labn بالكراميل واللبن',
    price: 35,
    description: 'كيكة القشطوطة الإسفنجية المشبعة بالحليب الطازج والكريمة الغنية مع طبقة فاخرة من الكراميل والمكسرات.',
    image: '/assets/images/img-15.jpg',
  },
  {
    name: 'شوكولاته دبي المقرمشة الأصلية',
    price: 60,
    description: 'شوكولاتة بالحليب بلجيكية محشوة بالكنافة المقرمشة وزبدة الفستق الحلبي الطبيعي 100%.',
    image: '/assets/images/img-14.jpg',
  },
  {
    name: 'مارشميلو هوت شوكليت بلبن',
    price: 45,
    description: 'مشروب الشوكولاتة الكثيفة الساخنة مع سيل من قطع المارشميلو وصوص الشوكولاتة اللذيذ.',
    image: '/assets/images/img-13.jpg',
  },
  {
    name: 'قنبلة B-Labn الفاخرة بالمكسرات',
    price: 50,
    description: 'طاجن القنبلة الشهير بالأرز باللبن الطبيعي مع قطع البسبوسة، الكنافة، القشطة، العسل، والمكسرات.',
    image: '/assets/images/img-12.jpg',
  },
  {
    name: 'كاساتا لوتس وفستق حلبي',
    price: 55,
    description: 'طبقات الآيس كريم الإيطالي الفاخر مع بسكويت اللوتس المقرمش وصوص الفستق الغني.',
    image: '/assets/images/img-10.jpg',
  },
  {
    name: 'أم علي بالسمن البلدي والقشطة',
    price: 40,
    description: 'طاجن أم علي التقليدي المخبوز بالفرن مع اللبن الساخن، المكسرات المحمصة، والقشطة الفلاحي.',
    image: '/assets/images/img-16.jpg',
  },
];

async function seed() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is missing in .env file!');
    }

    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully!');

    // مسح المنتجات الحالية وإعادة إضافتها كبيانات بداية
    await Product.deleteMany({});
    const inserted = await Product.insertMany(seedProducts);
    console.log(`Seeded ${inserted.length} real B-Labn products!`);

    // إنشاء حساب المشرف (Admin)
    await User.deleteMany({ email: 'admin@b-labn.com' });
    const adminUser = new User({
      username: 'admin',
      email: 'admin@b-labn.com',
      password: 'admin123456',
      role: 'admin',
    });
    await adminUser.save();
    console.log('Admin account created successfully:');
    console.log('  Email:    admin@b-labn.com');
    console.log('  Password: admin123456');
    console.log('  Role:     admin');

    // إنشاء حساب مستخدم عادي (User) للتجربة
    await User.deleteMany({ email: 'user@b-labn.com' });
    const regularUser = new User({
      username: 'ahmed',
      email: 'user@b-labn.com',
      password: 'user123456',
      role: 'user',
    });
    await regularUser.save();
    console.log('Test user account created successfully:');
    console.log('  Email:    user@b-labn.com');
    console.log('  Password: user123456');
    console.log('  Role:     user');

    console.log('\nAll initial data successfully seeded into MongoDB Atlas!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error.message);
    process.exit(1);
  }
}

seed();
