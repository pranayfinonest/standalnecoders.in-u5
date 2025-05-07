import type { Metadata } from "next"
import { notFound } from "next/navigation"
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
      <CaseStudyDetail caseStudy={caseStudy} relatedCaseStudies={relatedCaseStudies} />
    </div>
  )
}
