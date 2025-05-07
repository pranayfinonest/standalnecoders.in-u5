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
  // Add redirects for problematic routes and common missing pages
  async redirects() {
    return [
      // Fix auth routes
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
        permanent: false,
      },
    ]
  },
  // Disable problematic features
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  // Remove output: "export" to allow API routes
  // output: "export",
  // Ensure static HTML fallback for 404
  trailingSlash: true,
}

module.exports = nextConfig
