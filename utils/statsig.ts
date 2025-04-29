"use client"
import { useState, useEffect } from "react"

// Custom hook to check if a feature gate is enabled
export function useFeatureFlag(gateName: string, defaultValue = false) {
  const [value, setValue] = useState(defaultValue)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkGate = async () => {
      try {
        // Get the user ID from localStorage
        const userId = localStorage.getItem("visitor_id")
        if (!userId) return

        // Call the server API to check the gate
        const response = await fetch("/api/statsig", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, gateName }),
        })

        if (response.ok) {
          const data = await response.json()
          setValue(data.value ?? defaultValue)
        }
      } catch (error) {
        console.error("Error checking feature flag:", error)
      } finally {
        setLoading(false)
      }
    }

    checkGate()
  }, [gateName, defaultValue])

  return { value, loading }
}

// Custom hook to get dynamic config values
export function useDynamicConfig(configName: string) {
  const [config, setConfig] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        // Get the user ID from localStorage
        const userId = localStorage.getItem("visitor_id")
        if (!userId) return

        // Call the server API to get the config
        const response = await fetch(`/api/statsig?userId=${userId}&configName=${configName}`)

        if (response.ok) {
          const data = await response.json()
          setConfig(data.config || {})
        }
      } catch (error) {
        console.error("Error fetching dynamic config:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchConfig()
  }, [configName])

  return { config, loading }
}

// Helper function to generate a user ID
export function getUserId() {
  if (typeof window === "undefined") return null

  let userId = localStorage.getItem("visitor_id")
  if (!userId) {
    userId = crypto.randomUUID()
    localStorage.setItem("visitor_id", userId)
  }
  return userId
}
