"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, AlertCircle, XCircle } from "lucide-react"

export default function SEOChecklist() {
  // In a real app, this would come from an API or database
  const [checklistItems] = useState([
    {
      id: 1,
      title: "Meta Tags",
      description: "All pages have proper meta title and description",
      status: "passed",
      details: "All 15 pages have meta tags with appropriate length",
    },
    {
      id: 2,
      title: "Sitemap.xml",
      description: "Sitemap is valid and submitted to search engines",
      status: "passed",
      details: "Sitemap contains 15 URLs and was last updated 2 days ago",
    },
    {
      id: 3,
      title: "Robots.txt",
      description: "Robots.txt file is properly configured",
      status: "passed",
      details: "File allows indexing of all public pages and blocks admin areas",
    },
    {
      id: 4,
      title: "Mobile Responsiveness",
      description: "Website is fully responsive on mobile devices",
      status: "passed",
      details: "All pages pass Google mobile-friendly test",
    },
    {
      id: 5,
      title: "Page Speed",
      description: "Pages load quickly on all devices",
      status: "warning",
      details: "Average load time is 3.2s. Consider optimizing images further.",
    },
    {
      id: 6,
      title: "Structured Data",
      description: "Structured data is implemented correctly",
      status: "warning",
      details: "Some pages are missing product structured data",
    },
    {
      id: 7,
      title: "SSL Certificate",
      description: "Website uses HTTPS with valid SSL certificate",
      status: "passed",
      details: "SSL certificate is valid and properly configured",
    },
    {
      id: 8,
      title: "Canonical URLs",
      description: "Canonical URLs are properly implemented",
      status: "failed",
      details: "Some pages have duplicate content without canonical tags",
    },
    {
      id: 9,
      title: "Image Optimization",
      description: "Images have alt text and are optimized",
      status: "warning",
      details: "15% of images are missing alt text",
    },
    {
      id: 10,
      title: "Internal Linking",
      description: "Pages have proper internal linking structure",
      status: "passed",
      details: "Good internal linking structure detected",
    },
  ])

  const passedItems = checklistItems.filter((item) => item.status === "passed").length
  const warningItems = checklistItems.filter((item) => item.status === "warning").length
  const failedItems = checklistItems.filter((item) => item.status === "failed").length

  const progressPercentage = (passedItems / checklistItems.length) * 100

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>SEO Checklist Progress</CardTitle>
          <CardDescription>
            {passedItems} of {checklistItems.length} items passed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={progressPercentage} className="h-2 w-full" />

          <div className="mt-4 flex justify-between">
            <div className="flex items-center">
              <div className="mr-2 h-3 w-3 rounded-full bg-green-500"></div>
              <span className="text-sm text-muted-foreground">Passed: {passedItems}</span>
            </div>
            <div className="flex items-center">
              <div className="mr-2 h-3 w-3 rounded-full bg-amber-500"></div>
              <span className="text-sm text-muted-foreground">Warnings: {warningItems}</span>
            </div>
            <div className="flex items-center">
              <div className="mr-2 h-3 w-3 rounded-full bg-red-500"></div>
              <span className="text-sm text-muted-foreground">Failed: {failedItems}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {checklistItems.map((item) => (
          <Card key={item.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{item.title}</CardTitle>
                {item.status === "passed" && <CheckCircle className="h-5 w-5 text-green-500" />}
                {item.status === "warning" && <AlertCircle className="h-5 w-5 text-amber-500" />}
                {item.status === "failed" && <XCircle className="h-5 w-5 text-red-500" />}
              </div>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{item.details}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
