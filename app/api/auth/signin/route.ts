import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Sign in with Nhost
    const response = await fetch(`${process.env.NEXT_PUBLIC_NHOST_BACKEND_URL}/v1/auth/signin/email-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": process.env.NHOST_ADMIN_SECRET || "",
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json({ error: data.message || "Authentication failed" }, { status: 401 })
    }

    // Set cookies for authentication
    const cookieStore = cookies()

    // Set the refresh token as a cookie
    cookieStore.set("nhostRefreshToken", data.session.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
      sameSite: "strict",
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Sign in error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
