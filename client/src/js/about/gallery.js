export default () => /*html*/ `
<!-- القسم السادس: معرض الصور -->
<section id="gallery" class="section bg-white py-16">
  <div class="container mx-auto px-4">
    <div class="section-header text-center mb-12">
      <h2 class="text-4xl font-bold text-gray-800">معرض الصور</h2>
      <p class="text-lg text-gray-600 mt-2">لمحة عن أجواء مطعمنا.</p>
    </div>
    <div class="gallery grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="gallery-item overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        <img src="/public/assets/images/img-2.jpg" alt="تحضير الكيكة" class="w-full h-64 object-cover transform hover:scale-105 transition-transform duration-300">
      </div>
      <div class="gallery-item overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        <img src="/public/assets/images/img-5.jpg" alt="حلويات مبتكرة" class="w-full h-64 object-cover transform hover:scale-105 transition-transform duration-300">
      </div>
      <div class="gallery-item overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        <img src="/public/assets/images/img-9.jpg" alt="فريق العمل" class="w-full h-64 object-cover transform hover:scale-105 transition-transform duration-300">
      </div>
      <div class="gallery-item overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        <img src="/public/assets/images/img-8.jpg" alt="زينة المطعم" class="w-full h-64 object-cover transform hover:scale-105 transition-transform duration-300">
      </div>
    </div>
  </div>
</section>`;
