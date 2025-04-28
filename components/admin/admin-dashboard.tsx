"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, ShoppingCart, DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"

interface DashboardStats {
  totalUsers: number
  totalOrders: number
  totalRevenue: number
  activeUsers: number
  pendingOrders: number
  completedOrders: number
  cancelledOrders: number
  revenueChange: number
  userChange: number
  orderChange: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    activeUsers: 0,
    pendingOrders: 0,
    completedOrders: 0,
    cancelledOrders: 0,
    revenueChange: 0,
    userChange: 0,
    orderChange: 0,
  })

  useEffect(() => {
    // In a real app, you would fetch this data from your API
    // For demo purposes, we'll generate some data from localStorage

    // Get users
    const usersString = localStorage.getItem("users")
    const users = usersString ? JSON.parse(usersString) : []

    // Get orders
    const ordersString = localStorage.getItem("orders")
    const orders = ordersString ? JSON.parse(ordersString) : []

    // Calculate stats
    const totalUsers = users.length
    const totalOrders = orders.length
    const totalRevenue = orders.reduce((sum: number, order: any) => sum + (order.totalAmount || 0), 0)

    const activeUsers = users.filter(
      (user: any) => user.lastLogin && new Date(user.lastLogin) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    ).length

    const pendingOrders = orders.filter((order: any) => order.status === "pending").length
    const completedOrders = orders.filter((order: any) => order.status === "completed").length
    const cancelledOrders = orders.filter((order: any) => order.status === "cancelled").length

    // Simulate changes (in a real app, you would compare with previous period)
    const revenueChange = 12.5
    const userChange = 8.2
    const orderChange = -3.1

    setStats({
      totalUsers,
      totalOrders,
      totalRevenue,
      activeUsers,
      pendingOrders,
      completedOrders,
      cancelledOrders,
      revenueChange,
      userChange,
      orderChange,
    })
  }, [])

  // Sample data for charts
  const revenueData = [
    { name: "Jan", revenue: 4000 },
    { name: "Feb", revenue: 3000 },
    { name: "Mar", revenue: 5000 },
    { name: "Apr", revenue: 4500 },
    { name: "May", revenue: 6000 },
    { name: "Jun", revenue: 5500 },
    { name: "Jul", revenue: 7000 },
  ]

  const orderStatusData = [
    { name: "Pending", value: stats.pendingOrders },
    { name: "Completed", value: stats.completedOrders },
    { name: "Cancelled", value: stats.cancelledOrders },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FF8042"]

  const userActivityData = [
    { name: "Mon", users: 10 },
    { name: "Tue", users: 15 },
    { name: "Wed", users: 12 },
    { name: "Thu", users: 18 },
    { name: "Fri", users: 20 },
    { name: "Sat", users: 25 },
    { name: "Sun", users: 22 },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Users</p>
                <h3 className="text-2xl font-bold">{stats.totalUsers}</h3>
                <div className="flex items-center mt-1">
                  {stats.userChange > 0 ? (
                    <>
                      <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-xs text-green-500">{stats.userChange}%</span>
                    </>
                  ) : (
                    <>
                      <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                      <span className="text-xs text-red-500">{Math.abs(stats.userChange)}%</span>
                    </>
                  )}
                  <span className="text-xs text-gray-500 ml-1">vs last month</span>
                </div>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Orders</p>
                <h3 className="text-2xl font-bold">{stats.totalOrders}</h3>
                <div className="flex items-center mt-1">
                  {stats.orderChange > 0 ? (
                    <>
                      <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-xs text-green-500">{stats.orderChange}%</span>
                    </>
                  ) : (
                    <>
                      <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                      <span className="text-xs text-red-500">{Math.abs(stats.orderChange)}%</span>
                    </>
                  )}
                  <span className="text-xs text-gray-500 ml-1">vs last month</span>
                </div>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <ShoppingCart className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <h3 className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</h3>
                <div className="flex items-center mt-1">
                  {stats.revenueChange > 0 ? (
                    <>
                      <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-xs text-green-500">{stats.revenueChange}%</span>
                    </>
                  ) : (
                    <>
                      <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                      <span className="text-xs text-red-500">{Math.abs(stats.revenueChange)}%</span>
                    </>
                  )}
                  <span className="text-xs text-gray-500 ml-1">vs last month</span>
                </div>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Users</p>
                <h3 className="text-2xl font-bold">{stats.activeUsers}</h3>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-gray-500">Last 30 days</span>
                </div>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={orderStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {orderStatusData.map((entry, index) => (
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

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>User Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userActivityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="users" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
