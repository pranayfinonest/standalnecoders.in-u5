/**
 * Image optimization utilities
 */

// Define image quality tiers
export const imageQualityTiers = {
  low: 60,
  medium: 75,
  high: 85,
  max: 100,
}

// Calculate optimal image dimensions based on display size
export function getOptimalImageDimensions(
  originalWidth: number,
  originalHeight: number,
  maxWidth = 1200,
  maxHeight = 800,
): { width: number; height: number } {
  // If image is smaller than max dimensions, return original
  if (originalWidth <= maxWidth && originalHeight <= maxHeight) {
    return { width: originalWidth, height: originalHeight }
  }

  // Calculate aspect ratio
  const aspectRatio = originalWidth / originalHeight

  // Determine which dimension to constrain
  if (maxWidth / maxHeight > aspectRatio) {
    // Height is the constraining dimension
    return {
      width: Math.round(maxHeight * aspectRatio),
      height: maxHeight,
    }
  } else {
    // Width is the constraining dimension
    return {
      width: maxWidth,
      height: Math.round(maxWidth / aspectRatio),
    }
  }
}

// Generate srcset for responsive images
export function generateSrcSet(basePath: string, widths: number[] = [640, 750, 828, 1080, 1200, 1920, 2048]): string {
  // Extract file extension
  const extension = basePath.split(".").pop()
  const baseWithoutExtension = basePath.substring(0, basePath.lastIndexOf("."))

  // Generate srcset string
  return widths.map((width) => `${baseWithoutExtension}-${width}w.${extension} ${width}w`).join(", ")
}

// Determine if image should be loaded with priority
export function shouldPrioritizeImage(position: "hero" | "above-fold" | "below-fold" | "lazy" = "below-fold"): boolean {
  return ["hero", "above-fold"].includes(position)
}

// Generate placeholder blur data URL
export function generateBlurPlaceholder(width = 16, height = 9): string {
  return `data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}'%3E%3C/svg%3E`
}
