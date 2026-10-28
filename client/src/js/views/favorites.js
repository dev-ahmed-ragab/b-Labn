import { showToast } from '../components/toast.js';
import { updateBadges } from '../main.js';

// دالة القالب لصفحة المفضلة المطورة
export default () => /*html*/ `
  <section class="py-12 bg-[#F8FAFC] min-h-[75vh]">
    <div class="container mx-auto max-w-6xl px-4">
      <!-- عنوان الصفحة -->
      <div class="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
        <div>
          <h1 class="text-3xl font-black text-[#005DA5]">قائمة المفضلة ❤️</h1>
          <p class="text-gray-500 text-sm mt-1">أصنافك المحببة في مكان واحد لتطلبها بسرعة متى رغبت</p>
        </div>
        <a href="/menu" data-link class="hidden md:inline-flex items-center space-x-1.5 space-x-reverse text-sm font-bold text-[#005DA5] hover:text-[#098AC1]">
          <span>تصفح المنيو الكامل</span>
        </a>
      </div>

      <!-- رسالة عدم وجود منتجات -->
      <div id="no-favorites-message" class="hidden text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100 p-8 max-w-lg mx-auto">
        <div class="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto text-4xl mb-4">
          🤍
        </div>
        <h2 class="text-2xl font-black text-gray-800 mb-2">قائمة مفضلتك فارغة</h2>
        <p class="text-gray-500 text-sm mb-6">اضغط على علامة القلب ❤️ على أي حلوى في قائمة الطعام لتظهر لك هنا في أي وقت.</p>
        <a href="/menu" data-link class="inline-block bg-[#005DA5] hover:bg-[#098AC1] text-white px-8 py-3 rounded-2xl font-bold transition shadow-sm text-sm">
          اكتشف حلويات B-Labn
        </a>
      </div>

      <!-- عرض المنتجات المفضلة -->
      <div id="favoritesGallery" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
    </div>
  </section>
`;

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

function renderFavorites() {
  const favorites = getFavorites();
  const gallery = document.getElementById('favoritesGallery');
  const noMessage = document.getElementById('no-favorites-message');

  if (!gallery || !noMessage) return;

  if (favorites.length === 0) {
    gallery.innerHTML = '';
    noMessage.classList.remove('hidden');
    return;
  }

  noMessage.classList.add('hidden');

  gallery.innerHTML = favorites
    .map(
      (product) => `
      <div class="bg-white rounded-3xl p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between border border-gray-100 relative group">
        <div>
          <div class="relative overflow-hidden rounded-2xl mb-4 bg-gray-50 h-48">
            <img 
              src="${product.image || '/assets/images/logo.jpg'}" 
              alt="${product.name}" 
              class="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              onerror="this.src='/assets/images/logo.jpg'"
            />
            <button 
              data-action="remove" 
              data-id="${product._id}"
              title="إزالة من المفضلة"
              class="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-red-500 hover:bg-white shadow transition active:scale-95"
            >
              <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
          <h3 class="text-lg font-black text-gray-800 mb-1 leading-snug">${product.name}</h3>
          <p class="text-xs text-gray-500 mb-4 line-clamp-2">${product.description || ''}</p>
        </div>

        <div class="pt-4 border-t border-gray-100 flex items-center justify-between">
          <span class="text-xl font-black text-[#005DA5]">${product.price} <span class="text-xs font-bold">ج.م</span></span>
          <button 
            data-action="add-to-cart" 
            data-id="${product._id}"
            class="bg-[#005DA5] hover:bg-[#098AC1] text-white px-4 py-2 rounded-xl font-bold text-xs transition duration-200 shadow-sm"
          >
            أضف للسلة 🛒
          </button>
        </div>
      </div>
    `
    )
    .join('');
}

export function initFavorites() {
  renderFavorites();

  const gallery = document.getElementById('favoritesGallery');
  if (gallery) {
    gallery.onclick = (e) => {
      const button = e.target.closest('button[data-action]');
      if (!button) return;

      const action = button.getAttribute('data-action');
      const productId = button.getAttribute('data-id');

      let favorites = getFavorites();
      const product = favorites.find((p) => String(p._id) === String(productId));

      if (action === 'remove') {
        const name = product ? product.name : 'الصنف';
        favorites = favorites.filter((p) => String(p._id) !== String(productId));
        saveFavorites(favorites);
        renderFavorites();
        showToast(`تمت إزالة "${name}" من المفضلة`, 'info');
      } else if (action === 'add-to-cart' && product) {
        let cart = getCart();
        const existing = cart.find((item) => String(item._id) === String(productId));
        if (existing) {
          existing.quantity = (existing.quantity || 1) + 1;
        } else {
          cart.push({ ...product, quantity: 1 });
        }
        saveCart(cart);
        showToast(`تمت إضافة "${product.name}" إلى السلة بنجاح 🛒`, 'success');
      }
    };
  }
}
