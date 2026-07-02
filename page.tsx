'use client';

import { useState, useEffect } from 'react';
import GroupsManager from '@/components/GroupsManager';

export default function Home() {
  const [sharedContent, setSharedContent] = useState('');
  const [fbAccounts, setFbAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch(`/api/facebook?t=${Date.now()}`);
        const data = await res.json();
        if (data.success && data.accounts) {
          setFbAccounts(data.accounts);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-600 to-indigo-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center text-white py-6">
          <h1 className="text-2xl md:text-4xl font-bold mb-2">لوحة تحكم Shlqamy</h1>
          <p className="text-sm md:text-base text-blue-100">نظام النشر التلقائي الذكي وإدارة الحسابات</p>
        </div>

        <GroupsManager 
          sharedContent={sharedContent} 
          setSharedContent={setSharedContent} 
          fbAccounts={fbAccounts} 
          loading={loading} 
        />
      </div>
    </main>
  );
}
