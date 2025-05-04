import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl

  // Handle authentication code in root URL
  if (pathname === "/" && searchParams.has("code")) {
    const code = searchParams.get("code")
    const type = searchParams.get("type") || "signup"
    const next = searchParams.get("next") || "/"

    console.log("Redirecting auth code from root to callback")

    // Create the callback URL
    const callbackUrl = new URL("/auth/callback", request.url)
    callbackUrl.searchParams.set("code", code!)
    if (type) callbackUrl.searchParams.set("type", type)
    if (next) callbackUrl.searchParams.set("next", next)

    return NextResponse.redirect(callbackUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/"],
}
