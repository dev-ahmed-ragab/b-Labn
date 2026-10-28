export default () => /*html*/ `
  <section class="p-8 bg-gray-50 min-h-[70vh]">
    <div class="container mx-auto max-w-4xl">
      <!-- عنوان الصفحة -->
      <h2 class="text-3xl font-extrabold text-center text-gray-800 mb-8">سلة المشتريات</h2>

      <!-- رسالة عدم وجود منتجات -->
      <div id="no-products-message" class="hidden text-center py-16 bg-white rounded-2xl shadow-sm">
        <div class="text-5xl mb-4">🛒</div>
        <h3 class="text-2xl font-bold text-gray-700 mb-2">سلتك فارغة حالياً</h3>
        <p class="text-gray-500 mb-6">استكشف أشهى حلويات B-Labn وأضفها إلى سلتك!</p>
        <a href="/menu" data-link class="inline-block bg-[#005DA5] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#098AC1] transition shadow">
          اكتشف المنيو الآن
        </a>
      </div>

      <!-- عرض المنتجات -->
      <div id="productGallery" class="space-y-4"></div>

      <!-- إجمالي السعر وزر إنهاء الشراء -->
      <div id="checkout-section" class="mt-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hidden">
        <div class="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
          <span class="text-xl font-bold text-gray-700">إجمالي الحساب:</span>
          <span id="total-price" class="text-2xl font-extrabold text-green-600">0 ج.م</span>
        </div>
        <button id="checkout-btn" class="w-full bg-[#005DA5] hover:bg-[#098AC1] text-white text-lg py-4 rounded-xl font-bold transition shadow-md">
          تأكيد وإنهاء الطلب
        </button>
      </div>
    </div>
  </section>
`;

function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function renderProductGallery() {
  const products = getCart();
  const productGallery = document.getElementById('productGallery');
  const noProductsMessage = document.getElementById('no-products-message');
  const checkoutSection = document.getElementById('checkout-section');
  const totalPriceElement = document.getElementById('total-price');

  if (!productGallery || !noProductsMessage || !checkoutSection || !totalPriceElement) {
    return;
  }

  if (products.length === 0) {
    productGallery.innerHTML = '';
    noProductsMessage.classList.remove('hidden');
    checkoutSection.classList.add('hidden');
    return;
  }

  noProductsMessage.classList.add('hidden');
  checkoutSection.classList.remove('hidden');

  let total = 0;
  productGallery.innerHTML = products
    .map((product) => {
      const id = product._id || product.id;
      const qty = product.quantity || 1;
      const price = Number(product.price) || 0;
      const subtotal = price * qty;
      total += subtotal;

      return `
        <div class="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-4 w-full sm:w-auto">
            <img 
              src="${product.image}" 
              alt="${product.name}" 
              class="w-20 h-20 object-cover rounded-xl"
              onerror="this.src='/assets/images/img-10.jpg'"
            />
            <div>
              <h3 class="text-lg font-bold text-gray-800">${product.name}</h3>
              <p class="text-sm text-gray-500">${price} ج.م للقطعة</p>
              <p class="text-sm font-semibold text-[#005DA5]">المجموع: ${subtotal} ج.م</p>
            </div>
          </div>

          <div class="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
            <div class="flex items-center border border-gray-200 rounded-xl overflow-hidden">
              <button 
                data-action="decrease" 
                data-id="${id}"
                class="px-3 py-1.5 bg-gray-50 hover:bg-gray-200 text-gray-700 font-bold transition"
              >
                -
              </button>
              <span class="px-4 py-1.5 font-bold text-gray-800">${qty}</span>
              <button 
                data-action="increase" 
                data-id="${id}"
                class="px-3 py-1.5 bg-gray-50 hover:bg-gray-200 text-gray-700 font-bold transition"
              >
                +
              </button>
            </div>

            <button 
              data-action="delete" 
              data-id="${id}"
              class="text-red-500 hover:text-red-700 p-2 font-medium text-sm transition"
              title="حذف من السلة"
            >
              حذف
            </button>
          </div>
        </div>
      `;
    })
    .join('');

  totalPriceElement.textContent = `${total} ج.م`;
}

function increaseQuantity(productId) {
  const cart = getCart();
  const item = cart.find((p) => (p._id || p.id) === productId);
  if (item) {
    item.quantity = (item.quantity || 1) + 1;
    saveCart(cart);
    renderProductGallery();
  }
}

function decreaseQuantity(productId) {
  const cart = getCart();
  const item = cart.find((p) => (p._id || p.id) === productId);
  if (item) {
    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      const idx = cart.indexOf(item);
      cart.splice(idx, 1);
    }
    saveCart(cart);
    renderProductGallery();
  }
}

function deleteProduct(productId) {
  let cart = getCart();
  cart = cart.filter((p) => (p._id || p.id) !== productId);
  saveCart(cart);
  renderProductGallery();
}

function checkout() {
  const cart = getCart();
  if (cart.length === 0) return;

  const total = cart.reduce((sum, p) => sum + (Number(p.price) || 0) * (p.quantity || 1), 0);
  alert(`شكرًا لطلبك من B-Labn! إجمالي الطلب هو ${total} ج.م. سيتم التجهيز والتوصيل قريباً.`);
  localStorage.removeItem('cart');
  renderProductGallery();
}

export function initCart() {
  const productGallery = document.getElementById('productGallery');
  if (productGallery) {
    productGallery.addEventListener('click', (event) => {
      const btn = event.target.closest('[data-action]');
      if (!btn) return;

      const action = btn.getAttribute('data-action');
      const id = btn.getAttribute('data-id');

      if (action === 'increase') increaseQuantity(id);
      else if (action === 'decrease') decreaseQuantity(id);
      else if (action === 'delete') deleteProduct(id);
    });
  }

  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', checkout);
  }

  renderProductGallery();
}
