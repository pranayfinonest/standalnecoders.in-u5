interface CityMetaTagsProps {
  city: string
  service?: string
  baseTitle?: string
  baseDescription?: string
}

export function generateCityMetaTags({
  city,
  service = "web development",
  baseTitle = "StandaloneCoders | Technology Solutions",
  baseDescription = "Professional technology solutions for businesses",
}: CityMetaTagsProps) {
  const formattedService = service.charAt(0).toUpperCase() + service.slice(1)

  return {
    title: `${formattedService} in ${city}, Rajasthan | ${baseTitle}`,
    description: `Professional ${service} services in ${city}, Rajasthan. StandaloneCoders offers custom ${service} solutions for businesses of all sizes. Contact us for a free consultation.`,
    keywords: `${service}, ${city}, Rajasthan, web development, app development, digital marketing, technology services, software development, IT company`,
    ogTitle: `Best ${service} Services in ${city}, Rajasthan`,
    ogDescription: `Looking for professional ${service} in ${city}? StandaloneCoders provides top-rated ${service} services tailored for local businesses.`,
    twitterTitle: `${formattedService} Services in ${city} | StandaloneCoders`,
    twitterDescription: `Custom ${service} solutions for businesses in ${city}, Rajasthan. Contact StandaloneCoders for a free consultation.`,
  }
}
