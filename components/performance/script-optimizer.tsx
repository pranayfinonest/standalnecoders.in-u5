"use client"

import Script from "next/script"
import { useEffect, useState } from "react"

interface ScriptOptimizerProps {
  strategy?: "beforeInteractive" | "afterInteractive" | "lazyOnload"
  id: string
  src: string
  onLoad?: () => void
}

export function ScriptOptimizer({ strategy = "lazyOnload", id, src, onLoad }: ScriptOptimizerProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // For lazy loading scripts based on visibility
    if (strategy === "lazyOnload") {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.disconnect()
          }
        })
      })

      // Create a mock element to observe
      const mockElement = document.createElement("div")
      mockElement.id = `script-observer-${id}`
      mockElement.style.position = "absolute"
      mockElement.style.bottom = "200px" // Load before user reaches bottom
      mockElement.style.height = "1px"
      mockElement.style.width = "1px"
      document.body.appendChild(mockElement)

      observer.observe(mockElement)

      return () => {
        observer.disconnect()
        document.body.removeChild(mockElement)
      }
    } else {
      setIsVisible(true)
    }
  }, [id, strategy])

  if (!isVisible && strategy === "lazyOnload") {
    return null
  }

  return (
    <Script id={id} src={src} strategy={strategy === "lazyOnload" ? "afterInteractive" : strategy} onLoad={onLoad} />
  )
}
