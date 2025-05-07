import { Suspense } from "react"
import SEODashboardContentClient from "@/components/seo/seo-dashboard-content-client"

export const dynamic = "force-static"

export default function SEODashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<div>Loading SEO dashboard...</div>}>
        <SEODashboardContentClient />
      </Suspense>
    </div>
  )
}
