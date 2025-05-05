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
  // Add redirects for problematic routes
  async redirects() {
    return [
      {
        source: "/auth/forgot-password",
        destination: "/password-reset",
        permanent: false,
      },
      {
        source: "/auth/forgot-password-static",
        destination: "/password-reset",
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
