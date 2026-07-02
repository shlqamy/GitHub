'use client';

import React, { useState } from 'react';

export default function HashtagGenerator() {
  const [keyword, setKeyword] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerateHashtags = async () => {
    if (!keyword.trim()) {
      alert('من فضلك اكتب كلمة مفتاحية أو اسم المنتج أولاً!');
      return;
    }

    setLoading(true);
    setResult('');

    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `قم بتوليد مجموعة من الهاشتاجات الرائجة والقوية والمناسبة لـ: (${keyword}) لمساعدتي في الانتشار على السوشيال ميديا.`,
          type: 'hashtags',
          topicName: keyword // نرسل الكلمة صافية للسيرفر
        }),
      });

      const data = await response.json();

      if (data.success) {
        setResult(data.result);
      } else {
        alert('❌ فشل في توليد الهاشتاجات من السيرفر');
      }
    } catch (error) {
      alert('❌ حدث خطأ أثناء الاتصال بالمنصة');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto my-6 bg-white rounded-2xl shadow-lg border border-gray-100 text-right" dir="rtl">
      {/* العنوان الرئيسي */}
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-teal-600">منصة Shlqamy الذكية</h2>
        <p className="text-xs text-gray-500 mt-1">توليد الهاشتاجات الرائجة (Trending) عبر AI</p>
      </div>

      {/* مدخل الكلمة المفتاحية */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2">اسم المنتج أو موضوع الهاشتاج:</label>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="مثال: أحذية، ساعات، عطور، ملابس صيفية..."
          className="w-full p-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 placeholder-gray-400"
        />
      </div>

      {/* زر التوليد */}
      <button
        onClick={handleGenerateHashtags}
        disabled={loading}
        className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-xl disabled:bg-gray-300 disabled:text-gray-500 transition duration-200 text-sm"
      >
        {loading ? 'جاري استخراج الهاشتاجات من السيرفر...' : '🔥 توليد الهاشتاجات الذكية'}
      </button>

      {/* عرض الهاشتاجات الناتجة */}
      {result && (
        <div className="mt-6 p-4 bg-teal-50/50 rounded-xl border border-teal-100">
          <h3 className="text-xs font-bold text-teal-700 mb-2">الهاشتاجات المقترحة:</h3>
          <p className="text-sm text-teal-900 font-mono tracking-wide leading-relaxed select-all">
            {result}
          </p>
          <div className="mt-3 text-left">
            <span className="text-[10px] text-gray-400 bg-white px-2 py-1 rounded-md border border-gray-100">
              💡 اضغط مطولاً لنسخ الهاشتاجات بالكامل
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
