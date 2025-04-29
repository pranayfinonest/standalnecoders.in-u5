"use client"

import { useState, useEffect } from "react"

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)

    // Update the state with the current value
    const updateMatches = () => {
      setMatches(media.matches)
    }

    // Set the initial value
    updateMatches()

    // Add the listener
    media.addEventListener("change", updateMatches)

    // Remove the listener on cleanup
    return () => {
      media.removeEventListener("change", updateMatches)
    }
  }, [query])

  return matches
}

// Predefined media queries
export function useIsMobile() {
  return useMediaQuery("(max-width: 767px)")
}

export function useIsTablet() {
  return useMediaQuery("(min-width: 768px) and (max-width: 1023px)")
}

export function useIsDesktop() {
  return useMediaQuery("(min-width: 1024px)")
}

export function useIsLargeDesktop() {
  return useMediaQuery("(min-width: 1280px)")
}

export function usePrefersDarkMode() {
  return useMediaQuery("(prefers-color-scheme: dark)")
}

export function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)")
}
