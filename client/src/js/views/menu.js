import { showToast } from '../components/toast.js';
import { updateBadges } from '../main.js';

// دالة القالب لصفحة قائمة الطعام
export default () => /*html*/ `
  <!-- القسم الأول: شريط البحث والعنوان -->
  <section class="bg-white border-b border-gray-100 py-10">
    <div class="container mx-auto max-w-5xl px-4 text-center">
      <div class="inline-block px-4 py-1 rounded-full bg-blue-50 text-[#005DA5] text-xs font-black tracking-wider uppercase mb-3">
        القائمة الكاملة
      </div>
      <h1 class="text-3xl md:text-5xl font-black text-[#005DA5] mb-3">حلويات B-Labn الأصلية</h1>
      <p class="text-gray-600 max-w-xl mx-auto text-base">استمتع بألذ وأحدث اختراعات الحلويات الطازجة المصنوعة يدوياً بالحليب والقشطة الطبيعية.</p>
      
      <!-- شريط البحث السلس -->
      <div class="max-w-xl mx-auto mt-6 relative">
        <input 
          type="text" 
          id="searchInput" 
          placeholder="ابحث عن الحلوى المفضلة لديك (مثال: قشطوطة، شوكولاته دبي)..." 
          class="w-full py-3.5 pr-12 pl-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#005DA5] focus:border-transparent transition shadow-sm text-right bg-gray-50 focus:bg-white text-sm"
        />
        <span class="absolute right-4 top-3.5 text-gray-400 text-lg">🔍</span>
      </div>
    </div>
  </section>

  <!-- القسم الثاني: عرض المنتجات -->
  <section class="py-12 bg-[#F8FAFC] min-h-[60vh]">
    <div class="container mx-auto max-w-6xl px-4">
      <!-- حالة التحميل -->
      <div id="menu-loading" class="text-center py-20">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#005DA5] border-t-transparent"></div>
        <p class="text-gray-600 mt-4 font-bold text-sm">جاري جلب أشهى حلويات بلبن...</p>
      </div>

      <!-- حالة عدم وجود منتجات -->
      <div id="menu-empty" class="hidden text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
        <div class="text-5xl mb-3">🍽️</div>
        <h3 class="text-xl font-bold text-gray-800 mb-1">لم نجد نتائج مطابقة</h3>
        <p class="text-gray-500 text-sm">جرب البحث بكلمات أخرى أو تصفح القائمة بالكامل.</p>
      </div>

      <!-- شبكة المنتجات -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 hidden" id="productGrid"></div>
    </div>
  </section>
`;

let products = [];
const rawApi = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_BASE_URL) || 'http://localhost:5000';
const api = rawApi.replace(/\/+$/, '');

function getFavorites() {
  return JSON.parse(localStorage.getItem('favorites')) || [];
}

function saveFavorites(favorites) {
  localStorage.setItem('favorites', JSON.stringify(favorites));
  updateBadges();
}

function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateBadges();
}

// دالة لعرض المنتجات
function displayProducts(filteredProducts) {
  const productGrid = document.getElementById('productGrid');
  const emptyEl = document.getElementById('menu-empty');

  if (!productGrid) return;

  if (!filteredProducts || filteredProducts.length === 0) {
    productGrid.innerHTML = '';
    productGrid.classList.add('hidden');
    if (emptyEl) emptyEl.classList.remove('hidden');
    return;
  }

  if (emptyEl) emptyEl.classList.add('hidden');
  productGrid.classList.remove('hidden');

  const favorites = getFavorites();

  productGrid.innerHTML = filteredProducts
    .map((product) => {
      const isFavorite = favorites.some((fav) => String(fav._id || fav.id) === String(product._id || product.id));

      return `
        <div class="bg-white rounded-3xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between border border-gray-100 group relative">
          <div>
            <div class="relative overflow-hidden rounded-2xl mb-4 bg-gray-50 h-52">
              <img 
                src="${product.image || '/assets/images/logo.jpg'}" 
                alt="${product.name}" 
                class="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                onerror="this.src='/assets/images/logo.jpg'"
              />
              
              <!-- زر المفضلة المحسن -->
              <button 
                data-action="toggle-favorite" 
                data-id="${product._id}" 
                title="${isFavorite ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}"
                class="absolute top-3 right-3 p-2.5 rounded-full transition-transform active:scale-90 shadow-md ${
                  isFavorite
                    ? 'bg-red-500 text-white'
                    : 'bg-white/90 text-gray-500 hover:text-red-500 hover:bg-white'
                }"
              >
                <svg class="w-5 h-5" fill="${isFavorite ? 'currentColor' : 'none'}" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

            <h3 class="text-xl font-black text-gray-800 mb-2 leading-snug">${product.name}</h3>
            <p class="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-2">${product.description || ''}</p>
          </div>

          <div class="pt-4 border-t border-gray-100 flex items-center justify-between">
            <div>
              <span class="text-xs text-gray-400 block font-bold">السعر</span>
              <span class="text-2xl font-black text-[#005DA5]">${product.price} <span class="text-xs font-bold">ج.م</span></span>
            </div>
            
            <button 
              data-action="add-to-cart" 
              data-id="${product._id}"
              class="bg-[#005DA5] hover:bg-[#098AC1] active:scale-95 text-white px-5 py-2.5 rounded-xl font-bold text-xs transition duration-200 shadow-sm flex items-center space-x-1.5 space-x-reverse"
            >
              <span>أضف للسلة</span>
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>
        </div>
      `;
    })
    .join('');
}

// جلب المنتجات من الباك-إند
async function fetchProducts() {
  const loadingEl = document.getElementById('menu-loading');
  const productGrid = document.getElementById('productGrid');
  const emptyEl = document.getElementById('menu-empty');

  try {
    if (loadingEl) loadingEl.classList.remove('hidden');
    if (productGrid) productGrid.classList.add('hidden');
    if (emptyEl) emptyEl.classList.add('hidden');

    const res = await fetch(`${api}/api/product/all`);
    if (!res.ok) throw new Error('فشل جلب المنتجات');

    const data = await res.json();
    products = data.products || [];

    if (loadingEl) loadingEl.classList.add('hidden');
    displayProducts(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    if (loadingEl) loadingEl.classList.add('hidden');
    if (productGrid) {
      productGrid.classList.remove('hidden');
      productGrid.innerHTML = `
        <div class="col-span-full text-center py-12 bg-white rounded-2xl shadow-sm border border-red-100 text-red-600 p-6">
          <p class="text-3xl mb-2">⚠️</p>
          <p class="font-bold text-lg">تعذر الاتصال بخادم المنتجات</p>
          <p class="text-sm text-gray-500 mt-1">تأكد من تشغيل السيرفر المحلي على البورت 5000.</p>
        </div>
      `;
    }
  }
}

// تهيئة أحداث صفحة القائمة
export function initMenu() {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.oninput = function () {
      const query = this.value.trim().toLowerCase();
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          (product.description && product.description.toLowerCase().includes(query))
      );
      displayProducts(filtered);
    };
  }

  const productGrid = document.getElementById('productGrid');
  if (productGrid) {
    productGrid.onclick = (event) => {
      const button = event.target.closest('button[data-action]');
      if (!button) return;

      const action = button.getAttribute('data-action');
      const productId = button.getAttribute('data-id');
      const product = products.find((p) => String(p._id) === String(productId));

      if (!product) return;

      if (action === 'add-to-cart') {
        let cart = getCart();
        const existing = cart.find((item) => String(item._id) === String(productId));
        if (existing) {
          existing.quantity = (existing.quantity || 1) + 1;
        } else {
          cart.push({ ...product, quantity: 1 });
        }
        saveCart(cart);
        showToast(`تمت إضافة "${product.name}" إلى السلة بنجاح 🛒`, 'success');
      } else if (action === 'toggle-favorite') {
        let favorites = getFavorites();
        const existingIndex = favorites.findIndex((fav) => String(fav._id) === String(productId));

        if (existingIndex > -1) {
          favorites.splice(existingIndex, 1);
          button.className =
            'absolute top-3 right-3 p-2.5 rounded-full transition-transform active:scale-90 shadow-md bg-white/90 text-gray-500 hover:text-red-500 hover:bg-white';
          button.querySelector('svg')?.setAttribute('fill', 'none');
          showToast(`تمت إزالة "${product.name}" من المفضلة`, 'info');
        } else {
          favorites.push(product);
          button.className =
            'absolute top-3 right-3 p-2.5 rounded-full transition-transform active:scale-90 shadow-md bg-red-500 text-white';
          button.querySelector('svg')?.setAttribute('fill', 'currentColor');
          showToast(`تمت إضافة "${product.name}" إلى المفضلة ❤️`, 'success');
        }
        saveFavorites(favorites);
      }
    };
  }

  fetchProducts();
}

export const initializeMenu = initMenu;
