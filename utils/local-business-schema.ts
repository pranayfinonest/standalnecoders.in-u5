interface LocalBusinessSchemaProps {
  businessName: string
  description: string
  city: string
  serviceArea?: string[]
  latitude?: string
  longitude?: string
  telephone?: string
  email?: string
  url?: string
  image?: string
  priceRange?: string
  openingHours?: string[]
  services?: string[]
}

export function generateLocalBusinessSchema({
  businessName,
  description,
  city,
  serviceArea = [],
  latitude = "26.9124",
  longitude = "75.7873",
  telephone = "+91-XXXXXXXXXX",
  email = "standalonecoders@gmail.com",
  url = "https://standalonecoders.in",
  image = "https://standalonecoders.in/standalone-coders-logo.png",
  priceRange = "₹₹₹",
  openingHours = ["Mo-Fr 09:00-18:00"],
  services = [],
}: LocalBusinessSchemaProps) {
  // Default service areas if none provided
  if (serviceArea.length === 0) {
    serviceArea = [
      "Jaipur",
      "Jodhpur",
      "Udaipur",
      "Kota",
      "Ajmer",
      "Bikaner",
      "Alwar",
      "Sikar",
      "Bharatpur",
      "Sri Ganganagar",
      "Bhilwara",
      "Pali",
      "Tonk",
    ]
  }

  // Create array of service areas
  const areaServed = serviceArea.map((area) => ({
    "@type": "City",
    name: area,
    containedInPlace: {
      "@type": "State",
      name: "Rajasthan",
    },
  }))

  // Create array of services if provided
  const serviceOffered = services.map((service) => ({
    "@type": "Service",
    name: service,
  }))

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: businessName,
    description: description,
    image: image,
    url: url,
    telephone: telephone,
    email: email,
    priceRange: priceRange,
    address: {
      "@type": "PostalAddress",
      addressLocality: city,
      addressRegion: "Rajasthan",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: latitude,
      longitude: longitude,
    },
    openingHoursSpecification: openingHours.map((hours) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: hours.split(" ")[0],
      opens: hours.split(" ")[1].split("-")[0],
      closes: hours.split(" ")[1].split("-")[1],
    })),
    areaServed: areaServed,
  }

  // Add services if provided
  if (services.length > 0) {
    schema["serviceOffered"] = serviceOffered
  }

  return schema
}
