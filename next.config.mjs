/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: 'incremental',
    reactCompiler: true,
  },
  images: {
    formats: ['image/webp'],
  },
  transpilePackages: ['next-mdx-remote'],
}

export default nextConfig
