import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true,
  },
  images: {
    formats: ['image/webp'],
  },
  transpilePackages: ['next-mdx-remote'],
}

export default nextConfig
