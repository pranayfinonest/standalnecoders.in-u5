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

  eslint: {
    ignoreDuringBuilds: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  async redirects() {
    return [
      { source: "/auth/forgot-password", destination: "/password-reset", permanent: true },
      { source: "/auth/reset-password", destination: "/password-reset", permanent: false },
      { source: "/service/:path*", destination: "/services/:path*", permanent: true },
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/projects", destination: "/portfolio", permanent: true },
      { source: "/web-development", destination: "/services/website-development", permanent: true },
      { source: "/digital-marketing", destination: "/services/digital-marketing", permanent: true },
      { source: "/cyber-security", destination: "/services/cybersecurity", permanent: true },
      { source: "/ai-solutions", destination: "/services/ai-technology", permanent: true },
      { source: "/services/custom-software-development", destination: "/services/custom-software", permanent: true },
      { source: "/custom-software", destination: "/services/custom-software", permanent: true },
      { source: "/custom-software-development", destination: "/services/custom-software", permanent: true },
      { source: "/404", destination: "/404.html", permanent: true },
    ]
  },

  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "standalone-coders.vercel.app"],
      bodySizeLimit: "2mb",
    },
  },

  staticPageGenerationTimeout: 180,
  trailingSlash: true,
  poweredByHeader: false,
  output: "standalone",

  async headers() {
    return [
      {
        source: "/case-studies/:path*",
        headers: [
          {
            key: "x-nextjs-skip-trailing-slash-redirect",
            value: "true",
          },
        ],
      },
    ]
  },
}

export default nextConfig
