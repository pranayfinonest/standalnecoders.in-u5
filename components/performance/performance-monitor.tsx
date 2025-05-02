"use client"

import { useEffect, useState } from "react"

interface PerformanceMetrics {
  ttfb: number
  fcp: number
  lcp: number
  cls: number
  fid: number
  resourceCount: number
  jsSize: number
  cssSize: number
  imageSize: number
  fontSize: number
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only run in development
    if (process.env.NODE_ENV !== "development") return

    const calculateMetrics = () => {
      const perfEntries = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming
      const paintEntries = performance.getEntriesByType("paint")
      const resourceEntries = performance.getEntriesByType("resource")

      // Calculate resource sizes by type
      let jsSize = 0,
        cssSize = 0,
        imageSize = 0,
        fontSize = 0
      resourceEntries.forEach((entry) => {
        const url = entry.name.toLowerCase()
        if (url.endsWith(".js")) jsSize += entry.encodedBodySize || 0
        else if (url.endsWith(".css")) cssSize += entry.encodedBodySize || 0
        else if (url.match(/\.(jpe?g|png|gif|svg|webp)$/)) imageSize += entry.encodedBodySize || 0
        else if (url.match(/\.(woff2?|ttf|otf|eot)$/)) fontSize += entry.encodedBodySize || 0
      })

      // Get FCP
      const fcpEntry = paintEntries.find((entry) => entry.name === "first-contentful-paint")
      const fcp = fcpEntry ? fcpEntry.startTime : 0

      setMetrics({
        ttfb: perfEntries.responseStart - perfEntries.requestStart,
        fcp: fcp,
        lcp: 0, // Will be updated by PerformanceObserver
        cls: 0, // Will be updated by PerformanceObserver
        fid: 0, // Will be updated by PerformanceObserver
        resourceCount: resourceEntries.length,
        jsSize: Math.round(jsSize / 1024),
        cssSize: Math.round(cssSize / 1024),
        imageSize: Math.round(imageSize / 1024),
        fontSize: Math.round(fontSize / 1024),
      })
    }

    // Wait for load event to calculate metrics
    if (document.readyState === "complete") {
      calculateMetrics()
    } else {
      window.addEventListener("load", calculateMetrics)
    }

    // Set up observers for web vitals
    let lcpObserver: PerformanceObserver
    let clsObserver: PerformanceObserver
    let fidObserver: PerformanceObserver

    try {
      // LCP observer
      lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries()
        const lastEntry = entries[entries.length - 1]
        setMetrics((prev) => (prev ? { ...prev, lcp: lastEntry.startTime } : null))
      })
      lcpObserver.observe({ type: "largest-contentful-paint", buffered: true })

      // CLS observer
      let clsValue = 0
      clsObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries()
        entries.forEach((entry) => {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value
          }
        })
        setMetrics((prev) => (prev ? { ...prev, cls: clsValue } : null))
      })
      clsObserver.observe({ type: "layout-shift", buffered: true })

      // FID observer
      fidObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries()
        entries.forEach((entry) => {
          setMetrics((prev) =>
            prev ? { ...prev, fid: (entry as any).processingStart - (entry as any).startTime } : null,
          )
        })
      })
      fidObserver.observe({ type: "first-input", buffered: true })
    } catch (e) {
      console.error("Performance observer error:", e)
    }

    // Cleanup
    return () => {
      window.removeEventListener("load", calculateMetrics)
      lcpObserver?.disconnect()
      clsObserver?.disconnect()
      fidObserver?.disconnect()
    }
  }, [])

  // Toggle visibility of metrics panel
  const toggleVisibility = () => setIsVisible(!isVisible)

  if (process.env.NODE_ENV !== "development" || !metrics) return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={toggleVisibility}
        className="bg-blue-600 text-white p-2 rounded-full shadow-lg"
        aria-label="Toggle performance metrics"
      >
        {isVisible ? "Hide Metrics" : "Show Metrics"}
      </button>

      {isVisible && (
        <div className="bg-white p-4 rounded-lg shadow-xl mt-2 border border-gray-200 w-80">
          <h3 className="font-bold text-lg mb-2">Performance Metrics</h3>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>TTFB:</span>
              <span
                className={
                  metrics.ttfb < 200 ? "text-green-600" : metrics.ttfb < 500 ? "text-yellow-600" : "text-red-600"
                }
              >
                {metrics.ttfb.toFixed(2)}ms
              </span>
            </div>
            <div className="flex justify-between">
              <span>FCP:</span>
              <span
                className={
                  metrics.fcp < 1800 ? "text-green-600" : metrics.fcp < 3000 ? "text-yellow-600" : "text-red-600"
                }
              >
                {metrics.fcp.toFixed(2)}ms
              </span>
            </div>
            <div className="flex justify-between">
              <span>LCP:</span>
              <span
                className={
                  metrics.lcp < 2500 ? "text-green-600" : metrics.lcp < 4000 ? "text-yellow-600" : "text-red-600"
                }
              >
                {metrics.lcp.toFixed(2)}ms
              </span>
            </div>
            <div className="flex justify-between">
              <span>CLS:</span>
              <span
                className={
                  metrics.cls < 0.1 ? "text-green-600" : metrics.cls < 0.25 ? "text-yellow-600" : "text-red-600"
                }
              >
                {metrics.cls.toFixed(3)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>FID:</span>
              <span
                className={
                  metrics.fid < 100 ? "text-green-600" : metrics.fid < 300 ? "text-yellow-600" : "text-red-600"
                }
              >
                {metrics.fid.toFixed(2)}ms
              </span>
            </div>
            <div className="border-t border-gray-200 my-2 pt-2">
              <div className="flex justify-between">
                <span>Resources:</span>
                <span>{metrics.resourceCount}</span>
              </div>
              <div className="flex justify-between">
                <span>JS Size:</span>
                <span>{metrics.jsSize} KB</span>
              </div>
              <div className="flex justify-between">
                <span>CSS Size:</span>
                <span>{metrics.cssSize} KB</span>
              </div>
              <div className="flex justify-between">
                <span>Image Size:</span>
                <span>{metrics.imageSize} KB</span>
              </div>
              <div className="flex justify-between">
                <span>Font Size:</span>
                <span>{metrics.fontSize} KB</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
