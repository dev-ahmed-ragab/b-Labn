import contact from '../contact/contact.js';
import map from '../contact/map.js';
import { showToast } from '../components/toast.js';

export default () => /*html*/ `
  <!-- صفحة الاتصال المحسنة -->
  <section id="contact-page" class="section bg-[#F8FAFC] py-12">
    ${contact()}
    ${map()}
  </section>
`;

export function initContact() {
  const form = document.querySelector('.contact-form form');
  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      showToast('شكرًا لتواصلك مع B-Labn! تم استلام رسالتك وسنقوم بالرد عليك في أقرب وقت 💬', 'success', 4500);
      form.reset();
    };
  }
}
