// تصدير المكون الأساسي
export default () => /*html*/ `
  <!-- القسم الأول: شريط البحث -->
  <section class="p-8 bg-white">
    <div class="container mx-auto">
      <!-- شريط البحث -->
      <input type="text" id="searchInput" placeholder="ابحث عن طعامك المفضل..." 
             class="w-full p-3 mb-6 rounded-lg border border-gray-300 focus:outline-none focus:border-pink-500">
    </div>
  </section>

  <!-- القسم الثاني: عرض المنتجات -->
  <section id="products" class="p-8">
    <div class="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="productGrid">
      <!-- المنتجات ستظهر هنا ديناميكيًا -->
    </div>
  </section>
`;

// مصفوفة لتخزين المنتجات
let products = [];
const api = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';
// جلب البيانات من الباك-إند
async function fetchProducts() {
  try {
    const response = await fetch(`${api}/api/product/all`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const data = await response.json();
    products = data.products; // تخزين المنتجات في المتغير العام
    displayProducts(products); // عرض المنتجات عند تحميل الصفحة
  } catch (error) {
    console.error('Error fetching products:', error);
    alert('حدث خطأ أثناء جلب المنتجات.');
  }
}

// دالة لعرض المنتجات
function displayProducts(filteredProducts) {
  const productGrid = document.getElementById('productGrid');
  if (!productGrid) {
    console.error('Element with ID "productGrid" not found in the DOM.');
    return;
  }

  productGrid.innerHTML = ''; // مسح المحتوى السابق

  filteredProducts.forEach((product) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isFavorite = favorites.some((fav) => fav._id === product._id);

    const card = document.createElement('div');
    card.className = 'bg-white p-4 rounded-lg shadow-md relative';
    card.innerHTML = `
          <img src="${product.image}" alt="${
      product.name
    }" class="w-full h-48 object-cover rounded-md">
          <h3 class="text-xl font-bold mt-4">${product.name}</h3>
          <p class="text-gray-600 mt-2">${product.price} ريال</p>
            <!--    <p class="text-sm mt-2 text-gray-500">${
              product.description
            }</p>-->
         <div class="flex justify-between mt-4">
            <button class="add-to-cart w-full bg-[#005DA5] text-white px-4 py-2 rounded hover:bg-[#098AC1] transition" data-id="${
              product._id
            }">إضافة إلى السلة</button>
                <!-- <button class="add-to-favorites ${
                  isFavorite ? 'bg-red-500' : 'bg-gray-300'
                } text-white px-4 py-2 rounded-full hover:bg-red-600 transition" data-id="${
      product._id
    }">
              ❤️
            </button>-->
          </div>
        `;
    productGrid.appendChild(card);
  });
}

// دالة للبحث
export function initializeMenu() {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      const query = this.value.toLowerCase();
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(query)
      );
      displayProducts(filtered);
    });
  }

  // إضافة event delegation لإدارة الأحداث
  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('add-to-cart')) {
      const productId = event.target.getAttribute('data-id');
      addToCart(productId);
    }

    if (event.target.classList.contains('add-to-favorites')) {
      const productId = event.target.getAttribute('data-id');
      toggleFavorite(event.target, productId); // نمرر الزر نفسه لتحديث حالته مباشرة
    }
  });

  // جلب المنتجات عند تحميل الصفحة
  fetchProducts();
}

// دالة إضافة إلى السلة
function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const productToAdd = products.find((product) => product._id === productId);

  if (productToAdd) {
    const existingProduct = cart.find((item) => item._id === productId);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...productToAdd, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`تمت إضافة المنتج "${productToAdd.name}" إلى السلة!`);
  } else {
    alert('لم يتم العثور على المنتج!');
  }
}

// دالة إضافة أو حذف من المفضلة
function toggleFavorite(button, productId) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const productToAdd = products.find((product) => product._id === productId);

  if (!productToAdd) {
    alert('لم يتم العثور على المنتج!');
    return;
  }

  const isFavorite = favorites.some((fav) => fav._id === productId);

  if (isFavorite) {
    // إذا كان المنتج موجودًا في المفضلة، نحذفه
    favorites = favorites.filter((fav) => fav._id !== productId);
    button.classList.remove('bg-red-500');
    button.classList.add('bg-gray-300');
    alert(`تم حذف المنتج "${productToAdd.name}" من المفضلة.`);
  } else {
    // إذا لم يكن موجودًا، نضيفه
    favorites.push(productToAdd);
    button.classList.remove('bg-gray-300');
    button.classList.add('bg-red-500');
    alert(`تمت إضافة المنتج "${productToAdd.name}" إلى المفضلة.`);
  }

  localStorage.setItem('favorites', JSON.stringify(favorites));

  // إعادة عرض المنتجات لتحديث حالة الأزرار
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    const query = searchInput.value.toLowerCase();
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query)
    );
    displayProducts(filtered);
  }
}

// جعل الدوال متاحة في النطاق العام
window.addToCart = addToCart;

// تحميل الدوال عند بدء الصفحة
document.addEventListener('DOMContentLoaded', () => {
  initializeMenu();
});
