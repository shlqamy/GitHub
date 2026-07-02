'use client';

import React, { useState, useEffect } from 'react';

interface Post {
  id: string;
  content: string;
  platform: string;
  date: string;
  time: string;
}

export default function PostScheduler() {
  const [content, setContent] = useState('');
  const [platform, setPlatform] = useState('Facebook');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [scheduledPosts, setScheduledPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  // 1. جلب المنشورات المجدولة من السيرفر عند فتح الشاشة
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/scheduler');
        const data = await response.json();
        if (data.success) {
          setScheduledPosts(data.posts);
        }
      } catch (error) {
        console.error('فشل جلب المنشورات من السيرفر', error);
      }
    };
    fetchPosts();
  }, []);

  // 2. إرسال منشور جديد لجدولته في السيرفر
  const handleSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !date || !time) {
      alert('من فضلك املأ جميع الحقول الحالية لجدولة المنشور!');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/scheduler', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, platform, date, time }),
      });

      const data = await response.json();

      if (data.success) {
        setScheduledPosts(data.posts); // تحديث القائمة فوراً بالبيانات الجديدة من السيرفر
        setContent('');
        setDate('');
        setTime('');
        alert('📅 ' + data.message);
      } else {
        alert('❌ ' + data.error);
      }
    } catch (error) {
      alert('❌ حدث خطأ أثناء الاتصال بسيرفر الجدولة');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto my-6 bg-white rounded-2xl shadow-lg border border-gray-100 text-right" dir="rtl">
      {/* عنوان الموديول */}
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-purple-600">📅 نظام جدولة وإدارة المنشورات</h2>
        <p className="text-xs text-gray-500 mt-1">تحديد مواعيد النشر التلقائي عبر منصات السوشيال ميديا</p>
      </div>

      {/* فورمة إضافة بوست */}
      <form onSubmit={handleSchedule} className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">نص المنشور أو التغريدة:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="اكتب البوست هنا أو الصق النص المنسوخ من الذكاء الاصطناعي..."
            rows={3}
            className="w-full p-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 placeholder-gray-400"
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">المنصة:</label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full p-2 text-xs bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:outline-none"
            >
              <option value="Facebook">Facebook</option>
              <option value="Instagram">Instagram</option>
              <option value="X / Twitter">X / Twitter</option>
              <option value="LinkedIn">LinkedIn</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">التاريخ:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 text-xs bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">الوقت:</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full p-2 text-xs bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-xl disabled:bg-gray-300 disabled:text-gray-500 transition duration-200 text-sm"
        >
          {loading ? 'جاري الحفظ والجدولة في السيرفر...' : '📅 اعتماد وجدولة المنشور'}
        </button>
      </form>

      {/* عرض قائمة الانتظار الحالية */}
      <div>
        <h3 className="text-xs font-bold text-gray-700 mb-3 pb-2 border-b border-gray-100">📋 منشورات في انتظار النشر التلقائي ({scheduledPosts.length})</h3>
        <div className="space-y-3">
          {scheduledPosts.map((post) => (
            <div key={post.id} className="p-3 bg-purple-50/30 border border-purple-100 rounded-xl flex flex-col justify-between space-y-2">
              <p className="text-xs text-gray-800 line-clamp-2 leading-relaxed">{post.content}</p>
              <div className="flex justify-between items-center text-[10px] text-gray-400">
                <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded font-bold">{post.platform}</span>
                <span>📅 {post.date} | ⏰ {post.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
