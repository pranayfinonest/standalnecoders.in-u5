"use client"

import { useState, useEffect } from "react"
import { Shield, CheckCircle, AlertTriangle, Play, Pause, RefreshCw } from "lucide-react"

export default function ProductDemo() {
  const [isScanning, setIsScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [scanComplete, setScanComplete] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [scanResults, setScanResults] = useState({
    vulnerabilities: [],
    secureItems: [],
    scanTime: 0,
  })

  // Sample vulnerabilities data
  const possibleVulnerabilities = [
    { id: 1, name: "Outdated SSL Certificate", severity: "high", status: "detected" },
    { id: 2, name: "Weak Password Policy", severity: "medium", status: "detected" },
    { id: 3, name: "Open FTP Port", severity: "high", status: "detected" },
    { id: 4, name: "Missing Security Headers", severity: "medium", status: "detected" },
    { id: 5, name: "Insecure Cookies", severity: "low", status: "detected" },
    { id: 6, name: "Cross-Site Scripting (XSS)", severity: "high", status: "detected" },
  ]

  // Sample secure items data
  const possibleSecureItems = [
    { id: 1, name: "Firewall Configuration", status: "secure" },
    { id: 2, name: "HTTPS Implementation", status: "secure" },
    { id: 3, name: "Admin Access Controls", status: "secure" },
    { id: 4, name: "Data Encryption", status: "secure" },
  ]

  // Handle scan simulation
  useEffect(() => {
    let interval
    if (isScanning && scanProgress < 100) {
      interval = setInterval(() => {
        setScanProgress((prev) => {
          const increment = Math.floor(Math.random() * 5) + 1
          return Math.min(prev + increment, 100)
        })
      }, 200)
    } else if (scanProgress >= 100) {
      setIsScanning(false)
      setScanComplete(true)

      // Generate random scan results
      const detectedVulnerabilities = possibleVulnerabilities
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 4) + 1)

      const secureItems = possibleSecureItems
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 3) + 2)

      setScanResults({
        vulnerabilities: detectedVulnerabilities,
        secureItems: secureItems,
        scanTime: Math.floor(Math.random() * 10) + 5,
      })
    }

    return () => clearInterval(interval)
  }, [isScanning, scanProgress])

  const startScan = () => {
    setIsScanning(true)
    setScanComplete(false)
    setScanProgress(0)
    setScanResults({
      vulnerabilities: [],
      secureItems: [],
      scanTime: 0,
    })
  }

  const pauseScan = () => {
    setIsScanning(false)
  }

  const resetScan = () => {
    setIsScanning(false)
    setScanComplete(false)
    setScanProgress(0)
    setScanResults({
      vulnerabilities: [],
      secureItems: [],
      scanTime: 0,
    })
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "high":
        return "text-red-500 dark:text-red-400"
      case "medium":
        return "text-orange-500 dark:text-orange-400"
      case "low":
        return "text-yellow-500 dark:text-yellow-400"
      default:
        return "text-gray-500 dark:text-gray-400"
    }
  }

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "vulnerabilities", label: "Vulnerabilities" },
    { id: "secure", label: "Secure Items" },
  ]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
            <h3 className="text-lg font-semibold">SecureScanner™ Demo</h3>
          </div>
          <div className="flex items-center space-x-2">
            {!isScanning && !scanComplete && (
              <button
                onClick={startScan}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md flex items-center"
              >
                <Play className="w-4 h-4 mr-1" />
                Start Scan
              </button>
            )}
            {isScanning && (
              <button
                onClick={pauseScan}
                className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium rounded-md flex items-center"
              >
                <Pause className="w-4 h-4 mr-1" />
                Pause
              </button>
            )}
            {(isScanning || scanComplete) && (
              <button
                onClick={resetScan}
                className="px-3 py-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 text-sm font-medium rounded-md flex items-center"
              >
                <RefreshCw className="w-4 h-4 mr-1" />
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Scan Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {isScanning ? "Scanning in progress..." : scanComplete ? "Scan complete" : "Ready to scan"}
            </div>
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{scanProgress}%</div>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full ${
                scanComplete
                  ? scanResults.vulnerabilities.length > 0
                    ? "bg-orange-500"
                    : "bg-green-500"
                  : "bg-blue-600"
              }`}
              style={{ width: `${scanProgress}%`, transition: "width 0.3s ease" }}
            ></div>
          </div>
        </div>

        {/* Scan visualization */}
        {isScanning && (
          <div className="relative h-48 mb-6 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-900/30">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 border-4 border-blue-600 dark:border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Shield className="w-12 h-12 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-r from-blue-500 to-blue-600 opacity-20 animate-pulse"></div>
          </div>
        )}

        {/* Scan Results */}
        {scanComplete && (
          <div className="mb-6">
            <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                      : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {activeTab === "overview" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/30 rounded-lg">
                  <div className="flex items-center">
                    <div className="mr-4">
                      {scanResults.vulnerabilities.length > 0 ? (
                        <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                          <AlertTriangle className="w-6 h-6 text-orange-500" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                          <CheckCircle className="w-6 h-6 text-green-500" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium">Scan Summary</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Completed in {scanResults.scanTime} seconds
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">
                      {scanResults.vulnerabilities.length > 0 ? (
                        <span className="text-orange-500">{scanResults.vulnerabilities.length} issues</span>
                      ) : (
                        <span className="text-green-500">All Clear</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {scanResults.secureItems.length} items secure
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center">
                      <AlertTriangle className="w-4 h-4 text-orange-500 mr-2" />
                      Vulnerabilities
                    </h4>
                    {scanResults.vulnerabilities.length > 0 ? (
                      <ul className="space-y-2">
                        {scanResults.vulnerabilities.slice(0, 3).map((item) => (
                          <li key={item.id} className="text-sm flex items-center">
                            <span
                              className={`w-2 h-2 rounded-full mr-2 ${getSeverityColor(item.severity).replace(
                                "text",
                                "bg",
                              )}`}
                            ></span>
                            {item.name}
                          </li>
                        ))}
                        {scanResults.vulnerabilities.length > 3 && (
                          <li className="text-sm text-gray-500 dark:text-gray-400">
                            +{scanResults.vulnerabilities.length - 3} more...
                          </li>
                        )}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-500 dark:text-gray-400">No vulnerabilities detected</p>
                    )}
                  </div>

                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Secure Items
                    </h4>
                    <ul className="space-y-2">
                      {scanResults.secureItems.slice(0, 3).map((item) => (
                        <li key={item.id} className="text-sm flex items-center">
                          <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                          {item.name}
                        </li>
                      ))}
                      {scanResults.secureItems.length > 3 && (
                        <li className="text-sm text-gray-500 dark:text-gray-400">
                          +{scanResults.secureItems.length - 3} more...
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "vulnerabilities" && (
              <div>
                {scanResults.vulnerabilities.length > 0 ? (
                  <ul className="space-y-3">
                    {scanResults.vulnerabilities.map((item) => (
                      <li
                        key={item.id}
                        className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg flex items-start"
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${
                            item.severity === "high"
                              ? "bg-red-100 dark:bg-red-900/30"
                              : item.severity === "medium"
                                ? "bg-orange-100 dark:bg-orange-900/30"
                                : "bg-yellow-100 dark:bg-yellow-900/30"
                          }`}
                        >
                          <AlertTriangle
                            className={`w-4 h-4 ${
                              item.severity === "high"
                                ? "text-red-500"
                                : item.severity === "medium"
                                  ? "text-orange-500"
                                  : "text-yellow-500"
                            }`}
                          />
                        </div>
                        <div>
                          <div className="flex items-center">
                            <h4 className="font-medium">{item.name}</h4>
                            <span
                              className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                                item.severity === "high"
                                  ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                                  : item.severity === "medium"
                                    ? "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300"
                                    : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"
                              }`}
                            >
                              {item.severity}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            This vulnerability could potentially expose your system to security risks.
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8">
                    <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                    <h4 className="text-lg font-medium mb-2">No Vulnerabilities Detected</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
                      Your system appears to be secure. Continue regular scanning to maintain security.
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "secure" && (
              <div>
                <ul className="space-y-3">
                  {scanResults.secureItems.map((item) => (
                    <li
                      key={item.id}
                      className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg flex items-start"
                    >
                      <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3 flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      </div>
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          This aspect of your system is properly secured and configured.
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Instructions */}
        {!isScanning && !scanComplete && (
          <div className="bg-gray-50 dark:bg-gray-900/30 p-4 rounded-lg">
            <h4 className="font-medium mb-2">SecureScanner™ Demo</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Experience our cybersecurity scanning technology in action. Click "Start Scan" to simulate a security
              assessment of your system.
            </p>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start">
                <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-2 flex-shrink-0">
                  <span className="text-blue-600 dark:text-blue-400 text-xs">1</span>
                </span>
                Click "Start Scan" to begin the security assessment simulation
              </li>
              <li className="flex items-start">
                <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-2 flex-shrink-0">
                  <span className="text-blue-600 dark:text-blue-400 text-xs">2</span>
                </span>
                Watch as the scanner identifies potential security vulnerabilities
              </li>
              <li className="flex items-start">
                <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-2 flex-shrink-0">
                  <span className="text-blue-600 dark:text-blue-400 text-xs">3</span>
                </span>
                Review the detailed report with actionable security insights
              </li>
            </ul>
          </div>
        )}
      </div>

      <div className="bg-gray-50 dark:bg-gray-900/50 p-4 border-t border-gray-200 dark:border-gray-700 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          This is a demo of our SecureScanner™ technology. Contact us for a full security assessment.
        </p>
      </div>
    </div>
  )
}
