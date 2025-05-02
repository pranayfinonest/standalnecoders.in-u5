"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import {
  generateBlurPlaceholder,
  shouldPrioritizeImage,
  getOptimizedImageUrl,
  generateSrcSet,
  generateSizes,
  type ImageFormat,
  getOptimalImageFormat,
} from "@/utils/image-optimization-service"

interface EnhancedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  position?: "hero" | "above-fold" | "below-fold" | "lazy"
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down"
  quality?: number
  sizes?: string
  fill?: boolean
  formats?: ImageFormat[]
  onLoad?: () => void
  onError?: () => void
}

export function EnhancedImage({
  src,
  alt,
  width,
  height,
  className = "",
  position = "below-fold",
  objectFit = "cover",
  quality = 75,
  sizes,
  fill = false,
  formats = ["webp", "original"],
  onLoad,
  onError,
}: EnhancedImageProps) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const [optimalFormat, setOptimalFormat] = useState<ImageFormat>("webp")

  // Generate placeholder
  const blurDataURL = generateBlurPlaceholder(width || 16, height || 9)

  // Determine if image should be prioritized
  const isPriority = shouldPrioritizeImage(position)

  // Get optimal image format based on browser support
  useEffect(() => {
    setOptimalFormat(getOptimalImageFormat())
  }, [])

  // Generate optimized image URL
  const optimizedSrc = getOptimizedImageUrl(src, {
    width: width,
    height: height,
    quality: quality,
    format: optimalFormat,
  })

  // Generate srcSet for responsive images
  const srcSet =
    width && height
      ? generateSrcSet(
          src,
          [width / 4, width / 2, width, width * 1.5, width * 2].map((w) => Math.round(w)),
          optimalFormat,
        )
      : undefined

  // Generate sizes attribute if not provided
  const sizesProp = sizes || generateSizes()

  // Object fit classes
  const objectFitClass = `object-${objectFit}`

  // Handle loading state
  const handleLoad = () => {
    setLoaded(true)
    onLoad?.()
  }

  // Handle error state
  const handleError = () => {
    setError(true)
    onError?.()
  }

  return (
    <div className={`relative ${className}`} style={fill ? { width: "100%", height: "100%" } : undefined}>
      {!loaded && !error && (
        <div
          className="absolute inset-0 bg-gray-200 animate-pulse rounded"
          aria-hidden="true"
          style={{
            backgroundImage: `url(${blurDataURL})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}

      {error ? (
        <div className="flex items-center justify-center w-full h-full bg-gray-100 rounded">
          <span className="text-gray-500">Image not available</span>
        </div>
      ) : (
        <Image
          src={optimizedSrc || "/placeholder.svg"}
          alt={alt}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          className={`transition-opacity duration-300 ${objectFitClass} ${loaded ? "opacity-100" : "opacity-0"} rounded`}
          onLoad={handleLoad}
          onError={handleError}
          priority={isPriority}
          quality={quality}
          sizes={sizesProp}
          placeholder="blur"
          blurDataURL={blurDataURL}
          fill={fill}
          loading={isPriority ? "eager" : "lazy"}
          srcSet={srcSet}
        />
      )}
    </div>
  )
}
