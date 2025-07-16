"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

export default function ServiceDetailClient({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const searchParams = useSearchParams()

  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab && ["overview", "features", "pricing", "faq"].includes(tab)) {
      setActiveTab(tab)
    }
  }, [searchParams, setActiveTab])

  return (
    <Suspense fallback={null}>
      <div>Service detail placeholder</div>
    </Suspense>
  )
}
