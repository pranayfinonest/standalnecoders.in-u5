import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Add your middleware logic here

  // Example: Redirect legacy URLs
  if (request.nextUrl.pathname.startsWith("/old-path")) {
    return NextResponse.redirect(new URL("/new-path", request.url))
  }

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

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
}
