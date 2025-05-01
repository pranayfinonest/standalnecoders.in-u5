import { getAdminUser } from "@/utils/supabase-admin"
import { redirect } from "next/navigation"
import AdminDashboard from "@/components/admin/admin-dashboard"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Dashboard | StandaloneCoders",
  description: "Manage your website, users, orders, and more",
}

export default async function AdminDashboardPage() {
  // Check if user is admin
  const admin = await getAdminUser()

  if (!admin) {
    redirect("/admin/login")
  }

  return <AdminDashboard adminName={admin.name} />
}
