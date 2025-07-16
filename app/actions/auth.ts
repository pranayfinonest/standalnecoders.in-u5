"use server"

import { cookies } from "next/headers"
import { createServerSupabaseClient } from "@/utils/supabase-server"
import { createServerNhostClient } from "@/utils/nhost-server"

export async function getServerSession() {
  const supabase = createServerSupabaseClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return session
}

export async function getServerUser() {
  try {
    const nhost = createServerNhostClient()
    const { user } = await nhost.auth.getUser()
    return user
  } catch (error) {
    console.error("Error getting server user:", error)
    return null
  }
}

export async function isAuthenticated() {
  const user = await getServerUser()
  return !!user
}

export async function requireAuth() {
  const isAuthed = await isAuthenticated()

  if (!isAuthed) {
    // Store the current URL to redirect back after login
    const currentUrl = cookies().get("currentUrl")?.value || "/"
    cookies().set("redirectUrl", currentUrl, { path: "/" })

    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
