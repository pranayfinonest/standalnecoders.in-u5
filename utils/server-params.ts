import { headers } from "next/headers"
import type { ReadonlyURLSearchParams } from "next/navigation"

/**
 * Get search params on the server side
 * This is a server-only utility
 */
export function getServerSearchParams(): ReadonlyURLSearchParams {
  const headersList = headers()
  const url = headersList.get("x-url") || ""

  try {
    return new URL(url).searchParams
  } catch (e) {
    return new URLSearchParams()
  }
}

/**
 * Get a specific search param on the server side
 * This is a server-only utility
 */
export function getServerSearchParam(name: string): string | null {
  const params = getServerSearchParams()
  return params.get(name)
}

/**
 * Get all search params as an object on the server side
 * This is a server-only utility
 */
export function getAllServerSearchParams(): Record<string, string> {
  const params = getServerSearchParams()
  const result: Record<string, string> = {}

  params.forEach((value, key) => {
    result[key] = value
  })

  return result
}

/**
 * Get the current path on the server side
 * This is a server-only utility
 */
export function getServerPath(): string {
  const headersList = headers()
  const url = headersList.get("x-url") || ""

  try {
    return new URL(url).pathname
  } catch (e) {
    return "/"
  }
}
