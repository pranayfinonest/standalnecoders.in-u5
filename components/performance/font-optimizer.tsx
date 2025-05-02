"use client"

import { useEffect } from "react"

interface FontOptimizerProps {
  fonts?: {
    family: string
    weights?: number[]
    styles?: ("normal" | "italic")[]
    display?: "auto" | "block" | "swap" | "fallback" | "optional"
    preload?: boolean
    url?: string
  }[]
}

export function FontOptimizer({
  fonts = [
    {
      family: "Inter",
      weights: [400, 500, 600, 700],
      styles: ["normal"],
      display: "swap",
      preload: true,
      url: "/fonts/inter-var.woff2",
    },
  ],
}: FontOptimizerProps) {
  useEffect(() => {
    // Add font preloading for critical fonts
    fonts.forEach((font) => {
      if (font.preload && font.url) {
        const link = document.createElement("link")
        link.rel = "preload"
        link.href = font.url
        link.as = "font"
        link.type = "font/woff2"
        link.crossOrigin = "anonymous"
        document.head.appendChild(link)
      }
    })

    // Add font-display CSS override
    const style = document.createElement("style")
    style.textContent = fonts
      .map(
        (font) => `
      @font-face {
        font-family: '${font.family}';
        font-style: ${font.styles?.join(", ") || "normal"};
        font-weight: ${
          font.weights
            ? font.weights.length > 1
              ? `${Math.min(...font.weights)} ${Math.max(...font.weights)}`
              : font.weights[0]
            : "normal"
        };
        font-display: ${font.display || "swap"};
        src: url('${font.url}') format('woff2');
      }
    `,
      )
      .join("\n")

    document.head.appendChild(style)

    // Add font loading optimization with Font Loading API
    if ("fonts" in document) {
      fonts.forEach((font) => {
        font.weights?.forEach((weight) => {
          font.styles?.forEach((style) => {
            // @ts-ignore - TypeScript doesn't fully support the Font Loading API
            document.fonts.load(`${weight} ${style} 12px "${font.family}"`)
          })
        })
      })
    }

    return () => {
      // Cleanup
      document.head.removeChild(style)
    }
  }, [fonts])

  return null
}
