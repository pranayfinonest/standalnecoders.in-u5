"use client"

import { useCallback } from "react"

type EventCategory = "engagement" | "conversion" | "navigation" | "form" | "error" | "media" | "ecommerce"

type EventAction =
  | "click"
  | "view"
  | "submit"
  | "complete"
  | "start"
  | "error"
  | "play"
  | "pause"
  | "download"
  | "purchase"
  | "add_to_cart"

interface TrackEventProps {
  category: EventCategory
  action: EventAction
  label?: string
  value?: number
  nonInteraction?: boolean
  [key: string]: any
}

export function useAnalytics() {
  const trackEvent = useCallback(
    ({ category, action, label, value, nonInteraction = false, ...rest }: TrackEventProps) => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", action, {
          event_category: category,
          event_label: label,
          value: value,
          non_interaction: nonInteraction,
          ...rest,
        })
      }
    },
    [],
  )

  const trackPageView = useCallback((url: string, title: string) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("config", "G-MEASUREMENT_ID", {
        page_path: url,
        page_title: title,
      })
    }
  }, [])

  const trackConversion = useCallback((conversionId: string, label: string, value?: number) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "conversion", {
        send_to: `G-MEASUREMENT_ID/${conversionId}`,
        value: value,
        currency: "INR",
        transaction_id: label,
      })
    }
  }, [])

  return {
    trackEvent,
    trackPageView,
    trackConversion,
  }
}
