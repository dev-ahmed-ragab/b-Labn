export default () => /*html*/ `
<section class="bg-gray-100 py-12">
  <!-- عنوان القسم -->
  <h2 class="text-3xl font-bold text-center text-[#005DA5] mb-8">معرض الصور</h2>

  <!-- شبكة الصور -->
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      

      <!-- صورة 2 (نصف الشاشة) -->
      <div class="col-span-1">
        <img src="/assets/images/img-2.jpg" alt="صورة متوسطة" class="w-full h-auto rounded-lg shadow-md object-cover">
      </div>

      <!-- صورة 3 (نصف الشاشة) -->
      <div class="col-span-1">
        <img src="/assets/images/img-9.jpg" alt="صورة متوسطة" class="w-full h-auto rounded-lg shadow-md object-cover">
      </div>

      <!-- صورة 4 (ربع الشاشة) -->
      <div class="col-span-1 md:col-span-1 lg:col-span-1">
        <img src="/assets/images/img-4.jpg" alt="صورة صغيرة" class="w-full h-auto rounded-lg shadow-md object-cover">
      </div>

      <!-- صورة 5 (ربع الشاشة) -->
      <div class="col-span-1 md:col-span-1 lg:col-span-1">
        <img src="/assets/images/img-5.jpg" alt="صورة صغيرة" class="w-full h-auto rounded-lg shadow-md object-cover">
      </div>
    </div>
  </div>
</section>`;
