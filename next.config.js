/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["standalonecoders.in"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    unoptimized: true,
  },
  // Optimize build speed
  experimental: {
    // Only enable features that are stable
    serverActions: true,
  },
  // Skip type checking during build for faster builds
  typescript: {
    ignoreBuildErrors: true,
  },
  // Skip ESLint during build for faster builds
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Reduce the number of pages that are pre-rendered at build time
  staticPageGenerationTimeout: 60,
  // Disable source maps in production for faster builds
  productionBrowserSourceMaps: false,
  // Disable compression during build (Vercel handles this)
  compress: false,
  // Reduce the number of pages that are analyzed for static optimization
  staticOptimization: {
    analyzeLimit: 100,
  },
  // Disable React DevTools in production
  reactProductionProfiling: false,
}

module.exports = nextConfig
