// استيراد الواجهات ودوال التهيئة
import homeView from './views/home.js';
import aboutView from './views/about.js';
import contactView, { initContact } from './views/contact.js';
import menuView, { initMenu } from './views/menu.js';
import cartView, { initCart } from './views/cart.js';
import favoritesView, { initFavorites } from './views/favorites.js';
import loginView, { initLogin } from './views/login.js';
import dashboardView, { initDashboard } from './views/dashboard.js';

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

// دالة تحديث حالة الأيقونات وعناصر التنقل بناءً على المصادقة
export function updateNavbarAuth() {
  const token = localStorage.getItem('token');
  let role = '';
  try {
    role = JSON.parse(localStorage.getItem('role')) || '';
  } catch {
    role = localStorage.getItem('role') || '';
  }

  const loggedInIcons = document.getElementById('logged-in-icons');
  const loggedOutIcons = document.getElementById('logged-out-icons');
  const mobileLoggedInIcons = document.getElementById('mobile-logged-in-icons');
  const mobileLoggedOutIcons = document.getElementById('mobile-logged-out-icons');

  const adminDashboardIcon = document.getElementById('admin-dashboard-icon');
  const mobileAdminDashboardIcon = document.getElementById('mobile-admin-dashboard-icon');

  if (token) {
    if (loggedInIcons) loggedInIcons.classList.remove('hidden');
    if (loggedOutIcons) loggedOutIcons.classList.add('hidden');
    if (mobileLoggedInIcons) mobileLoggedInIcons.classList.remove('hidden');
    if (mobileLoggedOutIcons) mobileLoggedOutIcons.classList.add('hidden');

    const isAdmin = role === 'admin';
    if (adminDashboardIcon) adminDashboardIcon.style.display = isAdmin ? 'inline-flex' : 'none';
    if (mobileAdminDashboardIcon) mobileAdminDashboardIcon.style.display = isAdmin ? 'block' : 'none';
  } else {
    if (loggedInIcons) loggedInIcons.classList.add('hidden');
    if (loggedOutIcons) loggedOutIcons.classList.remove('hidden');
    if (mobileLoggedInIcons) mobileLoggedInIcons.classList.add('hidden');
    if (mobileLoggedOutIcons) mobileLoggedOutIcons.classList.remove('hidden');

    if (adminDashboardIcon) adminDashboardIcon.style.display = 'none';
    if (mobileAdminDashboardIcon) mobileAdminDashboardIcon.style.display = 'none';
  }
}

// اسم بديل للتوافق
export const updateNavAuthUI = updateNavbarAuth;

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

  // تحديث حالة النافبار
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
  if (!confirm('هل أنت متأكد من رغبتك في تسجيل الخروج؟')) return;

  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('role');
  updateNavbarAuth();
  alert('تم تسجيل الخروج بنجاح.');
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
