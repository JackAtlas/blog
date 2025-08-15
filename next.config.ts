import type { NextConfig } from 'next'

export const BUCKET = process.env.QCLOUD_COS_BUCKET!
export const REGION = process.env.QCLOUD_COS_REGION!

console.log(`${BUCKET}.cos.${REGION}.myqcloud.com`)

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: `${BUCKET}.cos.${REGION}.myqcloud.com`,
        port: '',
        pathname: '/blog/article-cover/**'
      }
    ]
  }
}

export default nextConfig
