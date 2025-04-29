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
    unoptimized: true,
  },
  // These are valid options for faster builds
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
