import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl
  const response = NextResponse.next()
  const supabase = createMiddlewareClient({ req: request, res: response })

  // Handle authentication code in root URL
  if (pathname === "/" && searchParams.has("code")) {
    const code = searchParams.get("code")
    const type = searchParams.get("type") || "signup"
    const next = searchParams.get("next") || "/"

    // Create the callback URL
    const callbackUrl = new URL("/auth/callback", request.url)
    callbackUrl.searchParams.set("code", code!)
    if (type) callbackUrl.searchParams.set("type", type)
    if (next) callbackUrl.searchParams.set("next", next)

    return NextResponse.redirect(callbackUrl)
  }

  // Special case for admin setup page - always allow access
  if (pathname.includes("/admin/setup")) {
    return response
  }

  // Protect admin routes (except login)
  if (pathname.startsWith("/admin") && !pathname.includes("/admin/login")) {
    // Check if user is authenticated
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      // Not authenticated, redirect to login
      const redirectUrl = new URL("/admin/login", request.url)
      return NextResponse.redirect(redirectUrl)
    }

    // Check if user is an admin
    const { data: adminData, error: adminError } = await supabase
      .from("admin_users")
      .select("*")
      .eq("id", session.user.id)
      .single()

    if (adminError || !adminData) {
      // Not an admin, redirect to login
      await supabase.auth.signOut()
      const redirectUrl = new URL("/admin/login", request.url)
      redirectUrl.searchParams.set("error", "unauthorized")
      return NextResponse.redirect(redirectUrl)
    }
  }

  return response
}

export const config = {
  matcher: ["/", "/admin/:path*"],
}
