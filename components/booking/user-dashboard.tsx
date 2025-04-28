"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Clock, LayoutDashboard, LogOut, Settings, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

export default function UserDashboard() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [orders, setOrders] = useState([])

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    if (!isLoggedIn) {
      router.push("/auth/login")
      return
    }

    // Load user data
    const userData = JSON.parse(localStorage.getItem("user") || "{}")
    setUser(userData)

    // Load orders
    const ordersData = JSON.parse(localStorage.getItem("orders") || "[]")
    setOrders(ordersData)

    setIsLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("user")

    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })

    router.push("/")
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      case "in-progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
      case "review":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400"
      case "completed":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold">Welcome, {user?.name || "User"}</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your website projects and orders</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/booking/templates">
              <ShoppingCart className="mr-2 h-4 w-4" /> Browse Templates
            </Link>
          </Button>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>
      </div>

      <Tabs defaultValue="dashboard">
        <TabsList className="mb-8">
          <TabsTrigger value="dashboard">
            <LayoutDashboard className="h-4 w-4 mr-2" /> Dashboard
          </TabsTrigger>
          <TabsTrigger value="orders">
            <ShoppingCart className="h-4 w-4 mr-2" /> Orders
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="h-4 w-4 mr-2" /> Account Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Orders</CardTitle>
                <CardDescription>Your website projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{orders.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">In Progress</CardTitle>
                <CardDescription>Projects being worked on</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {orders.filter((order) => order.status === "in-progress").length}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Completed</CardTitle>
                <CardDescription>Finished projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {orders.filter((order) => order.status === "completed").length}
                </div>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-xl font-bold mb-4">Recent Orders</h2>

          {orders.length > 0 ? (
            <div className="space-y-4">
              {orders.slice(0, 3).map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-bold">Order #{order.id}</h3>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status === "confirmed"
                              ? "Confirmed"
                              : order.status === "in-progress"
                                ? "In Progress"
                                : order.status === "review"
                                  ? "Under Review"
                                  : order.status === "completed"
                                    ? "Completed"
                                    : order.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          <Clock className="inline h-4 w-4 mr-1" /> {formatDate(order.date)}
                        </p>
                        <div className="space-y-1">
                          {order.items.map((item) => (
                            <div key={item.id} className="text-sm">
                              {item.template.name} - {item.customizations.businessName}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col justify-between items-end">
                        <div className="font-bold">₹{order.payment.total}</div>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/booking/orders/${order.id}`}>View Details</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {orders.length > 3 && (
                <div className="text-center mt-6">
                  <Button variant="outline" asChild>
                    <Link href="#orders" onClick={() => document.querySelector('[data-value="orders"]').click()}>
                      View All Orders <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-gray-600 dark:text-gray-400 mb-4">You haven't placed any orders yet.</p>
                <Button asChild>
                  <Link href="/booking/templates">Browse Website Templates</Link>
                </Button>
              </CardContent>
            </Card>
          )}

          <h2 className="text-xl font-bold mt-12 mb-4">Recommended Templates</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                id: 1,
                name: "Business Pro",
                description: "Professional template for established businesses",
                image: "/templates/business-template.png",
                price: 599,
              },
              {
                id: 2,
                name: "E-Commerce Plus",
                description: "Complete solution for online stores",
                image: "/templates/ecommerce-template.png",
                price: 899,
              },
              {
                id: 3,
                name: "Portfolio Minimal",
                description: "Clean showcase for creative professionals",
                image: "/templates/portfolio-template.png",
                price: 499,
              },
            ].map((template) => (
              <Card key={template.id} className="overflow-hidden">
                <div className="relative h-40">
                  <Image src={template.image || "/placeholder.svg"} alt={template.name} fill className="object-cover" />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold">{template.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{template.description}</p>
                  <p className="font-bold">₹{template.price}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href={`/booking/customize?template=${template.id}`}>Select & Customize</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="orders">
          <h2 className="text-xl font-bold mb-6">Your Orders</h2>

          {orders.length > 0 ? (
            <div className="space-y-6">
              {orders.map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-bold">Order #{order.id}</h3>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status === "confirmed"
                              ? "Confirmed"
                              : order.status === "in-progress"
                                ? "In Progress"
                                : order.status === "review"
                                  ? "Under Review"
                                  : order.status === "completed"
                                    ? "Completed"
                                    : order.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          <Clock className="inline h-4 w-4 mr-1" /> {formatDate(order.date)}
                        </p>
                        <div className="space-y-1">
                          {order.items.map((item) => (
                            <div key={item.id} className="text-sm">
                              {item.template.name} - {item.customizations.businessName}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col justify-between items-end">
                        <div className="font-bold">₹{order.payment.total}</div>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/booking/orders/${order.id}`}>View Details</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-gray-600 dark:text-gray-400 mb-4">You haven't placed any orders yet.</p>
                <Button asChild>
                  <Link href="/booking/templates">Browse Website Templates</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account details and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                  value={user?.name || ""}
                  readOnly
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <input
                  type="email"
                  className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                  value={user?.email || ""}
                  readOnly
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <input
                  type="password"
                  className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                  value="••••••••"
                  readOnly
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" disabled>
                Change Password
              </Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
