import Script from 'next/script';
import { Geist, Geist_Mono } from 'next/font/google';
import type { Metadata, Viewport } from 'next';
import ReduxProvider from '@/store/ReduxProvider';
import '@/styles/global.css';
import '@/styles/font.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: '哔哩哔哩 (゜-゜)つロ 干杯~-bilibili',
  description:
    '哔哩哔哩(bilibili.com)是国内知名的视频弹幕网站, 这里有及时的动漫新番, 活跃的ACG氛围, 有创意的Up主。大家可以在这里找到许多欢乐。'
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  userScalable: false
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ReduxProvider>{children}</ReduxProvider>
        <Script src="/resize.js" />
      </body>
    </html>
  );
}
