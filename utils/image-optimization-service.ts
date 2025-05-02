/**
 * Comprehensive image optimization service
 */
import { createClient } from "@supabase/supabase-js"

// Image format types
export type ImageFormat = "webp" | "avif" | "jpeg" | "png" | "original"

// Image quality presets
export const ImageQuality = {
  LOW: 60,
  MEDIUM: 75,
  HIGH: 85,
  LOSSLESS: 100,
}

// Image sizes for responsive images
export const ImageSizes = {
  THUMBNAIL: { width: 150, height: 150 },
  SMALL: { width: 300, height: 300 },
  MEDIUM: { width: 600, height: 600 },
  LARGE: { width: 1200, height: 1200 },
  HERO: { width: 1920, height: 1080 },
}

// CDN configuration
export const CDN_CONFIG = {
  // Base URL for your CDN (if using Vercel, this is your deployment URL)
  baseUrl: process.env.NEXT_PUBLIC_CDN_URL || "https://standalonecoders.in",
  // Image optimization parameters
  params: {
    quality: "auto",
    format: "auto",
    compress: true,
  },
}

// Supabase client for storage operations
let supabaseClient: ReturnType<typeof createClient> | null = null

// Initialize Supabase client (singleton pattern)
export function getSupabaseClient() {
  if (supabaseClient) return supabaseClient

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Supabase credentials not found")
    return null
  }

  supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
  return supabaseClient
}

/**
 * Generate optimized image URL with CDN parameters
 */
export function getOptimizedImageUrl(
  url: string,
  options: {
    width?: number
    height?: number
    quality?: number
    format?: ImageFormat
  } = {},
): string {
  // If URL is already a data URL or blob URL, return as is
  if (url.startsWith("data:") || url.startsWith("blob:")) {
    return url
  }

  // If URL is relative, prepend the CDN base URL
  const fullUrl = url.startsWith("http") ? url : `${CDN_CONFIG.baseUrl}${url.startsWith("/") ? "" : "/"}${url}`

  // For external URLs that don't support our CDN parameters, return as is
  if (!fullUrl.includes(CDN_CONFIG.baseUrl) && !fullUrl.includes("supabase")) {
    return fullUrl
  }

  // For Supabase storage URLs, add transformation parameters
  if (fullUrl.includes("supabase.co") && fullUrl.includes("storage/v1")) {
    const params = new URLSearchParams()

    if (options.width) params.append("width", options.width.toString())
    if (options.height) params.append("height", options.height.toString())
    if (options.quality) params.append("quality", options.quality.toString())
    if (options.format && options.format !== "original") params.append("format", options.format)

    return `${fullUrl}${fullUrl.includes("?") ? "&" : "?"}${params.toString()}`
  }

  // For our own CDN, add optimization parameters
  // This assumes you're using a service like Vercel Image Optimization, Cloudinary, Imgix, etc.
  const params = new URLSearchParams()

  if (options.width) params.append("w", options.width.toString())
  if (options.height) params.append("h", options.height.toString())
  if (options.quality) params.append("q", options.quality.toString())
  if (options.format && options.format !== "original") params.append("fm", options.format)

  // Add default CDN parameters
  params.append("auto", CDN_CONFIG.params.format)
  if (CDN_CONFIG.params.compress) params.append("compress", "true")

  return `${fullUrl}${fullUrl.includes("?") ? "&" : "?"}${params.toString()}`
}

/**
 * Generate responsive image srcSet
 */
export function generateSrcSet(
  url: string,
  widths: number[] = [320, 640, 768, 1024, 1280, 1536, 1920],
  format: ImageFormat = "webp",
): string {
  return widths
    .map((width) => {
      const optimizedUrl = getOptimizedImageUrl(url, { width, format })
      return `${optimizedUrl} ${width}w`
    })
    .join(", ")
}

/**
 * Generate sizes attribute for responsive images
 */
export function generateSizes(
  sizes: { breakpoint: number; width: string }[] = [
    { breakpoint: 640, width: "100vw" },
    { breakpoint: 768, width: "50vw" },
    { breakpoint: 1024, width: "33vw" },
  ],
): string {
  // Sort by breakpoint in descending order
  const sortedSizes = [...sizes].sort((a, b) => b.breakpoint - a.breakpoint)

  return sortedSizes
    .map((size, index) => {
      // For the last item, don't add a media query
      if (index === sortedSizes.length - 1) {
        return size.width
      }
      return `(max-width: ${size.breakpoint}px) ${size.width}`
    })
    .join(", ")
}

/**
 * Generate blur placeholder for images
 */
export function generateBlurPlaceholder(width = 16, height = 9): string {
  return `data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}'%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' fill='%23f0f0f0'/%3E%3Crect width='100%25' height='100%25' filter='url(%23b)'/%3E%3C/svg%3E`
}

/**
 * Check if image should be loaded with priority
 */
export function shouldPrioritizeImage(position: "hero" | "above-fold" | "below-fold" | "lazy"): boolean {
  return ["hero", "above-fold"].includes(position)
}

/**
 * Upload and optimize an image to Supabase storage
 */
export async function uploadAndOptimizeImage(
  file: File,
  options: {
    path?: string
    bucket?: string
    quality?: number
    maxWidth?: number
    maxHeight?: number
    format?: ImageFormat
  } = {},
): Promise<{ url: string; error: Error | null }> {
  const supabase = getSupabaseClient()
  if (!supabase) {
    return { url: "", error: new Error("Supabase client not initialized") }
  }

  const {
    path = "images",
    bucket = "public",
    quality = ImageQuality.HIGH,
    maxWidth = 1920,
    maxHeight = 1080,
    format = "webp",
  } = options

  // Generate a unique filename
  const fileExt = format === "original" ? file.name.split(".").pop() : format
  const fileName = `${path}/${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`

  try {
    // Upload the file to Supabase Storage
    const { data, error } = await supabase.storage.from(bucket).upload(fileName, file, { upsert: true })

    if (error) throw error

    // Get the public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(fileName)

    // Return the optimized URL
    return {
      url: getOptimizedImageUrl(publicUrl, {
        width: maxWidth,
        height: maxHeight,
        quality,
        format,
      }),
      error: null,
    }
  } catch (error) {
    console.error("Error uploading image:", error)
    return { url: "", error: error as Error }
  }
}

/**
 * Calculate optimal image dimensions while maintaining aspect ratio
 */
export function calculateOptimalDimensions(
  originalWidth: number,
  originalHeight: number,
  maxWidth = 1920,
  maxHeight = 1080,
): { width: number; height: number } {
  // If image is already smaller than max dimensions, return original
  if (originalWidth <= maxWidth && originalHeight <= maxHeight) {
    return { width: originalWidth, height: originalHeight }
  }

  const aspectRatio = originalWidth / originalHeight

  // Calculate dimensions based on aspect ratio
  if (maxWidth / maxHeight > aspectRatio) {
    // Height is the limiting factor
    return {
      width: Math.round(maxHeight * aspectRatio),
      height: maxHeight,
    }
  } else {
    // Width is the limiting factor
    return {
      width: maxWidth,
      height: Math.round(maxWidth / aspectRatio),
    }
  }
}

/**
 * Detect if browser supports modern image formats
 */
export function detectBrowserImageSupport(): { webp: boolean; avif: boolean } {
  if (typeof window === "undefined") {
    return { webp: true, avif: false } // Default for SSR
  }

  // Check WebP support
  const webp = document.createElement("canvas").toDataURL("image/webp").indexOf("data:image/webp") === 0

  // Check AVIF support (less common)
  const avif = document.createElement("canvas").toDataURL("image/avif").indexOf("data:image/avif") === 0

  return { webp, avif }
}

/**
 * Get optimal image format based on browser support
 */
export function getOptimalImageFormat(): ImageFormat {
  const { webp, avif } = detectBrowserImageSupport()

  if (avif) return "avif"
  if (webp) return "webp"
  return "jpeg"
}
