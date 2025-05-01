"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Calendar, Clock, Filter, Search, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface Booking {
  id: string
  projectName: string
  clientName: string
  clientEmail: string
  clientPhone: string
  status: "pending" | "approved" | "in-progress" | "completed" | "cancelled"
  totalPrice: number
  paymentStatus: "pending" | "partial" | "paid"
  createdAt: string
  startDate?: string
  endDate?: string
  description: string
  services: string[]
  notes?: string
}

export default function BookingManagement() {
  const { toast } = useToast()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [formData, setFormData] = useState<Partial<Booking>>({
    status: "pending",
    paymentStatus: "pending",
    notes: "",
  })

  // Load bookings from localStorage (in a real app, this would be from an API)
  useEffect(() => {
    const storedBookings = localStorage.getItem("bookings")
    if (storedBookings) {
      setBookings(JSON.parse(storedBookings))
    } else {
      // Set some default bookings if none exist
      const defaultBookings = [
        {
          id: "ORD-123456",
          projectName: "E-commerce Website",
          clientName: "John Doe",
          clientEmail: "john@example.com",
          clientPhone: "+91 9876543210",
          status: "in-progress",
          totalPrice: 25000,
          paymentStatus: "partial",
          createdAt: "2023-05-15T10:30:00Z",
          startDate: "2023-05-20T00:00:00Z",
          endDate: "2023-06-30T00:00:00Z",
          description: "E-commerce website with payment integration",
          services: ["Website Development", "Payment Gateway Integration", "SEO Setup"],
          notes: "Client requested additional product filters",
        },
        {
          id: "ORD-123457",
          projectName: "Portfolio Website",
          clientName: "Jane Smith",
          clientEmail: "jane@example.com",
          clientPhone: "+91 9876543211",
          status: "pending",
          totalPrice: 15000,
          paymentStatus: "pending",
          createdAt: "2023-05-18T14:45:00Z",
          description: "Personal portfolio website for a photographer",
          services: ["Website Development", "Content Management System"],
        },
        {
          id: "ORD-123458",
          projectName: "Corporate Website Redesign",
          clientName: "Acme Corp",
          clientEmail: "contact@acme.com",
          clientPhone: "+91 9876543212",
          status: "completed",
          totalPrice: 35000,
          paymentStatus: "paid",
          createdAt: "2023-04-10T09:15:00Z",
          startDate: "2023-04-15T00:00:00Z",
          endDate: "2023-05-10T00:00:00Z",
          description: "Complete redesign of corporate website with modern UI",
          services: ["Website Development", "UI/UX Design", "Content Migration"],
          notes: "Client very satisfied with the final result",
        },
      ] as Booking[]

      setBookings(defaultBookings)
      localStorage.setItem("bookings", JSON.stringify(defaultBookings))
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleViewBooking = (booking: Booking) => {
    setCurrentBooking(booking)
    setFormData({
      status: booking.status,
      paymentStatus: booking.paymentStatus,
      notes: booking.notes || "",
    })
    setIsDialogOpen(true)
  }

  const handleUpdateBooking = () => {
    setIsLoading(true)

    try {
      if (!currentBooking) return

      const updatedBooking = {
        ...currentBooking,
        status: formData.status as Booking["status"],
        paymentStatus: formData.paymentStatus as Booking["paymentStatus"],
        notes: formData.notes,
      }

      const updatedBookings = bookings.map((booking) => (booking.id === currentBooking.id ? updatedBooking : booking))

      setBookings(updatedBookings)
      localStorage.setItem("bookings", JSON.stringify(updatedBookings))

      toast({
        title: "Booking updated",
        description: "The booking has been successfully updated.",
      })

      setIsDialogOpen(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error updating the booking.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Filter bookings based on search query and status filter
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.clientEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || booking.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getStatusBadge = (status: Booking["status"]) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
            Pending
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
            Approved
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300">
            In Progress
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
            Completed
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
            Cancelled
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getPaymentStatusBadge = (status: Booking["paymentStatus"]) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
            Pending
          </Badge>
        )
      case "partial":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
            Partial
          </Badge>
        )
      case "paid":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
            Paid
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Booking Management</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Website Project Bookings</CardTitle>
          <CardDescription>Manage client bookings and project status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search bookings..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Bookings</TabsTrigger>
                <TabsTrigger value="recent">Recent</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-0">
                <div className="border rounded-md overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Project</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Payment</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBookings.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                            No bookings found.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredBookings.map((booking) => (
                          <TableRow key={booking.id}>
                            <TableCell className="font-medium">{booking.id}</TableCell>
                            <TableCell>{booking.projectName}</TableCell>
                            <TableCell>
                              <div>
                                <div>{booking.clientName}</div>
                                <div className="text-xs text-muted-foreground">{booking.clientEmail}</div>
                              </div>
                            </TableCell>
                            <TableCell>{getStatusBadge(booking.status)}</TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <div>₹{booking.totalPrice.toLocaleString()}</div>
                                <div>{getPaymentStatusBadge(booking.paymentStatus)}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                                {formatDate(booking.createdAt)}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Actions</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => handleViewBooking(booking)}>
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>Send Email</DropdownMenuItem>
                                  <DropdownMenuItem>Generate Invoice</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="recent" className="mt-0">
                <div className="border rounded-md overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Project</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Payment</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBookings
                        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                        .slice(0, 5)
                        .map((booking) => (
                          <TableRow key={booking.id}>
                            <TableCell className="font-medium">{booking.id}</TableCell>
                            <TableCell>{booking.projectName}</TableCell>
                            <TableCell>
                              <div>
                                <div>{booking.clientName}</div>
                                <div className="text-xs text-muted-foreground">{booking.clientEmail}</div>
                              </div>
                            </TableCell>
                            <TableCell>{getStatusBadge(booking.status)}</TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <div>₹{booking.totalPrice.toLocaleString()}</div>
                                <div>{getPaymentStatusBadge(booking.paymentStatus)}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                                {formatDate(booking.createdAt)}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" onClick={() => handleViewBooking(booking)}>
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="pending" className="mt-0">
                <div className="border rounded-md overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Project</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Payment</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBookings
                        .filter((booking) => booking.status === "pending")
                        .map((booking) => (
                          <TableRow key={booking.id}>
                            <TableCell className="font-medium">{booking.id}</TableCell>
                            <TableCell>{booking.projectName}</TableCell>
                            <TableCell>
                              <div>
                                <div>{booking.clientName}</div>
                                <div className="text-xs text-muted-foreground">{booking.clientEmail}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <div>₹{booking.totalPrice.toLocaleString()}</div>
                                <div>{getPaymentStatusBadge(booking.paymentStatus)}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                                {formatDate(booking.createdAt)}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" onClick={() => handleViewBooking(booking)}>
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="active" className="mt-0">
                <div className="border rounded-md overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Project</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Timeline</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBookings
                        .filter((booking) => booking.status === "approved" || booking.status === "in-progress")
                        .map((booking) => (
                          <TableRow key={booking.id}>
                            <TableCell className="font-medium">{booking.id}</TableCell>
                            <TableCell>{booking.projectName}</TableCell>
                            <TableCell>
                              <div>
                                <div>{booking.clientName}</div>
                                <div className="text-xs text-muted-foreground">{booking.clientEmail}</div>
                              </div>
                            </TableCell>
                            <TableCell>{getStatusBadge(booking.status)}</TableCell>
                            <TableCell>
                              <div className="flex flex-col text-sm">
                                <div className="flex items-center">
                                  <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                                  Start: {formatDate(booking.startDate)}
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                                  End: {formatDate(booking.endDate)}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" onClick={() => handleViewBooking(booking)}>
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="completed" className="mt-0">
                <div className="border rounded-md overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Project</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Payment</TableHead>
                        <TableHead>Completed Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBookings
                        .filter((booking) => booking.status === "completed")
                        .map((booking) => (
                          <TableRow key={booking.id}>
                            <TableCell className="font-medium">{booking.id}</TableCell>
                            <TableCell>{booking.projectName}</TableCell>
                            <TableCell>
                              <div>
                                <div>{booking.clientName}</div>
                                <div className="text-xs text-muted-foreground">{booking.clientEmail}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <div>₹{booking.totalPrice.toLocaleString()}</div>
                                <div>{getPaymentStatusBadge(booking.paymentStatus)}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                                {formatDate(booking.endDate)}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" onClick={() => handleViewBooking(booking)}>
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
            <DialogDescription>View and update booking information</DialogDescription>
          </DialogHeader>
          {currentBooking && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Order ID</h4>
                  <p className="font-medium">{currentBooking.id}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Created Date</h4>
                  <p>{formatDate(currentBooking.createdAt)}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Project</h4>
                <p className="font-medium">{currentBooking.projectName}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Client Information</h4>
                <div className="grid grid-cols-1 gap-2">
                  <p>{currentBooking.clientName}</p>
                  <p>{currentBooking.clientEmail}</p>
                  <p>{currentBooking.clientPhone}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Services</h4>
                <div className="flex flex-wrap gap-2 mt-1">
                  {currentBooking.services.map((service) => (
                    <Badge key={service} className="bg-muted text-muted-foreground hover:bg-muted">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Description</h4>
                <p className="text-sm">{currentBooking.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Price</h4>
                  <p className="font-medium">₹{currentBooking.totalPrice.toLocaleString()}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Timeline</h4>
                  <div className="text-sm">
                    <p>Start: {formatDate(currentBooking.startDate)}</p>
                    <p>End: {formatDate(currentBooking.endDate)}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="status">Booking Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="paymentStatus">Payment Status</Label>
                  <Select
                    value={formData.paymentStatus}
                    onValueChange={(value) => handleSelectChange("paymentStatus", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="partial">Partial</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  value={formData.notes || ""}
                  onChange={handleInputChange}
                  placeholder="Enter notes about this booking"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateBooking} disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Booking"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
