import contact from '../contact/contact';
import map from '../contact/map';

export default () => /*html*/ `
   <!-- صفحة الاتصال -->
<section id="contact" class="section bg-pink-50 py-16">
${contact()}

${map()}
</section>
`;
