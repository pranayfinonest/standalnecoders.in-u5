"use client"

import { useEffect } from "react"

export default function GlobalScripts() {
  useEffect(() => {
    // Function to make all links open in new tabs
    const makeLinksOpenInNewTab = () => {
      // Get all links on the page
      const links = document.querySelectorAll("a")

      // Loop through each link
      links.forEach((link) => {
        // Skip links that already have target attribute set
        if (link.hasAttribute("target")) return

        // Skip anchor links (links that start with #)
        if (link.getAttribute("href")?.startsWith("#")) return

        // Set target and rel attributes
        link.setAttribute("target", "_blank")
        link.setAttribute("rel", "noopener noreferrer")
      })
    }

    // Run once on mount
    makeLinksOpenInNewTab()

    // Set up a mutation observer to handle dynamically added links
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          makeLinksOpenInNewTab()
        }
      })
    })

    // Start observing the document
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    // Clean up observer on unmount
    return () => observer.disconnect()
  }, [])

  return null
}
