import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  // images: {
  //   remotePatterns: [new URL('https://picsum.photos/**')]
  // }
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'placeimg.com',
        port: '',
        pathname: '/**'
      }
    ]
  }
}

export default nextConfig
