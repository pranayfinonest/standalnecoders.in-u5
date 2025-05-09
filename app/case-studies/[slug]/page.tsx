import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import CaseStudyDetail from "@/components/case-studies/case-study-detail"
import { caseStudiesData } from "@/data/case-studies-data"

interface CaseStudyPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const caseStudy = caseStudiesData.find((cs) => cs.slug === params.slug)

  if (!caseStudy) {
    return {
      title: "Case Study Not Found | StandaloneCoders",
      description: "The requested case study could not be found.",
    }
  }

  return {
    title: `${caseStudy.title} | StandaloneCoders Case Study`,
    description: caseStudy.summary,
    keywords: `case study, ${caseStudy.title}, ${caseStudy.industry}, ${caseStudy.tags?.join(", ")}, StandaloneCoders`,
  }
}

export async function generateStaticParams() {
  return caseStudiesData.map((caseStudy) => ({
    slug: caseStudy.slug,
  }))
}

export default function CaseStudyPage({ params }: CaseStudyPageProps) {
  const caseStudy = caseStudiesData.find((cs) => cs.slug === params.slug)

  if (!caseStudy) {
    notFound()
  }

  // Get related case studies (same industry or sharing tags)
  const relatedCaseStudies = caseStudiesData
    .filter((cs) => {
      // Don't include the current case study
      if (cs.slug === params.slug) return false

      // Include if same industry
      if (cs.industry === caseStudy.industry) return true

      // Include if sharing tags
      if (caseStudy.tags && cs.tags) {
        return cs.tags.some((tag) => caseStudy.tags?.includes(tag))
      }

      return false
    })
    .slice(0, 3) // Limit to 3 related case studies

  return (
    <div className="py-12 sm:py-16 md:py-20">
      <Suspense fallback={<CaseStudyLoadingSkeleton />}>
        <CaseStudyDetail caseStudy={caseStudy} relatedCaseStudies={relatedCaseStudies} />
      </Suspense>
    </div>
  )
}

// Loading skeleton component
function CaseStudyLoadingSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="animate-pulse">
        <div className="h-10 bg-gray-200 rounded w-3/4 mb-6"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2 mb-8"></div>
        <div className="h-96 bg-gray-200 rounded mb-8"></div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    </div>
  )
}
