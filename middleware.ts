import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Check if the request is for a non-existent page
  const pathname = request.nextUrl.pathname

  // List of known routes to exclude from 404 handling
  const knownRoutes = [
    "/",
    "/about",
    "/contact",
    "/services",
    "/booking",
    "/dashboard",
    "/admin",
    "/auth",
    "/api",
    "/_next",
    "/favicon.ico",
    "/robots.txt",
    "/sitemap.xml",
    "/404",
  ]

  // Check if the pathname starts with any known route
  const isKnownRoute = knownRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`))

  // If it's not a known route, redirect to the static 404 page
  if (!isKnownRoute) {
    return NextResponse.rewrite(new URL("/404", request.url))
  }

  return NextResponse.next()
}

// Only run the middleware on specific paths
export const config = {
  matcher: [
    // Exclude static files, api routes, and _next
    "/((?!_next/static|_next/image|favicon.ico|images|api).*)",
  ],
}
