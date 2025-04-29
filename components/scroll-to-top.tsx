"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export default function ScrollToTop() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // When the route changes, scroll to the top of the page
    window.scrollTo(0, 0)
  }, [pathname, searchParams])

  return null
}
