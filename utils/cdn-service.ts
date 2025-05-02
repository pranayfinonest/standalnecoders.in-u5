/**
 * CDN Integration Service
 */

// CDN Provider types
export type CDNProvider = "vercel" | "cloudinary" | "imgix" | "cloudflare" | "custom"

// CDN Configuration interface
export interface CDNConfig {
  provider: CDNProvider
  baseUrl: string
  transformations?: Record<string, string>
  apiKey?: string
  secureToken?: string
}

// Default CDN configuration (using Vercel Image Optimization)
const defaultCDNConfig: CDNConfig = {
  provider: "vercel",
  baseUrl: process.env.NEXT_PUBLIC_CDN_URL || "https://standalonecoders.in",
  transformations: {
    quality: "auto",
    format: "auto",
  },
}

// Current CDN configuration
let cdnConfig: CDNConfig = { ...defaultCDNConfig }

/**
 * Configure CDN settings
 */
export function configureCDN(config: Partial<CDNConfig>): void {
  cdnConfig = { ...cdnConfig, ...config }
}

/**
 * Get current CDN configuration
 */
export function getCDNConfig(): CDNConfig {
  return { ...cdnConfig }
}

/**
 * Generate CDN URL for an image
 */
export function getCDNUrl(
  imagePath: string,
  options: {
    width?: number
    height?: number
    quality?: number
    format?: string
    crop?: "fill" | "fit" | "scale" | "thumb"
    gravity?: "center" | "north" | "south" | "east" | "west" | "auto"
  } = {},
): string {
  // If image path is already a full URL and not from our domain, return as is
  if (imagePath.startsWith("http") && !imagePath.includes(cdnConfig.baseUrl)) {
    return imagePath
  }

  // Ensure image path starts with a slash
  const normalizedPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`

  // Handle different CDN providers
  switch (cdnConfig.provider) {
    case "cloudinary":
      return generateCloudinaryUrl(normalizedPath, options)
    case "imgix":
      return generateImgixUrl(normalizedPath, options)
    case "cloudflare":
      return generateCloudflareUrl(normalizedPath, options)
    case "custom":
      return generateCustomCDNUrl(normalizedPath, options)
    case "vercel":
    default:
      return generateVercelUrl(normalizedPath, options)
  }
}

/**
 * Generate Vercel Image Optimization URL
 */
function generateVercelUrl(path: string, options: Record<string, any>): string {
  const baseUrl = cdnConfig.baseUrl.endsWith("/") ? cdnConfig.baseUrl.slice(0, -1) : cdnConfig.baseUrl

  const params = new URLSearchParams()

  if (options.width) params.append("w", options.width.toString())
  if (options.height) params.append("h", options.height.toString())
  if (options.quality) params.append("q", options.quality.toString())
  if (options.format) params.append("fm", options.format)

  // Add default transformations
  if (cdnConfig.transformations) {
    Object.entries(cdnConfig.transformations).forEach(([key, value]) => {
      if (!params.has(key)) params.append(key, value)
    })
  }

  const queryString = params.toString()
  return `${baseUrl}${path}${queryString ? `?${queryString}` : ""}`
}

/**
 * Generate Cloudinary URL
 */
function generateCloudinaryUrl(path: string, options: Record<string, any>): string {
  const cloudName = cdnConfig.baseUrl.split("/").pop()
  const baseUrl = `https://res.cloudinary.com/${cloudName}/image/upload`

  // Build transformation string
  const transformations = []

  if (options.width) transformations.push(`w_${options.width}`)
  if (options.height) transformations.push(`h_${options.height}`)
  if (options.quality) transformations.push(`q_${options.quality}`)
  if (options.format) transformations.push(`f_${options.format}`)
  if (options.crop) transformations.push(`c_${options.crop}`)
  if (options.gravity) transformations.push(`g_${options.gravity}`)

  // Add default transformations
  if (cdnConfig.transformations) {
    Object.entries(cdnConfig.transformations).forEach(([key, value]) => {
      transformations.push(`${key}_${value}`)
    })
  }

  const transformationString = transformations.length > 0 ? `${transformations.join(",")}` : ""

  // Remove leading slash from path
  const normalizedPath = path.startsWith("/") ? path.substring(1) : path

  return `${baseUrl}${transformationString ? `/${transformationString}` : ""}/${normalizedPath}`
}

/**
 * Generate Imgix URL
 */
function generateImgixUrl(path: string, options: Record<string, any>): string {
  const baseUrl = cdnConfig.baseUrl.endsWith("/") ? cdnConfig.baseUrl.slice(0, -1) : cdnConfig.baseUrl

  const params = new URLSearchParams()

  if (options.width) params.append("w", options.width.toString())
  if (options.height) params.append("h", options.height.toString())
  if (options.quality) params.append("q", options.quality.toString())
  if (options.format) params.append("fm", options.format)
  if (options.crop) params.append("fit", options.crop)

  // Add default transformations
  if (cdnConfig.transformations) {
    Object.entries(cdnConfig.transformations).forEach(([key, value]) => {
      if (!params.has(key)) params.append(key, value)
    })
  }

  // Remove leading slash from path
  const normalizedPath = path.startsWith("/") ? path.substring(1) : path

  const queryString = params.toString()
  return `${baseUrl}/${normalizedPath}${queryString ? `?${queryString}` : ""}`
}

/**
 * Generate Cloudflare Images URL
 */
function generateCloudflareUrl(path: string, options: Record<string, any>): string {
  const baseUrl = cdnConfig.baseUrl.endsWith("/") ? cdnConfig.baseUrl.slice(0, -1) : cdnConfig.baseUrl

  // Build variant string based on options
  let variant = "public"

  if (options.width && options.height) {
    variant = `${options.width}x${options.height}`
  } else if (options.width) {
    variant = `w${options.width}`
  }

  // Remove leading slash from path
  const normalizedPath = path.startsWith("/") ? path.substring(1) : path

  return `${baseUrl}/cdn-cgi/image/${variant}/${normalizedPath}`
}

/**
 * Generate Custom CDN URL
 */
function generateCustomCDNUrl(path: string, options: Record<string, any>): string {
  const baseUrl = cdnConfig.baseUrl.endsWith("/") ? cdnConfig.baseUrl.slice(0, -1) : cdnConfig.baseUrl

  // Custom implementation based on your CDN provider
  const params = new URLSearchParams()

  if (options.width) params.append("width", options.width.toString())
  if (options.height) params.append("height", options.height.toString())
  if (options.quality) params.append("quality", options.quality.toString())
  if (options.format) params.append("format", options.format)

  // Add default transformations
  if (cdnConfig.transformations) {
    Object.entries(cdnConfig.transformations).forEach(([key, value]) => {
      if (!params.has(key)) params.append(key, value)
    })
  }

  const queryString = params.toString()
  return `${baseUrl}${path}${queryString ? `?${queryString}` : ""}`
}
