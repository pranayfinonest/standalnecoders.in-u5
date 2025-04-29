import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Simplified middleware to reduce overhead
export function middleware(request: NextRequest) {
  return NextResponse.next()
}

// Limit middleware to only run on specific paths
export const config = {
  matcher: [
    // Only run middleware on admin and dashboard routes
    "/admin/:path*",
    "/dashboard/:path*",
  ],
}
