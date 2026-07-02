// services/facebook.service.ts

export interface FacebookPage {
  id: string;
  name: string;
  access_token: string;
  category: string;
}

export async function fetchUserPages(userAccessToken: string): Promise<FacebookPage[]> {
  try {
    // الاتصال بـ Facebook Graph API لجلب صفحات المستخدم
    const response = await fetch(
      `https://graph.facebook.com/v20.0/me/accounts?access_token=${userAccessToken}`
    );
    
    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error.message);
    }
    
    return data.data as FacebookPage[];
  } catch (error) {
    console.error("خطأ أثناء جلب صفحات فيسبوك:", error);
    throw error;
  }
}
