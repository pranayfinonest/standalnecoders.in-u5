"use client"

import Head from "next/head"
import { useRouter } from "next/router"

interface MetaTagsProps {
  title?: string
  description?: string
  keywords?: string
  ogImage?: string
  ogType?: string
  canonicalUrl?: string
}

export default function MetaTags({
  title = "StandaloneCoders.in | Cybersecurity, AI & Digital Solutions",
  description = "Professional cybersecurity, AI, digital marketing, and technology solutions for businesses and organizations.",
  keywords = "web development, cybersecurity, AI solutions, digital marketing, technology services",
  ogImage = "https://standalonecoders.in/og-image.jpg",
  ogType = "website",
  canonicalUrl,
}: MetaTagsProps) {
  const router = useRouter()
  const currentUrl = `https://standalonecoders.in${router.asPath}`
  const canonical = canonicalUrl || currentUrl

  return (
    <Head>
      {/* Standard Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={currentUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
    </Head>
  )
}
