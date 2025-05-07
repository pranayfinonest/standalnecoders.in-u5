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

// Add this function to the existing file
export function isTouchDevice() {
  if (typeof window === "undefined") return false
  return "ontouchstart" in window || navigator.maxTouchPoints > 0
}

// Add a hook for touch detection
export function useTouchDevice() {
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    setIsTouch(isTouchDevice())
  }, [])

  return isTouch
}

// Add a hook for detecting swipe gestures
export function useSwipe(options = {}) {
  const defaults = {
    threshold: 50,
    timeout: 500,
  }

  const config = { ...defaults, ...options }
  const [swipeDirection, setSwipeDirection] = useState(null)

  useEffect(() => {
    let startX = 0
    let startY = 0
    let startTime = 0

    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX
      startY = e.touches[0].clientY
      startTime = Date.now()
    }

    const handleTouchEnd = (e) => {
      const deltaX = e.changedTouches[0].clientX - startX
      const deltaY = e.changedTouches[0].clientY - startY
      const deltaTime = Date.now() - startTime

      if (deltaTime > config.timeout) return

      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > config.threshold) {
        setSwipeDirection(deltaX > 0 ? "right" : "left")
      } else if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > config.threshold) {
        setSwipeDirection(deltaY > 0 ? "down" : "up")
      }
    }

    document.addEventListener("touchstart", handleTouchStart, { passive: true })
    document.addEventListener("touchend", handleTouchEnd, { passive: true })

    return () => {
      document.removeEventListener("touchstart", handleTouchStart)
      document.removeEventListener("touchend", handleTouchEnd)
    }
  }, [config.threshold, config.timeout])

  return swipeDirection
}

// Add these viewport helper functions
export function getViewportHeight() {
  if (typeof window === "undefined") return 0
  return window.innerHeight
}

export function getViewportWidth() {
  if (typeof window === "undefined") return 0
  return window.innerWidth
}

// Add a function to handle mobile viewport issues with browser chrome
export function getMobileViewportHeight() {
  if (typeof window === "undefined") return 0
  return window.innerHeight * 0.01
}

// Set CSS variable for viewport height (to handle mobile browser chrome)
export function setViewportHeightVariable() {
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty("--vh", `${vh}px`)
    }

    setVh()
    window.addEventListener("resize", setVh)
    return () => window.removeEventListener("resize", setVh)
  }, [])
}
