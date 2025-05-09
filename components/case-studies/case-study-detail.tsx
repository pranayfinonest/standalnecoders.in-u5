"use client"
import { Suspense } from "react"
import type { CaseStudy } from "@/types/case-study"
import CaseStudyDetailClient from "./case-study-detail-client"

interface CaseStudyDetailProps {
  caseStudy: CaseStudy
  relatedCaseStudies?: CaseStudy[]
}

export default function CaseStudyDetail({ caseStudy, relatedCaseStudies = [] }: CaseStudyDetailProps) {
  return (
    <Suspense fallback={<CaseStudyDetailSkeleton />}>
      <CaseStudyDetailClient caseStudy={caseStudy} relatedCaseStudies={relatedCaseStudies} />
    </Suspense>
  )
}

function CaseStudyDetailSkeleton() {
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
