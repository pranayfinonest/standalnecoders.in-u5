import Script from "next/script"

interface StructuredDataEnhancedProps {
  type?: "Organization" | "LocalBusiness" | "WebSite" | "Service" | "BreadcrumbList"
  name?: string
  description?: string
  url?: string
  logo?: string
  sameAs?: string[]
  address?: {
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
    addressCountry: string
  }
  geo?: {
    latitude: number
    longitude: number
  }
  telephone?: string
  priceRange?: string
  openingHours?: string[]
  services?: Array<{
    name: string
    description: string
    url: string
  }>
  breadcrumbs?: Array<{
    name: string
    item: string
  }>
}

export default function StructuredDataEnhanced({
  type = "Organization",
  name = "StandaloneCoders",
  description = "Professional web development, cybersecurity, AI, digital marketing, and technology solutions for businesses across Rajasthan.",
  url = "https://standalonecoders.in",
  logo = "https://standalonecoders.in/standalone-coders-logo.png",
  sameAs = [
    "https://www.linkedin.com/in/standalone-coders-769b62363/",
    "https://twitter.com/standalonecoders",
    "https://www.facebook.com/standalonecoders",
    "https://www.instagram.com/standalonecoders/",
  ],
  address = {
    streetAddress: "123 Tech Park",
    addressLocality: "Jaipur",
    addressRegion: "Rajasthan",
    postalCode: "302001",
    addressCountry: "IN",
  },
  geo = {
    latitude: 26.9124,
    longitude: 75.7873,
  },
  telephone = "+91 9876543210",
  priceRange = "₹₹-₹₹₹",
  openingHours = ["Mo-Fr 09:00-18:00"],
  services = [
    {
      name: "Website Development",
      description: "Custom website development services for businesses in Rajasthan",
      url: "https://standalonecoders.in/services/website-development",
    },
    {
      name: "Cybersecurity",
      description: "Comprehensive cybersecurity solutions for businesses in Rajasthan",
      url: "https://standalonecoders.in/services/cybersecurity",
    },
    {
      name: "Digital Marketing",
      description: "Result-driven digital marketing services for businesses in Rajasthan",
      url: "https://standalonecoders.in/services/digital-marketing",
    },
    {
      name: "AI Technology",
      description: "Innovative AI solutions for businesses in Rajasthan",
      url: "https://standalonecoders.in/services/ai-technology",
    },
  ],
  breadcrumbs,
}: StructuredDataEnhancedProps) {
  // Base structured data
  let structuredData: any = {}

  // Organization or LocalBusiness data
  if (type === "Organization" || type === "LocalBusiness") {
    structuredData = {
      "@context": "https://schema.org",
      "@type": type,
      name,
      description,
      url,
      logo,
      sameAs,
    }

    // Add LocalBusiness specific properties
    if (type === "LocalBusiness") {
      structuredData = {
        ...structuredData,
        address: {
          "@type": "PostalAddress",
          ...address,
        },
        geo: {
          "@type": "GeoCoordinates",
          ...geo,
        },
        telephone,
        priceRange,
        openingHoursSpecification: openingHours.map((hours) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: hours.split(" ")[0],
          opens: hours.split(" ")[1].split("-")[0],
          closes: hours.split(" ")[1].split("-")[1],
        })),
      }
    }
  }

  // Website data
  if (type === "WebSite") {
    structuredData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name,
      description,
      url,
      potentialAction: {
        "@type": "SearchAction",
        target: `${url}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    }
  }

  // Service data
  if (type === "Service") {
    structuredData = {
      "@context": "https://schema.org",
      "@type": "Service",
      name,
      description,
      url,
      provider: {
        "@type": "Organization",
        name: "StandaloneCoders",
        url: "https://standalonecoders.in",
      },
      areaServed: {
        "@type": "State",
        name: "Rajasthan",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "StandaloneCoders Services",
        itemListElement: services.map((service, index) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.name,
            description: service.description,
            url: service.url,
          },
          position: index + 1,
        })),
      },
    }
  }

  // BreadcrumbList data
  if (type === "BreadcrumbList" && breadcrumbs) {
    structuredData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((breadcrumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: breadcrumb.name,
        item: breadcrumb.item,
      })),
    }
  }

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
