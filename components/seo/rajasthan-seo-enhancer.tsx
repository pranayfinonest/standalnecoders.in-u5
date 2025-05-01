"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import { useEffect } from "react"
import cities from "@/data/rajasthan-cities"

interface RajasthanSEOEnhancerProps {
  serviceName?: string
  primaryKeywords?: string[]
  children?: React.ReactNode
}

export default function RajasthanSEOEnhancer({
  serviceName = "technology services",
  primaryKeywords = [],
  children,
}: RajasthanSEOEnhancerProps) {
  const pathname = usePathname()
  const cityFromPath = pathname.split("/").filter(Boolean).pop()
  const isServicePage = pathname.includes("/services/")
  const isCityPage = cities.some((city) => pathname.includes(`/${city.toLowerCase()}`))

  useEffect(() => {
    // Add structured data for local business
    addLocalBusinessSchema(serviceName, cityFromPath)

    // Add city-specific meta tags dynamically
    if (isCityPage && cityFromPath) {
      updateMetaTags(serviceName, cityFromPath)
    }

    // Add breadcrumb structured data
    addBreadcrumbSchema()

    return () => {
      // Clean up any dynamic elements
    }
  }, [pathname, serviceName, cityFromPath, isCityPage])

  const addLocalBusinessSchema = (service: string, city?: string) => {
    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "StandaloneCoders",
      description: `Top-rated ${service} provider ${city ? `in ${city}, Rajasthan` : "in Rajasthan"}`,
      url: `https://standalonecoders.in${pathname}`,
      logo: "https://standalonecoders.in/standalone-coders-logo.png",
      image: "https://standalonecoders.in/vibrant-tech-hub.png",
      telephone: "+91-XXXXXXXXXX",
      email: "standalonecoders@gmail.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: city || "Jaipur",
        addressRegion: "Rajasthan",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "26.9124",
        longitude: "75.7873",
      },
      areaServed: {
        "@type": "State",
        name: "Rajasthan",
      },
      serviceArea: {
        "@type": "GeoCircle",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: "26.9124",
          longitude: "75.7873",
        },
        geoRadius: "500000",
      },
    }

    const script = document.createElement("script")
    script.type = "application/ld+json"
    script.id = "local-business-schema"
    script.innerHTML = JSON.stringify(localBusinessSchema)

    // Remove existing schema if it exists
    const existingScript = document.getElementById("local-business-schema")
    if (existingScript) {
      existingScript.remove()
    }

    document.head.appendChild(script)
  }

  const updateMetaTags = (service: string, city: string) => {
    // Update title
    document.title = `Top ${service} in ${city}, Rajasthan | StandaloneCoders`

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        `Looking for professional ${service} in ${city}, Rajasthan? StandaloneCoders offers top-rated web development, app development, and digital marketing services tailored for businesses in ${city}.`,
      )
    }

    // Update canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]')
    if (!canonicalLink) {
      canonicalLink = document.createElement("link")
      canonicalLink.setAttribute("rel", "canonical")
      document.head.appendChild(canonicalLink)
    }
    canonicalLink.setAttribute("href", `https://standalonecoders.in${pathname}`)

    // Update OG tags
    updateOGTags(service, city)
  }

  const updateOGTags = (service: string, city: string) => {
    const ogTags = {
      "og:title": `Best ${service} in ${city}, Rajasthan | StandaloneCoders`,
      "og:description": `Professional ${service} solutions for businesses in ${city}. Get custom web development, app development, and digital marketing services from StandaloneCoders.`,
      "og:url": `https://standalonecoders.in${pathname}`,
      "og:type": "website",
      "og:locale": "en_IN",
    }

    Object.entries(ogTags).forEach(([property, content]) => {
      let metaTag = document.querySelector(`meta[property="${property}"]`)
      if (!metaTag) {
        metaTag = document.createElement("meta")
        metaTag.setAttribute("property", property)
        document.head.appendChild(metaTag)
      }
      metaTag.setAttribute("content", content)
    })
  }

  const addBreadcrumbSchema = () => {
    const pathSegments = pathname.split("/").filter(Boolean)

    const breadcrumbItems = [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://standalonecoders.in",
      },
    ]

    let currentPath = ""

    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`
      breadcrumbItems.push({
        "@type": "ListItem",
        position: index + 2,
        name: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " "),
        item: `https://standalonecoders.in${currentPath}`,
      })
    })

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbItems,
    }

    const script = document.createElement("script")
    script.type = "application/ld+json"
    script.id = "breadcrumb-schema"
    script.innerHTML = JSON.stringify(breadcrumbSchema)

    // Remove existing schema if it exists
    const existingScript = document.getElementById("breadcrumb-schema")
    if (existingScript) {
      existingScript.remove()
    }

    document.head.appendChild(script)
  }

  return <>{children}</>
}
