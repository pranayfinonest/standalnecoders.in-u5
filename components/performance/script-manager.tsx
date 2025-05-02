"use client"

import { useEffect, useState } from "react"
import Script from "next/script"

// Define script categories
type ScriptCategory = "essential" | "functional" | "analytics" | "marketing" | "social"

interface ManagedScript {
  id: string
  src: string
  category: ScriptCategory
  async?: boolean
  defer?: boolean
  strategy?: "beforeInteractive" | "afterInteractive" | "lazyOnload"
  onLoad?: () => void
}

// Define scripts to manage
const managedScripts: ManagedScript[] = [
  {
    id: "google-analytics",
    src: "https://www.googletagmanager.com/gtag/js?id=G-MEASUREMENT_ID",
    category: "analytics",
    strategy: "lazyOnload",
    async: true,
  },
  {
    id: "facebook-pixel",
    src: "https://connect.facebook.net/en_US/fbevents.js",
    category: "marketing",
    strategy: "lazyOnload",
  },
  // Add other third-party scripts here
]

export function ScriptManager() {
  const [enabledCategories, setEnabledCategories] = useState<ScriptCategory[]>(["essential"])
  const [userInteracted, setUserInteracted] = useState(false)

  useEffect(() => {
    // Check if user has interacted with the page
    const handleInteraction = () => {
      setUserInteracted(true)

      // Enable functional scripts after interaction
      setEnabledCategories((prev) => (prev.includes("functional") ? prev : [...prev, "functional"]))

      // Remove event listeners after first interaction
      window.removeEventListener("scroll", handleInteraction)
      window.removeEventListener("click", handleInteraction)
      window.removeEventListener("keydown", handleInteraction)
    }

    // Add event listeners for user interaction
    window.addEventListener("scroll", handleInteraction, { passive: true })
    window.addEventListener("click", handleInteraction, { passive: true })
    window.addEventListener("keydown", handleInteraction, { passive: true })

    // Check for saved preferences
    const savedPreferences = localStorage.getItem("scriptPreferences")
    if (savedPreferences) {
      try {
        const parsed = JSON.parse(savedPreferences)
        if (Array.isArray(parsed)) {
          setEnabledCategories(parsed as ScriptCategory[])
        }
      } catch (e) {
        console.error("Error parsing script preferences:", e)
      }
    }

    // Load analytics after a delay if not explicitly disabled
    const analyticsTimer = setTimeout(() => {
      setEnabledCategories((prev) => (prev.includes("analytics") ? prev : [...prev, "analytics"]))
    }, 5000) // 5 second delay

    return () => {
      window.removeEventListener("scroll", handleInteraction)
      window.removeEventListener("click", handleInteraction)
      window.removeEventListener("keydown", handleInteraction)
      clearTimeout(analyticsTimer)
    }
  }, [])

  // Save preferences when they change
  useEffect(() => {
    if (userInteracted) {
      localStorage.setItem("scriptPreferences", JSON.stringify(enabledCategories))
    }
  }, [enabledCategories, userInteracted])

  return (
    <>
      {managedScripts
        .filter((script) => enabledCategories.includes(script.category))
        .map((script) => (
          <Script
            key={script.id}
            id={script.id}
            src={script.src}
            strategy={script.strategy || "afterInteractive"}
            async={script.async}
            defer={script.defer}
            onLoad={script.onLoad}
          />
        ))}
    </>
  )
}
