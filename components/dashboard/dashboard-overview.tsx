"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
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
} from "recharts"
import {
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Users,
  Activity,
  DollarSign,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function DashboardOverview() {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [projects, setProjects] = useState([])
  const [analytics, setAnalytics] = useState({
    visitors: { total: 0, change: 0 },
    pageviews: { total: 0, change: 0 },
    conversionRate: { total: 0, change: 0 },
    revenue: { total: 0, change: 0 },
  })
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    if (!isLoggedIn) {
      router.push("/auth/login?redirect=/dashboard")
      return
    }

    // Load user data
    const userData = JSON.parse(localStorage.getItem("user") || "{}")
    if (!userData.email) {
      router.push("/auth/login?redirect=/dashboard")
      return
    }

    setUser(userData)

    // Load projects (orders)
    const allOrders = JSON.parse(localStorage.getItem("orders") || "[]")
    const userOrders = allOrders.filter((order) => order.customer && order.customer.email === userData.email)
    setProjects(userOrders)

    // Simulate loading analytics data
    setTimeout(() => {
      setAnalytics({
        visitors: { total: 1248, change: 12.5 },
        pageviews: { total: 5327, change: 8.2 },
        conversionRate: { total: 3.2, change: -1.1 },
        revenue: { total: 12499, change: 14.3 },
      })
      setIsLoading(false)
    }, 1000)
  }, [router])

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

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value)
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
          <h1 className="text-2xl font-bold">Dashboard Overview</h1>
          <p className="text-gray-600 dark:text-gray-400">Welcome back, {user?.name || "User"}!</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Export Data
          </Button>
          <Button size="sm">New Project</Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="mb-8">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
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
                      {analytics.visitors.change}%
                    </Badge>
                  )}
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">vs last week</span>
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
                      {analytics.pageviews.change}%
                    </Badge>
                  )}
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">vs last week</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    Conversion Rate
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.conversionRate.total}%</div>
                <div className="flex items-center mt-1">
                  {analytics.conversionRate.change > 0 ? (
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
                    >
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      {analytics.conversionRate.change}%
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800"
                    >
                      <ArrowDownRight className="h-3 w-3 mr-1" />
                      {Math.abs(analytics.conversionRate.change)}%
                    </Badge>
                  )}
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">vs last week</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-1" />
                    Revenue
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(analytics.revenue.total)}</div>
                <div className="flex items-center mt-1">
                  {analytics.revenue.change > 0 ? (
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
                    >
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      {analytics.revenue.change}%
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800"
                    >
                      <ArrowDownRight className="h-3 w-3 mr-1" />
                      {Math.abs(analytics.revenue.change)}%
                    </Badge>
                  )}
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">vs last week</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Visitor Chart */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Website Traffic</CardTitle>
              <CardDescription>Daily visitors and pageviews for the last 7 days</CardDescription>
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

          {/* Projects Overview */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Projects</CardTitle>
                <CardDescription>Your latest website development projects</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/projects">View All</Link>
              </Button>
            </CardHeader>
            <CardContent>
              {projects.length > 0 ? (
                <div className="space-y-4">
                  {projects.slice(0, 3).map((project) => (
                    <div
                      key={project.id}
                      className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex items-start gap-3">
                        <div className="rounded-md bg-gray-100 dark:bg-gray-800 p-2">
                          <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <div className="font-medium">
                            {project.items?.[0]?.template?.name || "Website Project"} -{" "}
                            {project.items?.[0]?.customizations?.businessName || "Untitled"}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {new Date(project.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          className={
                            project.status === "confirmed"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                              : project.status === "in-progress"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                                : project.status === "review"
                                  ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
                                  : project.status === "completed"
                                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                    : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
                          }
                        >
                          {project.status === "confirmed"
                            ? "Confirmed"
                            : project.status === "in-progress"
                              ? "In Progress"
                              : project.status === "review"
                                ? "Under Review"
                                : project.status === "completed"
                                  ? "Completed"
                                  : project.status}
                        </Badge>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/dashboard/projects/${project.id}`}>View</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No projects found</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">You haven't created any website projects yet.</p>
                  <Button asChild>
                    <Link href="/booking/templates">Create a Project</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
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
                <CardTitle>Page Performance</CardTitle>
                <CardDescription>Most visited pages on your website</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { page: "Homepage", views: 2341, change: 12.5 },
                    { page: "Services", views: 1432, change: 8.3 },
                    { page: "About Us", views: 1021, change: -2.1 },
                    { page: "Contact", views: 643, change: 5.7 },
                    { page: "Blog", views: 489, change: 15.2 },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{item.page}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {item.views.toLocaleString()} views
                        </div>
                      </div>
                      <div className="flex items-center">
                        {item.change > 0 ? (
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
                          >
                            <ArrowUpRight className="h-3 w-3 mr-1" />
                            {item.change}%
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800"
                          >
                            <ArrowDownRight className="h-3 w-3 mr-1" />
                            {Math.abs(item.change)}%
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Pageviews Over Time</CardTitle>
              <CardDescription>Daily pageviews for the last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={pageViewData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" name="Pageviews" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects">
          <div className="space-y-6">
            {projects.length > 0 ? (
              projects.map((project) => (
                <Card key={project.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-bold text-lg">
                            {project.items?.[0]?.template?.name || "Website Project"} -{" "}
                            {project.items?.[0]?.customizations?.businessName || "Untitled"}
                          </h3>
                          <Badge
                            className={
                              project.status === "confirmed"
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                                : project.status === "in-progress"
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                                  : project.status === "review"
                                    ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
                                    : project.status === "completed"
                                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                      : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
                            }
                          >
                            {project.status === "confirmed"
                              ? "Confirmed"
                              : project.status === "in-progress"
                                ? "In Progress"
                                : project.status === "review"
                                  ? "Under Review"
                                  : project.status === "completed"
                                    ? "Completed"
                                    : project.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          <Clock className="inline h-4 w-4 mr-1" /> Order Date:{" "}
                          {new Date(project.date).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Order #: {project.id}</p>

                        {project.status === "in-progress" && (
                          <div className="mb-4">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Progress</span>
                              <span>45%</span>
                            </div>
                            <Progress value={45} className="h-2" />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col justify-between items-end">
                        <div className="font-bold text-lg">{formatCurrency(project.payment?.total || 0)}</div>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/dashboard/projects/${project.id}`}>View Details</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No projects found</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">You haven't created any website projects yet.</p>
                  <Button asChild>
                    <Link href="/booking/templates">Create a Project</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
