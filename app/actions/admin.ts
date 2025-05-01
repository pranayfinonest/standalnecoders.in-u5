"use server"

import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function requireAdmin() {
  const supabase = createServerActionClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/admin/login")
  }

  const { data: adminUser, error } = await supabase.from("admin_users").select("*").eq("id", session.user.id).single()

  if (error || !adminUser) {
    redirect("/")
  }

  return adminUser
}
