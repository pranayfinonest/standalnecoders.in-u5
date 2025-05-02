import AdminRouteGuard from "@/components/auth/admin-route-guard"
import type React from "react"
import AdminAuth from "@/components/auth/admin-auth"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminAuth>
      <AdminRouteGuard>{children}</AdminRouteGuard>
    </AdminAuth>
  )
}
