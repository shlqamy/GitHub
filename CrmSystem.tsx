'use client';

import React, { useState } from 'react';

export default function CrmSystem() {
  const [customers, setCustomers] = useState([
    { id: 1, name: 'أحمد محمد', phone: '010123456', stage: 'عميل جديد', color: 'bg-blue-100 text-blue-700' },
    { id: 2, name: 'سارة علي', phone: '012987654', stage: 'جاري التفاوض', color: 'bg-yellow-100 text-yellow-700' },
    { id: 3, name: 'مؤسسة الشروق', phone: '015555444', stage: 'تم البيع', color: 'bg-green-100 text-green-700' },
  ]);

  const updateStage = async (id: number, newStage: string) => {
    try {
      // إرسال طلب التحديث للسيرفر فوراً
      const response = await fetch('/api/crm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: String(id), newStage }),
      });

      const result = await response.json();

      if (result.success) {
        // تحديث الواجهة للمستخدم بعد التأكد من حفظها في السيرفر
        setCustomers(prev => prev.map(c => {
          if (c.id === id) {
            let color = 'bg-gray-100 text-gray-700';
            if (newStage === 'تم البيع') color = 'bg-green-100 text-green-700';
            if (newStage === 'جاري التفاوض') color = 'bg-yellow-100 text-yellow-700';
            if (newStage === 'مرفوض') color = 'bg-red-100 text-red-700';
            return { ...c, stage: newStage, color };
          }
          return c;
        }));
        console.log('✓ ' + result.message);
      }
    } catch (error) {
      alert('❌ فشل الاتصال بالسيرفر لتحديث الحالة');
    }
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6 text-right" dir="rtl">
      <h2 className="text-sm font-bold text-gray-800 mb-1">👥 نظام إدارة علاقات العملاء CRM</h2>
      <p className="text-[11px] text-gray-400 mb-4">متابعة وحفظ بيانات العملاء وتحويلهم إلى مراحل البيع</p>

      <div className="overflow-x-auto">
        <table className="w-full text-xs text-right border-collapse">
          <thead>
            <tr className="bg-gray-600 border-b border-gray-100 text-white">
              <th className="p-2">الاسم</th>
              <th className="p-2">المرحلة الحالية</th>
              <th className="p-2">تحديث الحالة</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => (
              <tr key={customer.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                <td className="p-2 font-medium text-gray-800">{customer.name}</td>
                <td className="p-2">
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${customer.color}`}>
                    {customer.stage}
                  </span>
                </td>
                <td className="p-2">
                  <select
                    value={customer.stage}
                    onChange={(e) => updateStage(customer.id, e.target.value)}
                    className="p-1 bg-white border border-gray-200 rounded-md text-[11px] focus:outline-none"
                  >
                    <option value="عميل جديد">عميل جديد</option>
                    <option value="مهتم">مهتم</option>
                    <option value="جاري التفاوض">جاري التفاوض</option>
                    <option value="تم البيع">تم البيع</option>
                    <option value="مرفوض">مرفوض</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
