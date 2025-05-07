"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, Info } from "lucide-react"
import SEOChecklist from "./seo-checklist"
import IndexingStatus from "./indexing-status"
import SearchConsoleIntegration from "./search-console-integration"
import { getClientUrlParam } from "@/utils/client-navigation"

export default function SEODashboardContentClient() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const tabParam = getClientUrlParam("tab")
    if (tabParam) {
      setActiveTab(tabParam)
    }
  }, [])

  if (!isClient) {
    return null // Prevent hydration mismatch
  }

  return (
    <Tabs defaultValue={activeTab} className="w-full">
      <TabsList className="mb-6 grid w-full grid-cols-3 lg:grid-cols-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="indexing">Indexing Status</TabsTrigger>
        <TabsTrigger value="checklist">SEO Checklist</TabsTrigger>
        <TabsTrigger value="search-console" className="hidden lg:block">
          Search Console
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Indexing Summary</CardTitle>
              <CardDescription>Current status of your website indexing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Sitemap submitted successfully</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Robots.txt properly configured</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Info className="h-5 w-5 text-blue-500" />
                  <span>12 pages indexed by Google</span>
                </div>
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-amber-500" />
                  <span>3 pages pending indexing</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SEO Health</CardTitle>
              <CardDescription>Overall SEO performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Meta Tags</span>
                  <span className="text-green-500">Good</span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-200">
                  <div className="h-2 w-[85%] rounded-full bg-green-500"></div>
                </div>

                <div className="flex items-center justify-between">
                  <span>Content Quality</span>
                  <span className="text-amber-500">Average</span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-200">
                  <div className="h-2 w-[65%] rounded-full bg-amber-500"></div>
                </div>

                <div className="flex items-center justify-between">
                  <span>Mobile Optimization</span>
                  <span className="text-green-500">Excellent</span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-200">
                  <div className="h-2 w-[95%] rounded-full bg-green-500"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Alert className="mt-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Recommendation</AlertTitle>
          <AlertDescription>Submit your latest blog posts for indexing to improve search visibility.</AlertDescription>
        </Alert>
      </TabsContent>

      <TabsContent value="indexing">
        <IndexingStatus />
      </TabsContent>

      <TabsContent value="checklist">
        <SEOChecklist />
      </TabsContent>

      <TabsContent value="search-console">
        <SearchConsoleIntegration />
      </TabsContent>
    </Tabs>
  )
}
