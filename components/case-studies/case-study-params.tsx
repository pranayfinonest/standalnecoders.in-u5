"use client"

import { useSearchParams } from "next/navigation"

export default function CaseStudyParams() {
  // This component is only for handling search params
  // It will be wrapped in Suspense by its parent
  const _ = useSearchParams()
  return null
}
