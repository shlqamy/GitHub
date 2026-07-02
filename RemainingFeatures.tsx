'use client';

import React, { useState } from 'react';

export default function RemainingFeatures() {
  // 1. الرد الآلي بالذكاء الاصطناعي
  const [replyInput, setReplyInput] = useState('');
  const [aiReply, setAiReply] = useState('');

  // 2. المحتوى الديني ومواقيت الصلاة
  const prayerTimes = { الفجر: '03:15 ص', الظهر: '12:00 م', العصر: '03:30 م', المغرب: '07:05 م', العشاء: '08:40 م' };

  const handleAutoReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyInput.trim()) return;
    setAiReply(`🤖 رد ذكي مقترح (لهجة ودية): سيكلفك هذا المنتج خصماً مميزاً حالياً! يسعدنا تواصلك معنا عبر الخاص لإتمام طلبك فوراً بخصم 10%.`);
  };

  return (
    <div className="space-y-6 text-right" dir="rtl">
      
      {/* 9. الرد الآلي بالذكاء الاصطناعي */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-sm font-bold text-gray-800 mb-1">🤖 الرد الآلي الذكي (AI Auto Reply)</h2>
        <p className="text-[11px] text-gray-400 mb-3">تدريب الذكاء الاصطناعي للرد الفوري على الرسائل والتعليقات</p>
        <form onSubmit={handleAutoReply} className="space-y-2">
          <input
            type="text"
            value={replyInput}
            onChange={(e) => setReplyInput(e.target.value)}
            placeholder="أدخل تعليق العميل (مثال: بكام السعر؟)..."
            className="w-full p-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none"
          />
          <button type="submit" className="w-full py-2 bg-purple-600 text-white text-xs font-bold rounded-xl shadow-sm hover:bg-purple-700">
            ✨ توليد رد آلي ذكي
          </button>
        </form>
        {aiReply && <p className="mt-2.5 p-2.5 bg-purple-50 text-purple-700 text-xs rounded-xl border border-purple-100 whitespace-pre-wrap">{aiReply}</p>}
      </div>

      {/* 13. المحتوى الديني الإسلامي */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-sm font-bold text-gray-800 mb-1">🕌 موديول المحتوى الإسلامي والجمعة</h2>
        <p className="text-[11px] text-gray-400 mb-3">مواقيت الصلاة وجدولة الأذكار والمنشورات الدينية تلقائياً</p>
        <div className="grid grid-cols-5 gap-1.5 text-center mb-3">
          {Object.entries(prayerTimes).map(([name, time]) => (
            <div key={name} className="p-1.5 bg-emerald-50/60 rounded-lg border border-emerald-100/50">
              <p className="text-[10px] text-emerald-800 font-bold">{name}</p>
              <p className="text-[9px] text-emerald-600 mt-0.5">{time}</p>
            </div>
          ))}
        </div>
        <button onClick={() => alert('🕌 تم تفعيل الجدولة التلقائية لأذكار الصباح والمساء وبوستات يوم الجمعة بنجاح!')} className="w-full py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl shadow-sm hover:bg-emerald-700">
          📅 تفعيل النشر التلقائي للأذكار والأدعية
        </button>
      </div>

      {/* 12 & 14. الإحصائيات والإشعارات السريعة */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-sm font-bold text-gray-800 mb-2">🔔 الإشعارات والتقارير السريعة</h2>
        <div className="space-y-2">
          <div className="p-2 bg-green-50 text-green-700 text-[11px] rounded-lg border border-green-100 flex justify-between">
            <span>✓ نجاح نشر منشور "عروض الصيف" على المجموعات</span>
            <span className="font-bold">منذ دقيقة</span>
          </div>
          <div className="p-2 bg-blue-50 text-blue-700 text-[11px] rounded-lg border border-blue-100 flex justify-between">
            <span>👤 عميل جديد دخل مرحلة "جاري التفاوض" (أحمد محمد)</span>
            <span className="font-bold">منذ ساعة</span>
          </div>
        </div>
        <div className="flex gap-2 mt-3">
          <button onClick={() => alert('📊 جاري تصدير التقارير بصيغة PDF...')} className="flex-1 py-1.5 bg-gray-100 text-gray-700 text-[11px] font-bold rounded-lg hover:bg-gray-200">📄 تصدير PDF</button>
          <button onClick={() => alert('📊 جاري تصدير التقارير بصيغة Excel...')} className="flex-1 py-1.5 bg-gray-100 text-gray-700 text-[11px] font-bold rounded-lg hover:bg-gray-200">📊 تصدير Excel</button>
        </div>
      </div>

    </div>
  );
}
