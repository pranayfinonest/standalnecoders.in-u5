"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowRight, Calendar, CheckCircle, FileText, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

export default function OrderConfirmation() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { toast } = useToast()
  const orderId = searchParams.get("orderId")
  const [order, setOrder] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [currentUserEmail, setCurrentUserEmail] = useState("")

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    if (!isLoggedIn) {
      router.push("/auth/login")
      return
    }

    // Get current user email
    const userData = JSON.parse(localStorage.getItem("user") || "{}")
    setCurrentUserEmail(userData.email || "")

    if (!orderId) {
      router.push("/booking/dashboard")
      return
    }

    // Load order from localStorage
    const orders = JSON.parse(localStorage.getItem("orders") || "[]")
    const foundOrder = orders.find((o) => o.id === orderId)

    if (foundOrder) {
      // Only allow access if this order belongs to the current user
      if (foundOrder.customer && foundOrder.customer.email === userData.email) {
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
      router.push("/booking/dashboard")
    }

    setIsLoading(false)
  }, [orderId, router, toast])

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
          <Button asChild>
            <Link href="/booking/dashboard">Go to Dashboard</Link>
          </Button>
        </div>
      </div>
    )
  }

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

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mb-4">
            <CheckCircle className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Thank you for your order. We've received your request and will begin working on it shortly.
          </p>
          <p className="text-lg font-medium">Order #{order.id}</p>
        </div>

        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Order Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Order Date</span>
                </div>
                <p className="font-medium">{formatDate(order.date)}</p>
              </div>

              <div>
                <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                  <User className="h-4 w-4 mr-2" />
                  <span>Customer</span>
                </div>
                <p className="font-medium">{order.customer.name}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{order.customer.email}</p>
                {order.customer.phone && (
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{order.customer.phone}</p>
                )}
              </div>
            </div>

            <Separator className="my-6" />

            <h3 className="font-bold mb-4">Order Items</h3>

            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{item.template.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.customizations.businessName}</p>
                  </div>
                  <p className="font-medium">₹{item.price}</p>
                </div>
              ))}
            </div>

            <Separator className="my-6" />

            <div className="flex justify-between items-center font-bold text-lg">
              <span>Total</span>
              <span>₹{order.payment.total}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">What's Next?</h2>

            <ol className="space-y-6">
              <li className="flex">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mr-4">
                  1
                </div>
                <div>
                  <h3 className="font-bold mb-1">Order Review</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Our team will review your order details and requirements within 24 hours.
                  </p>
                </div>
              </li>

              <li className="flex">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mr-4">
                  2
                </div>
                <div>
                  <h3 className="font-bold mb-1">Initial Design</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    We'll create an initial design based on your requirements and share it with you for feedback.
                  </p>
                </div>
              </li>

              <li className="flex">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mr-4">
                  3
                </div>
                <div>
                  <h3 className="font-bold mb-1">Revisions & Finalization</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    After receiving your feedback, we'll make necessary revisions and finalize the design.
                  </p>
                </div>
              </li>

              <li className="flex">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mr-4">
                  4
                </div>
                <div>
                  <h3 className="font-bold mb-1">Website Launch</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Once approved, we'll launch your website and provide you with all necessary access details.
                  </p>
                </div>
              </li>
            </ol>
          </CardContent>
        </Card>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/booking/dashboard">
              Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact">
              <FileText className="mr-2 h-4 w-4" /> Contact Support
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
