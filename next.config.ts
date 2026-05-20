import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  basePath: '',
  reactCompiler: true,
  // 配置外部图像
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**.biliimg.com',
      },
      {
        protocol: 'https',
        hostname: '**.biliimg.com',
      },
      {
        protocol: 'http',
        hostname: '**.hdslb.com',
      },
      {
        protocol: 'https',
        hostname: '**.hdslb.com',
      },
    ],
  },
  // 跨域
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/:path*`,
      },
    ];
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
