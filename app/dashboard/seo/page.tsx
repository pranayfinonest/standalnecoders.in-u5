import { Suspense } from "react"
import SEODashboardContent from "@/components/seo/seo-dashboard-content"

export default function SEODashboardPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold">SEO & Indexing Dashboard</h1>

      <Suspense fallback={<p>Loading dashboard content...</p>}>
        <SEODashboardContent />
      </Suspense>
    </div>
  )
}
