"use client"

import Image from "next/image"
import { getResponsiveImageSizes } from "../utils/responsive"

interface ResponsiveImageProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  priority?: boolean
  sizes?: string
  fill?: boolean
  quality?: number
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down"
}

export function ResponsiveImage({
  src,
  alt,
  className = "",
  width,
  height,
  priority = false,
  sizes,
  fill = false,
  quality = 85,
  objectFit = "cover",
}: ResponsiveImageProps) {
  // Default sizes if not provided
  const imageSizes = sizes || getResponsiveImageSizes()

  // Object fit classes
  const objectFitClass = `object-${objectFit}`

  return (
    <Image
      src={src || "/placeholder.svg"}
      alt={alt}
      className={`${objectFitClass} ${className}`}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      fill={fill}
      sizes={imageSizes}
      priority={priority}
      quality={quality}
    />
  )
}
