import { NextResponse } from 'next/server';

// محاكاة لقاعدة البيانات لتخزين البوستات المجدولة مؤقتاً
let mockScheduledPosts = [
  { id: '1', content: 'البوست الأول: ترقبوا عروض الصيف الكبرى قريباً! 🔥', platform: 'Facebook', date: '2026-07-05', time: '18:00' },
  { id: '2', content: 'أفخم الساعات الذكية وصلت الآن بخصم 20% ⌚', platform: 'Instagram', date: '2026-07-07', time: '21:00' }
];

// 1. دالة GET: لجلب كل المنشورات المجدولة حالياً
export async function GET() {
  try {
    return NextResponse.json({ success: true, posts: mockScheduledPosts });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'حدث خطأ في جلب المنشورات' }, { status: 500 });
  }
}

// 2. دالة POST: لإضافة منشور مجدول جديد
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { content, platform, date, time } = body;

    if (!content || !platform || !date || !time) {
      return NextResponse.json({ success: false, error: 'برجاء استكمال جميع البيانات' }, { status: 400 });
    }

    const newPost = {
      id: String(mockScheduledPosts.length + 1),
      content,
      platform,
      date,
      time
    };

    mockScheduledPosts.push(newPost);

    return NextResponse.json({ success: true, message: 'تم جدولة المنشور بنجاح واضافته للسيستم! 📅✨', posts: mockScheduledPosts });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'فشل حفظ وجدولة المنشور' }, { status: 500 });
  }
}
