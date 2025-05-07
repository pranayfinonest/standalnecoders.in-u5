"use client"

import React from "react"

import { useState, useEffect } from "react"

export default function DebugOverlay() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentHash, setCurrentHash] = useState("")
  const [activeTab, setActiveTab] = useState("")
  const [elementInfo, setElementInfo] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    // Function to toggle debug overlay with keyboard shortcut
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl + Alt + D to toggle debug overlay
      if (e.ctrlKey && e.altKey && e.key === "d") {
        setIsVisible((prev) => !prev)
      }
    }

    // Update debug information
    const updateDebugInfo = () => {
      if (!isVisible) return

      setCurrentHash(window.location.hash)

      // Check if elements with specific IDs exist
      const serviceCategories = [
        "assessments",
        "network",
        "threat",
        "data",
        "iso",
        "training",
        "managed",
        "specialized",
      ]

      const elementExists: { [key: string]: boolean } = {}
      serviceCategories.forEach((id) => {
        elementExists[id] = !!document.getElementById(id)
      })

      setElementInfo(elementExists)
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("hashchange", updateDebugInfo)

    // Initial update
    updateDebugInfo()

    // Set up interval to periodically update debug info
    const intervalId = setInterval(updateDebugInfo, 1000)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("hashchange", updateDebugInfo)
      clearInterval(intervalId)
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 right-0 bg-black/80 text-white p-4 z-50 max-w-sm overflow-auto max-h-80 text-xs font-mono">
      <h3 className="font-bold mb-2">Debug Information</h3>
      <div className="grid grid-cols-2 gap-2">
        <div>Current Hash:</div>
        <div>{currentHash || "(none)"}</div>

        <div>Active Tab:</div>
        <div>{activeTab || "(none)"}</div>
      </div>

      <h4 className="font-bold mt-3 mb-1">Element IDs Found:</h4>
      <div className="grid grid-cols-2 gap-1">
        {Object.entries(elementInfo).map(([id, exists]) => (
          <React.Fragment key={id}>
            <div>{id}:</div>
            <div className={exists ? "text-green-400" : "text-red-400"}>{exists ? "✓" : "✗"}</div>
          </React.Fragment>
        ))}
      </div>

      <div className="mt-3 text-gray-400">Press Ctrl+Alt+D to hide</div>
    </div>
  )
}
