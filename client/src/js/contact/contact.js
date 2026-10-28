export default () => /*html*/ `
<!-- القسم: اتصل بنا -->
<section id="contact" class="py-12 bg-[#F8FAFC]">
  <div class="container mx-auto px-4 max-w-5xl">
    <!-- رأس القسم -->
    <div class="text-center mb-12">
      <div class="inline-block px-4 py-1 rounded-full bg-blue-50 text-[#005DA5] text-xs font-black tracking-wider uppercase mb-2">
        نحن هنا لمساعدتك
      </div>
      <h2 class="text-3xl md:text-4xl font-black text-[#005DA5]">تواصل مع فريق B-Labn</h2>
      <p class="text-sm text-gray-500 mt-2">نسعد دائماً باستقبال آرائكم واستفساراتكم وطلبات الحفلات والمناسبات الخاصة.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      <!-- طرق الاتصال -->
      <div class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <h3 class="text-xl font-black text-gray-800 mb-6">قنوات التواصل المباشرة</h3>
        <div class="space-y-6">
          <!-- الهاتف -->
          <div class="flex items-center space-x-4 space-x-reverse">
            <div class="w-12 h-12 bg-blue-50 text-[#005DA5] rounded-2xl flex items-center justify-center text-xl flex-shrink-0">
              <i class="fas fa-phone-alt"></i>
            </div>
            <div>
              <p class="text-xs text-gray-400 font-bold">الخط الساخن المباشر</p>
              <p class="text-base font-black text-gray-800">15761 / +20 100 000 0000</p>
            </div>
          </div>

          <!-- البريد الإلكتروني -->
          <div class="flex items-center space-x-4 space-x-reverse">
            <div class="w-12 h-12 bg-blue-50 text-[#005DA5] rounded-2xl flex items-center justify-center text-xl flex-shrink-0">
              <i class="fas fa-envelope"></i>
            </div>
            <div>
              <p class="text-xs text-gray-400 font-bold">البريد الإلكتروني للشكاوى والمقترحات</p>
              <p class="text-base font-black text-gray-800">support@b-labn.com</p>
            </div>
          </div>

          <!-- العنوان -->
          <div class="flex items-center space-x-4 space-x-reverse">
            <div class="w-12 h-12 bg-blue-50 text-[#005DA5] rounded-2xl flex items-center justify-center text-xl flex-shrink-0">
              <i class="fas fa-map-marker-alt"></i>
            </div>
            <div>
              <p class="text-xs text-gray-400 font-bold">المقر الرئيسي والفروع</p>
              <p class="text-base font-black text-gray-800">القاهرة، الإسكندرية، الجيزة، وجميع محافظات مصر</p>
            </div>
          </div>
        </div>

        <div class="mt-8 pt-6 border-t border-gray-100">
          <p class="text-xs font-bold text-gray-500 mb-3">ساعات العمل وخدمة التوصيل:</p>
          <p class="text-xs text-gray-400 leading-relaxed">فروعنا جاهزة لاستقبالكم وتوصيل طلباتكم يومياً من 11:00 صباحاً وحتى 2:00 صباحاً بعد منتصف الليل.</p>
        </div>
      </div>

      <!-- نموذج الاتصال -->
      <div class="contact-form bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <h3 class="text-xl font-black text-gray-800 mb-6">أرسل لنا رسالة</h3>
        <form class="space-y-4">
          <div>
            <label for="name" class="block text-xs font-bold text-gray-700 mb-1.5">الاسم الكريم</label>
            <input
              type="text"
              id="name"
              name="name"
              class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005DA5] text-sm"
              placeholder="اكتب اسمك هنا"
              required
            />
          </div>
          <div>
            <label for="email" class="block text-xs font-bold text-gray-700 mb-1.5">البريد الإلكتروني أو رقم الهاتف</label>
            <input
              type="text"
              id="email"
              name="email"
              class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005DA5] text-sm text-left"
              placeholder="010XXXXXXXX أو name@mail.com"
              required
              dir="ltr"
            />
          </div>
          <div>
            <label for="message" class="block text-xs font-bold text-gray-700 mb-1.5">نص الرسالة أو الاستفسار</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005DA5] text-sm"
              placeholder="اكتب رسالتك أو استفسارك بالتفصيل..."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            class="w-full bg-[#005DA5] hover:bg-[#098AC1] text-white text-sm font-black py-3.5 rounded-xl transition shadow-sm mt-2"
          >
            إرسال الرسالة ✉️
          </button>
        </form>
      </div>
    </div>
  </div>
</section>
`;
