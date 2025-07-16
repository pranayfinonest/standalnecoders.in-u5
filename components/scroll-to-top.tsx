"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { Suspense } from "react"

export default function ScrollToTop() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // When the route changes, scroll to the top of the page
    window.scrollTo(0, 0)
  }, [pathname, searchParams])

  return (
    <Suspense fallback={null}>
      <div style={{ display: "none" }} />
    </Suspense>
  )
}
