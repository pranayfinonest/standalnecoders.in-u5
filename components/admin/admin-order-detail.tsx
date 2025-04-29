"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Check, Clock, Edit, Trash2, Download, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { scrollToTop } from "@/utils/scroll-utils"

export default function AdminOrderDetail({ orderId }) {
  const router = useRouter()
  const { toast } = useToast()
  const [order, setOrder] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditOrderOpen, setIsEditOrderOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [editedStatus, setEditedStatus] = useState("")

  useEffect(() => {
    // Scroll to top when component mounts
    scrollToTop()

    // Check if admin is logged in
    const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true"
    if (!isAdminLoggedIn) {
      router.push("/admin/login")
      return
    }

    if (!orderId) {
      router.push("/admin/orders")
      return
    }

    // Load order from localStorage
    const orders = JSON.parse(localStorage.getItem("orders") || "[]")
    const foundOrder = orders.find((o) => o.id === orderId)

    if (foundOrder) {
      setOrder(foundOrder)
      setEditedStatus(foundOrder.status)
    } else {
      toast({
        title: "Order not found",
        description: "The requested order could not be found.",
        variant: "destructive",
      })
      router.push("/admin/orders")
    }

    setIsLoading(false)
  }, [orderId, router, toast])

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
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

  const handleUpdateStatus = () => {
    if (!order) return

    const updatedOrders = JSON.parse(localStorage.getItem("orders") || "[]").map((o) =>
      o.id === order.id ? { ...o, status: editedStatus } : o,
    )

    localStorage.setItem("orders", JSON.stringify(updatedOrders))
    setOrder({ ...order, status: editedStatus })
    setIsEditOrderOpen(false)

    toast({
      title: "Order updated",
      description: "The order status has been updated successfully.",
    })
  }

  const handleDeleteOrder = () => {
    if (!order) return

    const updatedOrders = JSON.parse(localStorage.getItem("orders") || "[]").filter((o) => o.id !== order.id)
    localStorage.setItem("orders", JSON.stringify(updatedOrders))
    setIsDeleteDialogOpen(false)

    toast({
      title: "Order deleted",
      description: "The order has been deleted successfully.",
    })

    router.push("/admin/orders")
    scrollToTop()
  }

  const handleSendEmail = () => {
    toast({
      title: "Email sent",
      description: `Email notification sent to ${order.customer?.email}`,
    })
  }

  const handlePrintOrder = () => {
    window.print()
  }

  const handleBackToOrders = () => {
    router.push("/admin/orders")
    scrollToTop()
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-2xl font-bold mb-4">Order Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">The requested order could not be found.</p>
        <Button asChild onClick={() => scrollToTop()}>
          <Link href="/admin/orders">Back to Orders</Link>
        </Button>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="flex items-center mb-4 md:mb-0">
          <Button variant="ghost" className="mr-4" onClick={handleBackToOrders}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Orders
          </Button>
          <h1 className="text-2xl font-bold">Order #{order.id}</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={handlePrintOrder}>
            <Download className="mr-2 h-4 w-4" /> Print Order
          </Button>
          <Button variant="outline" onClick={handleSendEmail}>
            <Mail className="mr-2 h-4 w-4" /> Send Email
          </Button>
          <Button variant="outline" onClick={() => setIsEditOrderOpen(true)}>
            <Edit className="mr-2 h-4 w-4" /> Update Status
          </Button>
          <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(true)}>
            <Trash2 className="mr-2 h-4 w-4" /> Delete Order
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
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
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="inline h-4 w-4 mr-1" /> {formatDate(order.date)}
                </div>
              </div>

              <div className="mb-4">
                <Progress value={getProgressPercentage(order.status)} className="h-3" />
              </div>

              <div className="grid grid-cols-4 gap-2 text-center text-sm">
                <div className={order.status ? "font-medium text-green-600" : ""}>
                  <div className="flex justify-center mb-1">
                    <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <Check className="h-4 w-4" />
                    </div>
                  </div>
                  Confirmed
                </div>
                <div className={order.status === "in-progress" ? "font-medium text-green-600" : ""}>
                  <div className="flex justify-center mb-1">
                    <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <Check className="h-4 w-4" />
                    </div>
                  </div>
                  In Progress
                </div>
                <div className={order.status === "review" ? "font-medium text-green-600" : ""}>
                  <div className="flex justify-center mb-1">
                    <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <Check className="h-4 w-4" />
                    </div>
                  </div>
                  Under Review
                </div>
                <div className={order.status === "completed" ? "font-medium text-green-600" : ""}>
                  <div className="flex justify-center mb-1">
                    <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <Check className="h-4 w-4" />
                    </div>
                  </div>
                  Completed
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Template</h3>
                    <p className="mt-1 font-medium">{order.items?.[0]?.template?.name || "Custom Website"}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Price</h3>
                    <p className="mt-1 font-medium">{formatCurrency(order.payment?.total || 0)}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Order Date</h3>
                    <p className="mt-1 font-medium">{formatDate(order.date)}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Payment Method</h3>
                    <p className="mt-1 font-medium">{order.payment?.method || "Credit Card"}</p>
                  </div>
                </div>

                {order.items?.[0]?.customizations && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Customizations</h3>
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-md p-3">
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        {Object.entries(order.items[0].customizations).map(([key, value]) => (
                          <li key={key}>
                            <span className="font-medium">{key}:</span> {value}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</h3>
                  <p className="mt-1 font-medium">{order.customer?.name || "N/A"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</h3>
                  <p className="mt-1 font-medium">{order.customer?.email || "N/A"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</h3>
                  <p className="mt-1 font-medium">{order.customer?.phone || "N/A"}</p>
                </div>
                {order.customer?.company && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Company</h3>
                    <p className="mt-1 font-medium">{order.customer.company}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {order.notes || "No additional notes for this order."}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Edit Order Status Dialog */}
      <Dialog open={isEditOrderOpen} onOpenChange={setIsEditOrderOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Order Status</DialogTitle>
            <DialogDescription>Change the current status of order #{order?.id}</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Select value={editedStatus} onValueChange={setEditedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="review">Under Review</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOrderOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateStatus}>Update Status</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Order Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Order</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete order #{order?.id}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteOrder}>
              Delete Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
