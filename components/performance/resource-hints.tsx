"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

// Define critical resources by path
const criticalResources: Record<string, string[]> = {
  // Home page critical resources
  "/": ["/fonts/inter-var.woff2", "/standalone-coders-logo.png"],
  // Template page critical resources
  "/booking/templates": [
    "/templates/business-template.png",
    "/templates/ecommerce-template.png",
    "/templates/portfolio-template.png",
  ],
}

// Define preconnect domains
const preconnectDomains = ["https://fonts.googleapis.com", "https://fonts.gstatic.com", "https://standalonecoders.in"]

export function ResourceHints() {
  const pathname = usePathname()

  useEffect(() => {
    // Add preconnect for important domains
    preconnectDomains.forEach((domain) => {
      const link = document.createElement("link")
      link.rel = "preconnect"
      link.href = domain
      link.crossOrigin = "anonymous"
      document.head.appendChild(link)
    })

    // Find critical resources for current path
    const resources =
      Object.entries(criticalResources).find(([path]) => pathname === path || pathname.startsWith(path))?.[1] || []

    // Preload critical resources
    resources.forEach((resource) => {
      const extension = resource.split(".").pop()
      let as: string

      // Determine resource type
      if (["jpg", "jpeg", "png", "webp", "avif", "svg"].includes(extension || "")) {
        as = "image"
      } else if (["woff", "woff2", "ttf"].includes(extension || "")) {
        as = "font"
      } else if (extension === "css") {
        as = "style"
      } else if (extension === "js") {
        as = "script"
      } else {
        return // Skip if unknown type
      }

      // Create and append preload link
      const link = document.createElement("link")
      link.rel = "preload"
      link.href = resource
      link.as = as
      if (as === "font") link.crossOrigin = "anonymous"
      document.head.appendChild(link)
    })

    // Cleanup function
    return () => {
      // Remove all preload links we added
      document.querySelectorAll('link[rel="preload"]').forEach((el) => {
        if (resources.some((resource) => el.getAttribute("href") === resource)) {
          el.remove()
        }
      })
    }
  }, [pathname])

  return null
}
