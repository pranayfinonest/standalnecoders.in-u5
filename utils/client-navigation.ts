"use client"
import { Suspense } from "react"

/**
 * A utility to safely get URL parameters on the client side without using useSearchParams
 * This is safe to use during build time as it only executes on the client
 */
export function getClientUrlParams() {
  if (typeof window === "undefined") {
    return new URLSearchParams()
  }

  return new URLSearchParams(window.location.search)
}

/**
 * Get a specific parameter from the URL
 */
export function getClientUrlParam(param: string): string | null {
  if (typeof window === "undefined") {
    return null
  }

  return new URLSearchParams(window.location.search).get(param)
}

/**
 * Safely navigate to a URL with parameters
 */
export function navigateWithParams(baseUrl: string, params: Record<string, string>) {
  if (typeof window === "undefined") {
    return
  }

  const url = new URL(baseUrl, window.location.origin)

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      url.searchParams.set(key, value)
    }
  })

  window.history.pushState({}, "", url.toString())
}

export default function ClientNavigation() {
  return (
    <Suspense fallback={null}>
      <></>
    </Suspense>
  )
}
