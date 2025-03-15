export default () => /*html*/ `
<!-- القسم: اتصل بنا -->
<section id="contact" class="py-16 bg-pink-50">
  <div class="container mx-auto px-4">
    <!-- رأس القسم -->
    <div class="text-center mb-12">
      <h2 class="text-4xl font-bold text-[#005DA5]">اتصل بنا</h2>
      <p class="text-lg text-gray-600 mt-2">نحن هنا لمساعدتك! تواصل معنا عبر أي من الطرق التالية.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
      <!-- طرق الاتصال -->
      <div class="contact-methods bg-white p-8 rounded-2xl shadow-xl relative overflow-hidden">
        <!-- خلفية زخرفية -->
        <img
          src="../../../public/assets/images/contact.png"
          alt="خلفية زخرفية"
          class="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div class="relative z-10">
          <h3 class="text-2xl font-semibold text-[#005DA5] mb-6">طرق الاتصال</h3>
          <div class="space-y-6">
            <!-- الهاتف -->
            <div class="flex items-center">
              <div class="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                <i class="fas fa-phone-alt text-[#005DA5] text-xl"></i>
              </div>
              <div class="ml-4">
                <p class="text-lg text-gray-800 font-medium">الهاتف</p>
                <p class="text-gray-600">+20 123 456 7890</p>
              </div>
            </div>
            <!-- البريد الإلكتروني -->
            <div class="flex items-center">
              <div class="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                <i class="fas fa-envelope text-[#005DA5] text-xl"></i>
              </div>
              <div class="ml-4">
                <p class="text-lg text-gray-800 font-medium">البريد الإلكتروني</p>
                <p class="text-gray-600">info@example.com</p>
              </div>
            </div>
            <!-- العنوان -->
            <div class="flex items-center">
              <div class="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                <i class="fas fa-map-marker-alt text-[#005DA5] text-xl"></i>
              </div>
              <div class="ml-4">
                <p class="text-lg text-gray-800 font-medium">العنوان</p>
                <p class="text-gray-600">القاهرة، مصر</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- نموذج الاتصال -->
      <div class="contact-form bg-white p-8 rounded-2xl shadow-xl relative overflow-hidden">
    
        <div class="relative z-10">
          <h3 class="text-2xl font-semibold text-[#005DA5] mb-6">أرسل لنا رسالة</h3>
          <form class="space-y-6">
            <div>
              <label for="name" class="block text-gray-800 font-medium mb-2">الاسم</label>
              <input
                type="text"
                id="name"
                name="name"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="أدخل اسمك"
                required
              />
            </div>
            <div>
              <label for="email" class="block text-gray-800 font-medium mb-2">البريد الإلكتروني</label>
              <input
                type="email"
                id="email"
                name="email"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="أدخل بريدك الإلكتروني"
                required
              />
            </div>
            <div>
              <label for="message" class="block text-gray-800 font-medium mb-2">الرسالة</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="اكتب رسالتك هنا..."
                required
              ></textarea>
            </div>
            <button
              type="submit"
              class="w-full bg-[#005DA5] text-white text-lg font-semibold px-6 py-3 rounded-lg hover:bg-[#098AC1] transition duration-300"
            >
              إرسال الرسالة
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>`;
