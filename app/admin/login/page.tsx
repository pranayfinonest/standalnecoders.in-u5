import { Suspense } from "react"
import AdminLogin from "@/components/admin/admin-login"

export const dynamic = "force-static"

export default function AdminLoginPage() {
  return (
    <div className="container mx-auto py-10">
      <Suspense
        fallback={<div className="w-full max-w-md mx-auto p-6 border rounded-lg">Loading admin login form...</div>}
      >
        <AdminLogin />
      </Suspense>
    </div>
  )
}
