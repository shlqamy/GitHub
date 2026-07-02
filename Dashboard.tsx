'use client';

import React, { useState } from 'react';

export default function ShlqamyDashboard() {
  const [pages, setPages] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);

  const [stats, setStats] = useState({
    totalPosts: 12,
    engagement: '4.8K',
    totalLeads: 45,
    activeDeals: 8,
    totalSales: '1,250 $'
  });

  const [crmLeads, setCrmLeads] = useState([
    { id: 1, name: "أحمد محمد", stage: "عميل جديد", date: "اليوم" },
    { id: 2, name: "شركة النور", stage: "جاري التفاوض", date: "أمس" },
    { id: 3, name: "سارة علي", stage: "بانتظار الدفع", date: "منذ يومين" }
  ]);

  const handleFacebookConnect = async () => {
    const userToken = prompt("أدخل User Access Token الخاص بـ Facebook Developers:");
    if (!userToken) return;

    setLoading(true);
    try {
      const res = await fetch('/api/facebook/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userAccessToken: userToken })
      });
      const data = await res.json();
      if (data.success) {
        setPages(data.pages);
        alert(`تم جلب ${data.pages.length} صفحات بنجاح!`);
      } else {
        alert("خطأ: " + data.error);
      }
    } catch (err) {
      alert("فشل الاتصال بالسيرفر");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen text-right" dir="rtl">
      {/* الهيدر العلوي */}
      <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-xl font-bold text-gray-800">لوحة تحكم Shlqamy</h1>
          <p className="text-xs text-gray-500 mt-0.5">إدارة الصفحات والمبيعات بالذكاء الاصطناعي</p>
          <button 
            onClick={handleFacebookConnect}
            disabled={loading}
            className="mt-3 px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-md hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {loading ? 'جاري الاتصال...' : '🔗 ربط حساب فيسبوك'}
          </button>
        </div>
        <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
      </div>

      {/* شبكة كروت الإحصائيات */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-white p-3.5 rounded-xl shadow-sm border border-gray-100">
          <p className="text-[11px] font-medium text-gray-400">إجمالي المنشورات</p>
          <p className="text-lg font-bold text-blue-600 mt-1">{stats.totalPosts}</p>
        </div>
        <div className="bg-white p-3.5 rounded-xl shadow-sm border border-gray-100">
          <p className="text-[11px] font-medium text-gray-400">التفاعل العضوي</p>
          <p className="text-lg font-bold text-green-600 mt-1">{stats.engagement}</p>
        </div>
        <div className="bg-white p-3.5 rounded-xl shadow-sm border border-gray-100">
          <p className="text-[11px] font-medium text-gray-400">عملاء الـ CRM</p>
          <p className="text-lg font-bold text-amber-600 mt-1">{stats.totalLeads}</p>
        </div>
        <div className="bg-white p-3.5 rounded-xl shadow-sm border border-gray-100">
          <p className="text-[11px] font-medium text-gray-400">إجمالي المبيعات</p>
          <p className="text-lg font-bold text-purple-600 mt-1">{stats.totalSales}</p>
        </div>
      </div>

      {/* قسم الـ CRM */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-sm font-bold text-gray-800">متابعة العملاء والصفقات (CRM)</h2>
          <span className="text-[10px] bg-blue-50 text-blue-600 font-bold px-2 py-0.5 rounded-md">نشط الآن</span>
        </div>
        <div className="space-y-2.5">
          {crmLeads.map((lead) => (
            <div key={lead.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl border border-gray-100">
              <div>
                <p className="text-xs font-bold text-gray-700">{lead.name}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{lead.date}</p>
              </div>
              <span className={`text-[10px] font-semibold px-2 py-1 rounded-lg ${
                lead.stage === 'عميل جديد' ? 'bg-blue-100 text-blue-700' :
                lead.stage === 'جاري التفاوض' ? 'bg-amber-100 text-amber-700' :
                'bg-green-100 text-green-700'
              }`}>
                {lead.stage}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* نظام المحتوى التلقائي */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3.5 rounded-2xl border border-blue-100 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-blue-900">🕌 نظام المحتوى الديني التلقائي</p>
          <p className="text-[10px] text-blue-700 mt-0.5">جاهز لجدولة منشورات يوم الجمعة والأذكار</p>
        </div>
        <span className="text-[10px] bg-white text-blue-600 font-bold px-2 py-1 rounded-lg border border-blue-200 shadow-sm">مفعّل</span>
      </div>
    </div>
  );
}

