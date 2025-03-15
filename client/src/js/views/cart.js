export default () => /*html*/ `
  <section class="p-8 bg-gray-50 min-h-screen">
    <div class="container mx-auto">
      <!-- عنوان الصفحة -->
      <h2 class="text-3xl font-bold text-center mb-6">عرض السلة</h2>

      <!-- رسالة عدم وجود منتجات -->
      <div id="no-products-message" class="hidden text-center text-gray-700 font-bold text-lg">
        لا توجد منتجات في السلة.
      </div>

      <!-- عرض المنتجات -->
      <div id="productGallery" class="grid grid-cols-1 md:grid-cols-3 gap-6"></div>

      <!-- إجمالي السعر وزر إنهاء الشراء -->
      <div id="checkout-section" class="mt-8 hidden">
        <div class="flex justify-between items-center mb-4">
          <span class="text-xl font-bold">إجمالي السعر:</span>
          <span id="total-price" class="text-xl font-bold text-green-600">0 ريال</span>
        </div>
        <button onclick="checkout()" 
                class="w-full bg-[#005DA5] text-white px-6 py-3 rounded-lg hover:bg-[#098AC1]">
          إنهاء عملية الشراء
        </button>
      </div>
    </div>
  </section>
`;

// دالة للحصول على بيانات المنتجات من localStorage
function getProductsFromLocalStorage() {
  const products = JSON.parse(localStorage.getItem('cart')) || [];
  return products;
}

// دالة لتحديث بيانات المنتجات في localStorage
function updateProductsInLocalStorage(products) {
  localStorage.setItem('cart', JSON.stringify(products));
}

// دالة للحصول على قائمة المفضلة من localStorage
function getFavoritesFromLocalStorage() {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  return favorites;
}

// دالة لتحديث قائمة المفضلة في localStorage
function updateFavoritesInLocalStorage(favorites) {
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

// دالة لعرض المنتجات
function renderProductGallery() {
  const products = getProductsFromLocalStorage();
  const favorites = getFavoritesFromLocalStorage();

  // التحقق من وجود العناصر في DOM
  const productGallery = document.getElementById('productGallery');
  const noProductsMessage = document.getElementById('no-products-message');
  const checkoutSection = document.getElementById('checkout-section');
  const totalPriceElement = document.getElementById('total-price');

  if (
    !productGallery ||
    !noProductsMessage ||
    !checkoutSection ||
    !totalPriceElement
  ) {
    console.error('One or more elements are missing in the DOM.');
    return;
  }

  if (products.length === 0) {
    // إذا لم تكن هناك منتجات، نعرض رسالة ونخفي الزر
    productGallery.innerHTML = '';
    noProductsMessage.classList.remove('hidden');
    checkoutSection.classList.add('hidden');
    return;
  }

  // إذا كانت هناك منتجات، نخفي الرسالة ونعرض الزر
  noProductsMessage.classList.add('hidden');
  checkoutSection.classList.remove('hidden');

  // حساب الإجمالي
  let total = 0;
  products.forEach((product) => {
    total += product.price * product.quantity;
  });
  totalPriceElement.textContent = `${total} ريال`;

  // عرض المنتجات
  productGallery.innerHTML = products
    .map(
      (product) => `
      <div class="product-item bg-white p-4 rounded-lg shadow-md relative">
        <img src="${product.image}" alt="${
        product.name
      }" class="w-full h-48 object-cover rounded-md mb-4">
        <h3 class="text-xl font-bold mb-2">${product.name}</h3>
        <p class="text-gray-700 mb-2">السعر: ${product.price} ريال</p>
        <div class="flex items-center justify-between mb-4">
          <button onclick="decreaseQuantity(${product.id})" 
                  class="bg-gray-300 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-400">
            -
          </button>
          <span id="quantity-${product.id}" class="text-lg font-bold">${
        product.quantity
      }</span>
          <button onclick="increaseQuantity(${product.id})" 
                  class="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600">
            +
          </button>
        </div>
        <button onclick="deleteProduct(${product.id})" 
                class="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
          حذف
        </button>
        <!-- زر المفضلة -->
        <button onclick="toggleFavorite(${product.id})"
                class="absolute top-2 right-2 p-2 rounded-full ${
                  favorites.some((fav) => fav.id === product.id)
                    ? 'bg-red-500'
                    : 'bg-gray-300'
                }">
          ❤️
        </button>
      </div>
    `
    )
    .join('');
}

// دالة لزيادة الكمية
function increaseQuantity(productId) {
  const products = getProductsFromLocalStorage();
  const product = products.find((p) => p.id === productId);
  if (product) {
    product.quantity += 1;
    updateProductsInLocalStorage(products);
    renderProductGallery();
  }
}

// دالة لتقليل الكمية
function decreaseQuantity(productId) {
  const products = getProductsFromLocalStorage();
  const product = products.find((p) => p.id === productId);
  if (product && product.quantity > 1) {
    product.quantity -= 1;
    updateProductsInLocalStorage(products);
    renderProductGallery();
  }
}

// دالة لحذف المنتج
function deleteProduct(productId) {
  let products = getProductsFromLocalStorage();
  products = products.filter((product) => product.id !== productId);
  updateProductsInLocalStorage(products);
  renderProductGallery();
  console.log(`تم حذف المنتج ذو ID: ${productId}`);
}

// دالة لإنهاء عملية الشراء
function checkout() {
  const products = getProductsFromLocalStorage();
  let total = 0;

  products.forEach((product) => {
    total += product.price * product.quantity;
  });

  console.log('إجمالي السعر:', total, 'ريال');
  alert(`شكرًا لشرائك! إجمالي الطلب هو ${total} ريال.`);
  localStorage.removeItem('cart'); // مسح السلة بعد الشراء
  renderProductGallery(); // تحديث العرض
}

// دالة لإضافة أو حذف المنتج من المفضلة
function toggleFavorite(productId) {
  const products = getProductsFromLocalStorage();
  const favorites = getFavoritesFromLocalStorage();

  const product = products.find((p) => p.id === productId);

  if (!product) {
    console.error('Product not found.');
    return;
  }

  const isFavorite = favorites.some((fav) => fav.id === productId);

  if (isFavorite) {
    // إذا كان المنتج موجودًا في المفضلة، نحذفه
    const updatedFavorites = favorites.filter((fav) => fav.id !== productId);
    updateFavoritesInLocalStorage(updatedFavorites);
    console.log(`تم حذف المنتج من المفضلة: ${product.name}`);
  } else {
    // إذا لم يكن موجودًا، نضيفه
    favorites.push(product);
    updateFavoritesInLocalStorage(favorites);
    console.log(`تمت إضافة المنتج إلى المفضلة: ${product.name}`);
  }

  renderProductGallery(); // تحديث العرض
}

// تحميل الدوال عند بدء الصفحة
document.addEventListener('DOMContentLoaded', () => {
  // إضافة الدوال إلى النطاق العام
  window.increaseQuantity = increaseQuantity;
  window.decreaseQuantity = decreaseQuantity;
  window.deleteProduct = deleteProduct;
  window.checkout = checkout;
  window.toggleFavorite = toggleFavorite;

  // التأكد من أن جميع العناصر جاهزة في DOM
  setTimeout(() => {
    renderProductGallery();
  }, 0); // ضمان تحميل الـ DOM بالكامل
});
