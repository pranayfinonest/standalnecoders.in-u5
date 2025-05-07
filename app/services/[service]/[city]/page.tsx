import type { Metadata } from "next"
import { notFound } from "next/navigation"
import CityServicePage from "@/components/seo/city-service-page"

// Define valid services and cities
const validServices = {
  "website-development": {
    title: "Website Development",
    description: "Custom website development and design",
  },
  cybersecurity: {
    title: "Cybersecurity",
    description: "Comprehensive cybersecurity solutions",
  },
  "digital-marketing": {
    title: "Digital Marketing",
    description: "Result-driven digital marketing strategies",
  },
  "ai-technology": {
    title: "AI Technology",
    description: "Innovative artificial intelligence solutions",
  },
  "creative-services": {
    title: "Creative Services",
    description: "Professional creative and design services",
  },
  "custom-software": {
    title: "Custom Software Development",
    description: "Tailored software solutions for your business",
  },
}

const validCities = ["jaipur", "udaipur", "jodhpur", "kota", "ajmer", "bikaner", "alwar", "bharatpur", "sikar", "pali"]

// Generate metadata for the page
export async function generateMetadata({
  params,
}: {
  params: { service: string; city: string }
}): Promise<Metadata> {
  const { service, city } = params

  // Check if service and city are valid
  if (!validServices[service as keyof typeof validServices] || !validCities.includes(city)) {
    return {
      title: "Page Not Found | StandaloneCoders",
      description: "The requested page could not be found.",
    }
  }

  const serviceInfo = validServices[service as keyof typeof validServices]
  const cityName = city.charAt(0).toUpperCase() + city.slice(1)

  return {
    title: `${serviceInfo.title} in ${cityName}, Rajasthan | StandaloneCoders`,
    description: `Professional ${serviceInfo.description.toLowerCase()} services in ${cityName}, Rajasthan. Contact StandaloneCoders for expert solutions tailored to your business needs.`,
    keywords: `${serviceInfo.title.toLowerCase()}, ${cityName}, Rajasthan, ${serviceInfo.description.toLowerCase()}, StandaloneCoders, technology services`,
    alternates: {
      canonical: `https://standalonecoders.in/services/${service}/${city}`,
    },
  }
}

// Generate static params for all valid service-city combinations
export async function generateStaticParams() {
  const params = []

  for (const service of Object.keys(validServices)) {
    for (const city of validCities) {
      params.push({ service, city })
    }
  }

  return params
}

export default function ServiceCityPage({ params }: { params: { service: string; city: string } }) {
  const { service, city } = params

  // Check if service and city are valid
  if (!validServices[service as keyof typeof validServices] || !validCities.includes(city)) {
    notFound()
  }

  const serviceInfo = validServices[service as keyof typeof validServices]

  return (
    <CityServicePage
      city={city}
      service={service}
      serviceTitle={serviceInfo.title}
      serviceDescription={serviceInfo.description}
    />
  )
}
