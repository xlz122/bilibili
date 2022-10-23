/** @type {import('next').NextConfig} */
const path = require('path');

const securityHeaders = [
  // xxs保护
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  }
];

const nextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_URL,
  // 资产资源前缀
  assetPrefix: process.env.NEXT_PUBLIC_BASE_URL,
  reactStrictMode: true,
  swcMinify: true,
  // 图片基础路径
  images: {
    domains: ['i0.hdslb.com', 'i1.hdslb.com', 'i2.hdslb.com']
  },
  // 全局scss文件
  sassOptions: {
    includePaths: [path.join(__dirname, './src/styles')],
    prependData: `@import "global.scss";`
  },
  // 删除所有console.*
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? true : false
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
        headers: securityHeaders,
      },
    ]
  }
};

module.exports = nextConfig;
