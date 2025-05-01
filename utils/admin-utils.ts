import { createClientSupabaseClient } from "@/utils/supabase"

export interface AdminUser {
  id: string
  email: string
  name: string | null
  role: string
  created_at: string
  updated_at: string
}

/**
 * Verifies if a user is an admin by checking the admin_users table
 */
export async function verifyAdmin(userId: string | undefined): Promise<AdminUser | null> {
  if (!userId) return null

  const supabase = createClientSupabaseClient()
  const { data, error } = await supabase.from("admin_users").select("*").eq("id", userId).single()

  if (error || !data) {
    console.error("Error verifying admin:", error)
    return null
  }

  return data as AdminUser
}

/**
 * Gets website settings from Supabase
 */
export async function getWebsiteSettings(section = "all"): Promise<any> {
  const supabase = createClientSupabaseClient()

  let query = supabase.from("website_settings").select("*")
  if (section !== "all") {
    query = query.eq("section", section)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching website settings:", error)
    return null
  }

  // Transform data into a more usable format
  if (section === "all") {
    // Group by section
    return data.reduce((acc: any, item: any) => {
      acc[item.section] = item.settings
      return acc
    }, {})
  }

  // Return the settings for a specific section
  return data[0]?.settings || null
}

/**
 * Saves website settings to Supabase
 */
export async function saveWebsiteSettings(section: string, settings: any): Promise<boolean> {
  const supabase = createClientSupabaseClient()

  // Check if settings for this section already exist
  const { data: existingData } = await supabase.from("website_settings").select("id").eq("section", section).single()

  let result

  if (existingData) {
    // Update existing settings
    result = await supabase
      .from("website_settings")
      .update({
        settings,
        updated_at: new Date().toISOString(),
      })
      .eq("id", existingData.id)
  } else {
    // Insert new settings
    result = await supabase.from("website_settings").insert({
      section,
      settings,
    })
  }

  if (result.error) {
    console.error("Error saving website settings:", result.error)
    return false
  }

  return true
}
