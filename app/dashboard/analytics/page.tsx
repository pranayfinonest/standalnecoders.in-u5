import type { Metadata } from "next"
import AnalyticsDashboard from "@/components/dashboard/analytics-dashboard"

export const metadata: Metadata = {
  title: "Website Analytics | Dashboard",
  description: "View detailed analytics for your website and marketing campaigns.",
}

export default function AnalyticsPage() {
  return <AnalyticsDashboard />
}
