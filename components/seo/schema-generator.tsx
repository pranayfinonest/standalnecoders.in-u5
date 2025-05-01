export interface SchemaGeneratorProps {
  pageType: "home" | "service" | "about" | "contact" | "blog" | "article" | "product"
  data?: any
}

export default function SchemaGenerator({ pageType, data }: SchemaGeneratorProps) {
  // Base organization schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://standalonecoders.in/#organization",
    name: "StandaloneCoders",
    url: "https://standalonecoders.in",
    logo: {
      "@type": "ImageObject",
      url: "https://standalonecoders.in/standalone-coders-logo.png",
      width: 600,
      height: 60,
    },
    sameAs: [
      "https://facebook.com/standalonecoders",
      "https://twitter.com/standalonecoders",
      "https://instagram.com/standalonecoders",
      "https://linkedin.com/company/standalonecoders",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-9999999999",
      contactType: "customer service",
      email: "standalonecoders@gmail.com",
      availableLanguage: ["English", "Hindi"],
    },
  }

  // Website schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://standalonecoders.in/#website",
    url: "https://standalonecoders.in",
    name: "StandaloneCoders",
    description:
      "Professional cybersecurity, AI, digital marketing, and technology solutions for businesses and organizations.",
    publisher: {
      "@id": "https://standalonecoders.in/#organization",
    },
  }

  // Generate specific schema based on page type
  switch (pageType) {
    case "home":
      return (
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        </>
      )

    case "service":
      if (!data) return null

      const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: data.title,
        description: data.description,
        provider: {
          "@id": "https://standalonecoders.in/#organization",
        },
        serviceType: data.serviceType || data.title,
        areaServed: {
          "@type": "Country",
          name: "India",
        },
        ...(data.offers && {
          offers: {
            "@type": "Offer",
            price: data.offers.price,
            priceCurrency: "INR",
          },
        }),
      }

      return (
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
        </>
      )

    case "blog":
    case "article":
      if (!data) return null

      const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: data.title,
        description: data.description,
        image: data.image,
        author: {
          "@type": "Person",
          name: data.author.name,
        },
        publisher: {
          "@id": "https://standalonecoders.in/#organization",
        },
        datePublished: data.datePublished,
        dateModified: data.dateModified || data.datePublished,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": data.url,
        },
      }

      return (
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        </>
      )

    case "product":
      if (!data) return null

      const productSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: data.name,
        description: data.description,
        image: data.image,
        sku: data.sku,
        brand: {
          "@type": "Brand",
          name: "StandaloneCoders",
        },
        offers: {
          "@type": "Offer",
          price: data.price,
          priceCurrency: "INR",
          availability: data.availability || "https://schema.org/InStock",
          url: data.url,
        },
      }

      return (
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
        </>
      )

    default:
      return null
  }
}
