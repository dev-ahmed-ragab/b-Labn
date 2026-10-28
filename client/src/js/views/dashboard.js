import { navigateTo, updateNavbarAuth } from '../main.js';
import { showToast } from '../components/toast.js';

// دالة القالب للوحة تحكم المشرف المطورة
export default () => /*html*/ `
  <div class="min-h-screen bg-[#F8FAFC]">
    <!-- شريط علوي فرعي للوحة التحكم -->
    <div class="bg-white border-b border-gray-200 px-6 py-4">
      <div class="container mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-black text-[#005DA5] flex items-center space-x-2 space-x-reverse">
            <span>⚙️ لوحة تحكم المشرف</span>
            <span class="text-xs bg-purple-100 text-purple-700 font-bold px-2.5 py-0.5 rounded-full">إدارة النظام</span>
          </h1>
          <p class="text-xs text-gray-500 mt-0.5">تحكم كامل في منتجات B-Labn والمستخدمين والبيانات</p>
        </div>

        <!-- أزرار التبويبات العلوية -->
        <div class="flex items-center space-x-2 space-x-reverse overflow-x-auto pb-1 sm:pb-0">
          <button
            id="tab-products"
            data-tab="products"
            class="dashboard-tab-btn px-4 py-2 rounded-xl text-xs font-black transition flex items-center space-x-1.5 space-x-reverse bg-[#005DA5] text-white shadow-sm"
          >
            <span>📦 المنتجات الحالية</span>
          </button>
          <button
            id="tab-add-product"
            data-tab="add-product"
            class="dashboard-tab-btn px-4 py-2 rounded-xl text-xs font-black transition flex items-center space-x-1.5 space-x-reverse bg-gray-100 text-gray-600 hover:bg-gray-200"
          >
            <span>➕ إضافة منتج</span>
          </button>
          <button
            id="tab-users"
            data-tab="users"
            class="dashboard-tab-btn px-4 py-2 rounded-xl text-xs font-black transition flex items-center space-x-1.5 space-x-reverse bg-gray-100 text-gray-600 hover:bg-gray-200"
          >
            <span>👥 المستخدمين</span>
          </button>
        </div>
      </div>
    </div>

    <!-- محتوى لوحة التحكم -->
    <div class="container mx-auto px-4 py-8 max-w-6xl">
      <!-- كروت الإحصائيات السريعة -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div class="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex items-center space-x-4 space-x-reverse">
          <div class="w-12 h-12 rounded-2xl bg-blue-50 text-[#005DA5] flex items-center justify-center text-2xl font-black">
            🍨
          </div>
          <div>
            <span class="text-xs text-gray-400 font-bold block">إجمالي الأصناف</span>
            <span id="stat-products-count" class="text-2xl font-black text-gray-800">0</span>
          </div>
        </div>

        <div class="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex items-center space-x-4 space-x-reverse">
          <div class="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center text-2xl font-black">
            👥
          </div>
          <div>
            <span class="text-xs text-gray-400 font-bold block">المستخدمين المسجلين</span>
            <span id="stat-users-count" class="text-2xl font-black text-gray-800">0</span>
          </div>
        </div>

        <div class="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex items-center space-x-4 space-x-reverse">
          <div class="w-12 h-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center text-2xl font-black">
            ⚡
          </div>
          <div>
            <span class="text-xs text-gray-400 font-bold block">حالة قاعدة البيانات</span>
            <span class="text-sm font-black text-green-600">متصل بـ Atlas بنجاح</span>
          </div>
        </div>
      </div>

      <!-- تبويب 1: استعراض المنتجات الحالية -->
      <div id="section-products" class="dashboard-section">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-black text-gray-800">قائمة أصناف B-Labn</h2>
          <button id="quick-add-btn" class="bg-[#005DA5] hover:bg-[#098AC1] text-white text-xs font-bold px-4 py-2 rounded-xl transition">
            + إضافة صنف جديد
          </button>
        </div>
        <div id="dashboard-products-list" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
      </div>

      <!-- تبويب 2: إضافة أو تعديل منتج -->
      <div id="section-add-product" class="dashboard-section hidden">
        <div class="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <div class="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
            <h2 id="form-heading" class="text-2xl font-black text-gray-800">إضافة صنف جديد</h2>
            <button id="cancel-edit-btn" class="hidden text-xs text-gray-400 hover:text-gray-600 font-bold">
              إلغاء التعديل ✕
            </button>
          </div>

          <form id="product-form" class="space-y-5">
            <input type="hidden" id="edit-product-id" value="" />

            <div>
              <label class="block text-xs font-bold text-gray-700 mb-1.5">اسم الصنف</label>
              <input
                type="text"
                id="product-name"
                required
                placeholder="مثال: قشطوطة بالمانجو واللبن"
                class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005DA5] text-sm"
              />
            </div>

            <div>
              <label class="block text-xs font-bold text-gray-700 mb-1.5">السعر بالجنيه (ج.م)</label>
              <input
                type="number"
                id="product-price"
                required
                min="0"
                step="0.5"
                placeholder="45"
                class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005DA5] text-sm"
              />
            </div>

            <div>
              <label class="block text-xs font-bold text-gray-700 mb-1.5">الوصف والمكونات</label>
              <textarea
                id="product-description"
                required
                rows="3"
                placeholder="صف هذا المنتج اللذيذ ومكوناته الطبيعية..."
                class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005DA5] text-sm"
              ></textarea>
            </div>

            <div>
              <label class="block text-xs font-bold text-gray-700 mb-1.5">رابط الصورة (URL أو مسار محلي)</label>
              <input
                type="text"
                id="product-image"
                required
                placeholder="/assets/images/img-14.jpg أو رابط ويب"
                class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005DA5] text-sm text-left"
                dir="ltr"
              />
            </div>

            <button
              type="submit"
              id="save-product-btn"
              class="w-full bg-[#005DA5] hover:bg-[#098AC1] text-white py-3.5 rounded-2xl font-black text-sm transition shadow-sm mt-4"
            >
              حفظ ونشر الصنف
            </button>
          </form>
        </div>
      </div>

      <!-- تبويب 3: استعراض وإدارة المستخدمين -->
      <div id="section-users" class="dashboard-section hidden">
        <h2 class="text-xl font-black text-gray-800 mb-6">قائمة المستخدمين المسجلين</h2>
        <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-right divide-y divide-gray-100">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-4 text-xs font-black text-gray-500">اسم المستخدم</th>
                  <th class="px-6 py-4 text-xs font-black text-gray-500">البريد الإلكتروني</th>
                  <th class="px-6 py-4 text-xs font-black text-gray-500">نوع الحساب</th>
                  <th class="px-6 py-4 text-xs font-black text-gray-500 text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody id="dashboard-users-table" class="divide-y divide-gray-100 text-sm"></tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

const rawApi = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_BASE_URL) || 'http://localhost:5000';
const apiBase = rawApi.replace(/\/+$/, '');

let currentProductsList = [];

export async function initDashboard() {
  const token = localStorage.getItem('token');
  const role = JSON.parse(localStorage.getItem('role') || '""');

  if (!token || role !== 'admin') {
    showToast('هذه الصفحة مخصصة للمشرفين فقط. يرجى تسجيل الدخول بحساب Admin.', 'error');
    navigateTo('/login');
    return;
  }

  setupTabs();
  setupProductForm();

  await Promise.all([loadProducts(), loadUsers()]);
}

function setupTabs() {
  const tabs = document.querySelectorAll('.dashboard-tab-btn');
  const sections = document.querySelectorAll('.dashboard-section');
  const quickAdd = document.getElementById('quick-add-btn');

  tabs.forEach((tab) => {
    tab.onclick = () => {
      const target = tab.getAttribute('data-tab');

      tabs.forEach((t) => {
        t.className =
          'dashboard-tab-btn px-4 py-2 rounded-xl text-xs font-black transition flex items-center space-x-1.5 space-x-reverse bg-gray-100 text-gray-600 hover:bg-gray-200';
      });
      tab.className =
        'dashboard-tab-btn px-4 py-2 rounded-xl text-xs font-black transition flex items-center space-x-1.5 space-x-reverse bg-[#005DA5] text-white shadow-sm';

      sections.forEach((sec) => sec.classList.add('hidden'));
      const active = document.getElementById(`section-${target}`);
      if (active) active.classList.remove('hidden');
    };
  });

  if (quickAdd) {
    quickAdd.onclick = () => {
      resetProductForm();
      const addTab = document.getElementById('tab-add-product');
      if (addTab) addTab.click();
    };
  }
}

async function loadProducts() {
  const listEl = document.getElementById('dashboard-products-list');
  const statCount = document.getElementById('stat-products-count');

  if (!listEl) return;

  try {
    listEl.innerHTML = '<p class="col-span-full text-center py-12 text-gray-400">جاري تحميل الأصناف...</p>';

    const res = await fetch(`${apiBase}/api/product/all`);
    const data = await res.json();
    currentProductsList = data.products || [];

    if (statCount) statCount.textContent = currentProductsList.length;

    if (currentProductsList.length === 0) {
      listEl.innerHTML = '<p class="col-span-full text-center py-12 text-gray-400">لا توجد منتجات مسجلة حالياً.</p>';
      return;
    }

    listEl.innerHTML = currentProductsList
      .map(
        (p) => `
        <div class="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between transition hover:shadow-md">
          <div>
            <div class="relative overflow-hidden rounded-2xl mb-4 bg-gray-50 h-44">
              <img 
                src="${p.image || '/assets/images/logo.jpg'}" 
                alt="${p.name}" 
                class="w-full h-full object-cover"
                onerror="this.src='/assets/images/logo.jpg'"
              />
              <span class="absolute bottom-2 right-2 bg-white/95 backdrop-blur px-2.5 py-1 rounded-lg text-xs font-black text-[#005DA5] shadow-sm">
                ${p.price} ج.م
              </span>
            </div>

            <h3 class="font-black text-gray-800 text-base mb-1">${p.name}</h3>
            <p class="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-4">${p.description || ''}</p>
          </div>

          <div class="pt-3 border-t border-gray-100 grid grid-cols-2 gap-2">
            <button 
              data-edit-product="${p._id}"
              class="w-full bg-blue-50 text-[#005DA5] hover:bg-[#005DA5] hover:text-white py-2 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1 space-x-reverse"
            >
              <span>✏️ تعديل</span>
            </button>
            <button 
              data-delete-product="${p._id}"
              class="w-full bg-red-50 text-red-600 hover:bg-red-600 hover:text-white py-2 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1 space-x-reverse"
            >
              <span>🗑️ حذف</span>
            </button>
          </div>
        </div>
      `
      )
      .join('');

    // ربط أزرار التعديل والحذف
    listEl.querySelectorAll('[data-edit-product]').forEach((btn) => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-edit-product');
        const product = currentProductsList.find((p) => String(p._id) === String(id));
        if (product) {
          startEditProduct(product);
        }
      };
    });

    listEl.querySelectorAll('[data-delete-product]').forEach((btn) => {
      btn.onclick = async () => {
        const id = btn.getAttribute('data-delete-product');
        const token = localStorage.getItem('token');
        if (!confirm('هل أنت متأكد من حذف هذا الصنف من القائمة نهائياً؟')) return;

        try {
          const res = await fetch(`${apiBase}/api/product/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
          });

          if (res.ok) {
            showToast('تم حذف المنتج بنجاح 🗑️', 'info');
            await loadProducts();
          } else {
            const err = await res.json();
            showToast(err.message || 'فشل حذف المنتج.', 'error');
          }
        } catch (e) {
          showToast('حدث خطأ أثناء الاتصال بالخادم.', 'error');
        }
      };
    });
  } catch (err) {
    console.error('Error loading products in dashboard:', err);
    listEl.innerHTML = '<p class="col-span-full text-center py-12 text-red-600 font-bold">تعذر تحميل الأصناف.</p>';
  }
}

function startEditProduct(product) {
  const formHeading = document.getElementById('form-heading');
  const cancelBtn = document.getElementById('cancel-edit-btn');
  const idInput = document.getElementById('edit-product-id');
  const nameInput = document.getElementById('product-name');
  const priceInput = document.getElementById('product-price');
  const descInput = document.getElementById('product-description');
  const imageInput = document.getElementById('product-image');
  const saveBtn = document.getElementById('save-product-btn');

  if (formHeading) formHeading.textContent = `تعديل: ${product.name}`;
  if (cancelBtn) cancelBtn.classList.remove('hidden');
  if (idInput) idInput.value = product._id;
  if (nameInput) nameInput.value = product.name;
  if (priceInput) priceInput.value = product.price;
  if (descInput) descInput.value = product.description;
  if (imageInput) imageInput.value = product.image;
  if (saveBtn) saveBtn.textContent = 'تحديث بيانات الصنف ✓';

  const addTab = document.getElementById('tab-add-product');
  if (addTab) {
    addTab.querySelector('span').textContent = '✏️ تعديل صنف';
    addTab.click();
  }
}

function resetProductForm() {
  const form = document.getElementById('product-form');
  const formHeading = document.getElementById('form-heading');
  const cancelBtn = document.getElementById('cancel-edit-btn');
  const idInput = document.getElementById('edit-product-id');
  const saveBtn = document.getElementById('save-product-btn');
  const addTab = document.getElementById('tab-add-product');

  if (form) form.reset();
  if (formHeading) formHeading.textContent = 'إضافة صنف جديد';
  if (cancelBtn) cancelBtn.classList.add('hidden');
  if (idInput) idInput.value = '';
  if (saveBtn) saveBtn.textContent = 'حفظ ونشر الصنف';
  if (addTab) addTab.querySelector('span').textContent = '➕ إضافة منتج';
}

function setupProductForm() {
  const form = document.getElementById('product-form');
  const cancelBtn = document.getElementById('cancel-edit-btn');

  if (cancelBtn) {
    cancelBtn.onclick = () => {
      resetProductForm();
      const productsTab = document.getElementById('tab-products');
      if (productsTab) productsTab.click();
    };
  }

  if (form) {
    form.onsubmit = async (e) => {
      e.preventDefault();
      const token = localStorage.getItem('token');
      const editId = document.getElementById('edit-product-id').value;
      const name = document.getElementById('product-name').value.trim();
      const price = Number(document.getElementById('product-price').value);
      const description = document.getElementById('product-description').value.trim();
      const image = document.getElementById('product-image').value.trim();
      const saveBtn = document.getElementById('save-product-btn');

      const isEdit = Boolean(editId);
      const endpoint = isEdit ? `${apiBase}/api/product/${editId}` : `${apiBase}/api/product/add`;
      const method = isEdit ? 'PUT' : 'POST';

      try {
        saveBtn.disabled = true;
        saveBtn.textContent = 'جاري الحفظ...';

        const res = await fetch(endpoint, {
          method,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name, price, description, image }),
        });

        const data = await res.json();

        if (res.ok) {
          showToast(isEdit ? 'تم تحديث المنتج بنجاح! 🎉' : 'تمت إضافة المنتج الجديد بنجاح! 🍨', 'success');
          resetProductForm();
          await loadProducts();

          const productsTab = document.getElementById('tab-products');
          if (productsTab) productsTab.click();
        } else {
          showToast(data.message || 'حدث خطأ أثناء الحفظ.', 'error');
        }
      } catch (err) {
        showToast('خطأ في الاتصال بالسيرفر.', 'error');
      } finally {
        saveBtn.disabled = false;
        saveBtn.textContent = isEdit ? 'تحديث بيانات الصنف ✓' : 'حفظ ونشر الصنف';
      }
    };
  }
}

async function loadUsers() {
  const token = localStorage.getItem('token');
  const tableEl = document.getElementById('dashboard-users-table');
  const statCount = document.getElementById('stat-users-count');

  if (!tableEl) return;

  try {
    const res = await fetch(`${apiBase}/api/admin/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error('فشل جلب المستخدمين');
    const data = await res.json();
    const users = data.users || [];

    if (statCount) statCount.textContent = users.length;

    if (users.length === 0) {
      tableEl.innerHTML = '<tr><td colspan="4" class="text-center py-8 text-gray-400">لا يوجد مستخدمون مسجلون.</td></tr>';
      return;
    }

    tableEl.innerHTML = users
      .map(
        (u) => `
        <tr class="hover:bg-gray-50/50 transition">
          <td class="px-6 py-4 font-bold text-gray-800">${u.username}</td>
          <td class="px-6 py-4 text-gray-500 font-mono text-xs" dir="ltr">${u.email}</td>
          <td class="px-6 py-4">
            <span class="px-3 py-1 text-xs font-black rounded-full ${
              u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-50 text-blue-700'
            }">
              ${u.role === 'admin' ? 'مشرف (Admin)' : 'مستخدم'}
            </span>
          </td>
          <td class="px-6 py-4 text-center">
            <button
              data-delete-user="${u._id}"
              class="text-red-500 hover:text-red-700 text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-red-50 transition"
            >
              حذف الحساب
            </button>
          </td>
        </tr>
      `
      )
      .join('');

    tableEl.querySelectorAll('[data-delete-user]').forEach((btn) => {
      btn.onclick = async () => {
        const id = btn.getAttribute('data-delete-user');
        if (!confirm('هل أنت متأكد من حذف هذا المستخدم؟')) return;

        try {
          const delRes = await fetch(`${apiBase}/api/admin/users/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
          });

          if (delRes.ok) {
            showToast('تم حذف المستخدم بنجاح.', 'info');
            await loadUsers();
          } else {
            const err = await delRes.json();
            showToast(err.message || 'فشل حذف المستخدم.', 'error');
          }
        } catch (e) {
          showToast('خطأ أثناء حذف المستخدم.', 'error');
        }
      };
    });
  } catch (err) {
    tableEl.innerHTML = '<tr><td colspan="4" class="text-center py-8 text-red-500">فشل في جلب المستخدمين.</td></tr>';
  }
}
