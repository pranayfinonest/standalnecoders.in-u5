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

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "StandaloneCoders.in | Cybersecurity, AI & Digital Solutions",
    template: "%s | StandaloneCoders.in",
  },
  description:
    "Professional cybersecurity, AI, digital marketing, and technology solutions for businesses and organizations.",
  keywords: [
    "web development",
    "cybersecurity",
    "AI solutions",
    "digital marketing",
    "technology services",
    "website booking",
    "custom websites",
  ],
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
  },
  openGraph: {
    title: "StandaloneCoders.in | Cybersecurity, AI & Digital Solutions",
    description:
      "Professional cybersecurity, AI, digital marketing, and technology solutions for businesses and organizations.",
    url: "https://standalonecoders.in",
    siteName: "StandaloneCoders.in",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "StandaloneCoders.in",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "StandaloneCoders.in | Cybersecurity, AI & Digital Solutions",
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
      </head>
      <body className={inter.className}>
        <StatsigWrapper>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {/* Google Analytics */}
            <GoogleAnalytics measurementId="G-MEASUREMENT_ID" />
            <ErrorBoundaryClient>
              <Suspense fallback={`Loading UI...`}>
                <Header />
                <main>{children}</main>
                <Footer />
                <WhatsAppButton />
              </Suspense>
              <Toaster />
              <GlobalScripts />
            </ErrorBoundaryClient>
            {/* Vercel Analytics */}
            <Analytics />
          </ThemeProvider>
        </StatsigWrapper>
      </body>
    </html>
  )
}
