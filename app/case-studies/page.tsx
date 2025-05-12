import type { Metadata } from "next"
import { Suspense } from "react"
import CaseStudiesClientContent from "@/components/case-studies/case-studies-client-content"
import CaseStudiesListSkeleton from "@/components/case-studies/case-studies-list-skeleton"

export const metadata: Metadata = {
  title: "Case Studies | Success Stories from StandaloneCoders",
  description:
    "Explore our detailed case studies showcasing successful digital transformation projects across various industries.",
  keywords:
    "case studies, client projects, success stories, digital transformation, web development, cybersecurity, Standalone Coders",
}

// Disable static generation for this page
export const dynamic = "force-dynamic"

export default function CaseStudiesPage() {
  return (
    <div className="py-12 sm:py-16 md:py-20">
      <Suspense fallback={<CaseStudiesListSkeleton />}>
        <CaseStudiesClientContent />
      </Suspense>
    </div>
  )
}
