"use client"

import { useEffect, useState } from "react"

// Custom hook for responsive design
export function useResponsive() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  })

  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })

      // Update device type
      setIsMobile(window.innerWidth < 768)
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024)
      setIsDesktop(window.innerWidth >= 1024)
    }

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Call handler right away so state gets updated with initial window size
    handleResize()

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize)
  }, []) // Empty array ensures that effect is only run on mount and unmount

  return {
    windowSize,
    isMobile,
    isTablet,
    isDesktop,
    breakpoints: {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      "2xl": 1536,
    },
  }
}

// Helper function to get responsive image sizes
export function getResponsiveImageSizes(options = {}) {
  const defaults = {
    sm: "100vw",
    md: "50vw",
    lg: "33vw",
    xl: "25vw",
  }

  const sizes = { ...defaults, ...options }

  return `(max-width: 640px) ${sizes.sm}, 
          (max-width: 768px) ${sizes.md}, 
          (max-width: 1024px) ${sizes.lg},
          ${sizes.xl}`
}

// Helper function for responsive font sizes
export function getResponsiveFontSize(basePx: number, scaleFactor = 0.5) {
  const minSize = Math.max(16, basePx - 4)
  const maxSize = basePx + 4

  return {
    fontSize: `clamp(${minSize}px, ${basePx - scaleFactor * basePx}px + ${scaleFactor * 5}vw, ${maxSize}px)`,
  }
}
