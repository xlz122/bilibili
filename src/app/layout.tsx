import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '../../public/styles/global.css';
import '../../public/styles/iconfont.css';

export const metadata: Metadata = {
  title: '哔哩哔哩 (゜-゜)つロ 干杯~-bilibili',
  description:
    '哔哩哔哩是国内知名的视频弹幕网站, 这里有及时的动漫新番, 活跃的ACG氛围, 有创意的Up主。大家可以在这里找到许多欢乐。',
};

const IconFont = localFont({
  src: '../../public/fonts/iconfont.woff2',
  variable: '--iconfont',
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={IconFont.variable}>
      <body>{children}</body>
    </html>
  );
}
