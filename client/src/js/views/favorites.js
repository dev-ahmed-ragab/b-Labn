export default () => /*html*/ `
  <section class="p-8 bg-gray-50 min-h-[70vh]">
    <div class="container mx-auto">
      <!-- عنوان الصفحة -->
      <h2 class="text-3xl font-extrabold text-center text-gray-800 mb-8">قائمة المفضلة ❤️</h2>

      <!-- رسالة عدم وجود منتجات -->
      <div id="no-favorites-message" class="hidden text-center py-16 bg-white rounded-2xl shadow-sm">
        <div class="text-5xl mb-4">🤍</div>
        <h3 class="text-2xl font-bold text-gray-700 mb-2">لا توجد حلويات في المفضلة</h3>
        <p class="text-gray-500 mb-6">احفظ أصنافك المفضلة لتطلبها بلمسة واحدة في أي وقت.</p>
        <a href="/menu" data-link class="inline-block bg-[#005DA5] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#098AC1] transition shadow">
          تصفح المنيو الآن
        </a>
      </div>

      <!-- عرض المنتجات -->
      <div id="favoritesGallery" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
    </div>
  </section>
`;

function getFavorites() {
  return JSON.parse(localStorage.getItem('favorites')) || [];
}

function saveFavorites(favorites) {
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

function renderFavoritesGallery() {
  const favorites = getFavorites();
  const favoritesGallery = document.getElementById('favoritesGallery');
  const noFavoritesMessage = document.getElementById('no-favorites-message');

  if (!favoritesGallery || !noFavoritesMessage) return;

  if (favorites.length === 0) {
    favoritesGallery.innerHTML = '';
    noFavoritesMessage.classList.remove('hidden');
    return;
  }

  noFavoritesMessage.classList.add('hidden');

  favoritesGallery.innerHTML = favorites
    .map((product) => {
      const id = product._id || product.id;
      return `
        <div class="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition duration-300 flex flex-col justify-between">
          <div>
            <div class="relative overflow-hidden rounded-xl h-48 mb-4">
              <img 
                src="${product.image}" 
                alt="${product.name}" 
                class="w-full h-full object-cover"
                onerror="this.src='/assets/images/img-10.jpg'"
              />
              <button 
                data-action="remove-favorite"
                data-id="${id}"
                class="absolute top-3 right-3 w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center shadow hover:bg-red-600 transition"
                title="إزالة من المفضلة"
              >
                ✕
              </button>
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-1">${product.name}</h3>
            <p class="text-sm text-gray-500 mb-3">${product.description || ''}</p>
          </div>
          <div class="pt-3 border-t border-gray-100 flex items-center justify-between">
            <span class="text-xl font-extrabold text-[#005DA5]">${product.price} ج.م</span>
            <button 
              data-action="add-to-cart"
              data-id="${id}"
              class="bg-[#005DA5] hover:bg-[#098AC1] text-white px-5 py-2 rounded-xl font-semibold transition shadow-sm"
            >
              أضف للسلة
            </button>
          </div>
        </div>
      `;
    })
    .join('');
}

function removeFromFavorites(productId) {
  let favorites = getFavorites();
  favorites = favorites.filter((fav) => (fav._id || fav.id) !== productId);
  saveFavorites(favorites);
  renderFavoritesGallery();
}

function addToCartFromFavorites(productId) {
  const favorites = getFavorites();
  const product = favorites.find((fav) => (fav._id || fav.id) === productId);
  if (!product) return;

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existing = cart.find((item) => (item._id || item.id) === productId);
  if (existing) {
    existing.quantity = (existing.quantity || 1) + 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`تمت إضافة "${product.name}" إلى السلة بنجاح!`);
}

export function initFavorites() {
  const favoritesGallery = document.getElementById('favoritesGallery');
  if (favoritesGallery) {
    favoritesGallery.addEventListener('click', (event) => {
      const btn = event.target.closest('[data-action]');
      if (!btn) return;

      const action = btn.getAttribute('data-action');
      const id = btn.getAttribute('data-id');

      if (action === 'remove-favorite') {
        removeFromFavorites(id);
      } else if (action === 'add-to-cart') {
        addToCartFromFavorites(id);
      }
    });
  }

  renderFavoritesGallery();
}
