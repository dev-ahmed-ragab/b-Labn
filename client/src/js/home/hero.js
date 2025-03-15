export default () => /*html*/ `
  <section id="hero" class="relative h-screen bg-cover bg-center flex items-center justify-center text-white"
style="background-image: url('/public/assets/images/img-12.jpg');"    >
    <!-- غشاء داكن فوق الصورة -->
    <div class="absolute inset-0 bg-black opacity-50"></div>
    <!-- محتوى في المنتصف -->
    <div class="relative z-10 text-center">
      <h1 class="text-5xl font-bold mb-4">مرحبًا بك في حلوياتنا</h1>
      <p class="text-xl mb-8">نقدم لك أفضل الحلويات الطازجة والمصنوعة يدويًا.</p>
      <!-- زر اكتشف القائمة -->
      <a href="/menu" class="inline-block bg-[#005DA5] text-white px-8 py-4 rounded-full font-bold hover:bg-[#098AC1] transition duration-300">
        اكتشف القائمة
      </a>
    </div>
  </section>`;
