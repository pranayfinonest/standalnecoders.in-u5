"use client"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowRight, Calendar, CheckCircle, Clock, CreditCard, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Suspense } from "react"

export default function OrderConfirmation() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const [order, setOrder] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real app, you would fetch the order from your API
    // For this demo, we'll get it from localStorage
    if (orderId) {
      const orders = JSON.parse(localStorage.getItem("orders") || "[]")
      const foundOrder = orders.find((o) => o.id === orderId)
      setOrder(foundOrder || null)
    }
    setIsLoading(false)
  }, [orderId])

  return (
    <Suspense fallback={null}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {isLoading ? (
            <div className="container mx-auto px-4 py-12 flex justify-center">
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          ) : !order ? (
            <div className="container mx-auto px-4 py-12">
              <div className="max-w-md mx-auto text-center">
                <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  We couldn't find the order you're looking for. Please check the order ID and try again.
                </p>
                <Button asChild>
                  <Link href="/booking/dashboard">Go to Dashboard</Link>
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 mb-4">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Thank you for your order. We've received your payment and are processing your request.
                </p>
              </div>

              <Card className="mb-8">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-bold mb-2">Order #{order.id}</h2>
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>
                          Placed on{" "}
                          {new Date(order.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <Badge
                        variant="outline"
                        className="text-green-600 dark:text-green-400 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20"
                      >
                        {order.status}
                      </Badge>
                    </div>
                  </div>

                  <Separator className="mb-6" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h3 className="font-bold mb-2">Customer Information</h3>
                      <p>{order.customer.name}</p>
                      <p>{order.customer.email}</p>
                      <p>{order.customer.phone}</p>
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Billing Address</h3>
                      <p>{order.billing.address}</p>
                      <p>
                        {order.billing.city}, {order.billing.state} {order.billing.postalCode}
                      </p>
                      <p>{order.billing.country}</p>
                    </div>
                  </div>

                  <Separator className="mb-6" />

                  <div className="mb-6">
                    <h3 className="font-bold mb-4">Order Items</h3>
                    <div className="space-y-4">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex justify-between">
                          <div>
                            <p className="font-medium">{item.template.name}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{item.template.description}</p>
                          </div>
                          <p className="font-medium">₹{item.price.toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator className="mb-6" />

                  <div className="mb-6">
                    <h3 className="font-bold mb-4">Payment Information</h3>
                    <div className="flex items-start gap-2">
                      <CreditCard className="h-5 w-5 mt-0.5 text-gray-600 dark:text-gray-400" />
                      <div>
                        <p className="font-medium">
                          {order.payment.method === "razorpay"
                            ? "Paid with Razorpay"
                            : order.payment.method === "bank"
                              ? "Bank Transfer"
                              : "Cash on Delivery"}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Total: ₹{order.payment.total.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Separator className="mb-6" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-2">
                      <Clock className="h-5 w-5 mt-0.5 text-gray-600 dark:text-gray-400" />
                      <div>
                        <p className="font-medium">Estimated Delivery</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {new Date(new Date(order.date).getTime() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString(
                            "en-US",
                            { year: "numeric", month: "long", day: "numeric" },
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <FileText className="h-5 w-5 mt-0.5 text-gray-600 dark:text-gray-400" />
                      <div>
                        <p className="font-medium">Order Updates</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          You'll receive updates via email at {order.customer.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Button asChild variant="outline">
                  <Link href="/booking/dashboard">View Your Orders</Link>
                </Button>
                <Button asChild>
                  <Link href="/">
                    Continue Shopping <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </Suspense>
  )
}
