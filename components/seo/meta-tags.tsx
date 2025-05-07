"use client"

import Head from "next/head"
import { usePathname } from "next/navigation"
import { Suspense } from "react"

interface MetaTagsProps {
  title?: string
  description?: string
  keywords?: string
  ogImage?: string
  ogType?: string
  canonicalUrl?: string
  structuredData?: Record<string, any>
  publishedTime?: string
  modifiedTime?: string
  author?: string
  twitterHandle?: string
}

function MetaTagsContent({
  title = "StandaloneCoders.in | Cybersecurity, AI & Digital Solutions",
  description = "Professional cybersecurity, AI, digital marketing, and technology solutions for businesses and organizations across Rajasthan.",
  keywords = "web development, cybersecurity, AI solutions, digital marketing, technology services, Rajasthan, Jaipur",
  ogImage = "https://standalonecoders.in/og-image.jpg",
  ogType = "website",
  canonicalUrl,
  structuredData,
  publishedTime,
  modifiedTime,
  author = "StandaloneCoders Team",
  twitterHandle = "@standalonecoders",
}: MetaTagsProps) {
  const pathname = usePathname()
  const currentUrl = `https://standalonecoders.in${pathname}`
  const canonical = canonicalUrl || currentUrl

  return (
    <Head>
      {/* Standard Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />

      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="StandaloneCoders.in" content={ogImage} />
      <meta property="og:site_name" content="StandaloneCoders.in" />
      <meta property="og:locale" content="en_US" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={currentUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
      <meta property="twitter:creator" content={twitterHandle} />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      )}
    </Head>
  )
}

export default function MetaTags(props: MetaTagsProps) {
  return (
    <Suspense fallback={null}>
      <MetaTagsContent {...props} />
    </Suspense>
  )
}
