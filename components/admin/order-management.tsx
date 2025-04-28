"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, MoreHorizontal, Trash2, Edit, Eye, ArrowUpDown, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function OrderManagement() {
  const router = useRouter()
  const { toast } = useToast()
  const [orders, setOrders] = useState([])
  const [filteredOrders, setFilteredOrders] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("date")
  const [sortOrder, setSortOrder] = useState("desc")
  const [isEditOrderOpen, setIsEditOrderOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)

  useEffect(() => {
    // Load orders from localStorage
    const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]")

    // If no orders in localStorage, create a default array with sample orders
    if (storedOrders.length === 0) {
      const defaultOrders = [
        {
          id: "ORD-123456",
          customer: {
            name: "John Doe",
            email: "john@example.com",
            phone: "+91 9876543210",
          },
          items: [
            {
              id: 1,
              template: {
                name: "Business Pro",
                description: "Professional template for established businesses",
                image: "/templates/business-template.png",
                basePrice: 599,
              },
              customizations: {
                businessName: "Acme Corp",
                businessType: "Technology",
                additionalPages: ["Team", "FAQ"],
                selectedAddOns: [1, 3],
              },
              price: 799,
            },
          ],
          payment: {
            method: "card",
            total: 799,
          },
          status: "confirmed",
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
        },
        {
          id: "ORD-123457",
          customer: {
            name: "Jane Smith",
            email: "jane@example.com",
            phone: "+91 9876543211",
          },
          items: [
            {
              id: 2,
              template: {
                name: "E-Commerce Plus",
                description: "Complete solution for online stores",
                image: "/templates/ecommerce-template.png",
                basePrice: 899,
              },
              customizations: {
                businessName: "Fashion Boutique",
                businessType: "Retail",
                additionalPages: ["About", "Contact", "Policies"],
                selectedAddOns: [2, 4, 5],
              },
              price: 1099,
            },
          ],
          payment: {
            method: "upi",
            total: 1099,
          },
          status: "in-progress",
          date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
        },
        {
          id: "ORD-123458",
          customer: {
            name: "Robert Johnson",
            email: "robert@example.com",
            phone: "+91 9876543212",
          },
          items: [
            {
              id: 3,
              template: {
                name: "Portfolio Minimal",
                description: "Clean showcase for creative professionals",
                image: "/templates/portfolio-template.png",
                basePrice: 499,
              },
              customizations: {
                businessName: "Robert Photography",
                businessType: "Photography",
                additionalPages: ["Gallery", "Services"],
                selectedAddOns: [1],
              },
              price: 599,
            },
          ],
          payment: {
            method: "card",
            total: 599,
          },
          status: "review",
          date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
        },
      ]

      localStorage.setItem("orders", JSON.stringify(defaultOrders))
      setOrders(defaultOrders)
    } else {
      setOrders(storedOrders)
    }
  }, [])

  useEffect(() => {
    // Filter and sort orders
    let result = [...orders]

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (order) =>
          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (order.customer?.name && order.customer.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (order.customer?.email && order.customer.email.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter((order) => order.status === statusFilter)
    }

    // Apply sorting
    result.sort((a, b) => {
      let valueA, valueB

      if (sortBy === "date") {
        valueA = new Date(a.date || 0).getTime()
        valueB = new Date(b.date || 0).getTime()
      } else if (sortBy === "total") {
        valueA = a.payment?.total || 0
        valueB = b.payment?.total || 0
      } else if (sortBy === "customer") {
        valueA = a.customer?.name || ""
        valueB = b.customer?.name || ""
      } else {
        valueA = a[sortBy] || ""
        valueB = b[sortBy] || ""
      }

      // Handle case-insensitive string comparison
      if (typeof valueA === "string" && typeof valueB === "string") {
        valueA = valueA.toLowerCase()
        valueB = valueB.toLowerCase()
      }

      if (valueA < valueB) return sortOrder === "asc" ? -1 : 1
      if (valueA > valueB) return sortOrder === "asc" ? 1 : -1
      return 0
    })

    setFilteredOrders(result)
  }, [orders, searchTerm, statusFilter, sortBy, sortOrder])

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortOrder("desc")
    }
  }

  const handleEditOrder = () => {
    if (!selectedOrder) return

    const updatedOrders = orders.map((order) =>
      order.id === selectedOrder.id
        ? {
            ...order,
            status: selectedOrder.status,
          }
        : order,
    )

    localStorage.setItem("orders", JSON.stringify(updatedOrders))
    setOrders(updatedOrders)
    setIsEditOrderOpen(false)
    setSelectedOrder(null)

    toast({
      title: "Order updated",
      description: "The order status has been updated successfully.",
    })
  }

  const handleDeleteOrder = () => {
    if (!selectedOrder) return

    const updatedOrders = orders.filter((order) => order.id !== selectedOrder.id)
    localStorage.setItem("orders", JSON.stringify(updatedOrders))
    setOrders(updatedOrders)
    setIsDeleteDialogOpen(false)
    setSelectedOrder(null)

    toast({
      title: "Order deleted",
      description: "The order has been deleted successfully.",
    })
  }

  const openEditDialog = (order) => {
    setSelectedOrder(order)
    setIsEditOrderOpen(true)
  }

  const openDeleteDialog = (order) => {
    setSelectedOrder(order)
    setIsDeleteDialogOpen(true)
  }

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-IN", {
      year: "numeric",
      month: "short",
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

  const exportOrders = () => {
    // Create CSV content
    const headers = ["Order ID", "Customer", "Email", "Date", "Status", "Total"]
    const rows = filteredOrders.map((order) => [
      order.id,
      order.customer?.name || "N/A",
      order.customer?.email || "N/A",
      formatDate(order.date),
      order.status,
      order.payment?.total || 0,
    ])

    const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n")

    // Create a blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `orders-export-${new Date().toISOString().slice(0, 10)}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast({
      title: "Export successful",
      description: "Orders have been exported to CSV.",
    })
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Order Management</h1>
        <Button onClick={exportOrders}>
          <Download className="mr-2 h-4 w-4" /> Export Orders
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
          <CardDescription>Manage customer orders on the platform.</CardDescription>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                placeholder="Search orders..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="review">Under Review</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b dark:border-gray-700">
                  <th className="text-left py-3 px-4">
                    <Button variant="ghost" size="sm" className="font-medium" onClick={() => handleSort("id")}>
                      Order ID
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </th>
                  <th className="text-left py-3 px-4">
                    <Button variant="ghost" size="sm" className="font-medium" onClick={() => handleSort("customer")}>
                      Customer
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </th>
                  <th className="text-left py-3 px-4">
                    <Button variant="ghost" size="sm" className="font-medium" onClick={() => handleSort("date")}>
                      Date
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </th>
                  <th className="text-left py-3 px-4">
                    <Button variant="ghost" size="sm" className="font-medium" onClick={() => handleSort("status")}>
                      Status
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </th>
                  <th className="text-left py-3 px-4">
                    <Button variant="ghost" size="sm" className="font-medium" onClick={() => handleSort("total")}>
                      Total
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </th>
                  <th className="text-right py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b dark:border-gray-700">
                      <td className="py-3 px-4 font-medium">{order.id}</td>
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium">{order.customer?.name || "N/A"}</div>
                          <div className="text-gray-500 dark:text-gray-400 text-xs">{order.customer?.email}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">{formatDate(order.date)}</td>
                      <td className="py-3 px-4">
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
                      </td>
                      <td className="py-3 px-4">{formatCurrency(order.payment?.total || 0)}</td>
                      <td className="py-3 px-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => router.push(`/admin/orders/${order.id}`)}>
                              <Eye className="mr-2 h-4 w-4" /> View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openEditDialog(order)}>
                              <Edit className="mr-2 h-4 w-4" /> Update Status
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => openDeleteDialog(order)}
                              className="text-red-600 dark:text-red-400"
                            >
                              <Trash2 className="mr-2 h-4 w-4" /> Delete Order
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-4 text-center text-gray-500 dark:text-gray-400">
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Order Dialog */}
      <Dialog open={isEditOrderOpen} onOpenChange={setIsEditOrderOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Order Status</DialogTitle>
            <DialogDescription>Change the status of this order.</DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="order-id" className="text-right">
                  Order ID
                </Label>
                <Input id="order-id" value={selectedOrder.id} className="col-span-3" disabled />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="customer" className="text-right">
                  Customer
                </Label>
                <Input id="customer" value={selectedOrder.customer?.name || "N/A"} className="col-span-3" disabled />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select
                  value={selectedOrder.status}
                  onValueChange={(value) => setSelectedOrder({ ...selectedOrder, status: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="review">Under Review</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOrderOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditOrder}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Order Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the order and remove the data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteOrder} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
