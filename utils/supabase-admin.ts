import { createClient } from "@supabase/supabase-js"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import type { Database } from "@/types/supabase"

// Create a Supabase client for admin operations
const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || "",
)

// Check if a user is an admin
export async function isUserAdmin(userId: string) {
  try {
    const { data, error } = await supabaseAdmin.from("admin_users").select("*").eq("id", userId).single()

    if (error) {
      console.error("Error checking admin status:", error)
      return false
    }

    return !!data
  } catch (error) {
    console.error("Error checking admin status:", error)
    return false
  }
}

// Server-side function to check if current user is admin
export async function checkAdminStatus() {
  try {
    const supabase = createServerComponentClient({ cookies })

    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return false
    }

    const { data, error } = await supabase.from("admin_users").select("*").eq("id", session.user.id).single()

    if (error || !data) {
      return false
    }

    return true
  } catch (error) {
    console.error("Error checking admin status:", error)
    return false
  }
}

// Verify admin access - this is the missing export
export async function verifyAdminAccess(userId: string) {
  try {
    // First check if the user exists
    if (!userId) {
      return { success: false, message: "User ID is required" }
    }

    // Check if user is in admin_users table
    const { data, error } = await supabaseAdmin.from("admin_users").select("*").eq("id", userId).single()

    if (error) {
      return { success: false, message: "Error verifying admin access", error }
    }

    if (!data) {
      return { success: false, message: "User is not an admin" }
    }

    return { success: true, admin: data }
  } catch (error) {
    console.error("Error verifying admin access:", error)
    return { success: false, message: "Server error during admin verification" }
  }
}

// Get website settings
export async function getWebsiteSettings(section: string) {
  try {
    const { data, error } = await supabaseAdmin
      .from("website_settings")
      .select("settings")
      .eq("section", section)
      .single()

    if (error && error.code !== "PGRST116") {
      // PGRST116 is "no rows returned" error
      console.error("Error fetching website settings:", error)
      return null
    }

    return data?.settings || null
  } catch (error) {
    console.error("Error fetching website settings:", error)
    return null
  }
}

// Update website settings
export async function updateWebsiteSettings(section: string, settings: any) {
  try {
    // Check if settings for this section already exist
    const { data: existingData } = await supabaseAdmin
      .from("website_settings")
      .select("id")
      .eq("section", section)
      .single()

    if (existingData) {
      // Update existing settings
      const { data, error } = await supabaseAdmin
        .from("website_settings")
        .update({ settings, updated_at: new Date() })
        .eq("id", existingData.id)
        .select()

      if (error) {
        console.error("Error updating website settings:", error)
        return null
      }

      return data[0]
    } else {
      // Insert new settings
      const { data, error } = await supabaseAdmin.from("website_settings").insert([{ section, settings }]).select()

      if (error) {
        console.error("Error creating website settings:", error)
        return null
      }

      return data[0]
    }
  } catch (error) {
    console.error("Error updating website settings:", error)
    return null
  }
}
