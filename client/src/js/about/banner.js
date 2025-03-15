export default () => /*html*/ `
<section id="header" class="relative h-screen overflow-hidden">
  <!-- الصورة في الخلفية -->
  <div
    class="absolute inset-0 bg-cover bg-center bg-no-repeat"
    style="background-image: url('/assets/images/img-16.jpg');"
  ></div>

  <!-- التظليل للنص -->
  <div class="absolute inset-0 bg-black opacity-50"></div>

  <!-- المحتوى في المنتصف -->
  <div class="container mx-auto px-4 relative z-10 flex items-center justify-center h-full text-center">
    <div>
      <h2 class="text-5xl font-bold text-white mb-4">من نحن</h2>
      <p class="text-xl text-white leading-relaxed">
        مرحبًا بكم في مطعم الحلويات - حيث تبدأ كل لقمة بابتسامة!
      </p>
      <p class="mt-4 text-gray-300">
        نحن فخورون بتقديم حلويات طازجة ومبتكرة تناسب جميع الأذواق. استمتع بتجربة لا تُنسى مع منتجاتنا المصنوعة بحب واهتمام.
      </p>
      <a href="/menu" class="inline-block mt-8 px-6 py-3 bg-[#005DA5] text-white font-semibold rounded-lg shadow-md hover:bg-[#098AC1] transition duration-300">
        استكشف قائمتنا
      </a>
    </div>
  </div>
</section>`;
