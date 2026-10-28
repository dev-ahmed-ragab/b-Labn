import { navigateTo, updateNavAuthUI } from '../main.js';

export default () => /*html*/ `
  <div class="min-h-screen flex flex-col md:flex-row bg-gray-100">
    <!-- الشريط الجانبي -->
    <div class="w-full md:w-64 bg-white p-6 shadow-md flex flex-col justify-between space-y-6">
      <div class="space-y-4">
        <div class="text-center pb-4 border-b border-gray-100">
          <h2 class="text-2xl font-extrabold text-[#005DA5]">لوحة التحكم</h2>
          <p class="text-xs text-gray-400 mt-1">إدارة نظام B-Labn</p>
        </div>
        <button
          data-tab="products"
          class="tab-btn w-full text-right px-4 py-3 rounded-xl font-bold bg-[#005DA5] text-white transition shadow-sm"
        >
          📦 عرض المنتجات
        </button>
        <button
          data-tab="add-product"
          class="tab-btn w-full text-right px-4 py-3 rounded-xl font-bold text-gray-700 hover:bg-gray-100 transition"
        >
          ➕ إضافة منتج جديد
        </button>
        <button
          data-tab="users"
          class="tab-btn w-full text-right px-4 py-3 rounded-xl font-bold text-gray-700 hover:bg-gray-100 transition"
        >
          👥 عرض المستخدمين
        </button>
      </div>

      <div>
        <button
          id="dashboard-logout-btn"
          class="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-bold transition shadow-sm"
        >
          تسجيل الخروج
        </button>
      </div>
    </div>

    <!-- المحتوى الرئيسي -->
    <div class="flex-1 p-6 md:p-10">
      <!-- قسم عرض المنتجات -->
      <div id="products-section" class="tab-content">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-800">المنتجات الحالية</h2>
          <span id="products-count" class="text-sm bg-blue-100 text-[#005DA5] px-3 py-1 rounded-full font-bold"></span>
        </div>
        <div id="products-list" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <p class="text-gray-500 col-span-full text-center py-10">جاري تحميل المنتجات...</p>
        </div>
      </div>

      <!-- قسم إضافة منتج -->
      <div id="add-product-section" class="tab-content hidden max-w-xl bg-white p-8 rounded-2xl shadow-sm">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">إضافة حلوى جديدة</h2>
        <form id="add-product-form" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">اسم المنتج</label>
            <input
              type="text"
              id="product-name"
              required
              placeholder="مثال: قشطوطة بالمانجو"
              class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005DA5]"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">السعر (ج.م)</label>
            <input
              type="number"
              id="product-price"
              required
              min="0"
              step="0.5"
              placeholder="مثال: 55"
              class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005DA5]"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">الوصف</label>
            <textarea
              id="product-description"
              required
              rows="3"
              placeholder="وصف مكونات المنتج ومذاقه اللذيذ..."
              class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005DA5]"
            ></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">رابط الصورة</label>
            <input
              type="text"
              id="product-image"
              required
              placeholder="/assets/images/img-10.jpg أو رابط خارجي"
              class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005DA5]"
            />
          </div>
          <button
            type="submit"
            id="add-product-submit"
            class="w-full bg-green-600 hover:bg-green-700 text-white py-3.5 rounded-xl font-bold transition shadow-md"
          >
            حفظ وإضافة المنتج
          </button>
        </form>
      </div>

      <!-- قسم عرض المستخدمين -->
      <div id="users-section" class="tab-content hidden max-w-3xl">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-800">المستخدمون المسجلون</h2>
          <span id="users-count" class="text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-bold"></span>
        </div>
        <div id="users-list" class="space-y-4">
          <p class="text-gray-500 text-center py-10">جاري تحميل المستخدمين...</p>
        </div>
      </div>
    </div>
  </div>
`;

const rawApi = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';
const api = rawApi.replace(/\/+$/, '');

function getToken() {
  return localStorage.getItem('token');
}

async function verifyAdminAuth() {
  const token = getToken();
  if (!token) {
    alert('يرجى تسجيل الدخول بحساب مشرف أولاً.');
    navigateTo('/login');
    return false;
  }

  try {
    const res = await fetch(`${api}/api/admin/dashboard`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      alert('تم رفض الوصول. هذه الصفحة متاحة فقط للمشرفين.');
      navigateTo('/');
      return false;
    }

    const data = await res.json();
    displayProducts(data.products || []);
    displayUsers(data.users || []);
    return true;
  } catch (error) {
    console.error('Admin verification error:', error);
    alert('حدث خطأ أثناء التحقق من الصلاحيات.');
    navigateTo('/');
    return false;
  }
}

async function fetchProducts() {
  try {
    const res = await fetch(`${api}/api/product/all`);
    if (res.ok) {
      const data = await res.json();
      displayProducts(data.products || []);
    }
  } catch (err) {
    console.error('Error fetching products:', err);
  }
}

async function fetchUsers() {
  const token = getToken();
  try {
    const res = await fetch(`${api}/api/admin/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      displayUsers(data.users || []);
    }
  } catch (err) {
    console.error('Error fetching users:', err);
  }
}

function displayProducts(products) {
  const list = document.getElementById('products-list');
  const countEl = document.getElementById('products-count');
  if (!list) return;

  if (countEl) countEl.textContent = `${products.length} منتج`;

  if (products.length === 0) {
    list.innerHTML = '<p class="text-gray-500 col-span-full text-center py-10">لا توجد منتجات مسجلة حالياً.</p>';
    return;
  }

  list.innerHTML = products
    .map((product) => `
      <div class="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
        <div>
          <img 
            src="${product.image}" 
            alt="${product.name}" 
            class="w-full h-40 object-cover rounded-xl mb-3"
            onerror="this.src='/assets/images/img-10.jpg'"
          />
          <h3 class="font-bold text-lg text-gray-800">${product.name}</h3>
          <p class="text-[#005DA5] font-extrabold my-1">${product.price} ج.م</p>
          <p class="text-xs text-gray-500 line-clamp-2">${product.description || ''}</p>
        </div>
        <div class="mt-4 pt-3 border-t border-gray-100 flex justify-end">
          <button
            data-action="delete-product"
            data-id="${product._id}"
            class="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white px-4 py-1.5 rounded-lg text-sm font-semibold transition"
          >
            حذف المنتج
          </button>
        </div>
      </div>
    `)
    .join('');
}

function displayUsers(users) {
  const list = document.getElementById('users-list');
  const countEl = document.getElementById('users-count');
  if (!list) return;

  if (countEl) countEl.textContent = `${users.length} مستخدم`;

  if (users.length === 0) {
    list.innerHTML = '<p class="text-gray-500 text-center py-10">لا يوجد مستخدمون مسجلون حالياً.</p>';
    return;
  }

  list.innerHTML = users
    .map((user) => `
      <div class="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
          <div class="flex items-center gap-2">
            <h4 class="font-bold text-gray-800">${user.username}</h4>
            <span class="text-xs px-2.5 py-0.5 rounded-full font-bold ${
              user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'
            }">
              ${user.role === 'admin' ? 'مشرف' : 'مستخدم'}
            </span>
          </div>
          <p class="text-sm text-gray-500 mt-0.5">${user.email}</p>
        </div>
        ${
          user.role !== 'admin'
            ? `<button
                data-action="delete-user"
                data-id="${user._id}"
                class="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white px-4 py-2 rounded-xl text-sm font-semibold transition"
              >
                حذف الحساب
              </button>`
            : '<span class="text-xs text-gray-400">حساب محمي</span>'
        }
      </div>
    `)
    .join('');
}

async function handleDeleteProduct(id) {
  if (!confirm('هل أنت متأكد من رغبتك في حذف هذا المنتج نهائياً؟')) return;

  const token = getToken();
  try {
    const res = await fetch(`${api}/api/product/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      alert('تم حذف المنتج بنجاح.');
      fetchProducts();
    } else {
      const err = await res.json();
      alert(`فشل الحذف: ${err.message}`);
    }
  } catch (error) {
    console.error('Delete product error:', error);
    alert('حدث خطأ أثناء حذف المنتج.');
  }
}

async function handleDeleteUser(id) {
  if (!confirm('هل أنت متأكد من حذف هذا المستخدم؟')) return;

  const token = getToken();
  try {
    const res = await fetch(`${api}/api/admin/users/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      alert('تم حذف المستخدم بنجاح.');
      fetchUsers();
    } else {
      const err = await res.json();
      alert(`فشل الحذف: ${err.message}`);
    }
  } catch (error) {
    console.error('Delete user error:', error);
    alert('حدث خطأ أثناء حذف المستخدم.');
  }
}

function switchTab(tabName) {
  document.querySelectorAll('.tab-content').forEach((el) => el.classList.add('hidden'));
  document.querySelectorAll('.tab-btn').forEach((btn) => {
    btn.classList.remove('bg-[#005DA5]', 'text-white');
    btn.classList.add('text-gray-700', 'hover:bg-gray-100');
  });

  const targetSection = document.getElementById(`${tabName}-section`);
  if (targetSection) targetSection.classList.remove('hidden');

  const activeBtn = document.querySelector(`[data-tab="${tabName}"]`);
  if (activeBtn) {
    activeBtn.classList.remove('text-gray-700', 'hover:bg-gray-100');
    activeBtn.classList.add('bg-[#005DA5]', 'text-white');
  }
}

export async function initDashboard() {
  const isAuthorized = await verifyAdminAuth();
  if (!isAuthorized) return;

  // إعداد التبويبات
  document.querySelectorAll('.tab-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-tab');
      switchTab(tab);
    });
  });

  // إضافة منتج جديد
  const addForm = document.getElementById('add-product-form');
  if (addForm) {
    addForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('product-name').value.trim();
      const price = document.getElementById('product-price').value.trim();
      const description = document.getElementById('product-description').value.trim();
      const image = document.getElementById('product-image').value.trim();
      const submitBtn = document.getElementById('add-product-submit');

      const token = getToken();
      try {
        submitBtn.disabled = true;
        submitBtn.textContent = 'جاري الحفظ...';

        const res = await fetch(`${api}/api/product/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name, price, description, image }),
        });

        if (res.ok) {
          alert('تمت إضافة المنتج بنجاح!');
          addForm.reset();
          switchTab('products');
          fetchProducts();
        } else {
          const err = await res.json();
          alert(`خطأ: ${err.message}`);
        }
      } catch (err) {
        console.error('Add product error:', err);
        alert('تعذر الاتصال بالخادم لإضافة المنتج.');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'حفظ وإضافة المنتج';
      }
    });
  }

  // أحداث الحذف
  const productsList = document.getElementById('products-list');
  if (productsList) {
    productsList.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action="delete-product"]');
      if (btn) {
        handleDeleteProduct(btn.getAttribute('data-id'));
      }
    });
  }

  const usersList = document.getElementById('users-list');
  if (usersList) {
    usersList.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action="delete-user"]');
      if (btn) {
        handleDeleteUser(btn.getAttribute('data-id'));
      }
    });
  }

  // زر تسجيل الخروج
  const logoutBtn = document.getElementById('dashboard-logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('role');
      updateNavAuthUI();
      alert('تم تسجيل الخروج بنجاح.');
      navigateTo('/login');
    });
  }
}
