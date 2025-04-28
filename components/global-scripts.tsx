"use client"

import { useEffect } from "react"

export default function GlobalScripts() {
  useEffect(() => {
    // Function to ensure links open in the same tab
    const makeLinksOpenInSameTab = () => {
      // Get all links on the page
      const links = document.querySelectorAll("a")

      // Loop through each link
      links.forEach((link) => {
        // Skip anchor links (links that start with #)
        if (link.getAttribute("href")?.startsWith("#")) return

        // Skip links that need to open in new tabs (if you have any specific ones)
        if (link.classList.contains("external-link")) return

        // Remove target attribute if it exists
        if (link.hasAttribute("target")) {
          link.removeAttribute("target")
        }
      })
    }

    // Run once on mount
    makeLinksOpenInSameTab()

    // Set up a mutation observer to handle dynamically added links
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          makeLinksOpenInSameTab()
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
