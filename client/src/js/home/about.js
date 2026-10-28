export default () => /*html*/ `
<section class="bg-gray-100 py-16">
  <div class="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
    <!-- الجزء الأول: الفيديو الجديد المحدث -->
    <div class="relative w-full h-80 md:h-96 overflow-hidden rounded-2xl shadow-xl bg-black">
      <iframe 
        src="https://www.youtube.com/embed/MEsoJfpveFk" 
        title="B-Labn Video"
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        allowfullscreen
        class="w-full h-full">
      </iframe>
    </div>

    <!-- الجزء الثاني: المحتوى -->
    <div class="text-center md:text-right">
      <div class="inline-block px-3.5 py-1 rounded-full bg-blue-50 text-[#005DA5] text-sm font-bold mb-3">
        حكاية B-Labn
      </div>
      <h2 class="text-3xl md:text-4xl font-extrabold text-[#005DA5] mb-4">أصل السعادة مع B-Labn</h2>
      <p class="text-gray-700 leading-relaxed mb-6 text-lg">
        نحن متجر B-Labn الرائد في ابتكار أشهى الحلويات الشرقية والغربية بمكونات طبيعية 100% وحليب طازج يومياً. من القشطوطة الشهيرة لشوكولاتة دبي المقرمشة والقنبلة، نصنع كل طبق بحب وإتقان لنسعد حواسك ونشاركك أجمل اللحظات.
      </p>
      <div class="flex items-center justify-center md:justify-start space-x-4 space-x-reverse">
        <a href="/menu" data-link class="inline-block bg-[#005DA5] text-white px-7 py-3 rounded-full font-bold hover:bg-[#098AC1] transition duration-300 shadow">
          تصفح قائمة الطعام
        </a>
        <a href="/about" data-link class="inline-block bg-white text-gray-700 border border-gray-300 px-6 py-3 rounded-full font-bold hover:bg-gray-50 transition duration-300 shadow-sm">
          قصتنا وتاريخنا
        </a>
      </div>
    </div>
  </div>
</section>`;
