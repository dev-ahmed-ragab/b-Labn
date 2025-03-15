// استيراد الوحدات المختلفة التي تمثل الصفحات
import home from './views/home.js';
import about from './views/about.js';
import contact from './views/contact.js';
import menu from './views/menu.js';
import cart from './views/cart.js';
import favorites from './views/favorites.js';
import login from './views/login.js';
import dashboard from './views/dashboard.js';

import { initializeMenu } from './views/menu.js';

// تعريف المسارات المختلفة للتطبيق
const routes = {
  '/': { title: 'Home', render: home },
  '/about': { title: 'About', render: about },
  '/contact': { title: 'Contact', render: contact },
  '/menu': { title: 'Menu', render: menu },
  '/cart': { title: 'Cart', render: cart },
  '/favorites': { title: 'Favorites', render: favorites },
  '/login': { title: 'Login', render: login },
  '/dashboard': { title: 'Dashboard', render: dashboard },
};

// دالة التوجيه التي تقوم بتحديث المحتوى بناءً على المسار الحالي
function router() {
  let view = routes[location.pathname];

  if (view) {
    // تحديث عنوان الصفحة والمحتوى بناءً على المسار الحالي
    document.title = view.title;
    document.getElementById('app').innerHTML = view.render();

    // تهيئة القائمة إذا كنا في صفحة القائمة
    if (location.pathname === '/menu') {
      initializeMenu();
    }
  } else {
    // إذا كان المسار غير معروف، إعادة التوجيه إلى الصفحة الرئيسية
    history.replaceState('', '', '/');
    router();
  }
}

// التعامل مع التنقل بين الصفحات عند النقر على الروابط
window.addEventListener('click', (e) => {
  if (e.target.matches('[data-link]')) {
    e.preventDefault();
    // تحديث المسار بدون إعادة تحميل الصفحة
    history.pushState('', '', e.target.href);
    router();
  }
});

// تحديث التوجيه عند تغيير حالة التاريخ أو عند تحميل الصفحة
window.addEventListener('popstate', router);
window.addEventListener('DOMContentLoaded', router);

// إضافة عنصر app إلى الصفحة إذا لم يكن موجودًا
if (!document.getElementById('app')) {
  document.body.innerHTML = '<div id="app"></div>';
}
