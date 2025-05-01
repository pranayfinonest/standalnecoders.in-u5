"use server"

import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"

export async function setupAdminUser() {
  const supabase = createServerActionClient({ cookies })

  try {
    // Check if admin user already exists
    const { data: existingAdmins, error: checkError } = await supabase.from("admin_users").select("id").limit(1)

    if (checkError) {
      console.error("Error checking existing admins:", checkError)
      return { success: false, error: "Failed to check existing admins" }
    }

    // If admin already exists, don't create a new one
    if (existingAdmins && existingAdmins.length > 0) {
      return { success: false, error: "Admin user already exists" }
    }

    // Create the admin user with the specified email
    const adminEmail = "standalonecoders@gmail.com"
    const adminPassword = "yogii@637811" // This should be securely handled in production

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true,
    })

    if (authError) {
      console.error("Error creating admin user:", authError)
      return { success: false, error: "Failed to create admin user" }
    }

    // Add user to admin_users table
    const { error: insertError } = await supabase.from("admin_users").insert([
      {
        id: authData.user.id,
        email: adminEmail,
        name: "Admin",
        role: "admin",
      },
    ])

    if (insertError) {
      console.error("Error adding user to admin_users:", insertError)
      return { success: false, error: "Failed to add user to admin_users table" }
    }

    revalidatePath("/admin")
    return { success: true }
  } catch (error) {
    console.error("Error setting up admin:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}
