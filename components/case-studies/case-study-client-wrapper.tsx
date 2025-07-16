"use client"
import { Suspense } from "react"
import type React from "react"

export default function CaseStudyWrapper({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={null}>{children}</Suspense>
}
