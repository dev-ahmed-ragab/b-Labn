export default () => /*html*/ `
<section class="bg-gray-100 py-16">
  <div class="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
    <!-- الجزء الأول: الفيديو -->
    <div class="relative w-full h-80 md:h-96 overflow-hidden rounded-2xl shadow-lg">
      <iframe 
        src="https://www.youtube.com/embed/65mjILnG6i4?autoplay=1&mute=1" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen
        class="w-full h-full">
      </iframe>
    </div>

    <!-- الجزء الثاني: المحتوى -->
    <div class="text-center md:text-right">
      <h2 class="text-3xl md:text-4xl font-extrabold text-[#005DA5] mb-4">عن B-Labn</h2>
      <p class="text-gray-700 leading-relaxed mb-6 text-lg">
        نحن متجر B-Labn الرائد في تقديم أشهى وأحدث ابتكارات الحلويات الشرقية والغربية المصنوعة من أفضل المكونات الطبيعية. نهدف إلى تقديم تجربة مميزة تسعد حواسك وتجمع العائلة والأصدقاء.
      </p>
      <a href="/about" data-link class="inline-block bg-[#005DA5] text-white px-7 py-3 rounded-full font-bold hover:bg-[#098AC1] transition duration-300 shadow">
        اكتشف المزيد عنا
      </a>
    </div>
  </div>
</section>`;
