// نظام الإشعارات والتنبيهات المخصصة العصري (Toast Notifications)

let toastContainer = null;

function ensureToastContainer() {
  if (!toastContainer || !document.body.contains(toastContainer)) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className =
      'fixed top-5 left-1/2 transform -translate-x-1/2 z-[9999] flex flex-col items-center space-y-3 pointer-events-none w-full max-w-md px-4';
    document.body.appendChild(toastContainer);
  }
  return toastContainer;
}

export function showToast(message, type = 'success', duration = 3200) {
  const container = ensureToastContainer();

  const toast = document.createElement('div');
  toast.className =
    'pointer-events-auto flex items-center space-x-3 space-x-reverse px-5 py-3.5 rounded-2xl shadow-2xl backdrop-blur-md transition-all duration-300 transform -translate-y-4 opacity-0 border';

  let iconHtml = '';
  if (type === 'success') {
    toast.classList.add('bg-white/95', 'text-gray-800', 'border-green-200');
    iconHtml = `
      <div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    `;
  } else if (type === 'error') {
    toast.classList.add('bg-white/95', 'text-gray-800', 'border-red-200');
    iconHtml = `
      <div class="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 flex-shrink-0">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
    `;
  } else {
    toast.classList.add('bg-white/95', 'text-gray-800', 'border-blue-200');
    iconHtml = `
      <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-[#005DA5] flex-shrink-0">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    `;
  }

  toast.innerHTML = `
    ${iconHtml}
    <div class="text-sm font-semibold flex-1 leading-snug">${message}</div>
    <button class="text-gray-400 hover:text-gray-600 text-lg mr-2">&times;</button>
  `;

  // إغلاق يدوي عند النقر
  const closeBtn = toast.querySelector('button');
  if (closeBtn) {
    closeBtn.onclick = () => dismissToast(toast);
  }

  container.appendChild(toast);

  // أنيميشن الظهور
  requestAnimationFrame(() => {
    toast.classList.remove('-translate-y-4', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');
  });

  // الاختفاء التلقائي
  const timer = setTimeout(() => {
    dismissToast(toast);
  }, duration);

  toast.addEventListener('mouseenter', () => clearTimeout(timer));
  toast.addEventListener('mouseleave', () => {
    setTimeout(() => dismissToast(toast), 1500);
  });
}

function dismissToast(toast) {
  if (!toast || !toast.parentElement) return;
  toast.classList.remove('translate-y-0', 'opacity-100');
  toast.classList.add('-translate-y-4', 'opacity-0');
  setTimeout(() => {
    if (toast.parentElement) {
      toast.parentElement.removeChild(toast);
    }
  }, 300);
}

