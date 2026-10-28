export default () => /*html*/ `
<section id="menu" class="p-8 bg-gray-50">
  <div class="container mx-auto">
    <h2 class="text-3xl font-extrabold text-center mb-8 text-gray-800">مختارات من حلويات B-Labn</h2>
    
    <!-- عرض بعض العناصر كعينة -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- عنصر 1 -->
      <div class="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition">
        <img src="/assets/images/img-13.jpg" alt="مارشميلو هوت شوكليت" class="w-full h-56 object-cover rounded-xl" onerror="this.src='/assets/images/img-10.jpg'">
        <h3 class="text-xl font-bold mt-4 text-gray-800">مارشميلو هوت شوكليت</h3>
        <p class="text-[#005DA5] font-extrabold mt-2 text-lg">45 ج.م</p>
      </div>
      <!-- عنصر 2 -->
      <div class="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition">
        <img src="/assets/images/img-14.jpg" alt="شوكولاته دبي" class="w-full h-56 object-cover rounded-xl" onerror="this.src='/assets/images/img-10.jpg'">
        <h3 class="text-xl font-bold mt-4 text-gray-800">شوكولاته دبي الفاخرة</h3>
        <p class="text-[#005DA5] font-extrabold mt-2 text-lg">60 ج.م</p>
      </div>
      <!-- عنصر 3 -->
      <div class="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition">
        <img src="/assets/images/img-15.jpg" alt="قشطوطة" class="w-full h-56 object-cover rounded-xl" onerror="this.src='/assets/images/img-10.jpg'">
        <h3 class="text-xl font-bold mt-4 text-gray-800">قشطوطة بالكراميل والمكسرات</h3>
        <p class="text-[#005DA5] font-extrabold mt-2 text-lg">35 ج.م</p>
      </div>
    </div>

    <!-- زر الانتقال إلى قائمة الطعام الكاملة -->
    <div class="text-center mt-12">
      <a href="/menu" data-link class="inline-block bg-[#005DA5] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-[#098AC1] transition duration-300 shadow-md">
        استكشف القائمة الكاملة
      </a>
    </div>
  </div>
</section>
`;
