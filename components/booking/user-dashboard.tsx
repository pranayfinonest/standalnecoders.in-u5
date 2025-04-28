"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Clock, LayoutDashboard, LogOut, ShoppingCart, User, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function UserDashboard() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [orders, setOrders] = useState([])
  const [cart, setCart] = useState([])
  const [profileFormData, setProfileFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    address: "",
  })
  const [editMode, setEditMode] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    if (!isLoggedIn) {
      router.push("/auth/login")
      return
    }

    // Load user data
    const userData = JSON.parse(localStorage.getItem("user") || "{}")
    if (!userData.email) {
      router.push("/auth/login")
      return
    }

    setUser(userData)
    setProfileFormData({
      name: userData.name || "",
      email: userData.email || "",
      phone: userData.phone || "",
      company: userData.company || "",
      address: userData.address || "",
    })

    // Load orders filtered by user email
    const allOrders = JSON.parse(localStorage.getItem("orders") || "[]")
    const userOrders = allOrders.filter((order) => order.customer && order.customer.email === userData.email)
    setOrders(userOrders)

    // Load cart items
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]")
    setCart(cartItems)

    setIsLoading(false)
  }, [router])

  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfileFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const saveProfile = () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      const updatedUser = {
        ...user,
        name: profileFormData.name,
        phone: profileFormData.phone,
        company: profileFormData.company,
        address: profileFormData.address,
      }

      // Update localStorage
      localStorage.setItem("user", JSON.stringify(updatedUser))
      setUser(updatedUser)

      // Update any orders with this user's info
      const allOrders = JSON.parse(localStorage.getItem("orders") || "[]")
      const updatedOrders = allOrders.map((order) => {
        if (order.customer && order.customer.email === user.email) {
          return {
            ...order,
            customer: {
              ...order.customer,
              name: profileFormData.name,
              phone: profileFormData.phone,
            },
          }
        }
        return order
      })

      localStorage.setItem("orders", JSON.stringify(updatedOrders))
      setOrders(updatedOrders.filter((order) => order.customer && order.customer.email === user.email))

      setIsSaving(false)
      setEditMode(false)

      toast({
        title: "Profile updated",
        description: "Your profile information has been saved successfully.",
      })
    }, 1000)
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

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("user")

    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })

    router.push("/")
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
          <p className="text-gray-600 dark:text-gray-400">Manage your account and website projects</p>
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
          <TabsTrigger value="profile">
            <User className="h-4 w-4 mr-2" /> My Profile
          </TabsTrigger>
          <TabsTrigger value="orders">
            <ShoppingCart className="h-4 w-4 mr-2" /> My Orders
          </TabsTrigger>
          <TabsTrigger value="cart">
            <CreditCard className="h-4 w-4 mr-2" /> My Cart
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Your Orders</CardTitle>
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
                <CardTitle className="text-lg">Cart Items</CardTitle>
                <CardDescription>Items ready to checkout</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{cart.length}</div>
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
                          {order.items?.map((item) => (
                            <div key={item.id} className="text-sm">
                              {item.template.name} - {item.customizations.businessName}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col justify-between items-end">
                        <div className="font-bold">₹{order.payment?.total}</div>
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

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.name || "User"}`}
                      alt={user?.name}
                    />
                    <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  <span>My Profile</span>
                </div>
                {!editMode ? (
                  <Button onClick={() => setEditMode(true)}>Edit Profile</Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setEditMode(false)}>
                      Cancel
                    </Button>
                    <Button onClick={saveProfile} disabled={isSaving}>
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                )}
              </CardTitle>
              <CardDescription>Manage your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  {editMode ? (
                    <Input id="name" name="name" value={profileFormData.name} onChange={handleProfileChange} />
                  ) : (
                    <div className="p-2 border rounded-md bg-gray-50 dark:bg-gray-800">{user?.name}</div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="p-2 border rounded-md bg-gray-50 dark:bg-gray-800">{user?.email}</div>
                  <p className="text-xs text-gray-500">Email cannot be changed</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  {editMode ? (
                    <Input id="phone" name="phone" value={profileFormData.phone} onChange={handleProfileChange} />
                  ) : (
                    <div className="p-2 border rounded-md bg-gray-50 dark:bg-gray-800">
                      {user?.phone || "Not provided"}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Company/Organization</Label>
                  {editMode ? (
                    <Input id="company" name="company" value={profileFormData.company} onChange={handleProfileChange} />
                  ) : (
                    <div className="p-2 border rounded-md bg-gray-50 dark:bg-gray-800">
                      {user?.company || "Not provided"}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                {editMode ? (
                  <Input id="address" name="address" value={profileFormData.address} onChange={handleProfileChange} />
                ) : (
                  <div className="p-2 border rounded-md bg-gray-50 dark:bg-gray-800">
                    {user?.address || "Not provided"}
                  </div>
                )}
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-2">Account Security</h3>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Password</p>
                    <p className="text-xs text-gray-500">Last changed: Never</p>
                  </div>
                  <Button variant="outline" disabled>
                    Change Password
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Account Actions</h3>
                <Button variant="destructive" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" /> Log Out of Account
                </Button>
              </div>
            </CardContent>
          </Card>
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
                          {order.items?.map((item) => (
                            <div key={item.id} className="text-sm">
                              {item.template.name} - {item.customizations.businessName}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col justify-between items-end">
                        <div className="font-bold">₹{order.payment?.total}</div>
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

        <TabsContent value="cart">
          <h2 className="text-xl font-bold mb-6">Your Cart</h2>

          {cart.length > 0 ? (
            <div>
              <div className="space-y-6 mb-8">
                {cart.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative w-full md:w-1/4 aspect-video rounded-md overflow-hidden">
                          <Image
                            src={item.template.image || "/placeholder.svg"}
                            alt={item.template.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-bold text-lg">{item.template.name}</h3>
                            <p className="font-bold">₹{item.price}</p>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{item.template.description}</p>

                          <div className="mt-4 space-y-2">
                            <p className="text-sm">
                              <span className="font-medium">Business:</span> {item.customizations.businessName}
                            </p>
                            {item.customizations.additionalPages?.length > 0 && (
                              <p className="text-sm">
                                <span className="font-medium">Additional Pages:</span>{" "}
                                {item.customizations.additionalPages.join(", ")}
                              </p>
                            )}
                            {item.customizations.selectedAddOns?.length > 0 && (
                              <p className="text-sm">
                                <span className="font-medium">Add-ons:</span>{" "}
                                {item.customizations.selectedAddOns.length} selected
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                  <p className="text-lg font-semibold">Total: ₹{cart.reduce((total, item) => total + item.price, 0)}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {cart.length} {cart.length === 1 ? "item" : "items"} in cart
                  </p>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" asChild>
                    <Link href="/booking/templates">Continue Shopping</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/booking/checkout">Proceed to Checkout</Link>
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-gray-600 dark:text-gray-400 mb-4">Your cart is empty.</p>
                <Button asChild>
                  <Link href="/booking/templates">Browse Templates</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
