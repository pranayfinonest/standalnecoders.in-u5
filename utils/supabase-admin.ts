import { createServerComponentClient, createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { cache } from "react"

// Cached function to check if a user is an admin
export const getAdminUser = cache(async () => {
  try {
    const cookieStore = cookies()
    const supabase = createServerComponentClient({ cookies: () => cookieStore })

    // Get the current session
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return null
    }

    // Check if the user is in the admin_users table
    const { data: adminUser, error } = await supabase.from("admin_users").select("*").eq("id", session.user.id).single()

    if (error || !adminUser) {
      return null
    }

    return adminUser
  } catch (error) {
    console.error("Error checking admin status:", error)
    return null
  }
})

// Server action to require admin authentication
export async function requireAdmin() {
  try {
    const admin = await getAdminUser()

    if (!admin) {
      throw new Error("Unauthorized: Admin access required")
    }

    return admin
  } catch (error) {
    console.error("Error requiring admin:", error)
    throw new Error("Unauthorized: Admin access required")
  }
}

// Server action to update admin password
export async function updateAdminPassword(currentPassword: string, newPassword: string) {
  try {
    const cookieStore = cookies()
    const supabase = createServerActionClient({ cookies: () => cookieStore })

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error("Error updating admin password:", error)
    return { success: false, error: "Failed to update password" }
  }
}
