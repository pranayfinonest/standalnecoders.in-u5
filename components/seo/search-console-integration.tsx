"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info, Link, RefreshCw, CheckCircle } from "lucide-react"

export default function SearchConsoleIntegration() {
  const [verificationCode, setVerificationCode] = useState("")
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)

  const handleConnect = () => {
    if (!verificationCode) return

    setIsConnecting(true)
    // Simulate API call
    setTimeout(() => {
      setIsConnecting(false)
      setIsConnected(true)
      // In a real app, you would store this connection in the database
    }, 1500)
  }

  return (
    <div className="space-y-6">
      {!isConnected ? (
        <Card>
          <CardHeader>
            <CardTitle>Connect Google Search Console</CardTitle>
            <CardDescription>
              Connect your website to Google Search Console to monitor indexing and search performance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>How to connect</AlertTitle>
              <AlertDescription>
                <ol className="ml-4 list-decimal">
                  <li>
                    Go to{" "}
                    <a
                      href="https://search.google.com/search-console"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline"
                    >
                      Google Search Console
                    </a>
                  </li>
                  <li>Add your property and verify ownership</li>
                  <li>Copy the verification code provided by Google</li>
                  <li>Paste the code below and click Connect</li>
                </ol>
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <label htmlFor="verification-code" className="text-sm font-medium">
                Verification Code
              </label>
              <Input
                id="verification-code"
                placeholder="Enter Google verification code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
            </div>

            <Button onClick={handleConnect} disabled={isConnecting || !verificationCode} className="w-full">
              {isConnecting ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : null}
              Connect to Search Console
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Search Console Connected</CardTitle>
            <CardDescription>Your website is connected to Google Search Console</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <AlertTitle>Successfully Connected</AlertTitle>
              <AlertDescription>
                Your website is now connected to Google Search Console. You can now monitor your search performance and
                indexing status.
              </AlertDescription>
            </Alert>

            <div className="rounded-md border p-4">
              <h3 className="mb-2 font-medium">Next Steps</h3>
              <ul className="ml-4 list-disc space-y-1">
                <li>Submit your sitemap.xml to Google Search Console</li>
                <li>Monitor your search performance</li>
                <li>Check for any crawl errors or issues</li>
                <li>Request indexing for new or updated pages</li>
              </ul>
            </div>

            <Button variant="outline" className="w-full">
              <Link className="mr-2 h-4 w-4" />
              Open Search Console Dashboard
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
