import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const supabase = createMiddlewareClient({ req: request, res: response })

  // Check auth session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Handle admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Allow access to login and setup pages
    if (request.nextUrl.pathname === "/admin/login" || request.nextUrl.pathname === "/admin/setup") {
      return response
    }

    // No session, redirect to login
    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }

    try {
      // Check if user is admin
      const { data: adminUser, error } = await supabase
        .from("admin_users")
        .select("id")
        .eq("id", session.user.id)
        .single()

      // Not an admin, redirect to home
      if (error || !adminUser) {
        return NextResponse.redirect(new URL("/", request.url))
      }
    } catch (error) {
      console.error("Error checking admin status:", error)
      // If there's an error checking admin status, redirect to login
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  return response
}

// Only run middleware on admin routes
export const config = {
  matcher: ["/admin/:path*"],
}
