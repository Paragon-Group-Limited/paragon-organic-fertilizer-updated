import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  serverExternalPackages: ['cloudinary'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  turbopack: {
    resolveAlias: {
      '@payload-config': './src/payload.config.ts',
    },
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@payload-config': path.resolve('./src/payload.config.ts'),
    }
    return config
  },
}

export default withPayload(nextConfig)
