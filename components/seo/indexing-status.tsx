"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle, XCircle, Clock, RefreshCw } from "lucide-react"

export default function IndexingStatus() {
  const [url, setUrl] = useState("")
  const [isChecking, setIsChecking] = useState(false)

  // Sample data - in a real app, this would come from an API
  const indexedPages = [
    { url: "https://standalonecoders.com", status: "indexed", lastChecked: "2023-10-15" },
    { url: "https://standalonecoders.com/about", status: "indexed", lastChecked: "2023-10-15" },
    { url: "https://standalonecoders.com/services", status: "indexed", lastChecked: "2023-10-14" },
    { url: "https://standalonecoders.com/contact", status: "indexed", lastChecked: "2023-10-14" },
    { url: "https://standalonecoders.com/booking/templates", status: "pending", lastChecked: "2023-10-13" },
    { url: "https://standalonecoders.com/booking/customize", status: "not-indexed", lastChecked: "2023-10-12" },
  ]

  const handleCheckUrl = () => {
    if (!url) return

    setIsChecking(true)
    // Simulate API call
    setTimeout(() => {
      setIsChecking(false)
      setUrl("")
      // In a real app, you would update the state with the result
    }, 1500)
  }

  const handleSubmitUrl = () => {
    if (!url) return

    // Simulate API call to submit URL to Google
    setIsChecking(true)
    setTimeout(() => {
      setIsChecking(false)
      setUrl("")
      // In a real app, you would update the state with the result
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Check URL Indexing Status</CardTitle>
          <CardDescription>Enter a URL to check if it's indexed by Google</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              placeholder="Enter URL (e.g., https://standalonecoders.com/page)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleCheckUrl} disabled={isChecking || !url}>
              {isChecking ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : null}
              Check Status
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Submit URL for Indexing</CardTitle>
          <CardDescription>Submit a URL to Google for indexing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              placeholder="Enter URL (e.g., https://standalonecoders.com/page)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleSubmitUrl} disabled={isChecking || !url}>
              {isChecking ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : null}
              Submit to Google
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Indexed Pages</CardTitle>
          <CardDescription>Status of your website pages in Google's index</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>URL</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Checked</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {indexedPages.map((page) => (
                <TableRow key={page.url}>
                  <TableCell className="font-medium">{page.url}</TableCell>
                  <TableCell>
                    {page.status === "indexed" && (
                      <div className="flex items-center">
                        <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                        <span>Indexed</span>
                      </div>
                    )}
                    {page.status === "not-indexed" && (
                      <div className="flex items-center">
                        <XCircle className="mr-2 h-4 w-4 text-red-500" />
                        <span>Not Indexed</span>
                      </div>
                    )}
                    {page.status === "pending" && (
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-amber-500" />
                        <span>Pending</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{page.lastChecked}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      Recheck
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">Showing {indexedPages.length} pages</div>
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh All
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
