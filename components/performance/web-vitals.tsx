"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

type MetricName = "FCP" | "LCP" | "CLS" | "FID" | "TTFB" | "INP"

interface WebVitalsMetric {
  id: string
  name: MetricName
  value: number
  rating: "good" | "needs-improvement" | "poor"
}

const reportWebVitals = (metric: WebVitalsMetric) => {
  // Log to console in development
  if (process.env.NODE_ENV === "development") {
    console.log(metric)
  }

  // Send to analytics in production
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "web-vitals", {
      event_category: "Web Vitals",
      event_label: metric.id,
      value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
      metric_id: metric.id,
      metric_name: metric.name,
      metric_value: metric.value,
      metric_rating: metric.rating,
      non_interaction: true,
    })
  }
}

export function WebVitals() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const handleWebVitals = async () => {
      const { onFCP, onLCP, onCLS, onFID, onTTFB, onINP } = await import("web-vitals")

      onFCP((metric) => reportWebVitals({ ...metric, name: "FCP" }))
      onLCP((metric) => reportWebVitals({ ...metric, name: "LCP" }))
      onCLS((metric) => reportWebVitals({ ...metric, name: "CLS" }))
      onFID((metric) => reportWebVitals({ ...metric, name: "FID" }))
      onTTFB((metric) => reportWebVitals({ ...metric, name: "TTFB" }))
      onINP((metric) => reportWebVitals({ ...metric, name: "INP" }))
    }

    handleWebVitals()
  }, [pathname, searchParams])

  return null
}
