export default () => /*html*/ `
<section id="menu" class="p-8">
  <h2 class="text-3xl font-bold text-center mb-8">قائمة الطعام</h2>
  
  <!-- عرض بعض العناصر كعينة -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <!-- عنصر 1 -->
    <div class="bg-white p-4 rounded-lg shadow-md">
      <img src="/public/assets/images/img-13.jpg" alt="طبق الشاورما" class="w-full h-[270px] object-cover rounded-md">
      <h3 class="text-xl font-bold mt-4">مارشميلو هوت شوكليت</h3>
      <p class="text-[#005DA5] font-bold mt-2">45 جنيه</p>
    </div>
    <!-- عنصر 2 -->
    <div class="bg-white p-4 rounded-lg shadow-md">
      <img src="/public/assets/images/img-14.jpg" alt="بيتزا مارغريتا" class="w-full h-[270px] object-cover rounded-md">
      <h3 class="text-xl font-bold mt-4">شوكولاته دبي</h3>
      <p class="text-[#005DA5] font-bold mt-2">60 جنيه</p>
    </div>
    <!-- عنصر 3 -->
    <div class="bg-white p-4 rounded-lg shadow-md">
      <img src="/public/assets/images/img-15.jpg" alt="سلطة سيزر" class="w-full h-[270px] object-cover rounded-md">
      <h3 class="text-xl font-bold mt-4">قشطوطة </h3>
      <p class="text-[#005DA5] font-bold mt-2">35 جنيه</p>
    </div>
  </div>

  <!-- زر الانتقال إلى قائمة الطعام الكاملة -->
  <div class="text-center mt-12">
    <a href="/menu" class="inline-block bg-[#005DA5] text-white px-8 py-4 rounded-full font-bold hover:bg-[#098AC1] transition duration-300">
      اكتشف قائمة الطعام الكاملة
    </a>
  </div>
</section>
`;
