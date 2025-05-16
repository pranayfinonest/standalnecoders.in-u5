import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email, password, metadata } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Sign up with Nhost
    const response = await fetch(`${process.env.NEXT_PUBLIC_NHOST_BACKEND_URL}/v1/auth/signup/email-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": process.env.NHOST_ADMIN_SECRET || "",
      },
      body: JSON.stringify({
        email,
        password,
        options: {
          metadata: metadata || {},
        },
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json({ error: data.message || "Registration failed" }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Sign up error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
