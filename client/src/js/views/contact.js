import contact from '../contact/contact.js';
import map from '../contact/map.js';

export default () => /*html*/ `
  <!-- صفحة الاتصال -->
  <section id="contact-page" class="section bg-pink-50 py-12">
    ${contact()}
    ${map()}
  </section>
`;

export function initContact() {
  const form = document.querySelector('.contact-form form');
  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      alert('شكرًا لتواصلك مع B-Labn! تم استلام رسالتك وسنقوم بالرد عليك في أقرب وقت.');
      form.reset();
    };
  }
}
