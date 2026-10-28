import { showToast } from '../components/toast.js';
import { updateBadges } from '../main.js';

// دالة القالب لصفحة السلة المطورة
export default () => /*html*/ `
  <section class="py-12 bg-[#F8FAFC] min-h-[75vh]">
    <div class="container mx-auto max-w-6xl px-4">
      <!-- عنوان الصفحة وبداية المسار -->
      <div class="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
        <div>
          <h1 class="text-3xl font-black text-[#005DA5]">سلة المشتريات</h1>
          <p class="text-gray-500 text-sm mt-1">راجع طلباتك وأكمل عملية الشراء لتصلك طازجة ولذيذة</p>
        </div>
        <a href="/menu" data-link class="hidden md:inline-flex items-center space-x-1.5 space-x-reverse text-sm font-bold text-[#005DA5] hover:text-[#098AC1]">
          <span>+ إضافة أصناف أخرى</span>
        </a>
      </div>

      <!-- حالة السلة الفارغة -->
      <div id="no-products-message" class="hidden text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100 p-8 max-w-lg mx-auto">
        <div class="w-20 h-20 bg-blue-50 text-[#005DA5] rounded-full flex items-center justify-center mx-auto text-4xl mb-4">
          🛒
        </div>
        <h2 class="text-2xl font-black text-gray-800 mb-2">سلتك فارغة حالياً!</h2>
        <p class="text-gray-500 text-sm mb-6">لم تقم بإضافة أي حلوى لذيذة إلى سلتك بعد. استكشف قائمة B-Labn الآن واختر ما يسعدك.</p>
        <a href="/menu" data-link class="inline-block bg-[#005DA5] hover:bg-[#098AC1] text-white px-8 py-3 rounded-2xl font-bold transition shadow-sm text-sm">
          تصفح قائمة الحلويات 🍨
        </a>
      </div>

      <!-- محتوى السلة عند وجود منتجات (تقسيم عمودين احترافي) -->
      <div id="cart-content-wrapper" class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <!-- العمود الأول: قائمة العناصر -->
        <div class="lg:col-span-2 space-y-4" id="productGallery"></div>

        <!-- العمود الثاني: ملخص الطلب والفاتورة -->
        <div id="checkout-section" class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 sticky top-28">
          <h3 class="text-xl font-black text-gray-800 mb-6 pb-3 border-b border-gray-100">ملخص الطلب</h3>
          
          <div class="space-y-3.5 text-sm text-gray-600 mb-6">
            <div class="flex justify-between items-center">
              <span>إجمالي المنتجات:</span>
              <span id="subtotal-price" class="font-bold text-gray-800 text-base">0 ج.م</span>
            </div>
            <div class="flex justify-between items-center">
              <span>رسوم التوصيل:</span>
              <span class="font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded text-xs">توصيل مجاني 🛵</span>
            </div>
            <div class="flex justify-between items-center text-xs text-gray-400">
              <span>الضريبة المضافة:</span>
              <span>مشمولة في السعر</span>
            </div>
            
            <div class="pt-4 border-t border-gray-100 flex justify-between items-center text-lg">
              <span class="font-black text-gray-900">المبلغ الإجمالي:</span>
              <span id="total-price" class="font-black text-2xl text-[#005DA5]">0 ج.م</span>
            </div>
          </div>

          <button 
            id="checkout-btn" 
            class="w-full bg-[#005DA5] hover:bg-[#098AC1] active:scale-[0.98] text-white py-4 rounded-2xl font-black text-base transition duration-200 shadow-md flex items-center justify-center space-x-2 space-x-reverse"
          >
            <span>تأكيد وإتمام الطلب</span>
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>

          <p class="text-[11px] text-gray-400 text-center mt-4">
            🔒 الدفع عند الاستلام أو بواسطة البطاقة البنكية
          </p>
        </div>
      </div>
    </div>
  </section>
`;

function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateBadges();
}

function renderCart() {
  const cart = getCart();

  const productGallery = document.getElementById('productGallery');
  const noProductsMessage = document.getElementById('no-products-message');
  const cartWrapper = document.getElementById('cart-content-wrapper');
  const totalPriceElement = document.getElementById('total-price');
  const subtotalPriceElement = document.getElementById('subtotal-price');

  if (!productGallery || !noProductsMessage || !cartWrapper || !totalPriceElement) {
    return;
  }

  if (cart.length === 0) {
    productGallery.innerHTML = '';
    cartWrapper.classList.add('hidden');
    noProductsMessage.classList.remove('hidden');
    return;
  }

  noProductsMessage.classList.add('hidden');
  cartWrapper.classList.remove('hidden');

  let total = 0;
  productGallery.innerHTML = cart
    .map((product) => {
      const quantity = product.quantity || 1;
      const subtotal = Number(product.price || 0) * quantity;
      total += subtotal;

      return `
        <div class="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 transition hover:shadow-md">
          <div class="flex items-center space-x-4 space-x-reverse w-full sm:w-auto">
            <img 
              src="${product.image || '/assets/images/logo.jpg'}" 
              alt="${product.name}" 
              class="w-20 h-20 rounded-2xl object-cover bg-gray-50 flex-shrink-0 border border-gray-100"
              onerror="this.src='/assets/images/logo.jpg'"
            />
            <div>
              <h3 class="font-black text-gray-800 text-base leading-snug">${product.name}</h3>
              <p class="text-xs text-gray-400 mt-1">سعر القطعة: ${product.price} ج.م</p>
              <p class="text-sm font-black text-[#005DA5] mt-1 sm:hidden">الإجمالي: ${subtotal} ج.م</p>
            </div>
          </div>

          <div class="flex items-center justify-between sm:justify-end space-x-6 space-x-reverse w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-0 border-gray-100">
            <!-- التحكم بالكمية -->
            <div class="flex items-center space-x-2 space-x-reverse bg-gray-50 border border-gray-200 rounded-xl p-1">
              <button 
                data-action="decrease" 
                data-id="${product._id}"
                class="w-8 h-8 rounded-lg bg-white text-gray-700 hover:bg-gray-200 flex items-center justify-center font-black transition active:scale-95 shadow-sm text-sm"
              >
                -
              </button>
              <span class="w-8 text-center font-black text-sm text-gray-800">${quantity}</span>
              <button 
                data-action="increase" 
                data-id="${product._id}"
                class="w-8 h-8 rounded-lg bg-[#005DA5] text-white hover:bg-[#098AC1] flex items-center justify-center font-black transition active:scale-95 shadow-sm text-sm"
              >
                +
              </button>
            </div>

            <!-- السعر الإجمالي للقطعة (للشاشات المتوسطة والكبيرة) -->
            <div class="hidden sm:block text-left min-w-[80px]">
              <span class="text-base font-black text-[#005DA5]">${subtotal} ج.م</span>
            </div>

            <!-- زر الحذف -->
            <button 
              data-action="delete" 
              data-id="${product._id}"
              title="إزالة هذا الصنف"
              class="text-gray-400 hover:text-red-600 p-2 rounded-xl hover:bg-red-50 transition"
            >
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      `;
    })
    .join('');

  totalPriceElement.textContent = `${total} ج.م`;
  if (subtotalPriceElement) subtotalPriceElement.textContent = `${total} ج.م`;
}

export function initCart() {
  renderCart();

  const productGallery = document.getElementById('productGallery');
  const checkoutBtn = document.getElementById('checkout-btn');

  if (productGallery) {
    productGallery.onclick = (e) => {
      const button = e.target.closest('button[data-action]');
      if (!button) return;

      const action = button.getAttribute('data-action');
      const productId = button.getAttribute('data-id');

      let cart = getCart();
      const product = cart.find((item) => String(item._id) === String(productId));

      if (!product && action !== 'delete') return;

      if (action === 'increase') {
        product.quantity = (product.quantity || 1) + 1;
        saveCart(cart);
        renderCart();
      } else if (action === 'decrease') {
        if (product.quantity > 1) {
          product.quantity -= 1;
          saveCart(cart);
          renderCart();
        } else {
          cart = cart.filter((item) => String(item._id) !== String(productId));
          saveCart(cart);
          renderCart();
          showToast(`تمت إزالة "${product.name}" من السلة`, 'info');
        }
      } else if (action === 'delete') {
        const removed = product ? product.name : 'الصنف';
        cart = cart.filter((item) => String(item._id) !== String(productId));
        saveCart(cart);
        renderCart();
        showToast(`تم حذف "${removed}" من السلة`, 'info');
      }
    };
  }

  if (checkoutBtn) {
    checkoutBtn.onclick = () => {
      const cart = getCart();
      if (cart.length === 0) return;

      const total = cart.reduce(
        (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1),
        0
      );

      showToast(`شكرًا لطلبك من B-Labn! إجمالي الطلب: ${total} ج.م. تم استلام طلبك بنجاح وسنتواصل معك 🍨`, 'success', 5000);
      localStorage.removeItem('cart');
      updateBadges();
      renderCart();
    };
  }
}
