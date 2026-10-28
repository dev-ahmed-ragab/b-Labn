export default () => /*html*/ `
  <section id="hero" class="relative h-[85vh] bg-cover bg-center flex items-center justify-center text-white"
           style="background-image: url('/assets/images/img-12.jpg');">
    <!-- غشاء داكن فوق الصورة -->
    <div class="absolute inset-0 bg-black opacity-60"></div>
    <!-- محتوى في المنتصف -->
    <div class="relative z-10 text-center px-4 max-w-2xl">
      <h1 class="text-4xl md:text-6xl font-black mb-4 tracking-tight">مرحبًا بك في B-Labn</h1>
      <p class="text-lg md:text-2xl mb-8 font-light text-gray-200">نقدم لك أشهى وألذ أصناف الحلويات الطازجة المصنوعة بكل حب.</p>
      <!-- زر اكتشف القائمة -->
      <a href="/menu" data-link class="inline-block bg-[#005DA5] text-white px-8 py-3.5 rounded-full font-bold hover:bg-[#098AC1] transition duration-300 shadow-lg">
        اكتشف قائمة الحلويات
      </a>
    </div>
  </section>`;
