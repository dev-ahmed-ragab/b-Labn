export default () => /*html*/ `
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <!-- كرت النموذج -->
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <!-- عنوان الصفحة -->
      <h2 id="form-title" class="text-2xl font-bold text-center mb-6">تسجيل الدخول</h2>

      <!-- نموذج تسجيل الدخول -->
      <div id="login-form" class="space-y-4">
        <input
          type="email"
          id="login-email"
          placeholder="البريد الإلكتروني"
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          id="login-password"
          placeholder="كلمة المرور"
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onclick="loginUser()"
          class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          تسجيل الدخول
        </button>
      </div>

      <!-- نموذج إنشاء حساب -->
      <div id="register-form" class="space-y-4 hidden">
        <input
          type="text"
          id="register-username"
          placeholder="اسم المستخدم"
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          id="register-email"
          placeholder="البريد الإلكتروني"
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          id="register-password"
          placeholder="كلمة المرور"
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onclick="registerUser()"
          class="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300"
        >
          إنشاء حساب
        </button>
      </div>

      <!-- زر التبديل بين النماذج -->
      <div class="mt-4 text-center">
        <button
          id="toggle-form"
          onclick="toggleForm()"
          class="text-blue-500 hover:underline cursor-pointer"
        >
          ليس لديك حساب؟ اشترك الآن
        </button>
      </div>
    </div>
  </div>
`;

const api = 'http://localhost:5000/api/auth'; // رابط الـ API الخاص بالباك اند

// دالة تبديل النماذج
function toggleForm() {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const formTitle = document.getElementById('form-title');
  const toggleButton = document.getElementById('toggle-form');

  if (loginForm.classList.contains('hidden')) {
    // إذا كان نموذج تسجيل الدخول مخفيًا، أظهره وأخفِ نموذج الإنشاء
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
    formTitle.textContent = 'تسجيل الدخول';
    toggleButton.textContent = 'ليس لديك حساب؟ اشترك الآن';
  } else {
    // إذا كان نموذج الإنشاء مخفيًا، أظهره وأخفِ نموذج تسجيل الدخول
    loginForm.classList.add('hidden');
    registerForm.classList.remove('hidden');
    formTitle.textContent = 'إنشاء حساب جديد';
    toggleButton.textContent = 'لديك حساب؟ تسجيل الدخول';
  }
}

// دالة تسجيل الدخول
async function loginUser() {
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value.trim();

  if (!email || !password) {
    alert('يرجى ملء جميع الحقول!');
    return;
  }

  try {
    const response = await fetch(`${api}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token); // تخزين الرمز في localStorage
      alert('تم تسجيل الدخول بنجاح!');
      console.log('Token:', data.token);
    } else {
      alert('بيانات تسجيل الدخول غير صحيحة!');
    }
  } catch (error) {
    console.error('حدث خطأ أثناء تسجيل الدخول:', error);
  }
}

// دالة إنشاء حساب جديد
async function registerUser() {
  const username = document.getElementById('register-username').value.trim();
  const email = document.getElementById('register-email').value.trim();
  const password = document.getElementById('register-password').value.trim();

  if (!username || !email || !password) {
    alert('يرجى ملء جميع الحقول!');
    return;
  }

  try {
    const response = await fetch(`${api}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password, role: 'user' }), // الدور افتراضيًا "مستخدم عادي"
    });

    if (response.ok) {
      alert('تم إنشاء الحساب بنجاح!');
    } else {
      alert('حدث خطأ أثناء إنشاء الحساب!');
    }
  } catch (error) {
    console.error('حدث خطأ أثناء إنشاء الحساب:', error);
  }
}

// تحميل الدوال عند بدء الصفحة
document.addEventListener('DOMContentLoaded', () => {
  // إضافة الدوال إلى النطاق العالمي
  window.toggleForm = toggleForm;
  window.loginUser = loginUser;
  window.registerUser = registerUser;
});
