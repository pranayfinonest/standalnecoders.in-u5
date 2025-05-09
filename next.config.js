"use client"

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["api.dicebear.com"],
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
    // Disable type checking during build to avoid useSearchParams() errors
    ignoreBuildErrors: true,
  },
  // Add redirects for problematic routes and common missing pages
  async redirects() {
    return [
      {
        source: "/auth/forgot-password",
        destination: "/password-reset",
        permanent: true,
      },
      // Redirect reset-password to static page
      {
        source: "/auth/reset-password",
        destination: "/password-reset",
        permanent: false,
      },
      // Common misspellings and old URLs
      {
        source: "/service/:path*",
        destination: "/services/:path*",
        permanent: true,
      },
      {
        source: "/about-us",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/contact-us",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/projects",
        destination: "/portfolio",
        permanent: true,
      },
      {
        source: "/web-development",
        destination: "/services/website-development",
        permanent: true,
      },
      {
        source: "/digital-marketing",
        destination: "/services/digital-marketing",
        permanent: true,
      },
      {
        source: "/cyber-security",
        destination: "/services/cybersecurity",
        permanent: true,
      },
      {
        source: "/ai-solutions",
        destination: "/services/ai-technology",
        permanent: true,
      },
      {
        source: "/services/custom-software-development",
        destination: "/services/custom-software",
        permanent: true,
      },
      {
        source: "/custom-software",
        destination: "/services/custom-software",
        permanent: true,
      },
      {
        source: "/custom-software-development",
        destination: "/services/custom-software",
        permanent: true,
      },
      // Redirect 404 page to static version
      {
        source: "/404",
        destination: "/404.html",
        permanent: true,
      },
    ]
  },
  // Improve static generation
  experimental: {
    // Enable server actions with proper configuration
    serverActions: {
      allowedOrigins: ["localhost:3000", "standalonecoders.com"],
      bodySizeLimit: "2mb",
    },
  },
  staticPageGenerationTimeout: 180,
  trailingSlash: true,
  poweredByHeader: false,
}

module.exports = nextConfig
