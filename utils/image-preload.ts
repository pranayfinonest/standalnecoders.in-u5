import type React from "react"
/**
 * Image Preloading Utility
 */

// Types of images to preload
export type PreloadType = "critical" | "visible" | "hover" | "future"

// Interface for preload options
interface PreloadOptions {
  type?: PreloadType
  media?: string
  as?: "image"
  fetchPriority?: "high" | "low" | "auto"
}

/**
 * Preload a single image
 */
export function preloadImage(src: string, options: PreloadOptions = {}): void {
  if (typeof window === "undefined") return

  const { type = "critical", media, as = "image", fetchPriority = type === "critical" ? "high" : "auto" } = options

  // Create link element
  const link = document.createElement("link")
  link.rel = "preload"
  link.href = src
  link.as = as

  // Set media query if provided
  if (media) {
    link.media = media
  }

  // Set fetch priority
  if ("fetchPriority" in HTMLLinkElement.prototype) {
    // @ts-ignore - fetchPriority is not in the types yet
    link.fetchPriority = fetchPriority
  }

  // Add to document head
  document.head.appendChild(link)
}

/**
 * Preload multiple images
 */
export function preloadImages(srcs: string[], options: PreloadOptions = {}): void {
  srcs.forEach((src) => preloadImage(src, options))
}

/**
 * Preload images for a specific route
 */
export function preloadRouteImages(route: string, images: Record<string, string[]> = {}): void {
  if (!images[route]) return

  preloadImages(images[route], { type: "critical", fetchPriority: "high" })
}

/**
 * Create a component to preload critical images
 */
export function createImagePreloader(criticalImages: string[], visibleImages: string[] = []): React.FC {
  return function ImagePreloader() {
    // Preload critical images immediately
    if (typeof window !== "undefined") {
      preloadImages(criticalImages, { type: "critical", fetchPriority: "high" })

      // Preload visible images after a short delay
      if (visibleImages.length > 0) {
        setTimeout(() => {
          preloadImages(visibleImages, { type: "visible" })
        }, 1000)
      }
    }

    return null
  }
}
