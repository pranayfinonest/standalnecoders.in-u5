"use client"

/**
 * A utility to safely use hooks that would normally cause build errors
 * This file should only be imported in client components
 */

import { useState, useEffect } from "react"

/**
 * Safe alternative to useSearchParams that works during build
 * @returns An object with URL search parameters
 */
export function useSafeSearchParams() {
  const [searchParams, setSearchParams] = useState<Record<string, string>>({})

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      const paramsObject: Record<string, string> = {}

      params.forEach((value, key) => {
        paramsObject[key] = value
      })

      setSearchParams(paramsObject)
    }
  }, [])

  return searchParams
}

/**
 * Safe alternative to usePathname that works during build
 * @returns The current pathname
 */
export function useSafePathname() {
  const [pathname, setPathname] = useState<string>("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPathname(window.location.pathname)
    }
  }, [])

  return pathname
}

/**
 * Safe way to get URL parameters without hooks
 * @returns An object with URL search parameters
 */
export function getSafeSearchParams(): Record<string, string> {
  if (typeof window === "undefined") {
    return {}
  }

  const params = new URLSearchParams(window.location.search)
  const paramsObject: Record<string, string> = {}

  params.forEach((value, key) => {
    paramsObject[key] = value
  })

  return paramsObject
}
