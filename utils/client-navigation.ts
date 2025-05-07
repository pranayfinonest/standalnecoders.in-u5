"use client"

/**
 * Safe client-side navigation utility to replace useSearchParams
 * This avoids the need for Suspense boundaries during build
 */
export function getClientSearchParams() {
  if (typeof window === "undefined") {
    return new URLSearchParams()
  }

  return new URLSearchParams(window.location.search)
}

export function getClientPathname() {
  if (typeof window === "undefined") {
    return "/"
  }

  return window.location.pathname
}

export function getClientHash() {
  if (typeof window === "undefined") {
    return ""
  }

  return window.location.hash.replace("#", "")
}
