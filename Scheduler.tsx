'use client';

import React, { useState, useEffect } from 'react';

interface Post {
  id: string;
  content: string;
  platform: string;
  date: string;
  time: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
}

export default function PostScheduler() {
  const [content, setContent] = useState('');
  const [platform, setPlatform] = useState('Facebook');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [scheduledPosts, setScheduledPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  // متغيرات الميديا (الصورة أو الفيديو)
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'image' | 'video' | null>(null);

  useEffect(() => {
    fetch('/api/scheduler')
      .then(res => res.json())
      .then(data => {
        if (data.success) setScheduledPosts(data.posts);
      });
  }, []);

  // دالة التعامل مع رفع الملفات ومعاينتها
  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMediaFile(file);
      const isVideo = file.type.startsWith('video/');
      setMediaType(isVideo ? 'video' : 'image');
      
      // إنشاء رابط مؤقت للمعاينة
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !date || !time) {
      alert('من فضلك املأ جميع الحقول لجدولة المنشور!');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/scheduler', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          content, 
          platform, 
          date, 
          time,
          mediaUrl: mediaPreview, // إرسال المعاينة أو مسار الملف
          mediaType: mediaType
        }),
      });

      const data = await response.json();

      if (data.success) {
        // نحدث القائمة، ونضيف البيانات الجديدة محلياً للمحاكاة لو مش راجعة كاملة
        const newPostWithMedia: Post = {
          id: String(scheduledPosts.length + 3),
          content,
          platform,
          date,
          time,
          mediaUrl: mediaPreview || undefined,
          mediaType: mediaType || undefined
        };
        setScheduledPosts([newPostWithMedia, ...data.posts]);
        
        // تصفير الفورمة
        setContent('');
        setDate('');
        setTime('');
        setMediaFile(null);
        setMediaPreview(null);
        setMediaType(null);
        alert('📅 تم جدولة المنشور مع الميديا بنجاح! ✨');
      }
    } catch (error) {
      alert('❌ حدث خطأ أثناء الحفظ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto my-6 bg-white rounded-2xl shadow-lg border border-gray-100 text-right" dir="rtl">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-purple-600">📅 نظام جدولة وإدارة المنشورات</h2>
        <p className="text-xs text-gray-500 mt-1">دعم رفع الصور والفيديوهات والجدولة التلقائية</p>
      </div>

      <form onSubmit={handleSchedule} className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">نص المنشور:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="اكتب البوست هنا أو الصق النص المنسوخ..."
            rows={3}
            className="w-full p-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800"
          />
        </div>

        {/* حقل رفع الصورة أو الفيديو الجديد */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">إضافة ميديا (صورة أو فيديو):</label>
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleMediaChange}
            className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 cursor-pointer"
          />
          
          {/* صندوق المعاينة */}
          {mediaPreview && (
            <div className="mt-3 p-2 bg-gray-50 border border-gray-200 rounded-xl text-center">
              <p className="text-[10px] text-gray-400 mb-1">معاينة الملف المرفق:</p>
              {mediaType === 'image' ? (
                <img src={mediaPreview} alt="Preview" className="max-h-40 mx-auto rounded-lg object-contain shadow-sm" />
              ) : (
                <video src={mediaPreview} controls className="max-h-40 mx-auto rounded-lg shadow-sm" />
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">المنصة:</label>
            <select value={platform} onChange={(e) => setPlatform(e.target.value)} className="w-full p-2 text-xs bg-gray-50 border border-gray-200 rounded-lg text-gray-800">
              <option value="Facebook">Facebook</option>
              <option value="Instagram">Instagram</option>
              <option value="X / Twitter">X / Twitter</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">التاريخ:</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full p-2 text-xs bg-gray-50 border border-gray-200 rounded-lg text-gray-800" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">الوقت:</label>
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full p-2 text-xs bg-gray-50 border border-gray-200 rounded-lg text-gray-800" />
          </div>
        </div>

        <button type="submit" disabled={loading} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl transition text-sm">
          {loading ? 'جاري الحفظ...' : '📅 اعتماد وجدولة المنشور'}
        </button>
      </form>

      {/* قائمة الانتظار وعرض المنشورات مع صورها */}
      <div>
        <h3 className="text-xs font-bold text-gray-700 mb-3 pb-2 border-b border-gray-100">📋 منشورات في انتظار النشر ({scheduledPosts.length})</h3>
        <div className="space-y-3">
          {scheduledPosts.map((post, index) => (
            <div key={index} className="p-3 bg-purple-50/30 border border-purple-100 rounded-xl flex flex-col space-y-2">
              <p className="text-xs text-gray-800 leading-relaxed">{post.content}</p>
              
              {/* عرض الصورة أو الفيديو داخل المنشور المجدول */}
              {post.mediaUrl && (
                <div className="mt-1 text-center bg-white p-1 rounded-lg border border-purple-100">
                  {post.mediaType === 'image' ? (
                    <img src={post.mediaUrl} alt="Post media" className="max-h-28 mx-auto rounded object-contain" />
                  ) : (
                    <video src={post.mediaUrl} controls className="max-h-28 mx-auto rounded" />
                  )}
                </div>
              )}

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
