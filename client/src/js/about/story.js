export default () => /*html*/ `
<section id="our-story" class="py-16 bg-white">
  <div class="container mx-auto px-4">
    <!-- العنوان والوصف -->
    <div class="text-center mb-12">
      <h2 class="text-4xl font-bold text-[#005DA5] mb-4">قصتنا الحلوة</h2>
      <p class="text-lg text-gray-700 leading-relaxed">
        نُقدِّم لكم قصة شغفنا وحبنا للحلويات المصرية الأصيلة.
      </p>
    </div>

    <!-- القصة مع الصورة -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <!-- النصوص -->
      <div class="text-right md:text-left">
        <h3 class="text-2xl font-semibold text-[#005DA5] mb-4">بداية الرحلة</h3>
        <p class="text-gray-700 leading-relaxed mb-4">
          بدأنا في عام 2005 كحلم صغير في قلب القاهرة، حيث كانت جدتنا المصرية تُعد الحلويات التقليدية مثل "بسبوسة" و"كنافة" في منزلها. كانت كل قطعة من حلوياتها تحمل طعمًا خاصًا يعكس تراثنا المصري العريق.
        </p>
        <p class="text-gray-700 leading-relaxed mb-4">
          مع مرور الوقت، أصبحت حلوياتنا محط أنظار الجميع، وقررنا فتح أول متجر لنا لنشارك هذا الحب مع العالم. منذ ذلك الحين، أصبح "بلابن مصر" وجهة لكل من يبحث عن الطعم الأصيل والجودة العالية.
        </p>
        <p class="text-gray-700 leading-relaxed">
          اليوم، نحن فخورون بأن نكون أحد أشهر مطاعم الحلويات المصرية، مع تشكيلة واسعة من الحلويات التقليدية والحديثة التي تناسب جميع الأذواق.
        </p>
      </div>

      <!-- الصورة -->
      <div class="relative overflow-hidden rounded-lg shadow-lg">
        <img
          src="/assets/images/img-10.jpg"
          alt="قصة بلابن مصر"
          class="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
        />
      </div>
    </div>
  </div>
</section>`;
