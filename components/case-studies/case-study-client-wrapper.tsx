"use client"

import { useSearchParams } from "next/navigation"
import type { ReactNode } from "react"

interface CaseStudyClientWrapperProps {
  children: (searchParams: URLSearchParams) => ReactNode
}

export default function CaseStudyClientWrapper({ children }: CaseStudyClientWrapperProps) {
  const searchParams = useSearchParams()
  return <>{children(searchParams)}</>
}
