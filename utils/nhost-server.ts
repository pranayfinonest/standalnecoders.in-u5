import { NhostClient } from "@nhost/nhost-js"
import { cookies } from "next/headers"

export function createServerNhostClient() {
  const nhostClient = new NhostClient({
    backendUrl: process.env.NEXT_PUBLIC_NHOST_BACKEND_URL || "",
  })

  // Get the refresh token from cookies
  const cookieStore = cookies()
  const refreshToken = cookieStore.get("nhostRefreshToken")?.value

  if (refreshToken) {
    // Set the refresh token in the client
    nhostClient.auth.setSession({
      refreshToken,
    })
  }

  return nhostClient
}

export function getServerNhostClient() {
  return createServerNhostClient()
}
