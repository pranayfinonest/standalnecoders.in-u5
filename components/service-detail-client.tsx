"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"

export default function ServiceDetailClient({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const searchParams = useSearchParams()

  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab && ["overview", "features", "pricing", "faq"].includes(tab)) {
      setActiveTab(tab)
    }
  }, [searchParams, setActiveTab])

  return null
}
