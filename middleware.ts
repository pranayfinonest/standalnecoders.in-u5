import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
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
  ],
}
