import { navigateTo, updateNavbarAuth } from '../main.js';
import { showToast } from '../components/toast.js';

export default () => /*html*/ `
  <div class="min-h-[75vh] flex items-center justify-center bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8">
    <div class="bg-white p-8 sm:p-10 rounded-3xl shadow-sm w-full max-w-md border border-gray-100">
      <!-- عنوان الصفحة -->
      <div class="text-center mb-8">
        <div class="w-16 h-16 rounded-full bg-blue-50 text-[#005DA5] flex items-center justify-center text-3xl mx-auto mb-3 font-black">
          🍨
        </div>
        <h2 id="form-title" class="text-3xl font-black text-gray-900">تسجيل الدخول</h2>
        <p id="form-subtitle" class="text-xs text-gray-400 font-bold mt-1.5">أهلاً بك مجدداً في عائلة B-Labn</p>
      </div>

      <!-- رسالة التنبيه المضمنة -->
      <div id="auth-alert" class="hidden p-4 rounded-2xl mb-6 text-xs font-bold"></div>

      <!-- نموذج تسجيل الدخول -->
      <form id="login-form" class="space-y-4">
        <div>
          <label class="block text-xs font-bold text-gray-700 mb-1.5">البريد الإلكتروني</label>
          <input
            type="email"
            id="login-email"
            required
            placeholder="example@mail.com"
            class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005DA5] transition text-sm text-left"
            dir="ltr"
          />
        </div>
        <div>
          <label class="block text-xs font-bold text-gray-700 mb-1.5">كلمة المرور</label>
          <input
            type="password"
            id="login-password"
            required
            placeholder="••••••••"
            class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005DA5] transition text-sm text-left"
            dir="ltr"
          />
        </div>
        <button
          type="submit"
          id="login-submit-btn"
          class="w-full bg-[#005DA5] hover:bg-[#098AC1] text-white py-3.5 rounded-2xl font-black text-sm transition shadow-sm mt-2"
        >
          تسجيل الدخول
        </button>
      </form>

      <!-- نموذج إنشاء حساب -->
      <form id="register-form" class="space-y-4 hidden">
        <div>
          <label class="block text-xs font-bold text-gray-700 mb-1.5">اسم المستخدم</label>
          <input
            type="text"
            id="register-username"
            required
            placeholder="أحمد محمد"
            class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005DA5] transition text-sm"
          />
        </div>
        <div>
          <label class="block text-xs font-bold text-gray-700 mb-1.5">البريد الإلكتروني</label>
          <input
            type="email"
            id="register-email"
            required
            placeholder="example@mail.com"
            class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005DA5] transition text-sm text-left"
            dir="ltr"
          />
        </div>
        <div>
          <label class="block text-xs font-bold text-gray-700 mb-1.5">كلمة المرور (6 أحرف على الأقل)</label>
          <input
            type="password"
            id="register-password"
            required
            minlength="6"
            placeholder="••••••••"
            class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005DA5] transition text-sm text-left"
            dir="ltr"
          />
        </div>
        <button
          type="submit"
          id="register-submit-btn"
          class="w-full bg-[#005DA5] hover:bg-[#098AC1] text-white py-3.5 rounded-2xl font-black text-sm transition shadow-sm mt-2"
        >
          إنشاء الحساب
        </button>
      </form>

      <!-- زر التبديل -->
      <div class="mt-8 text-center pt-5 border-t border-gray-100">
        <button
          id="toggle-form-btn"
          type="button"
          class="text-xs font-black text-[#005DA5] hover:text-[#098AC1] hover:underline"
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
    ? 'p-4 rounded-2xl mb-6 text-xs font-bold bg-red-50 text-red-600 border border-red-100 block'
    : 'p-4 rounded-2xl mb-6 text-xs font-bold bg-green-50 text-green-700 border border-green-100 block';
}

export function initLogin() {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const formTitle = document.getElementById('form-title');
  const formSubtitle = document.getElementById('form-subtitle');
  const toggleBtn = document.getElementById('toggle-form-btn');

  if (!loginForm || !registerForm || !toggleBtn) return;

  toggleBtn.onclick = () => {
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
  };

  loginForm.onsubmit = async (e) => {
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

        showAlert('تم تسجيل الدخول بنجاح! مرحباً بك 🍨', false);
        showToast(`أهلاً بك ${data.user.username || 'عزيزي العميل'} في B-Labn! 🍨`, 'success');
        updateNavbarAuth();

        setTimeout(() => {
          if (data.user.role === 'admin') {
            navigateTo('/dashboard');
          } else {
            navigateTo('/');
          }
        }, 600);
      } else {
        showAlert(data.message || 'بيانات تسجيل الدخول غير صحيحة.');
        showToast(data.message || 'بيانات الدخول غير صحيحة', 'error');
      }
    } catch (error) {
      console.error('Login error:', error);
      showAlert('تعذر الاتصال بالخادم. تأكد من تشغيل السيرفر على البورت 5000.');
      showToast('تعذر الاتصال بالخادم', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'تسجيل الدخول';
    }
  };

  registerForm.onsubmit = async (e) => {
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

        showAlert('تم إنشاء الحساب بنجاح! أهلاً بك 🎉', false);
        showToast('تم إنشاء الحساب بنجاح! أهلاً بك في B-Labn 🎉', 'success');
        updateNavbarAuth();

        setTimeout(() => {
          navigateTo('/');
        }, 600);
      } else {
        showAlert(data.message || 'حدث خطأ أثناء إنشاء الحساب.');
        showToast(data.message || 'فشل إنشاء الحساب', 'error');
      }
    } catch (error) {
      console.error('Register error:', error);
      showAlert('تعذر الاتصال بالخادم. يرجى المحاولة لاحقاً.');
      showToast('تعذر الاتصال بالخادم', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'إنشاء الحساب';
    }
  };
}
