export default () => /*html*/ `
  <footer class="bg-gray-700 text-white py-12">
      <div class="container mx-auto px-4">
        <!-- تقسيم التذييل إلى أعمدة -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- العمود الأول: معلومات التواصل -->
          <div>
            <h3 class="text-2xl font-bold mb-4">تواصل معنا</h3>
            <p class="text-gray-300 mb-2">📞 الهاتف: 9200XXXXXX</p>
            <p class="text-gray-300 mb-2">
              📧 البريد الإلكتروني: info@halawiyatna.com
            </p>
            <p class="text-gray-300">
              📍 العنوان: الرياض، المملكة العربية السعودية
            </p>
          </div>

          <!-- العمود الثاني: روابط سريعة -->
          <div>
            <h3 class="text-2xl font-bold mb-4">روابط سريعة</h3>
            <ul class="space-y-2">
              <li>
                <a
                  href="#"
                  class="text-gray-300 hover:text-white transition duration-300"
                  >الرئيسية</a
                >
              </li>
              <li>
                <a
                  href="#menu"
                  class="text-gray-300 hover:text-white transition duration-300"
                  >قائمة الطعام</a
                >
              </li>
              <li>
                <a
                  href="#about"
                  class="text-gray-300 hover:text-white transition duration-300"
                  >عن حلوياتنا</a
                >
              </li>
              <li>
                <a
                  href="#contact"
                  class="text-gray-300 hover:text-white transition duration-300"
                  >تواصل معنا</a
                >
              </li>
            </ul>
          </div>

          <!-- العمود الثالث: وسائل التواصل الاجتماعي -->
          <div>
            <h3 class="text-2xl font-bold mb-4">تابعنا</h3>
            <div class="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                class="text-gray-300 hover:text-white transition duration-300"
              >
                <i class="fab fa-facebook-f"></i> Facebook
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                class="text-gray-300 hover:text-white transition duration-300"
              >
                <i class="fab fa-instagram"></i> Instagram
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                class="text-gray-300 hover:text-white transition duration-300"
              >
                <i class="fab fa-twitter"></i> Twitter
              </a>
            </div>
          </div>
        </div>

        <!-- حقوق النشر -->
        <div class="mt-8 text-center text-gray-400">
          <p>&copy; 2023 حلوياتنا. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>`;
