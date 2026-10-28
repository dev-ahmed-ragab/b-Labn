import { navigateTo, updateNavAuthUI } from '../main.js';

export default () => /*html*/ `
  <div class="min-h-[75vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="bg-white p-8 sm:p-10 rounded-2xl shadow-lg w-full max-w-md border border-gray-100">
      <!-- عنوان الصفحة -->
      <div class="text-center mb-8">
        <h2 id="form-title" class="text-3xl font-extrabold text-gray-900">تسجيل الدخول</h2>
        <p id="form-subtitle" class="text-sm text-gray-500 mt-2">أهلاً بك مجدداً في B-Labn</p>
      </div>

      <!-- رسالة الخطأ -->
      <div id="auth-alert" class="hidden p-4 rounded-xl mb-6 text-sm"></div>

      <!-- نموذج تسجيل الدخول -->
      <form id="login-form" class="space-y-5">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
          <input
            type="email"
            id="login-email"
            required
            placeholder="example@mail.com"
            class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005DA5] transition"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">كلمة المرور</label>
          <input
            type="password"
            id="login-password"
            required
            placeholder="••••••••"
            class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005DA5] transition"
          />
        </div>
        <button
          type="submit"
          id="login-submit-btn"
          class="w-full bg-[#005DA5] hover:bg-[#098AC1] text-white py-3.5 rounded-xl font-bold transition shadow-md"
        >
          دخول
        </button>
      </form>

      <!-- نموذج إنشاء حساب -->
      <form id="register-form" class="space-y-5 hidden">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">اسم المستخدم</label>
          <input
            type="text"
            id="register-username"
            required
            placeholder="اسمك الكامل أو اللقب"
            class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005DA5] transition"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
          <input
            type="email"
            id="register-email"
            required
            placeholder="example@mail.com"
            class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005DA5] transition"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">كلمة المرور</label>
          <input
            type="password"
            id="register-password"
            required
            placeholder="••••••••"
            class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005DA5] transition"
          />
        </div>
        <button
          type="submit"
          id="register-submit-btn"
          class="w-full bg-green-600 hover:bg-green-700 text-white py-3.5 rounded-xl font-bold transition shadow-md"
        >
          إنشاء حساب جديد
        </button>
      </form>

      <!-- زر التبديل بين النماذج -->
      <div class="mt-6 text-center border-t border-gray-100 pt-6">
        <button
          id="toggle-form-btn"
          type="button"
          class="text-[#005DA5] hover:underline font-semibold text-sm cursor-pointer"
        >
          ليس لديك حساب؟ اشترك الآن مجاناً
        </button>
      </div>
    </div>
  </div>
`;

const rawApi = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';
const api = `${rawApi.replace(/\/+$/, '')}/api/auth`;

function showAlert(message, isError = true) {
  const alertEl = document.getElementById('auth-alert');
  if (!alertEl) return;

  alertEl.textContent = message;
  alertEl.className = isError
    ? 'p-4 rounded-xl mb-6 text-sm bg-red-50 text-red-700 border border-red-200'
    : 'p-4 rounded-xl mb-6 text-sm bg-green-50 text-green-700 border border-green-200';
  alertEl.classList.remove('hidden');
}

export function initLogin() {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const formTitle = document.getElementById('form-title');
  const formSubtitle = document.getElementById('form-subtitle');
  const toggleBtn = document.getElementById('toggle-form-btn');

  if (!loginForm || !registerForm || !toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    const isLoginVisible = !loginForm.classList.contains('hidden');
    const alertEl = document.getElementById('auth-alert');
    if (alertEl) alertEl.classList.add('hidden');

    if (isLoginVisible) {
      loginForm.classList.add('hidden');
      registerForm.classList.remove('hidden');
      formTitle.textContent = 'إنشاء حساب جديد';
      formSubtitle.textContent = 'انضم إلى عائلة B-Labn واستمتع بأشهى العروض';
      toggleBtn.textContent = 'لديك حساب بالفعل؟ تسجيل الدخول';
    } else {
      registerForm.classList.add('hidden');
      loginForm.classList.remove('hidden');
      formTitle.textContent = 'تسجيل الدخول';
      formSubtitle.textContent = 'أهلاً بك مجدداً في B-Labn';
      toggleBtn.textContent = 'ليس لديك حساب؟ اشترك الآن مجاناً';
    }
  });

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();
    const submitBtn = document.getElementById('login-submit-btn');

    if (!email || !password) {
      showAlert('يرجى ملء جميع الحقول المطلوبة.');
      return;
    }

    try {
      submitBtn.disabled = true;
      submitBtn.textContent = 'جاري التحقق...';

      const response = await fetch(`${api}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('role', JSON.stringify(data.user.role));

        showAlert('تم تسجيل الدخول بنجاح! جاري تحويلك...', false);
        updateNavAuthUI();

        setTimeout(() => {
          if (data.user.role === 'admin') {
            navigateTo('/dashboard');
          } else {
            navigateTo('/');
          }
        }, 800);
      } else {
        showAlert(data.message || 'بيانات تسجيل الدخول غير صحيحة.');
      }
    } catch (error) {
      console.error('Login error:', error);
      showAlert('تعذر الاتصال بالخادم. يرجى المحاولة لاحقاً.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'دخول';
    }
  });

  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('register-username').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value.trim();
    const submitBtn = document.getElementById('register-submit-btn');

    if (!username || !email || !password) {
      showAlert('يرجى ملء جميع الحقول المطلوبة.');
      return;
    }

    try {
      submitBtn.disabled = true;
      submitBtn.textContent = 'جاري إنشاء الحساب...';

      const response = await fetch(`${api}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('role', JSON.stringify(data.user.role));

        showAlert('تم إنشاء الحساب بنجاح! أهلاً بك.', false);
        updateNavAuthUI();

        setTimeout(() => {
          navigateTo('/');
        }, 800);
      } else {
        showAlert(data.message || 'حدث خطأ أثناء إنشاء الحساب.');
      }
    } catch (error) {
      console.error('Register error:', error);
      showAlert('تعذر الاتصال بالخادم. يرجى المحاولة لاحقاً.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'إنشاء حساب جديد';
    }
  });
}
