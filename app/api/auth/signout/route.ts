import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST() {
  try {
    const cookieStore = cookies()
    const refreshToken = cookieStore.get("nhostRefreshToken")?.value

    if (refreshToken) {
      // Sign out from Nhost
      await fetch(`${process.env.NEXT_PUBLIC_NHOST_BACKEND_URL}/v1/auth/signout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-hasura-admin-secret": process.env.NHOST_ADMIN_SECRET || "",
        },
        body: JSON.stringify({ refreshToken }),
      })

      // Clear the cookie
      cookieStore.delete("nhostRefreshToken")
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Sign out error:", error)
    return NextResponse.json({ success: true }) // Return success even on error to ensure client-side logout
  }
}
