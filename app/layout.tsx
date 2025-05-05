import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import GlobalScripts from "@/components/global-scripts"
import Header from "@/components/header"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"
import { Toaster } from "@/components/ui/toaster"
import GoogleAnalytics from "@/components/analytics/google-analytics"
import ErrorBoundaryClient from "@/components/error-boundary-client"
import StatsigWrapper from "@/components/statsig-provider"
import { Analytics } from "@vercel/analytics/react"
import { Suspense } from "react"
import { ResponsiveMeta } from "@/components/responsive-meta"
import ScrollToTopOnNavigation from "@/components/scroll-to-top-on-navigation"
import SEOOptimizer from "@/components/seo/seo-optimizer"
import SchemaGenerator from "@/components/seo/schema-generator"
import { AuthProvider } from "@/contexts/auth-context"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "StandaloneCoders.in | Cybersecurity, AI & Digital Solutions",
  description:
    "Professional cybersecurity, AI, digital marketing, and technology solutions for businesses across Rajasthan. Serving Jaipur, Jodhpur, Udaipur, and all cities.",
  keywords:
    "web development, cybersecurity, AI solutions, digital marketing, technology services, Rajasthan, Jaipur, Jodhpur, Udaipur",
  authors: [{ name: "StandaloneCoders Team" }],
  creator: "StandaloneCoders.in",
  publisher: "StandaloneCoders.in",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://standalonecoders.in"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
      "hi-IN": "/hi-IN",
    },
  },
  openGraph: {
    title: "Best Website Development Company – Standalone Coders",
    description:
      "Professional cybersecurity, AI, digital marketing, and technology solutions for businesses and organizations.",
    url: "https://standalonecoders.in",
    siteName: "Standalone Coders",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Standalone Coders",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Website Development Company – Standalone Coders",
    description:
      "Professional cybersecurity, AI, digital marketing, and technology solutions for businesses and organizations.",
    creator: "@standalonecoders",
    images: ["/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE",
    yandex: "yandex-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ResponsiveMeta />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <SchemaGenerator pageType="home" />
        <GoogleAnalytics />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <StatsigWrapper>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
              <ErrorBoundaryClient>
                <SEOOptimizer>
                  <Suspense fallback={`Loading UI...`}>
                    <ScrollToTopOnNavigation />
                    <Header />
                    <main>{children}</main>
                    <Footer />
                    <WhatsAppButton />
                  </Suspense>
                </SEOOptimizer>
                <Toaster />
                <GlobalScripts />
              </ErrorBoundaryClient>
              {/* Vercel Analytics */}
              <Analytics />
            </ThemeProvider>
          </StatsigWrapper>
        </AuthProvider>
      </body>
    </html>
  )
}
