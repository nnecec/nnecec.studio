import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: { formats: ['image/webp'] },
  transpilePackages: ['next-mdx-remote'],
}

export default nextConfig
