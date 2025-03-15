export default () => /*html*/ `
<!-- القسم الثالث: تاريخ المطعم -->
<section id="history" class="section bg-pink-50 py-16">
  <div class="container mx-auto px-4">
    <div class="section-header text-center mb-12">
      <h2 class="text-4xl font-bold text-[#005DA5]">تاريخنا</h2>
      <p class="text-lg text-gray-600 mt-2">أهم المحطات التي شكلت مسيرتنا.</p>
    </div>
    <div class="timeline relative">
      <!-- الخط العمودي -->
      <div class="absolute left-1/2 w-1 bg-pink-300 h-full transform -translate-x-1/2"></div>

      <!-- العناصر الزمنية -->
      <div class="timeline-item relative mb-8">
        <div class="timeline-content bg-white p-6 rounded-lg shadow-lg w-full md:w-1/2 ml-auto">
          <h3 class="text-2xl font-semibold text-[#005DA5]">2010</h3>
          <p class="text-lg text-gray-600 mt-2">افتتاح أول متجر في القاهرة.</p>
        </div>
        <div class="timeline-dot absolute top-6 left-1/2 w-6 h-6 bg-[#005DA5] rounded-full transform -translate-x-1/2"></div>
      </div>

      <div class="timeline-item relative mb-8">
        <div class="timeline-content bg-white p-6 rounded-lg shadow-lg w-full md:w-1/2 mr-auto">
          <h3 class="text-2xl font-semibold text-[#005DA5]">2015</h3>
          <p class="text-lg text-gray-600 mt-2">إطلاق قائمة الحلويات المبتكرة.</p>
        </div>
        <div class="timeline-dot absolute top-6 left-1/2 w-6 h-6 bg-[#005DA5] rounded-full transform -translate-x-1/2"></div>
      </div>

      <div class="timeline-item relative mb-8">
        <div class="timeline-content bg-white p-6 rounded-lg shadow-lg w-full md:w-1/2 ml-auto">
          <h3 class="text-2xl font-semibold text-[#005DA5]">2020</h3>
          <p class="text-lg text-gray-600 mt-2">توسيع الفروع لتغطية عدة مدن.</p>
        </div>
        <div class="timeline-dot absolute top-6 left-1/2 w-6 h-6 bg-[#005DA5] rounded-full transform -translate-x-1/2"></div>
      </div>
    </div>
  </div>
</section>`;
