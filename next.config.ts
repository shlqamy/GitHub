import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // هذا السطر يمنح الصلاحية لكافة الـ IPs والشبكات المحلية لتشغيل الـ الأزرار والتفاعل دون قيود
    allowedDevOrigins: ['*']
  }
};

export default nextConfig;
