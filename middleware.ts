import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { CYBERSECURITY_SUBPATHS } from "@/utils/route-utils"

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const path = url.pathname

  // Check if this is a cybersecurity subpath that should not be treated as a city
  if (path.startsWith("/services/cybersecurity/")) {
    const subpath = path.split("/")[3] // Get the part after /services/cybersecurity/

    // If there's no subpath (just /services/cybersecurity/), let it pass through
    if (!subpath) {
      return NextResponse.next()
    }

    if (CYBERSECURITY_SUBPATHS.includes(subpath)) {
      // This is a valid cybersecurity subpath, let it pass through to its specific route
      return NextResponse.next()
    }
  }

  // Clone the request headers
  const requestHeaders = new Headers(request.headers)

  // Add the full URL to the request headers
  // This allows server components to access search params
  requestHeaders.set("x-url", request.url)

  // Return the response with the modified headers
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  matcher: [
    // Add all paths that need access to search params
    "/profile/:path*",
    "/auth/:path*",
    "/dashboard/:path*",
    "/booking/:path*",
    "/services/:path*",
  ],
}
