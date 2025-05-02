/**
 * Image Compression Service
 */

// Compression quality presets
export enum CompressionQuality {
  LOW = 60,
  MEDIUM = 75,
  HIGH = 85,
  LOSSLESS = 100,
}

// Compression options interface
export interface CompressionOptions {
  quality?: number
  maxWidth?: number
  maxHeight?: number
  format?: "webp" | "jpeg" | "png" | "avif"
  progressive?: boolean
}

/**
 * Compress an image file client-side before upload
 * This uses the browser's Canvas API for compression
 */
export async function compressImage(file: File, options: CompressionOptions = {}): Promise<File> {
  const {
    quality = CompressionQuality.HIGH,
    maxWidth = 1920,
    maxHeight = 1080,
    format = "webp",
    progressive = true,
  } = options

  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      // Calculate dimensions while maintaining aspect ratio
      const { width, height } = calculateDimensions(img.width, img.height, maxWidth, maxHeight)

      // Create canvas for resizing
      const canvas = document.createElement("canvas")
      canvas.width = width
      canvas.height = height

      // Draw image on canvas
      const ctx = canvas.getContext("2d")
      if (!ctx) {
        reject(new Error("Could not get canvas context"))
        return
      }

      ctx.drawImage(img, 0, 0, width, height)

      // Convert to desired format
      const mimeType = getMimeType(format)

      // For JPEG, we can set progressive option
      const encoderOptions: any = { quality: quality / 100 }
      if (format === "jpeg" && progressive) {
        encoderOptions.progressive = true
      }

      // Convert canvas to blob
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Could not create blob from canvas"))
            return
          }

          // Create new file from blob
          const compressedFile = new File([blob], getNewFileName(file.name, format), { type: mimeType })

          resolve(compressedFile)
        },
        mimeType,
        quality / 100,
      )
    }

    img.onerror = () => {
      reject(new Error("Failed to load image for compression"))
    }

    // Load image from file
    img.src = URL.createObjectURL(file)
  })
}

/**
 * Calculate dimensions while maintaining aspect ratio
 */
function calculateDimensions(
  originalWidth: number,
  originalHeight: number,
  maxWidth: number,
  maxHeight: number,
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
 * Get MIME type for image format
 */
function getMimeType(format: string): string {
  switch (format) {
    case "webp":
      return "image/webp"
    case "jpeg":
      return "image/jpeg"
    case "png":
      return "image/png"
    case "avif":
      return "image/avif"
    default:
      return "image/jpeg"
  }
}

/**
 * Generate new filename with correct extension
 */
function getNewFileName(originalName: string, format: string): string {
  const baseName = originalName.substring(0, originalName.lastIndexOf("."))
  return `${baseName}.${format}`
}

/**
 * Estimate file size after compression
 */
export function estimateCompressedSize(originalSize: number, quality: number, format: string): number {
  // These are rough estimates based on typical compression ratios
  const formatFactor =
    {
      webp: 0.7,
      jpeg: 1.0,
      png: 1.2,
      avif: 0.5,
    }[format] || 1.0

  // Quality factor (non-linear relationship)
  const qualityFactor = Math.pow(quality / 100, 1.5)

  // Estimate compressed size
  return Math.round(originalSize * formatFactor * qualityFactor)
}
