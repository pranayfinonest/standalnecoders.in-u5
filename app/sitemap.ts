import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://standalonecoders.in"

  // Main pages
  const mainPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ]

  // Service pages
  const services = [
    "website-development",
    "cybersecurity",
    "digital-marketing",
    "ai-technology",
    "creative-services",
    "custom-software",
  ]

  const servicePages = [
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...services.map((service) => ({
      url: `${baseUrl}/services/${service}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    })),
  ]

  // Location pages for SEO
  const locations = ["jaipur", "udaipur", "jodhpur", "kota", "ajmer", "bikaner", "alwar", "bharatpur", "sikar", "pali"]

  const locationPages = []

  for (const service of services) {
    for (const location of locations) {
      locationPages.push({
        url: `${baseUrl}/services/${service}/${location}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      })
    }
  }

  return [...mainPages, ...servicePages, ...locationPages]
}
