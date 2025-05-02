"use client"

import { useEffect } from "react"

export function FontOptimization() {
  useEffect(() => {
    // Add font preloading & font display swap
    const fontPreloadLinks = [
      { rel: "preload", href: "/fonts/inter-var.woff2", as: "font", type: "font/woff2", crossOrigin: "anonymous" },
    ]

    fontPreloadLinks.forEach((linkProps) => {
      const link = document.createElement("link")
      Object.entries(linkProps).forEach(([key, value]) => {
        link.setAttribute(key, value)
      })
      document.head.appendChild(link)
    })

    // Add font-display CSS override
    const style = document.createElement("style")
    style.textContent = `
      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 100 900;
        font-display: swap;
        src: url('/fonts/inter-var.woff2') format('woff2');
      }
    `
    document.head.appendChild(style)

    return () => {
      // Cleanup
      document.head.removeChild(style)
    }
  }, [])

  return null
}
