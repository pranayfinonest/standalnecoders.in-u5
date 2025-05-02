"use client"

import { useEffect } from "react"

interface CSSOptimizerProps {
  criticalCSS?: string
  deferredCSS?: string[]
}

export function CSSOptimizer({ criticalCSS, deferredCSS = [] }: CSSOptimizerProps) {
  useEffect(() => {
    // If critical CSS is provided, inject it
    if (criticalCSS) {
      const style = document.createElement("style")
      style.textContent = criticalCSS
      style.setAttribute("data-critical", "true")
      document.head.appendChild(style)
    }

    // Load deferred CSS with low priority
    if (deferredCSS.length > 0) {
      // Use requestIdleCallback if available, otherwise setTimeout
      const scheduleLoad = window.requestIdleCallback || ((cb) => setTimeout(cb, 1))

      scheduleLoad(() => {
        deferredCSS.forEach((cssPath) => {
          const link = document.createElement("link")
          link.rel = "stylesheet"
          link.href = cssPath
          link.setAttribute("data-deferred", "true")
          document.head.appendChild(link)
        })
      })
    }

    // Cleanup function
    return () => {
      document.querySelectorAll('style[data-critical="true"], link[data-deferred="true"]').forEach((el) => {
        el.remove()
      })
    }
  }, [criticalCSS, deferredCSS])

  return null
}
