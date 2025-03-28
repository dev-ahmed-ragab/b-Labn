export default () => /*html*/ `
<section class="bg-gray-100 py-12">
  <!-- تقسيم القسم إلى جزئين -->
  <div class="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
    <!-- الجزء الأول: الفيديو -->
<div class="relative w-full h-96 overflow-hidden rounded-lg shadow-md">
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
      <h2 class="text-4xl font-bold text-[#005DA5] mb-4">عن حلوياتنا</h2>
      <p class="text-gray-700 leading-relaxed mb-6">
        نحن متجر حلويات مختص بتقديم الحلويات الطازجة والمصنوعة يدويًا بحب وعناية. نهدف إلى تقديم تجربة مميزة لعملائنا من خلال منتجاتنا الفريدة واللذيذة.
      </p>
      <a href="/about" class="inline-block bg-[#005DA5] text-white px-6 py-3 rounded-full font-bold hover:bg-[#098AC1] transition duration-300">
        اكتشف المزيد
      </a>
    </div>
  </div>
</section>`;
