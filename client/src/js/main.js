// استيراد الواجهات ودوال التهيئة
import homeView from './views/home.js';
import aboutView from './views/about.js';
import contactView, { initContact } from './views/contact.js';
import menuView, { initMenu } from './views/menu.js';
import cartView, { initCart } from './views/cart.js';
import favoritesView, { initFavorites } from './views/favorites.js';
import loginView, { initLogin } from './views/login.js';
import dashboardView, { initDashboard } from './views/dashboard.js';
import { showToast } from './components/toast.js';

// خريطة مسارات التطبيق
const routes = {
  '/': { title: 'B-Labn - بلبن | الرئيسية', render: homeView },
  '/about': { title: 'B-Labn - بلبن | عن المتجر', render: aboutView },
  '/contact': { title: 'B-Labn - بلبن | تواصل معنا', render: contactView, init: initContact },
  '/menu': { title: 'B-Labn - بلبن | قائمة الحلويات', render: menuView, init: initMenu },
  '/cart': { title: 'B-Labn - بلبن | سلة المشتريات', render: cartView, init: initCart },
  '/favorites': { title: 'B-Labn - بلبن | المفضلة', render: favoritesView, init: initFavorites },
  '/login': { title: 'B-Labn - بلبن | تسجيل الدخول', render: loginView, init: initLogin },
  '/dashboard': { title: 'B-Labn - بلبن | لوحة التحكم', render: dashboardView, init: initDashboard },
};

// دالة تحديث عدادات السلة والمفضلة (Badges)
export function updateBadges() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const favCount = favorites.length;

  const cartBadge = document.getElementById('cart-badge');
  const favBadge = document.getElementById('favorites-badge');
  const mobileCartBadge = document.getElementById('mobile-cart-badge');
  const mobileFavBadge = document.getElementById('mobile-favorites-badge');

  if (cartBadge) {
    if (cartCount > 0) {
      cartBadge.textContent = cartCount > 99 ? '99+' : cartCount;
      cartBadge.classList.remove('hidden');
    } else {
      cartBadge.classList.add('hidden');
    }
  }

  if (mobileCartBadge) {
    if (cartCount > 0) {
      mobileCartBadge.textContent = cartCount > 99 ? '99+' : cartCount;
      mobileCartBadge.classList.remove('hidden');
    } else {
      mobileCartBadge.classList.add('hidden');
    }
  }

  if (favBadge) {
    if (favCount > 0) {
      favBadge.textContent = favCount > 99 ? '99+' : favCount;
      favBadge.classList.remove('hidden');
    } else {
      favBadge.classList.add('hidden');
    }
  }

  if (mobileFavBadge) {
    if (favCount > 0) {
      mobileFavBadge.textContent = favCount > 99 ? '99+' : favCount;
      mobileFavBadge.classList.remove('hidden');
    } else {
      mobileFavBadge.classList.add('hidden');
    }
  }
}

// دالة تحديث حالة عناصر النافبار بناءً على المصادقة
export function updateNavbarAuth() {
  const token = localStorage.getItem('token');
  let role = '';
  let user = null;

  try {
    role = JSON.parse(localStorage.getItem('role')) || '';
    user = JSON.parse(localStorage.getItem('user')) || null;
  } catch {
    role = localStorage.getItem('role') || '';
  }

  const loggedInWidget = document.getElementById('logged-in-widget');
  const loggedOutWidget = document.getElementById('logged-out-widget');
  const userDisplayName = document.getElementById('user-display-name');
  const adminBtn = document.getElementById('admin-dashboard-btn');
  const mobileAdminBtn = document.getElementById('mobile-admin-dashboard-btn');
  const mobileLoggedInBox = document.getElementById('mobile-logged-in-box');
  const mobileLoggedOutBox = document.getElementById('mobile-logged-out-box');

  if (token) {
    if (loggedInWidget) loggedInWidget.classList.remove('hidden');
    if (loggedOutWidget) loggedOutWidget.classList.add('hidden');
    if (mobileLoggedInBox) mobileLoggedInBox.classList.remove('hidden');
    if (mobileLoggedOutBox) mobileLoggedOutBox.classList.add('hidden');

    const name = (user && (user.username || user.email)) || 'حسابي';
    const isAdmin = role === 'admin';

    if (userDisplayName) {
      userDisplayName.textContent = isAdmin ? `${name} (مشرف)` : name;
    }

    if (adminBtn) {
      if (isAdmin) {
        adminBtn.classList.remove('hidden');
        adminBtn.classList.add('inline-flex');
      } else {
        adminBtn.classList.add('hidden');
        adminBtn.classList.remove('inline-flex');
      }
    }

    if (mobileAdminBtn) {
      if (isAdmin) {
        mobileAdminBtn.classList.remove('hidden');
      } else {
        mobileAdminBtn.classList.add('hidden');
      }
    }
  } else {
    if (loggedInWidget) loggedInWidget.classList.add('hidden');
    if (loggedOutWidget) loggedOutWidget.classList.remove('hidden');
    if (mobileLoggedInBox) mobileLoggedInBox.classList.add('hidden');
    if (mobileLoggedOutBox) mobileLoggedOutBox.classList.remove('hidden');
    if (adminBtn) adminBtn.classList.add('hidden');
    if (mobileAdminBtn) mobileAdminBtn.classList.add('hidden');
  }

  updateBadges();
}

// دالة التنقل البرمجي السلس
export function navigateTo(url) {
  if (location.pathname !== url) {
    history.pushState(null, null, url);
  }
  router();
}

// دالة التوجيه الرئيسية
export async function router() {
  const currentPath = location.pathname;
  let view = routes[currentPath];

  if (!view) {
    history.replaceState(null, null, '/');
    view = routes['/'];
  }

  document.title = view.title;
  const appContainer = document.getElementById('app');
  if (appContainer) {
    appContainer.innerHTML = view.render();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });

  // إغلاق قائمة الجوال إن كانت مفتوحة
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
    mobileMenu.classList.add('hidden');
  }

  // تحديث حالة النافبار والعدادات
  updateNavbarAuth();

  // تشغيل دالة تهيئة الصفحة الحالية
  if (typeof view.init === 'function') {
    try {
      await view.init();
    } catch (err) {
      console.error(`Error initializing view for ${currentPath}:`, err);
    }
  }
}

// معالجة تسجيل الخروج العام
function handleGlobalLogout(e) {
  if (e) e.preventDefault();
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('role');
  updateNavbarAuth();
  showToast('تم تسجيل الخروج بنجاح 👋', 'info');
  navigateTo('/login');
}

// ربط أحداث النقر للتنقل السلس عبر [data-link]
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[data-link]');
  if (link && link.href) {
    const url = new URL(link.href);
    if (url.origin === location.origin) {
      e.preventDefault();
      navigateTo(url.pathname);
    }
  }
});

// أزرار تسجيل الخروج في النافبار
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) logoutBtn.addEventListener('click', handleGlobalLogout);

const mobileLogoutBtn = document.getElementById('mobile-logout-btn');
if (mobileLogoutBtn) mobileLogoutBtn.addEventListener('click', handleGlobalLogout);

// زر القائمة في الشاشات الصغيرة
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}

// ربط أحداث المتصفح
window.addEventListener('popstate', router);
window.addEventListener('DOMContentLoaded', () => {
  updateNavbarAuth();
  router();
});
