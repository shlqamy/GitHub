'use client';

import React, { useState, useEffect } from 'react';

export default function GroupsManager({ sharedContent, setSharedContent, fbAccounts, loading }: any) {
  const [publishing, setPublishing] = useState(false);
  const [selectedPage, setSelectedPage] = useState('');
  const [groups, setGroups] = useState<any[]>([]);
  const [loadingGroups, setLoadingGroups] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const currentAccount = fbAccounts?.[0] || {};
  const pages = currentAccount?.pages || [];

  const handlePageClick = async (pageId: string) => {
    setSelectedPage(pageId);
    setLoadingGroups(true);
    setGroups([]);
    setStatusMessage('');
    setErrorMessage('');

    try {
      // 🚀 نطلب المسار الأصلي المستقر والمؤكد اللي شغال على السيرفر بنجاح حالياً
      const res = await fetch(`/api/facebook?t=${Date.now()}`);
      const data = await res.json();
      
      if (!data.success) {
        setErrorMessage(data.error || 'فشل جلب البيانات من فيسبوك');
        return;
      }

      if (data.accounts?.[0]?.pages) {
        const activePage = data.accounts[0].pages.find((p: any) => String(p.id) === String(pageId));
        if (activePage && Array.isArray(activePage.groups)) {
          setGroups(activePage.groups);
          setSelectedGroups(activePage.groups.map((g: any) => String(g.id)));
        }
      }
    } catch (err) {
      setErrorMessage('خطأ في معالجة الداتا الداخلية للسيرفر');
    } finally {
      setLoadingGroups(false);
    }
  };

  useEffect(() => {
    if (pages.length > 0 && !selectedPage) {
      handlePageClick(String(pages[0].id));
    }
  }, [pages]);

  const handleCheckboxChange = (groupId: string) => {
    if (selectedGroups.includes(groupId)) {
      setSelectedGroups(selectedGroups.filter(id => id !== groupId));
    } else {
      setSelectedGroups([...selectedGroups, groupId]);
    }
  };

  const handlePublish = async () => {
    if (!sharedContent.trim()) {
      alert('الرجاء كتابة نص البوست أولاً!');
      return;
    }
    if (selectedGroups.length === 0) {
      alert('الرجاء اختيار مجموعة واحدة على الأقل للنشر!');
      return;
    }

    setPublishing(true);
    setStatusMessage('');
    let successCount = 0;

    for (const groupId of selectedGroups) {
      try {
        const res = await fetch('/api/facebook', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            action: 'publish_groups', 
            postContent: sharedContent,
            groupId: groupId
          })
        });
        const data = await res.json();
        if (data.success) successCount++;
      } catch (err) {
        console.error(err);
      }
    }

    if (successCount > 0) {
      setStatusMessage(`✅ تم بنجاح بث ونشر البوست داخل (${successCount}) مجموعة حقيقية لايف!`);
    } else {
      setStatusMessage(`❌ فشل إرسال البوست. يرجى مراجعة صلاحيات النشر.`);
    }
    setPublishing(false);
  };

  if (loading) {
    return <div className="text-center p-6 text-xs text-gray-500">جاري تحميل الحساب من فيسبوك...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-right" dir="rtl">
      <h2 className="text-lg font-bold text-blue-600 mb-4 flex items-center gap-2">
        📣 النشر التلقائي الذكي في المجموعات
      </h2>

      <div className="mb-4">
        <label className="block text-xs font-bold text-gray-600 mb-2">اختر الجهة الناشرة الحقيقية:</label>
        {pages.length === 0 ? (
          <div className="text-xs text-red-500 font-bold p-2 bg-red-50 rounded-lg text-center">
            ⚠️ جاري مزامنة البيانات... يرجى عمل ريفريش للمتصفح
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {pages.map((page: any) => {
              const isSelected = String(page.id) === String(selectedPage);
              return (
                <button
                  key={page.id}
                  type="button"
                  onClick={() => handlePageClick(String(page.id))}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition border cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  📄 {page.name}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-xs font-bold text-gray-600 mb-1">نص البوست الحالي:</label>
        <textarea
          value={sharedContent}
          onChange={(e) => setSharedContent(e.target.value)}
          placeholder="اكتب منشورك هنا..."
          className="w-full h-32 p-3 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 resize-none"
        />
      </div>

      <div className="mb-6">
        <h3 className="text-xs font-bold text-gray-600 mb-2">المجموعات المتاحة المستهدفة:</h3>
        <div className="space-y-2 max-h-40 overflow-y-auto p-2 bg-gray-50 rounded-xl border border-gray-100">
          {loadingGroups ? (
            <div className="text-center py-6 text-xs text-blue-500 font-bold animate-pulse">
              ⏳ جاري معالجة وفرد المجموعات الحقيقية حالياً... ثوانٍ وتظهر
            </div>
          ) : errorMessage ? (
            <div className="text-center py-4 px-2 text-xs text-red-600 bg-red-50 rounded-lg font-bold">
              {errorMessage}
            </div>
          ) : groups.length > 0 ? (
            groups.map((group: any) => (
              <label key={group.id} className="flex items-center gap-2 p-2 bg-white rounded-lg border border-gray-100 text-xs shadow-2xs cursor-pointer hover:bg-gray-50">
                <input 
                  type="checkbox" 
                  checked={selectedGroups.includes(String(group.id))} 
                  onChange={() => handleCheckboxChange(String(group.id))}
                  className="rounded text-blue-600" 
                />
                <span>👥 {group.name}</span>
              </label>
            ))
          ) : (
            <div className="text-center py-4 text-xs text-gray-400">اضغط على زر الجهة الناشرة بالأعلى لتنشيط المجموعات</div>
          )}
        </div>
      </div>

      <button
        onClick={handlePublish}
        disabled={publishing || pages.length === 0 || groups.length === 0}
        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-4 rounded-xl text-xs shadow-md transition active:scale-95 disabled:opacity-50 cursor-pointer"
      >
        {publishing ? '⏳ جاري بث النشر للمجموعات لايف...' : '🚀 بث ونشر البوست في المجموعات فوراً'}
      </button>

      {statusMessage && (
        <div className="mt-4 p-3 bg-blue-50 text-blue-700 text-xs font-bold rounded-xl text-center shadow-2xs">
          {statusMessage}
        </div>
      )}
    </div>
  );
}
