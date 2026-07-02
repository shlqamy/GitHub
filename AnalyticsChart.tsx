'use client';

import React from 'react';

export default function AnalyticsChart() {
  // بيانات محاكاة للمبيعات على مدار الأسبوع
  const salesData = [
    { day: 'السبت', amount: 150, height: 'h-16' },
    { day: 'الأحد', amount: 300, height: 'h-28' },
    { day: 'الإثنين', amount: 200, height: 'h-20' },
    { day: 'الثلاثاء', amount: 450, height: 'h-40' }, // أعلى يوم
    { day: 'الأربعاء', amount: 120, height: 'h-12' },
    { day: 'الخميس', amount: 380, height: 'h-36' },
    { day: 'الجمعة', amount: 250, height: 'h-24' },
  ];

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6 text-right" dir="rtl">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-sm font-bold text-gray-800">📊 تحليل وإحصائيات المبيعات الأسبوعية</h2>
          <p className="text-[11px] text-gray-400">متابعة أداء الأرباح والمبيعات بشكل مرئي</p>
        </div>
        <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-lg font-bold">
          إجمالي: $1,850
        </span>
      </div>

      {/* أعمدة الرسم البياني */}
      <div className="flex justify-between items-end bg-gray-50 p-4 rounded-xl h-48 pt-8">
        {salesData.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-1 group">
            {/* قيمة العمود تظهر عند التركيز */}
            <span className="text-[10px] font-bold text-blue-600 mb-1 opacity-100 transition-opacity">
              ${item.amount}
            </span>
            {/* العمود نفسه */}
            <div className={`w-3 sm:w-4 bg-gradient-to-t from-blue-500 to-indigo-500 rounded-t-md ${item.height} transition-all duration-500 hover:from-purple-500 hover:to-pink-500 cursor-pointer shadow-sm`} />
            {/* اسم اليوم */}
            <span className="text-[10px] text-gray-500 mt-2 font-medium">{item.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
