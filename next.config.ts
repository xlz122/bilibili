import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_URL,
  reactStrictMode: true,
  // 全局sass
  sassOptions: {
    additionalData: '@use "@/styles/global.scss" as *;'
  },
  // 配置外部图像
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**.biliimg.com',
      },
      {
        protocol: 'https',
        hostname: '**.biliimg.com'
      },
      {
        protocol: 'http',
        hostname: '**.hdslb.com',
      },
      {
        protocol: 'https',
        hostname: '**.hdslb.com'
      }
    ]
  },
  // 跨域
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/:path*`
      }
    ]
  },
  // 安全标头
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          }
        ]
      }
    ]
  },
  // 删除console.*
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? true : false
  }
};

export default nextConfig;
