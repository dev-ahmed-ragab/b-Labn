export default () => /*html*/ `
<!-- القسم الخامس: فريق العمل -->
<section id="team" class="p-8 bg-pink-50">
  <div class="container mx-auto">
    <!-- العنوان -->
    <div class="text-center mb-8">
      <h2 class="text-3xl font-bold text-[#005DA5] mb-2">فريق العمل</h2>
      <p class="text-lg text-gray-600">الأشخاص الذين يجعلون كل شيء ممكنًا</p>
    </div>
    <!-- شبكة أعضاء الفريق -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- عضو الفريق 1 -->
      <div class="team-member bg-white p-4 rounded-lg shadow-md text-center">
        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" 
             alt="ليلى" 
             class="w-32 h-32 mx-auto rounded-full object-cover mb-4">
        <h3 class="text-xl font-semibold text-gray-800">ليلى</h3>
        <p class="text-gray-600">مبدعة الكيكات ذات الطابع الخاص</p>
      </div>
      <!-- عضو الفريق 2 -->
      <div class="team-member bg-white p-4 rounded-lg shadow-md text-center">
        <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" 
             alt="أحمد" 
             class="w-32 h-32 mx-auto rounded-full object-cover mb-4">
        <h3 class="text-xl font-semibold text-gray-800">أحمد</h3>
        <p class="text-gray-600">شيف الحلويات المبتكرة</p>
      </div>
      <!-- عضو الفريق 3 -->
      <div class="team-member bg-white p-4 rounded-lg shadow-md text-center">
        <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" 
             alt="محمد" 
             class="w-32 h-32 mx-auto rounded-full object-cover mb-4">
        <h3 class="text-xl font-semibold text-gray-800">محمد</h3>
        <p class="text-gray-600">مدير العمليات</p>
      </div>
    </div>
  </div>
</section>`;
