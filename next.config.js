/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["standalonecoders.in"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    // Enable image optimization
    unoptimized: false,
    // Set reasonable image device sizes
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    // Set reasonable image sizes
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Set format for modern browsers
    formats: ["image/webp", "image/avif"],
    // Increase quality slightly
    minimumCacheTTL: 60,
  },
  // These are valid options for faster builds
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Enable compression
  compress: true,
  // Add performance headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/(.*).(jpg|jpeg|png|webp|avif|svg)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/(.*).(js|css)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ]
  },
  // Enable webpack optimization
  webpack: (config, { dev, isServer }) => {
    // Optimize only in production
    if (!dev) {
      // Add terser for better minification
      config.optimization.minimize = true
    }
    return config
  },
}

module.exports = nextConfig
