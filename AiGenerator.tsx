'use client';

import React, { useState } from 'react';

export default function AiContentGenerator({ onSendToPublish }: { onSendToPublish: (text: string) => void }) {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('تسويقي محترف ومقنع');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      alert('من فضلك اكتب فكرة أو موضوع أولاً!');
      return;
    }

    setLoading(true);
    setResult('');

    try {
      // 1. طلب البوست من الـ API
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: topic, type: 'content', topicName: topic }),
      });
      const data = await response.json();

      // 2. طلب الهاشتاجات التلقائية فوراً في نفس اللحظة ودمجها
      const hashResponse = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: topic, type: 'hashtags', topicName: topic }),
      });
      const hashData = await hashResponse.json();

      if (data.success && hashData.success) {
        // دمج البوست والهاشتاجات تلقائياً في نص واحد فخم
        const fullCombinedText = `${data.result}\n\n${hashData.result}`;
        setResult(fullCombinedText);
      } else {
        alert('❌ فشل في التوليد التلقائي');
      }
    } catch (error) {
      alert('❌ حدث خطأ في الاتصال بالسيرفر');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto my-6 bg-white rounded-2xl shadow-lg border border-gray-100 text-right" dir="rtl">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-blue-600">منصة Shlqamy الذكية</h2>
        <p className="text-xs text-gray-500 mt-1">إنشاء المحتوى والهاشتاجات والربط التلقائي فوراً</p>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2">عن ماذا تريد التحدث اليوم؟</label>
        <textarea
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="اكتب فكرة المنتج هنا..."
          rows={3}
          className="w-full p-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
        />
      </div>

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition text-sm"
      >
        {loading ? 'جاري الصياغة وتوليد الهاشتاجات معاً...' : '✨ إنشاء المحتوى والهاشتاجات تلقائياً'}
      </button>

      {result && (
        <div className="mt-6 p-4 bg-blue-50/50 rounded-xl border border-blue-100 space-y-4">
          <div>
            <h3 className="text-xs font-bold text-blue-700 mb-2">المحتوى المقترح مدمج بالهاشتاجات:</h3>
            <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">{result}</p>
          </div>
          
          {/* الزر السحري الجديد للربط المباشر بدون كابي وبيست */}
          <button
            onClick={() => onSendToPublish(result)}
            className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-bold py-2.5 rounded-xl text-xs transition shadow-md"
          >
            🚀 تحويل فوري للنشر في المجموعات دفعة واحدة 📢
          </button>
        </div>
      )}
    </div>
  );
}
