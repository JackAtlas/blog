import type { NextConfig } from 'next'

export const BUCKET = process.env.QCLOUD_COS_BUCKET!
export const REGION = process.env.QCLOUD_COS_REGION!

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: `${BUCKET}.cos.${REGION}.myqcloud.com`,
        port: '',
        pathname: '/blog/article-cover/**'
      },
      {
        protocol: 'https',
        hostname: `${BUCKET}.cos.${REGION}.myqcloud.com`,
        port: '',
        pathname: '/blog/figure/**'
      }
    ]
  }
}

export default nextConfig
