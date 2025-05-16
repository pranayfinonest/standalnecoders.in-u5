import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET() {
  try {
    const cookieStore = cookies()
    const authToken = cookieStore.get("nhostRefreshToken")?.value

    if (!authToken) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    // Fetch user data from Nhost using the token
    const response = await fetch(`${process.env.NEXT_PUBLIC_NHOST_BACKEND_URL}/v1/auth/user`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch user data" }, { status: 401 })
    }

    const userData = await response.json()
    return NextResponse.json(userData)
  } catch (error) {
    console.error("Error fetching user data:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
