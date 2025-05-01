import type { Metadata } from "next"
import { notFound } from "next/navigation"
import CityLandingPage from "@/components/city-landing-page"
import rajasthanCities from "@/data/rajasthan-cities"

interface ServiceCityPageProps {
  params: {
    service: string
    city: string
  }
}

// Define the services we offer
const validServices = [
  "website-development",
  "app-development",
  "digital-marketing",
  "ai-technology",
  "cybersecurity",
  "creative-services",
]

// Generate metadata dynamically
export async function generateMetadata({ params }: ServiceCityPageProps): Promise<Metadata> {
  const { service, city } = params

  // Format the service name for display
  const formattedService = service
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  // Format the city name for display
  const formattedCity = city
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return {
    title: `${formattedService} in ${formattedCity}, Rajasthan | StandaloneCoders`,
    description: `Professional ${formattedService.toLowerCase()} services in ${formattedCity}, Rajasthan. StandaloneCoders offers custom solutions for businesses of all sizes. Contact us for a free consultation.`,
    keywords: `${formattedService.toLowerCase()}, ${formattedCity}, Rajasthan, web development, app development, digital marketing, technology services, software development, IT company`,
  }
}

// Generate static paths for all service-city combinations
export async function generateStaticParams() {
  const paths: { service: string; city: string }[] = []

  validServices.forEach((service) => {
    rajasthanCities.forEach((city) => {
      paths.push({
        service,
        city: city.toLowerCase().replace(/\s+/g, "-"),
      })
    })
  })

  return paths
}

export default function ServiceCityPage({ params }: ServiceCityPageProps) {
  const { service, city } = params

  // Check if the service is valid
  if (!validServices.includes(service)) {
    return notFound()
  }

  // Check if the city is valid (case-insensitive)
  const formattedCity = city
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  if (!rajasthanCities.map((c) => c.toLowerCase()).includes(formattedCity.toLowerCase())) {
    return notFound()
  }

  // Format the service name for display
  const formattedService = service
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  // Generate primary keywords based on service and city
  const primaryKeywords = [
    `${formattedService} in ${formattedCity}`,
    `${formattedService} company ${formattedCity}`,
    `best ${formattedService.toLowerCase()} services in ${formattedCity}`,
    `affordable ${formattedService.toLowerCase()} ${formattedCity}`,
    `${formattedService.toLowerCase()} agency near me`,
    `top ${formattedService.toLowerCase()} company in Rajasthan`,
    `professional ${formattedService.toLowerCase()} services`,
    `${formattedCity} ${formattedService.toLowerCase()} experts`,
    `custom ${formattedService.toLowerCase()} solutions ${formattedCity}`,
  ]

  return <CityLandingPage city={formattedCity} primaryKeywords={primaryKeywords} />
}
