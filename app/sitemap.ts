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

  // Cybersecurity sub-services
  const cybersecurityServices = [
    "vulnerability-assessment",
    "risk-assessment",
    "compliance-audits",
    "application-security",
    "code-review",
    "firewall-ids",
    "vpn-setup",
    "wireless-security",
    "network-architecture",
    "cloud-security",
    "threat-monitoring",
    "incident-response",
    "malware-analysis",
    "ransomware-protection",
    "siem",
    "data-loss-prevention",
    "encryption",
    "identity-access-management",
    "file-integrity-monitoring",
    "privacy-compliance",
    "iso-27001-implementation",
    "iso-27001-audits",
    "iso-27701",
    "iso-22301",
    "iso-20000",
    "ethical-hacking-training",
    "phishing-awareness",
    "secure-development-training",
    "incident-response-training",
    "compliance-training",
    "security-monitoring",
    "risk-management",
    "patch-management",
    "dark-web-monitoring",
    "soc-as-service",
    "iot-security",
    "blockchain-security",
    "ai-threat-detection",
    "digital-forensics",
    "zero-trust-security",
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
    ...cybersecurityServices.map((subService) => ({
      url: `${baseUrl}/services/cybersecurity/${subService}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
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
