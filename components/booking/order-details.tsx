"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, Check, Clock, ShieldCheck, User, FileText, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Progress } from "@/components/ui/progress"
import { formatCurrency } from "@/utils/currency"

export default function OrderDetails({ orderId }) {
  const router = useRouter()
  const { toast } = useToast()
  const [order, setOrder] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0)

    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    if (!isLoggedIn) {
      router.push("/auth/login")
      return
    }

    // Get current user email
    const userData = JSON.parse(localStorage.getItem("user") || "{}")
    const userEmail = userData.email || ""

    if (!orderId) {
      router.push("/booking/dashboard")
      return
    }

    // Load order from localStorage
    const orders = JSON.parse(localStorage.getItem("orders") || "[]")
    const foundOrder = orders.find((o) => o.id === orderId)

    if (foundOrder) {
      // Only allow access if this order belongs to the current user
      if (foundOrder.customer && foundOrder.customer.email === userEmail) {
        setOrder(foundOrder)
      } else {
        // Order doesn't belong to current user
        toast({
          title: "Access denied",
          description: "You don't have permission to view this order.",
          variant: "destructive",
        })
        router.push("/booking/dashboard")
      }
    } else {
      toast({
        title: "Order not found",
        description: "The requested order could not be found.",
        variant: "destructive",
      })
      router.push("/booking/dashboard")
    }

    setIsLoading(false)
  }, [orderId, router, toast])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
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

  const getProgressPercentage = (status) => {
    switch (status) {
      case "confirmed":
        return 25
      case "in-progress":
        return 50
      case "review":
        return 75
      case "completed":
        return 100
      default:
        return 25
    }
  }

  const handleBackToDashboard = () => {
    router.push("/dashboard/projects")
    window.scrollTo(0, 0)
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

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">We couldn't find the order you're looking for.</p>
          <Button asChild onClick={() => window.scrollTo(0, 0)}>
            <Link href="/dashboard/projects">Go to Dashboard</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <Button variant="ghost" className="mb-6" onClick={handleBackToDashboard}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-3xl font-bold">Order #{order.id}</h1>
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
            <p className="text-gray-600 dark:text-gray-400 flex items-center">
              <Clock className="inline h-4 w-4 mr-1" /> Placed on {formatDate(order.date)}
            </p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Download className="h-4 w-4" /> Invoice
            </Button>
            <Button variant="outline" asChild onClick={() => window.scrollTo(0, 0)}>
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card className="mb-8 border-0 shadow-md">
              <CardHeader className="bg-gray-50 dark:bg-gray-800/50 px-6 py-4">
                <CardTitle>Order Progress</CardTitle>
                <CardDescription>Track the status of your order</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-6">
                  <Progress value={getProgressPercentage(order.status)} className="h-3" />
                </div>

                <div className="grid grid-cols-4 gap-2 text-center text-sm">
                  <div className={order.status ? "font-medium text-green-600" : ""}>
                    <div className="flex justify-center mb-1">
                      <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                    </div>
                    Confirmed
                    <p className="text-xs text-gray-500 mt-1">Order received</p>
                  </div>

                  <div
                    className={
                      order.status === "in-progress" || order.status === "review" || order.status === "completed"
                        ? "font-medium text-green-600"
                        : ""
                    }
                  >
                    <div className="flex justify-center mb-1">
                      <div
                        className={`w-8 h-8 rounded-full ${order.status === "in-progress" || order.status === "review" || order.status === "completed" ? "bg-green-100 dark:bg-green-900/30" : "bg-gray-100 dark:bg-gray-800"} flex items-center justify-center`}
                      >
                        {order.status === "in-progress" || order.status === "review" || order.status === "completed" ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <span>2</span>
                        )}
                      </div>
                    </div>
                    In Progress
                    <p className="text-xs text-gray-500 mt-1">Development started</p>
                  </div>

                  <div
                    className={
                      order.status === "review" || order.status === "completed" ? "font-medium text-green-600" : ""
                    }
                  >
                    <div className="flex justify-center mb-1">
                      <div
                        className={`w-8 h-8 rounded-full ${order.status === "review" || order.status === "completed" ? "bg-green-100 dark:bg-green-900/30" : "bg-gray-100 dark:bg-gray-800"} flex items-center justify-center`}
                      >
                        {order.status === "review" || order.status === "completed" ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <span>3</span>
                        )}
                      </div>
                    </div>
                    Review
                    <p className="text-xs text-gray-500 mt-1">Client feedback</p>
                  </div>

                  <div className={order.status === "completed" ? "font-medium text-green-600" : ""}>
                    <div className="flex justify-center mb-1">
                      <div
                        className={`w-8 h-8 rounded-full ${order.status === "completed" ? "bg-green-100 dark:bg-green-900/30" : "bg-gray-100 dark:bg-gray-800"} flex items-center justify-center`}
                      >
                        {order.status === "completed" ? <Check className="h-4 w-4 text-green-600" /> : <span>4</span>}
                      </div>
                    </div>
                    Completed
                    <p className="text-xs text-gray-500 mt-1">Project delivered</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8 border-0 shadow-md">
              <CardHeader className="bg-gray-50 dark:bg-gray-800/50 px-6 py-4">
                <CardTitle>Order Details</CardTitle>
                <CardDescription>Items and pricing information</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                {order.items &&
                  order.items.map((item, index) => (
                    <div key={item.id} className={`p-6 ${index !== 0 ? "border-t" : ""}`}>
                      <div className="flex justify-between">
                        <div>
                          <h4 className="font-medium text-lg">{item.template?.name || "Custom Website"}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {item.template?.description || "Custom website development"}
                          </p>

                          {item.customizations && (
                            <div className="mt-4 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                              <h5 className="text-sm font-medium mb-2">Customizations</h5>
                              <ul className="space-y-1 text-sm">
                                {item.customizations.businessName && (
                                  <li>
                                    <span className="font-medium">Business Name:</span>{" "}
                                    {item.customizations.businessName}
                                  </li>
                                )}
                                {item.customizations.businessType && (
                                  <li>
                                    <span className="font-medium">Business Type:</span>{" "}
                                    {item.customizations.businessType}
                                  </li>
                                )}
                                {item.customizations.additionalPages?.length > 0 && (
                                  <li>
                                    <span className="font-medium">Additional Pages:</span>{" "}
                                    {item.customizations.additionalPages.join(", ")}
                                  </li>
                                )}
                                {item.customizations.selectedAddOns?.length > 0 && (
                                  <li>
                                    <span className="font-medium">Add-ons:</span>{" "}
                                    {item.customizations.selectedAddOns.length} selected
                                  </li>
                                )}
                              </ul>
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-lg">{formatCurrency(item.price || 0)}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Base price: {formatCurrency(item.template?.basePrice || 0)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                <div className="p-6 border-t">
                  <div className="flex justify-between">
                    <span className="font-medium">Subtotal:</span>
                    <span>{formatCurrency(order.payment?.total || 0)}</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="font-medium">GST (18%):</span>
                    <span>{formatCurrency(Math.round((order.payment?.total || 0) * 0.18))}</span>
                  </div>
                  <Separator className="my-4" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>{formatCurrency(order.payment?.total || 0)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8 border-0 shadow-md">
              <CardHeader className="bg-gray-50 dark:bg-gray-800/50 px-6 py-4">
                <CardTitle>Project Timeline</CardTitle>
                <CardDescription>Estimated delivery schedule</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="flex">
                    <div className="mr-4 flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="h-full w-0.5 bg-gray-200 dark:bg-gray-700 mt-2"></div>
                    </div>
                    <div>
                      <h4 className="font-medium">Order Placed</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{formatDate(order.date)}</p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="mr-4 flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full ${order.status === "in-progress" || order.status === "review" || order.status === "completed" ? "bg-green-100 dark:bg-green-900/30" : "bg-gray-100 dark:bg-gray-800"} flex items-center justify-center`}
                      >
                        {order.status === "in-progress" || order.status === "review" || order.status === "completed" ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <span className="text-sm">2</span>
                        )}
                      </div>
                      <div className="h-full w-0.5 bg-gray-200 dark:bg-gray-700 mt-2"></div>
                    </div>
                    <div>
                      <h4 className="font-medium">Development Started</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {order.status === "in-progress" || order.status === "review" || order.status === "completed"
                          ? "In progress"
                          : "Estimated to start within 2 business days"}
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="mr-4 flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full ${order.status === "review" || order.status === "completed" ? "bg-green-100 dark:bg-green-900/30" : "bg-gray-100 dark:bg-gray-800"} flex items-center justify-center`}
                      >
                        {order.status === "review" || order.status === "completed" ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <span className="text-sm">3</span>
                        )}
                      </div>
                      <div className="h-full w-0.5 bg-gray-200 dark:bg-gray-700 mt-2"></div>
                    </div>
                    <div>
                      <h4 className="font-medium">Review Phase</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {order.status === "review" || order.status === "completed"
                          ? "Ready for your feedback"
                          : "Estimated in 7-10 business days"}
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="mr-4 flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full ${order.status === "completed" ? "bg-green-100 dark:bg-green-900/30" : "bg-gray-100 dark:bg-gray-800"} flex items-center justify-center`}
                      >
                        {order.status === "completed" ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <span className="text-sm">4</span>
                        )}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium">Project Delivery</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {order.status === "completed" ? "Completed and delivered" : "Estimated within 14 business days"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-1">
            <div className="sticky top-24 space-y-6">
              <Card className="border-0 shadow-md">
                <CardHeader className="bg-gray-50 dark:bg-gray-800/50 px-6 py-4">
                  <CardTitle>Customer Information</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                        <User className="h-4 w-4 mr-2" />
                        <span className="text-sm font-medium">Contact Details</span>
                      </div>
                      <p className="font-medium">{order.customer?.name || "N/A"}</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{order.customer?.email || "N/A"}</p>
                      {order.customer?.phone && (
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{order.customer.phone}</p>
                      )}
                    </div>

                    {order.billing && (
                      <div>
                        <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span className="text-sm font-medium">Billing Address</span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {order.billing.address}
                          <br />
                          {order.billing.city}, {order.billing.state}
                          <br />
                          {order.billing.postalCode}, {order.billing.country}
                        </p>
                      </div>
                    )}

                    <div>
                      <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                        <ShieldCheck className="h-4 w-4 mr-2" />
                        <span className="text-sm font-medium">Payment Method</span>
                      </div>
                      <p className="font-medium capitalize">
                        {order.payment?.method === "card"
                          ? "Credit/Debit Card"
                          : order.payment?.method === "upi"
                            ? "UPI Payment"
                            : order.payment?.method === "netbanking"
                              ? "Net Banking"
                              : order.payment?.method || "N/A"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardHeader className="bg-gray-50 dark:bg-gray-800/50 px-6 py-4">
                  <CardTitle>Documents</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <FileText className="h-4 w-4 mr-2" /> Invoice
                    </Button>
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <FileText className="h-4 w-4 mr-2" /> Project Brief
                    </Button>
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <FileText className="h-4 w-4 mr-2" /> Contract
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardHeader className="bg-gray-50 dark:bg-gray-800/50 px-6 py-4">
                  <CardTitle>Need Help?</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    If you have any questions or concerns about your order, our support team is here to help.
                  </p>
                  <Button className="w-full" asChild onClick={() => window.scrollTo(0, 0)}>
                    <Link href="/contact">Contact Support</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
