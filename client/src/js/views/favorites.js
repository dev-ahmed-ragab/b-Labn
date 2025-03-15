export default () => /*html*/ `
  <section class="p-8 bg-gray-50 min-h-screen">
    <div class="container mx-auto">
      <!-- عنوان الصفحة -->
      <h2 class="text-3xl font-bold text-center mb-6">قائمة المفضلة</h2>

      <!-- رسالة عدم وجود منتجات -->
      <div id="no-favorites-message" class="hidden text-center text-gray-700 font-bold text-lg">
        لا توجد منتجات في المفضلة.
      </div>

      <!-- عرض المنتجات -->
      <div id="favoritesGallery" class="grid grid-cols-1 md:grid-cols-3 gap-6"></div>
    </div>
  </section>
`;

// دالة للحصول على قائمة المفضلة من localStorage
function getFavoritesFromLocalStorage() {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  return favorites;
}

// دالة لتحديث قائمة المفضلة في localStorage
function updateFavoritesInLocalStorage(favorites) {
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

// دالة لعرض المنتجات المفضلة
function renderFavoritesGallery() {
  const favorites = getFavoritesFromLocalStorage();

  // التحقق من وجود العناصر في DOM
  const favoritesGallery = document.getElementById('favoritesGallery');
  const noFavoritesMessage = document.getElementById('no-favorites-message');

  if (!favoritesGallery || !noFavoritesMessage) {
    console.error('One or more elements are missing in the DOM.');
    return;
  }

  if (favorites.length === 0) {
    // إذا لم تكن هناك منتجات، نعرض رسالة
    favoritesGallery.innerHTML = '';
    noFavoritesMessage.classList.remove('hidden');
    return;
  }

  // إذا كانت هناك منتجات، نخفي الرسالة
  noFavoritesMessage.classList.add('hidden');

  // عرض المنتجات
  favoritesGallery.innerHTML = favorites
    .map(
      (product) => `
      <div class="product-item bg-white p-4 rounded-lg shadow-md relative">
        <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover rounded-md mb-4">
        <h3 class="text-xl font-bold mb-2">${product.name}</h3>
        <p class="text-gray-700 mb-2">السعر: ${product.price} ريال</p>
        <button onclick="removeFromFavorites(${product.id})"
                class="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
          حذف من المفضلة
        </button>
      </div>
    `
    )
    .join('');
}

// دالة لحذف المنتج من المفضلة
function removeFromFavorites(productId) {
  const favorites = getFavoritesFromLocalStorage();
  const updatedFavorites = favorites.filter((fav) => fav.id !== productId);
  updateFavoritesInLocalStorage(updatedFavorites);
  renderFavoritesGallery();
  console.log(`تم حذف المنتج من المفضلة: ${productId}`);
}

// تحميل الدوال عند بدء الصفحة
document.addEventListener('DOMContentLoaded', () => {
  // إضافة الدوال إلى النطاق العام
  window.removeFromFavorites = removeFromFavorites;

  // عرض المنتجات عند تحميل الصفحة
  setTimeout(() => {
    renderFavoritesGallery();
  }, 0); // ضمان تحميل الـ DOM بالكامل
});
