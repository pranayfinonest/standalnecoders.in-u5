import type { MetadataRoute } from "next"
import rajasthanCities from "@/data/rajasthan-cities"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://standalonecoders.in"

  // Define the services we offer
  const services = [
    "website-development",
    "app-development",
    "digital-marketing",
    "ai-technology",
    "cybersecurity",
    "creative-services",
  ]

  // Basic pages
  const staticPages = [
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
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
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
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ]

  // Service pages
  const servicePages = services.map((service) => ({
    url: `${baseUrl}/services/${service}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.9,
  }))

  // City-specific service pages
  const cityServicePages = []

  for (const service of services) {
    for (const city of rajasthanCities) {
      cityServicePages.push({
        url: `${baseUrl}/services/${service}/${city.toLowerCase().replace(/\s+/g, "-")}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      })
    }
  }

  return [...staticPages, ...servicePages, ...cityServicePages]
}
