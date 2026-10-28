// تصدير واجهة صفحة القائمة
export default () => /*html*/ `
  <!-- القسم الأول: شريط البحث -->
  <section class="p-8 bg-white shadow-sm">
    <div class="container mx-auto">
      <input 
        type="text" 
        id="searchInput" 
        placeholder="ابحث عن الحلوى المفضلة لديك..." 
        class="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#005DA5] transition shadow-sm text-right"
      />
    </div>
  </section>

  <!-- القسم الثاني: عرض المنتجات -->
  <section id="products" class="p-8 bg-gray-50 min-h-[60vh]">
    <div class="container mx-auto">
      <div id="menu-loading" class="text-center py-12 text-gray-500 text-lg">
        <i class="fas fa-spinner fa-spin mr-2"></i> جاري تحميل المنتجات...
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 hidden" id="productGrid">
        <!-- المنتجات ستظهر هنا ديناميكيًا -->
      </div>
    </div>
  </section>
`;

// مصفوفة لتخزين المنتجات
let products = [];
const rawApi = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';
const api = rawApi.replace(/\/+$/, '');

// دالة لعرض المنتجات
function displayProducts(filteredProducts) {
  const productGrid = document.getElementById('productGrid');
  if (!productGrid) return;

  productGrid.innerHTML = '';

  if (!filteredProducts || filteredProducts.length === 0) {
    productGrid.innerHTML = `
      <div class="col-span-full text-center py-12 text-gray-500">
        <p class="text-xl font-bold">لا توجد منتجات مطابقة للبحث.</p>
      </div>
    `;
    return;
  }

  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  filteredProducts.forEach((product) => {
    const isFavorite = favorites.some((fav) => (fav._id || fav.id) === product._id);

    const card = document.createElement('div');
    card.className = 'bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition duration-300 flex flex-col justify-between';
    card.innerHTML = `
      <div>
        <div class="relative overflow-hidden rounded-xl h-48 mb-4">
          <img 
            src="${product.image}" 
            alt="${product.name}" 
            class="w-full h-full object-cover transition duration-300 hover:scale-105"
            onerror="this.src='/assets/images/img-10.jpg'"
          />
          <button 
            class="add-to-favorites absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition shadow-md ${
              isFavorite ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-500 hover:text-red-500'
            }" 
            data-id="${product._id}"
            title="إضافة إلى المفضلة"
          >
            ❤️
          </button>
        </div>
        <h3 class="text-xl font-bold text-gray-800 mb-1">${product.name}</h3>
        <p class="text-sm text-gray-500 mb-3 line-clamp-2">${product.description || ''}</p>
      </div>
      <div class="pt-3 border-t border-gray-100 flex items-center justify-between">
        <span class="text-xl font-extrabold text-[#005DA5]">${product.price} ج.م</span>
        <button 
          class="add-to-cart bg-[#005DA5] hover:bg-[#098AC1] text-white px-5 py-2.5 rounded-xl font-semibold transition duration-300 shadow-sm hover:shadow" 
          data-id="${product._id}"
        >
          أضف للسلة
        </button>
      </div>
    `;
    productGrid.appendChild(card);
  });
}

// دالة جلب البيانات من الخادم
async function fetchProducts() {
  const loadingEl = document.getElementById('menu-loading');
  const productGrid = document.getElementById('productGrid');

  try {
    const response = await fetch(`${api}/api/product/all`);
    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }

    const data = await response.json();
    products = data.products || [];

    if (loadingEl) loadingEl.classList.add('hidden');
    if (productGrid) {
      productGrid.classList.remove('hidden');
      displayProducts(products);
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    if (loadingEl) {
      loadingEl.innerHTML = `
        <div class="text-red-500">
          <p class="font-bold mb-2">تعذر تحميل المنتجات من الخادم.</p>
          <p class="text-sm text-gray-500">يرجى التأكد من تشغيل السيرفر أو المحاولة لاحقاً.</p>
        </div>
      `;
    }
  }
}

// دالة إضافة إلى السلة
function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const productToAdd = products.find((p) => p._id === productId);

  if (productToAdd) {
    const existingIndex = cart.findIndex((item) => (item._id || item.id) === productId);

    if (existingIndex > -1) {
      cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + 1;
    } else {
      cart.push({ ...productToAdd, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`تمت إضافة "${productToAdd.name}" إلى السلة بنجاح!`);
  } else {
    alert('لم يتم العثور على المنتج!');
  }
}

// دالة تبديل المفضلة
function toggleFavorite(button, productId) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const productToAdd = products.find((p) => p._id === productId);

  if (!productToAdd) return;

  const existingIndex = favorites.findIndex((fav) => (fav._id || fav.id) === productId);

  if (existingIndex > -1) {
    favorites.splice(existingIndex, 1);
    button.classList.remove('bg-red-500', 'text-white');
    button.classList.add('bg-white/80', 'text-gray-500');
    alert(`تمت إزالة "${productToAdd.name}" من المفضلة.`);
  } else {
    favorites.push(productToAdd);
    button.classList.remove('bg-white/80', 'text-gray-500');
    button.classList.add('bg-red-500', 'text-white');
    alert(`تمت إضافة "${productToAdd.name}" إلى المفضلة ❤️`);
  }

  localStorage.setItem('favorites', JSON.stringify(favorites));
}

// تهيئة صفحة القائمة
export function initializeMenu() {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      const query = this.value.trim().toLowerCase();
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(query) ||
        (product.description && product.description.toLowerCase().includes(query))
      );
      displayProducts(filtered);
    });
  }

  const productGrid = document.getElementById('productGrid');
  if (productGrid) {
    productGrid.addEventListener('click', (event) => {
      const cartBtn = event.target.closest('.add-to-cart');
      if (cartBtn) {
        const id = cartBtn.getAttribute('data-id');
        addToCart(id);
        return;
      }

      const favBtn = event.target.closest('.add-to-favorites');
      if (favBtn) {
        const id = favBtn.getAttribute('data-id');
        toggleFavorite(favBtn, id);
        return;
      }
    });
  }

  fetchProducts();
}


// تصدير الاسم البديل المتوافق
export const initMenu = initializeMenu;
