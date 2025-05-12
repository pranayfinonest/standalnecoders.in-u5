"use client"

import { Suspense } from "react"
import CaseStudyList from "@/components/case-studies/case-study-list"
import CaseStudyParams from "@/components/case-studies/case-study-params"

export default function CaseStudiesClientPage() {
  return (
    <div className="py-12 sm:py-16 md:py-20">
      {/* This component uses useSearchParams() and is properly wrapped in Suspense */}
      <Suspense fallback={null}>
        <CaseStudyParams />
      </Suspense>

      <CaseStudyList />
    </div>
  )
}
