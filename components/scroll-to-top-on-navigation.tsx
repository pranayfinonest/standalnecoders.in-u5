"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

/**
 * Component that scrolls to the top of the page on route changes
 */
export default function ScrollToTopOnNavigation() {
  const pathname = usePathname()

  useEffect(() => {
    // Scroll to the top of the page when the route changes
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
