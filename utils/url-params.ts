/**
 * Utility functions for handling URL parameters without hooks
 * These functions are safe to use in both client and server components
 */

/**
 * Get all URL parameters as an object
 * Safe to use in both client and server components
 */
export function getAllUrlParams(): Record<string, string> {
  if (typeof window === "undefined") {
    return {}
  }

  const params = new URLSearchParams(window.location.search)
  const result: Record<string, string> = {}

  params.forEach((value, key) => {
    result[key] = value
  })

  return result
}

/**
 * Get a specific URL parameter by name
 * Safe to use in both client and server components
 */
export function getUrlParam(name: string): string | null {
  if (typeof window === "undefined") {
    return null
  }

  const params = new URLSearchParams(window.location.search)
  return params.get(name)
}

/**
 * Set URL parameters without navigation
 * Only works on the client side
 */
export function setUrlParams(params: Record<string, string>): void {
  if (typeof window === "undefined") {
    return
  }

  const url = new URL(window.location.href)

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      url.searchParams.set(key, value)
    } else {
      url.searchParams.delete(key)
    }
  })

  window.history.replaceState({}, "", url.toString())
}

/**
 * Navigate to a URL with parameters
 * Only works on the client side
 */
export function navigateWithParams(baseUrl: string, params: Record<string, string>): void {
  if (typeof window === "undefined") {
    return
  }

  const url = new URL(baseUrl, window.location.origin)

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      url.searchParams.set(key, value)
    }
  })

  window.location.href = url.toString()
}
