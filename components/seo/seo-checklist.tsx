"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, AlertCircle, Info, XCircle } from "lucide-react"

interface SEOChecklistProps {
  url?: string
}

interface ChecklistItem {
  id: string
  title: string
  description: string
  status: "passed" | "failed" | "warning" | "info" | "checking"
  importance: "high" | "medium" | "low"
}

export default function SEOChecklist({ url = "https://standalonecoders.in" }: SEOChecklistProps) {
  const [checklist, setChecklist] = useState<ChecklistItem[]>([])
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading checklist data
    const loadChecklist = async () => {
      setIsLoading(true)

      // In a real implementation, this would fetch actual SEO data
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const initialChecklist: ChecklistItem[] = [
        {
          id: "meta-title",
          title: "Meta Title",
          description: "Each page has a unique, descriptive title tag of optimal length (50-60 characters)",
          status: "passed",
          importance: "high",
        },
        {
          id: "meta-description",
          title: "Meta Description",
          description: "Each page has a compelling meta description of optimal length (120-158 characters)",
          status: "warning",
          importance: "high",
        },
        {
          id: "heading-structure",
          title: "Heading Structure",
          description: "Pages use proper heading hierarchy (H1, H2, H3, etc.)",
          status: "passed",
          importance: "medium",
        },
        {
          id: "image-alt",
          title: "Image Alt Text",
          description: "All images have descriptive alt text",
          status: "failed",
          importance: "medium",
        },
        {
          id: "mobile-friendly",
          title: "Mobile Friendly",
          description: "Website is fully responsive and mobile-friendly",
          status: "passed",
          importance: "high",
        },
        {
          id: "page-speed",
          title: "Page Speed",
          description: "Pages load quickly on both desktop and mobile",
          status: "warning",
          importance: "high",
        },
        {
          id: "ssl",
          title: "SSL Certificate",
          description: "Website uses HTTPS with a valid SSL certificate",
          status: "passed",
          importance: "high",
        },
        {
          id: "canonical",
          title: "Canonical URLs",
          description: "Pages use canonical tags to prevent duplicate content issues",
          status: "info",
          importance: "medium",
        },
        {
          id: "structured-data",
          title: "Structured Data",
          description: "Pages use appropriate schema markup",
          status: "warning",
          importance: "medium",
        },
        {
          id: "sitemap",
          title: "XML Sitemap",
          description: "Website has an XML sitemap that is submitted to search engines",
          status: "passed",
          importance: "medium",
        },
      ]

      setChecklist(initialChecklist)

      // Calculate progress
      const passedItems = initialChecklist.filter((item) => item.status === "passed").length
      const totalItems = initialChecklist.length
      setProgress(Math.round((passedItems / totalItems) * 100))

      setIsLoading(false)
    }

    loadChecklist()
  }, [url])

  const getStatusIcon = (status: ChecklistItem["status"]) => {
    switch (status) {
      case "passed":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case "failed":
        return <XCircle className="h-5 w-5 text-red-500" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />
      case "checking":
        return <span className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
      default:
        return null
    }
  }

  const getImportanceBadge = (importance: ChecklistItem["importance"]) => {
    switch (importance) {
      case "high":
        return <Badge variant="destructive">High</Badge>
      case "medium":
        return <Badge variant="default">Medium</Badge>
      case "low":
        return <Badge variant="outline">Low</Badge>
      default:
        return null
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>SEO Checklist</CardTitle>
          <CardDescription>Analyzing your website...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>SEO Checklist</CardTitle>
        <CardDescription>
          {progress}% of SEO best practices implemented for {url}
        </CardDescription>
        <Progress value={progress} className="h-2" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {checklist.map((item) => (
            <div key={item.id} className="border rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  {getStatusIcon(item.status)}
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{item.title}</h3>
                      {getImportanceBadge(item.importance)}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
