/**
 * Image optimization utilities
 */

// Calculate responsive image sizes based on viewport
export function getResponsiveImageSizes(mobileSizes = "100vw", tabletSizes = "50vw", desktopSizes = "33vw"): string {
  return `(max-width: 640px) ${mobileSizes}, (max-width: 1024px) ${tabletSizes}, ${desktopSizes}`
}

// Generate blur placeholder data URL for images
export function generateBlurPlaceholder(width = 16, height = 9): string {
  return `data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}'%3E%3C/svg%3E`
}

// Format image URL for WebP if supported
export function getOptimizedImageUrl(url: string): string {
  // If URL is from an image optimization service or internal, add optimization params
  if (url.includes("standalonecoders.in")) {
    // Add query params for internal image optimization
    return `${url}?quality=85&format=webp`
  }

  // Return original URL for external images
  return url
}

// Custom priority logic to prioritize above-the-fold images
export function shouldPrioritizeImage(imagePosition: "hero" | "above-fold" | "below-fold" | "lazy"): boolean {
  return ["hero", "above-fold"].includes(imagePosition)
}
