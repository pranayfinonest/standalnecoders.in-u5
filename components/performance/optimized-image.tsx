"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { getOptimalImageDimensions, shouldPrioritizeImage, generateBlurPlaceholder } from "@/utils/image-optimizer"

interface OptimizedImageProps {
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
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = "",
  position = "below-fold",
  objectFit = "cover",
  quality = 75,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  fill = false,
}: OptimizedImageProps) {
  const [loaded, setLoaded] = useState(false)
  const [dimensions, setDimensions] = useState({ width: width || 0, height: height || 0 })
  const [error, setError] = useState(false)

  // Generate placeholder
  const blurDataURL = generateBlurPlaceholder(dimensions.width || 16, dimensions.height || 9)

  // Determine if image should be prioritized
  const isPriority = shouldPrioritizeImage(position)

  // Calculate optimal dimensions if width and height are provided
  useEffect(() => {
    if (width && height && !fill) {
      setDimensions(getOptimalImageDimensions(width, height))
    }
  }, [width, height, fill])

  // Object fit classes
  const objectFitClass = `object-${objectFit}`

  // Handle loading state
  const handleLoad = () => {
    setLoaded(true)
  }

  // Handle error state
  const handleError = () => {
    setError(true)
  }

  return (
    <div className={`relative ${className}`} style={fill ? { width: "100%", height: "100%" } : undefined}>
      {!loaded && !error && <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" aria-hidden="true" />}

      {error ? (
        <div className="flex items-center justify-center w-full h-full bg-gray-100 rounded">
          <span className="text-gray-500">Image not available</span>
        </div>
      ) : (
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={fill ? undefined : dimensions.width}
          height={fill ? undefined : dimensions.height}
          className={`transition-opacity duration-300 ${objectFitClass} ${loaded ? "opacity-100" : "opacity-0"}`}
          onLoad={handleLoad}
          onError={handleError}
          priority={isPriority}
          quality={quality}
          sizes={sizes}
          placeholder="blur"
          blurDataURL={blurDataURL}
          fill={fill}
          loading={isPriority ? "eager" : "lazy"}
        />
      )}
    </div>
  )
}
