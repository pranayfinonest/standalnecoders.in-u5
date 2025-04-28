"use client"

import { useState } from "react"

export default function ProductDemo() {
  const [scanResults, setScanResults] = useState(null)
  const [isScanning, setIsScanning] = useState(false)

  const handleSimulateScan = () => {
    setIsScanning(true)
    setScanResults(null)

    // Simulate scanning process
    setTimeout(() => {
      const randomVulnerabilities = Math.floor(Math.random() * 5) // Simulate 0-4 vulnerabilities
      const newResults = {
        status: randomVulnerabilities > 0 ? "vulnerable" : "secure",
        vulnerabilities: randomVulnerabilities,
      }
      setScanResults(newResults)
      setIsScanning(false)
    }, 2000)
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4">Simulated Cybersecurity Scan</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        Click the button below to simulate a cybersecurity scan of your website.
      </p>

      <Button onClick={handleSimulateScan} disabled={isScanning}>
        {isScanning ? "Scanning..." : "Simulate Scan"}
      </Button>

      {scanResults && (
        <div className="mt-6">
          {scanResults.status === "secure" ? (
            <div className="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 p-4 rounded-md">
              <p className="font-medium">
                Your website appears to be secure! <Check className="inline-block w-4 h-4 ml-1" />
              </p>
            </div>
          ) : (
            <div className="bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400 p-4 rounded-md">
              <p className="font-medium">
                Vulnerabilities found: {scanResults.vulnerabilities}.{" "}
                <AlertCircle className="inline-block w-4 h-4 ml-1" />
              </p>
              <p className="text-sm">Contact us for a comprehensive security audit.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

import { Check, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
