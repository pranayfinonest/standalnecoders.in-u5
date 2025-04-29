import type { ReactNode } from "react"
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <DashboardSidebar />
      <div className="flex-1 p-4 md:p-8">{children}</div>
    </div>
  )
}
