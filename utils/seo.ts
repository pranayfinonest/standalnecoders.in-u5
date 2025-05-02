import type { Metadata } from "next"

interface SEOProps {
  title: string
  description: string
  keywords?: string[]
  ogType?: "website" | "article" | "profile" | "book"
  ogImage?: string
  canonicalUrl?: string
  robots?: {
    index?: boolean
    follow?: boolean
    googleBot?: Record<string, any>
  }
  locale?: string
  publishedTime?: string
  modifiedTime?: string
  authorName?: string
  cityName?: string
}

export function generateSEO({
  title,
  description,
  keywords = [],
  ogType = "website",
  ogImage = "/og-image.jpg",
  canonicalUrl,
  robots = { index: true, follow: true },
  locale = "en_US",
  publishedTime,
  modifiedTime,
  authorName = "StandaloneCoders Team",
  cityName,
}: SEOProps): Metadata {
  // Combine title with site name
  const fullTitle = cityName ? `${title} in ${cityName} - StandaloneCoders.in` : `${title} - StandaloneCoders.in`

  // Enhance description with location if provided
  const fullDescription = cityName
    ? `${description} Serving clients in ${cityName} and throughout Rajasthan.`
    : description

  // Base SEO object
  const seo: Metadata = {
    title: fullTitle,
    description: fullDescription,
    keywords: keywords.join(", "),
    authors: [{ name: authorName }],
    robots: {
      index: robots.index,
      follow: robots.follow,
      googleBot: robots.googleBot || {
        index: robots.index,
        follow: robots.follow,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      type: ogType,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: locale,
      siteName: "StandaloneCoders.in",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: fullDescription,
      images: [ogImage],
      creator: "@standalonecoders",
    },
  }

  // Add canonical URL if provided
  if (canonicalUrl) {
    seo.alternates = {
      canonical: canonicalUrl,
    }
  }

  // Add article specific metadata
  if (ogType === "article" && publishedTime) {
    seo.openGraph = {
      ...seo.openGraph,
      publishedTime,
      ...(modifiedTime && { modifiedTime }),
    }
  }

  return seo
}
