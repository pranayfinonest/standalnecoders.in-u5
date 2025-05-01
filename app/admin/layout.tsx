import AdminRouteGuard from "@/components/auth/admin-route-guard"
import type React from "react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AdminRouteGuard>{children}</AdminRouteGuard>
}
