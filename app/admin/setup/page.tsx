import SimpleAdminSetup from "@/components/admin/simple-admin-setup"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Setup | StandaloneCoders",
  description: "Set up the admin account",
}

export default async function AdminSetupPage() {
  // Check if admin already exists
  const supabase = createServerComponentClient({ cookies })

  const { data: existingAdmins, error } = await supabase.from("admin_users").select("id").limit(1)

  // If there's already an admin, redirect to login
  if (!error && existingAdmins && existingAdmins.length > 0) {
    redirect("/admin/login")
  }

  return <SimpleAdminSetup />
}
