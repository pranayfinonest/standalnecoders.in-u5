import { createServerSupabaseClient } from "@/utils/supabase"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const url = new URL(request.url)
  const { searchParams } = url
  const code = searchParams.get("code")
  const type = searchParams.get("type") || "signup"
  const next = searchParams.get("next") || "/"

  console.log("Auth callback received:", { code: code?.substring(0, 5) + "...", type, next })

  if (code) {
    const supabase = createServerSupabaseClient()
    if (!supabase) {
      console.error("Failed to initialize Supabase client in callback route")
      return NextResponse.redirect(new URL(`/auth/login?error=server_error`, request.url))
    }

    try {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)

      if (error) {
        console.error("Error exchanging code for session:", error)
        return NextResponse.redirect(new URL(`/auth/login?error=${encodeURIComponent(error.message)}`, request.url))
      }

      console.log("Code exchange successful, redirecting to:", next)
    } catch (error) {
      console.error("Exception during code exchange:", error)
      return NextResponse.redirect(new URL(`/auth/login?error=auth_error`, request.url))
    }
  } else {
    console.log("No code provided in callback")
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(new URL(next, url.origin))
}
