"use client"

import { useState, useEffect } from "react"
import { EnhancedImage } from "./enhanced-image"

interface AdaptiveImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  mobileSrc?: string
  tabletSrc?: string
  desktopSrc?: string
  lowBandwidthSrc?: string
  highDensitySrc?: string
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down"
  position?: "hero" | "above-fold" | "below-fold" | "lazy"
}

export function AdaptiveImage({
  src,
  alt,
  width,
  height,
  className = "",
  mobileSrc,
  tabletSrc,
  desktopSrc,
  lowBandwidthSrc,
  highDensitySrc,
  objectFit = "cover",
  position = "below-fold",
}: AdaptiveImageProps) {
  const [adaptedSrc, setAdaptedSrc] = useState(src)
  const [deviceType, setDeviceType] = useState<"mobile" | "tablet" | "desktop">("desktop")
  const [isHighDensity, setIsHighDensity] = useState(false)
  const [isLowBandwidth, setIsLowBandwidth] = useState(false)

  useEffect(() => {
    // Detect device type
    const detectDeviceType = () => {
      const width = window.innerWidth
      if (width < 640) return "mobile"
      if (width < 1024) return "tablet"
      return "desktop"
    }

    // Detect high-density display
    const detectHighDensity = () => {
      return window.devicePixelRatio > 1.5
    }

    // Detect low bandwidth using Network Information API
    const detectLowBandwidth = () => {
      // @ts-ignore - Navigator connection API not in TypeScript yet
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection

      if (connection) {
        // Check if bandwidth is low
        if (connection.downlink < 1.5) return true
        if (connection.effectiveType === "slow-2g" || connection.effectiveType === "2g") return true
        if (connection.saveData) return true
      }

      return false
    }

    // Set initial values
    setDeviceType(detectDeviceType())
    setIsHighDensity(detectHighDensity())
    setIsLowBandwidth(detectLowBandwidth())

    // Choose the appropriate image source
    const chooseImageSource = () => {
      // If low bandwidth is detected and we have a low bandwidth version, use it
      if (isLowBandwidth && lowBandwidthSrc) {
        return lowBandwidthSrc
      }

      // If high density display and we have a high density version, use it
      if (isHighDensity && highDensitySrc && !isLowBandwidth) {
        return highDensitySrc
      }

      // Otherwise, choose based on device type
      switch (deviceType) {
        case "mobile":
          return mobileSrc || src
        case "tablet":
          return tabletSrc || desktopSrc || src
        case "desktop":
          return desktopSrc || src
        default:
          return src
      }
    }

    setAdaptedSrc(chooseImageSource())

    // Add resize listener
    const handleResize = () => {
      setDeviceType(detectDeviceType())
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [
    src,
    mobileSrc,
    tabletSrc,
    desktopSrc,
    lowBandwidthSrc,
    highDensitySrc,
    deviceType,
    isHighDensity,
    isLowBandwidth,
  ])

  return (
    <EnhancedImage
      src={adaptedSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      objectFit={objectFit}
      position={position}
    />
  )
}
