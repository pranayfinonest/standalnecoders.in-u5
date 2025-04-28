import type { Metadata } from "next"
import DashboardOverview from "@/components/dashboard/dashboard-overview"

export const metadata: Metadata = {
  title: "Dashboard Overview",
  description: "View your website projects and analytics at a glance.",
}

export default function DashboardPage() {
  return <DashboardOverview />
}
