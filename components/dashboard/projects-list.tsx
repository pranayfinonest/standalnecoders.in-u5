"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, AlertCircle, Search, Filter } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ProjectsList() {
  const [isLoading, setIsLoading] = useState(true)
  const [projects, setProjects] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    if (!isLoggedIn) {
      router.push("/auth/login?redirect=/dashboard/projects")
      return
    }

    // Load user data
    const userData = JSON.parse(localStorage.getItem("user") || "{}")
    if (!userData.email) {
      router.push("/auth/login?redirect=/dashboard/projects")
      return
    }

    // Load projects (orders)
    const allOrders = JSON.parse(localStorage.getItem("orders") || "[]")
    const userOrders = allOrders.filter((order) => order.customer && order.customer.email === userData.email)
    setProjects(userOrders)
    setFilteredProjects(userOrders)
    setIsLoading(false)
  }, [router])

  useEffect(() => {
    // Filter projects based on search query and status filter
    let filtered = [...projects]

    if (searchQuery) {
      filtered = filtered.filter(
        (project) =>
          (project.items?.[0]?.template?.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
          (project.items?.[0]?.customizations?.businessName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.id.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((project) => project.status === statusFilter)
    }

    setFilteredProjects(filtered)
  }, [searchQuery, statusFilter, projects])

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value)
  }

  const handleViewProject = (projectId) => {
    // Navigate to the project detail page
    router.push(`/dashboard/projects/${projectId}`)

    // Scroll to top of the page
    window.scrollTo(0, 0)
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <div className="animate-pulse h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
        <div className="animate-pulse h-16 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
        ))}
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold">Your Projects</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage and track your website development projects</p>
        </div>
        <Button asChild onClick={() => window.scrollTo(0, 0)}>
          <Link href="/booking/templates">Create New Project</Link>
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search projects..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-500" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Projects</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="review">Under Review</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projects List */}
      <div className="space-y-4">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-md transition-shadow duration-200">
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
                    <Button variant="outline" size="sm" onClick={() => handleViewProject(project.id)}>
                      View Details
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
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                {projects.length > 0
                  ? "No projects match your current filters. Try adjusting your search criteria."
                  : "You haven't created any website projects yet."}
              </p>
              {projects.length === 0 && (
                <Button asChild onClick={() => window.scrollTo(0, 0)}>
                  <Link href="/booking/templates">Create a Project</Link>
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
