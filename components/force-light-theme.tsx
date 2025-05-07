"use client"

import { useEffect } from "react"
import { useTheme } from "next-themes"

export function ForceLightTheme() {
  const { setTheme } = useTheme()

  useEffect(() => {
    // Force light theme
    setTheme("light")

    // Clear any stored theme preference
    try {
      localStorage.removeItem("theme")
    } catch (e) {
      console.error("Could not access localStorage", e)
    }
  }, [setTheme])

  return null
}
