import { Suspense } from "react"
import { redirect } from "next/navigation"
import AdminDashboard from "@/components/admin/admin-dashboard"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export const dynamic = "force-dynamic"

export default async function AdminDashboardPage() {
  // Check if user is authenticated and is an admin
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/admin/login")
  }

  // Check if user is in admin_users table
  const { data: adminData, error } = await supabase.from("admin_users").select("*").eq("id", session.user.id).single()

  if (error || !adminData) {
    redirect("/admin/login?error=unauthorized")
  }

  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-12 flex justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
            <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      }
    >
      <AdminDashboard />
    </Suspense>
  )
}
