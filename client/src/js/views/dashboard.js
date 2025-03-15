export default () => /*html*/ `
  <div id="app" class="min-h-screen flex bg-gray-100">
    <!-- الشريط الجانبي -->
    <div class="w-64 bg-white p-6 shadow-md space-y-4">
      <h2 class="text-xl font-bold text-center text-gray-800">لوحة التحكم</h2>
      <button
        onclick="switchSection('products')"
        class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
      >
        عرض المنتجات
      </button>
      <button
        onclick="switchSection('add-product')"
        class="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300"
      >
        إضافة منتج
      </button>
      <button
        onclick="switchSection('users')"
        class="w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 transition duration-300"
      >
        عرض المستخدمين
      </button>
      <button
        onclick="logout()"
        class="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-300"
      >
        تسجيل الخروج
      </button>
    </div>

    <!-- المحتوى الرئيسي -->
    <div class="flex-1 p-8">
      <!-- عرض المنتجات -->
      <div id="products-section" class="hidden">
        <h2 class="text-2xl font-bold mb-6">عرض المنتجات</h2>
        <div id="products-list" class="space-y-4"></div>
      </div>

      <!-- إضافة منتج -->
      <div id="add-product-section" class="hidden">
        <h2 class="text-2xl font-bold mb-6">إضافة منتج جديد</h2>
        <input
          type="text"
          id="product-name"
          placeholder="اسم المنتج"
          class="w-full px-4 py-2 border rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          id="product-price"
          placeholder="السعر"
          class="w-full px-4 py-2 border rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          id="product-description"
          placeholder="الوصف"
          class="w-full px-4 py-2 border rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          id="product-image"
          placeholder="رابط الصورة"
          class="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onclick="addProduct()"
          class="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300"
        >
          إضافة المنتج
        </button>
      </div>

      <!-- عرض المستخدمين -->
      <div id="users-section" class="hidden">
        <h2 class="text-2xl font-bold mb-6">عرض المستخدمين</h2>
        <ul id="users-list" class="space-y-4"></ul>
      </div>
    </div>
  </div>
`;

const api = 'http://localhost:5000/api'; // رابط API الرئيسي

// دالة تحقق من صلاحية المستخدم
async function checkAdmin() {
  const token = localStorage.getItem('token'); // استخراج الرمز من localStorage

  // if (!token) {
  //   alert('يرجى تسجيل الدخول كإداري!');
  //   window.location.href = '/login'; // إعادة التوجيه إلى صفحة تسجيل الدخول
  //   return false;
  // }

  try {
    const response = await fetch(`${api}/admin/dashboard`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      displayProducts(data.products); // عرض المنتجات
      displayUsers(data.users); // عرض المستخدمين
    } else {
      const errorData = await response.json();
      console.error('Error fetching dashboard data:', errorData);
      alert(`حدث خطأ: ${errorData.message}`);
    }
  } catch (error) {
    console.error('حدث خطأ أثناء التحقق من الصلاحيات:', error);
    alert('حدث خطأ أثناء التحقق من الصلاحيات.');
  }
}

// دالة عرض المنتجات في الواجهة
function displayProducts(products) {
  const productsList = document.getElementById('products-list');
  productsList.className =
    'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4';

  // التحقق من وجود العنصر
  if (!productsList) {
    console.error('Element with ID "products-list" not found in the DOM.');
    return;
  }

  productsList.innerHTML = ''; // مسح القائمة الحالية

  if (products.length === 0) {
    productsList.innerHTML =
      '<p class="text-center">لا توجد منتجات مضافة حتى الآن.</p>';
    return;
  }

  products.forEach((product) => {
    const productCard = document.createElement('div');
    productCard.className = 'bg-gray-50 p-4 rounded-lg shadow-md';

    productCard.innerHTML = `
      <h3 class="font-bold text-lg">${product.name}</h3>
      <p class="text-gray-600">السعر: $${product.price}</p>
      <p class="text-sm">${product.description}</p>
      <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover mt-2 rounded-md" />
    `;

    productsList.appendChild(productCard);
  });
}

// دالة عرض المستخدمين في الواجهة
function displayUsers(users) {
  const usersList = document.getElementById('users-list');

  // التحقق من وجود العنصر
  if (!usersList) {
    console.error('Element with ID "users-list" not found in the DOM.');
    return;
  }

  usersList.innerHTML = ''; // مسح القائمة الحالية

  if (users.length === 0) {
    usersList.innerHTML =
      '<li class="text-center">لا يوجد مستخدمون حتى الآن.</li>';
    return;
  }

  users.forEach((user) => {
    const userItem = document.createElement('li');
    userItem.className =
      'bg-white p-4 rounded-md shadow-sm flex justify-between items-center';

    userItem.innerHTML = `
      <div>
        <p class="font-bold">${user.username}</p>
        <p class="text-gray-600">${user.email}</p>
        <p class="text-sm text-gray-500">دور: ${user.role}</p>
      </div>
      <button
        onclick="deleteUser('${user._id}')"
        class="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-300"
      >
        حذف
      </button>
    `;

    usersList.appendChild(userItem);
  });
}

// دالة إضافة منتج جديد
async function addProduct() {
  const token = localStorage.getItem('token');

  const name = document.getElementById('product-name').value.trim();
  const price = document.getElementById('product-price').value.trim();
  const description = document
    .getElementById('product-description')
    .value.trim();
  const image = document.getElementById('product-image').value.trim();

  if (!name || !price || !description || !image) {
    alert('يرجى ملء جميع الحقول!');
    return;
  }

  try {
    const response = await fetch(`${api}/product/add`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, price, description, image }),
    });

    if (response.ok) {
      alert('تمت إضافة المنتج بنجاح!');
      document.getElementById('product-name').value = '';
      document.getElementById('product-price').value = '';
      document.getElementById('product-description').value = '';
      document.getElementById('product-image').value = '';
      // fetchProducts(); // تحديث قائمة المنتجات
    } else {
      alert('حدث خطأ أثناء إضافة المنتج.');
    }
  } catch (error) {
    console.error('حدث خطأ أثناء إضافة المنتج:', error);
    alert('حدث خطأ أثناء إضافة المنتج.');
  }
}

// دالة حذف مستخدم
async function deleteUser(userId) {
  const token = localStorage.getItem('token');

  try {
    const response = await fetch(`${api}/admin/users/${userId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      alert('تم حذف المستخدم بنجاح!');
      fetchUsers(); // تحديث قائمة المستخدمين
    } else {
      alert('حدث خطأ أثناء حذف المستخدم.');
    }
  } catch (error) {
    console.error('حدث خطأ أثناء حذف المستخدم:', error);
    alert('حدث خطأ أثناء حذف المستخدم.');
  }
}

// دالة التبديل بين الأقسام
function switchSection(section) {
  // إخفاء جميع الأقسام
  document.getElementById('products-section')?.classList.add('hidden');
  document.getElementById('add-product-section')?.classList.add('hidden');
  document.getElementById('users-section')?.classList.add('hidden');

  // إظهار القسم المطلوب
  document.getElementById(`${section}-section`)?.classList.remove('hidden');
}

// دالة تسجيل الخروج
function logout() {
  localStorage.removeItem('token'); // حذف الرمز من localStorage
  alert('تم تسجيل الخروج بنجاح.');
  window.location.href = '/login'; // إعادة التوجيه إلى صفحة تسجيل الدخول
}

// تحميل الدوال عند بدء الصفحة
document.addEventListener('DOMContentLoaded', () => {
  // إضافة الدوال إلى النطاق العام
  window.switchSection = switchSection;
  window.logout = logout;
  window.addProduct = addProduct;
  window.deleteUser = deleteUser;

  // التحقق من صلاحية المستخدم
  setTimeout(() => {
    checkAdmin();
  }, 0); // ضمان تحميل الـ DOM بالكامل
});
