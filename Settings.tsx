'use client';

import React, { useState } from 'react';

export default function Settings() {
  const [userLoading, setUserLoading] = useState(false);

  const handleFacebookLogin = () => {
    setUserLoading(true);
    
    const appId = "27416446757998112"; 
    // تعديل الرابط والصلاحيات لتطابق إعدادات فيسبوك بدقة والتغلب على الحظر
    const redirectUri = encodeURIComponent('http://localhost:3000/api/auth/callback/facebook');
    const scope = encodeURIComponent('email,public_profile');

    const authUrl = `https://www.facebook.com/v20.0/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=token`;
    
    window.location.href = authUrl;
  };

  return (
    <div className="p-4 max-w-xl mx-auto my-6 bg-white rounded-2xl shadow-lg border border-gray-100 text-right" dir="rtl">
      <h2 className="text-lg font-bold text-blue-600 mb-2">📧 ربط حسابك الحقيقي عبر المتصفح</h2>
      <p className="text-xs text-gray-500 mb-6">اضغط على الزرار بالأسفل للقط الحساب المفتوح في المتصفح حالياً</p>

      <button
        onClick={handleFacebookLogin}
        disabled={userLoading}
        className="w-full bg-[#1877F2] hover:bg-[#166FE5] text-white font-bold py-3 px-4 rounded-xl text-xs transition flex items-center justify-center space-x-2 space-x-reverse shadow-md active:scale-95"
      >
        <span className="text-lg">📘</span>
        <span>{userLoading ? 'جاري الاتصال بفيسبوك...' : 'تسجيل الدخول التلقائي بواسطة Facebook'}</span>
      </button>
    </div>
  );
}
