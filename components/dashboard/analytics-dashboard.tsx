"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area,
} from "recharts"
import {
  ArrowUpRight,
  ArrowDownRight,
  Users,
  Activity,
  Clock,
  Globe,
  Smartphone,
  Laptop,
  Share2,
  Tablet,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function AnalyticsDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("7d")
  const [analytics, setAnalytics] = useState({
    visitors: { total: 0, change: 0 },
    pageviews: { total: 0, change: 0 },
    bounceRate: { total: 0, change: 0 },
    avgSessionDuration: { total: 0, change: 0 },
  })
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    if (!isLoggedIn) {
      router.push("/auth/login?redirect=/dashboard/analytics")
      return
    }

    // Load user data
    const userData = JSON.parse(localStorage.getItem("user") || "{}")
    if (!userData.email) {
      router.push("/auth/login?redirect=/dashboard/analytics")
      return
    }

    // Simulate loading analytics data
    setTimeout(() => {
      setAnalytics({
        visitors: { total: 1248, change: 12.5 },
        pageviews: { total: 5327, change: 8.2 },
        bounceRate: { total: 42.3, change: -2.1 },
        avgSessionDuration: { total: 124, change: 5.7 },
      })
      setIsLoading(false)
    }, 1000)
  }, [router, timeRange])

  // Sample data for charts
  const visitorData = [
    { name: "Mon", value: 120 },
    { name: "Tue", value: 150 },
    { name: "Wed", value: 180 },
    { name: "Thu", value: 170 },
    { name: "Fri", value: 190 },
    { name: "Sat", value: 220 },
    { name: "Sun", value: 200 },
  ]

  const pageViewData = [
    { name: "Mon", value: 520 },
    { name: "Tue", value: 650 },
    { name: "Wed", value: 780 },
    { name: "Thu", value: 670 },
    { name: "Fri", value: 790 },
    { name: "Sat", value: 820 },
    { name: "Sun", value: 700 },
  ]

  const trafficSourceData = [
    { name: "Direct", value: 35 },
    { name: "Organic Search", value: 40 },
    { name: "Social Media", value: 15 },
    { name: "Referral", value: 10 },
  ]

  const deviceData = [
    { name: "Desktop", value: 55 },
    { name: "Mobile", value: 40 },
    { name: "Tablet", value: 5 },
  ]

  const conversionData = [
    { name: "Mon", visits: 120, conversions: 12 },
    { name: "Tue", visits: 150, conversions: 18 },
    { name: "Wed", visits: 180, conversions: 24 },
    { name: "Thu", visits: 170, conversions: 19 },
    { name: "Fri", visits: 190, conversions: 26 },
    { name: "Sat", visits: 220, conversions: 32 },
    { name: "Sun", visits: 200, conversions: 28 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}m ${remainingSeconds}s`
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <div className="animate-pulse h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
          ))}
        </div>
        <div className="animate-pulse h-80 bg-gray-200 dark:bg-gray-700 rounded mb-8"></div>
        <div className="animate-pulse h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold">Website Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400">Track your website performance and user behavior</p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="12m">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            Export Data
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="mb-8">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
          <TabsTrigger value="behavior">Behavior</TabsTrigger>
          <TabsTrigger value="conversions">Conversions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* Analytics Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    Visitors
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.visitors.total.toLocaleString()}</div>
                <div className="flex items-center mt-1">
                  {analytics.visitors.change > 0 ? (
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
                    >
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      {analytics.visitors.change}%
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800"
                    >
                      <ArrowDownRight className="h-3 w-3 mr-1" />
                      {Math.abs(analytics.visitors.change)}%
                    </Badge>
                  )}
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">vs previous period</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <Activity className="h-4 w-4 mr-1" />
                    Pageviews
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.pageviews.total.toLocaleString()}</div>
                <div className="flex items-center mt-1">
                  {analytics.pageviews.change > 0 ? (
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
                    >
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      {analytics.pageviews.change}%
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800"
                    >
                      <ArrowDownRight className="h-3 w-3 mr-1" />
                      {Math.abs(analytics.pageviews.change)}%
                    </Badge>
                  )}
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">vs previous period</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <Share2 className="h-4 w-4 mr-1" />
                    Bounce Rate
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.bounceRate.total}%</div>
                <div className="flex items-center mt-1">
                  {analytics.bounceRate.change < 0 ? (
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
                    >
                      <ArrowDownRight className="h-3 w-3 mr-1" />
                      {Math.abs(analytics.bounceRate.change)}%
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800"
                    >
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      {analytics.bounceRate.change}%
                    </Badge>
                  )}
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">vs previous period</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Avg. Session
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatTime(analytics.avgSessionDuration.total)}</div>
                <div className="flex items-center mt-1">
                  {analytics.avgSessionDuration.change > 0 ? (
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
                    >
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      {analytics.avgSessionDuration.change}%
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800"
                    >
                      <ArrowDownRight className="h-3 w-3 mr-1" />
                      {Math.abs(analytics.avgSessionDuration.change)}%
                    </Badge>
                  )}
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">vs previous period</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Visitor Chart */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Website Traffic</CardTitle>
              <CardDescription>Daily visitors and pageviews for the selected period</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={visitorData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" name="Visitors" stroke="#3b82f6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Traffic Sources and Devices */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
                <CardDescription>Where your visitors are coming from</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={trafficSourceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {trafficSourceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Device Breakdown</CardTitle>
                <CardDescription>What devices your visitors are using</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={deviceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {deviceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Pages */}
          <Card>
            <CardHeader>
              <CardTitle>Top Pages</CardTitle>
              <CardDescription>Most visited pages on your website</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { page: "Homepage", views: 2341, avgTime: "2m 15s", bounceRate: 32 },
                  { page: "Services", views: 1432, avgTime: "1m 45s", bounceRate: 41 },
                  { page: "About Us", views: 1021, avgTime: "1m 20s", bounceRate: 38 },
                  { page: "Contact", views: 643, avgTime: "0m 55s", bounceRate: 45 },
                  { page: "Blog", views: 489, avgTime: "3m 10s", bounceRate: 28 },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{item.page}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {item.views.toLocaleString()} views
                      </div>
                    </div>
                    <div className="flex gap-4 text-sm">
                      <div className="text-right">
                        <div className="font-medium">Avg. Time</div>
                        <div className="text-gray-500 dark:text-gray-400">{item.avgTime}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">Bounce Rate</div>
                        <div className="text-gray-500 dark:text-gray-400">{item.bounceRate}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audience">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    New Users
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">876</div>
                <div className="flex items-center mt-1">
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
                  >
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    15.2%
                  </Badge>
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">vs previous period</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 mr-1" />
                    Top Country
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">India</div>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-gray-500 dark:text-gray-400">68% of total traffic</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <Laptop className="h-4 w-4 mr-1" />
                    Top Device
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Desktop</div>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-gray-500 dark:text-gray-400">55% of total traffic</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>User Demographics</CardTitle>
              <CardDescription>Age and gender distribution of your audience</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { age: "18-24", male: 120, female: 150 },
                      { age: "25-34", male: 300, female: 270 },
                      { age: "35-44", male: 240, female: 220 },
                      { age: "45-54", male: 180, female: 140 },
                      { age: "55-64", male: 100, female: 80 },
                      { age: "65+", male: 60, female: 40 },
                    ]}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="age" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="male" name="Male" fill="#3b82f6" />
                    <Bar dataKey="female" name="Female" fill="#ec4899" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Countries</CardTitle>
                <CardDescription>Geographic distribution of your audience</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { country: "India", users: 845, percentage: 68 },
                    { country: "United States", users: 156, percentage: 12 },
                    { country: "United Kingdom", users: 98, percentage: 8 },
                    { country: "Canada", users: 67, percentage: 5 },
                    { country: "Australia", users: 42, percentage: 3 },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{item.country}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {item.users.toLocaleString()} users
                        </div>
                      </div>
                      <div className="text-sm font-medium">{item.percentage}%</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Devices & Browsers</CardTitle>
                <CardDescription>What technology your audience is using</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Devices</h4>
                    <div className="space-y-4">
                      {[
                        { name: "Desktop", icon: <Laptop className="h-4 w-4" />, users: 685, percentage: 55 },
                        { name: "Mobile", icon: <Smartphone className="h-4 w-4" />, users: 498, percentage: 40 },
                        { name: "Tablet", icon: <Tablet className="h-4 w-4" />, users: 65, percentage: 5 },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="mr-2 text-gray-500">{item.icon}</div>
                            <div>
                              <div className="font-medium">{item.name}</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {item.users.toLocaleString()} users
                              </div>
                            </div>
                          </div>
                          <div className="text-sm font-medium">{item.percentage}%</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Browsers</h4>
                    <div className="space-y-4">
                      {[
                        { name: "Chrome", users: 723, percentage: 58 },
                        { name: "Safari", users: 312, percentage: 25 },
                        { name: "Firefox", users: 124, percentage: 10 },
                        { name: "Edge", users: 62, percentage: 5 },
                        { name: "Other", users: 24, percentage: 2 },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {item.users.toLocaleString()} users
                            </div>
                          </div>
                          <div className="text-sm font-medium">{item.percentage}%</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="behavior">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Page Views Over Time</CardTitle>
              <CardDescription>Trends in page views over the selected period</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={pageViewData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="value"
                      name="Page Views"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Average Session Duration</CardTitle>
                <CardDescription>How long users are spending on your website</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { day: "Mon", duration: 120 },
                        { day: "Tue", duration: 150 },
                        { day: "Wed", duration: 180 },
                        { day: "Thu", duration: 170 },
                        { day: "Fri", duration: 190 },
                        { day: "Sat", duration: 220 },
                        { day: "Sun", duration: 200 },
                      ]}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="duration" fill="#82ca9d" name="Session Duration (s)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">Average session duration: 2m 15s</p>
              </div>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Bounce Rate</CardTitle>
                <CardDescription>Percentage of visitors who leave after viewing only one page</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { day: "Mon", rate: 45 },
                        { day: "Tue", rate: 40 },
                        { day: "Wed", rate: 38 },
                        { day: "Thu", rate: 42 },
                        { day: "Fri", rate: 35 },
                        { day: "Sat", rate: 30 },
                        { day: "Sun", rate: 32 },
                      ]}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="rate" stroke="#f59e0b" name="Bounce Rate (%)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">Average bounce rate: 37%</p>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="conversions">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Visits vs. Conversions</CardTitle>
              <CardDescription>Track conversions against website visits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={conversionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="visits" stroke="#8884d8" name="Visits" />
                    <Line yAxisId="right" type="monotone" dataKey="conversions" stroke="#82ca9d" name="Conversions" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Conversion Rate</CardTitle>
                <CardDescription>Percentage of visits that result in a conversion</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { month: "Jan", rate: 2.5 },
                        { month: "Feb", rate: 2.8 },
                        { month: "Mar", rate: 3.1 },
                        { month: "Apr", rate: 3.0 },
                        { month: "May", rate: 3.2 },
                        { month: "Jun", rate: 3.5 },
                      ]}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="rate" stroke="#22c55e" name="Conversion Rate (%)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">Current conversion rate: 3.5%</p>
              </div>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Conversion Pages</CardTitle>
                <CardDescription>Pages that lead to the most conversions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { page: "Pricing", conversions: 124, rate: 4.2 },
                    { page: "Contact Form", conversions: 98, rate: 3.8 },
                    { page: "Product Page", conversions: 76, rate: 3.5 },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{item.page}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {item.conversions.toLocaleString()} conversions
                        </div>
                      </div>
                      <div className="text-sm font-medium">{item.rate}%</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
