"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"

interface User {
  id: string
  name: string
  email: string
  role: string
  status: string
  createdAt: string
  lastLogin?: string
  phone?: string
  address?: string
  notes?: string
  orders?: string[]
}

interface AdminUserDetailProps {
  userId: string
}

export default function AdminUserDetail({ userId }: AdminUserDetailProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [orders, setOrders] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    // Load user data
    const loadUserData = () => {
      setIsLoading(true)
      try {
        // In a real app, you would fetch from an API
        const usersString = localStorage.getItem("users")
        const users = usersString ? JSON.parse(usersString) : []
        const userData = users.find((u: User) => u.id === userId)

        // Load orders data
        const ordersString = localStorage.getItem("orders")
        const allOrders = ordersString ? JSON.parse(ordersString) : []
        const userOrders = allOrders.filter((order: any) => order.userId === userId)

        if (userData) {
          setUser(userData)
          setOrders(userOrders)
        }
      } catch (error) {
        console.error("Error loading user data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (userId) {
      loadUserData()
    }
  }, [userId])

  const handleSaveUser = () => {
    if (!user) return

    setIsSaving(true)
    try {
      // In a real app, you would call an API
      const usersString = localStorage.getItem("users")
      const users = usersString ? JSON.parse(usersString) : []
      const updatedUsers = users.map((u: User) => (u.id === user.id ? user : u))
      localStorage.setItem("users", JSON.stringify(updatedUsers))

      // Show success message or notification here
    } catch (error) {
      console.error("Error saving user:", error)
      // Show error message
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteUser = () => {
    if (!user) return

    try {
      // In a real app, you would call an API
      const usersString = localStorage.getItem("users")
      const users = usersString ? JSON.parse(usersString) : []
      const updatedUsers = users.filter((u: User) => u.id !== user.id)
      localStorage.setItem("users", JSON.stringify(updatedUsers))

      setIsDeleteDialogOpen(false)
      router.push("/admin/users")
    } catch (error) {
      console.error("Error deleting user:", error)
      // Show error message
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <p>Loading user details...</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <h2 className="text-2xl font-bold mb-4">User Not Found</h2>
        <p className="mb-4">The requested user could not be found.</p>
        <Button onClick={() => router.push("/admin/users")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Users
        </Button>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={() => router.push("/admin/users")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <Badge
            className={`ml-2 ${
              user.status === "active"
                ? "bg-green-100 text-green-800"
                : user.status === "suspended"
                  ? "bg-red-100 text-red-800"
                  : "bg-gray-100 text-gray-800"
            }`}
          >
            {user.status}
          </Badge>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setIsDeleteDialogOpen(true)} className="text-red-600">
            <Trash2 className="mr-2 h-4 w-4" /> Delete User
          </Button>
          <Button onClick={handleSaveUser} disabled={isSaving}>
            <Save className="mr-2 h-4 w-4" /> {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="orders">Orders ({orders.length})</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Profile</CardTitle>
              <CardDescription>View and edit user information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={user.phone || ""}
                    onChange={(e) => setUser({ ...user, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select value={user.role} onValueChange={(value) => setUser({ ...user, role: value })}>
                    <SelectTrigger id="role">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="editor">Editor</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={user.status} onValueChange={(value) => setUser({ ...user, status: value })}>
                    <SelectTrigger id="status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Created</Label>
                  <div className="h-10 px-3 py-2 rounded-md border border-input bg-background text-sm">
                    {formatDate(user.createdAt)}
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={user.address || ""}
                  onChange={(e) => setUser({ ...user, address: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Admin Notes</Label>
                <Textarea
                  id="notes"
                  value={user.notes || ""}
                  onChange={(e) => setUser({ ...user, notes: e.target.value })}
                  rows={4}
                  placeholder="Add notes about this user here..."
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>View all orders placed by this user.</CardDescription>
            </CardHeader>
            <CardContent>
              {orders.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">This user has not placed any orders yet.</p>
                </div>
              ) : (
                <div className="divide-y">
                  {orders.map((order) => (
                    <div key={order.id} className="py-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Order #{order.id}</h4>
                          <p className="text-sm text-gray-500">
                            {new Date(order.createdAt).toLocaleDateString()} •{order.items?.length || 0} items • $
                            {order.totalAmount.toFixed(2)}
                          </p>
                        </div>
                        <Badge
                          className={`${
                            order.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : order.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : order.status === "cancelled"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {order.status}
                        </Badge>
                      </div>
                      <div className="mt-2">
                        <Button variant="outline" size="sm" onClick={() => router.push(`/admin/orders/${order.id}`)}>
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage user security settings and access.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Last Login</Label>
                  <span className="text-sm">{user.lastLogin ? formatDate(user.lastLogin) : "Never"}</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Password Reset</h3>
                  <Button variant="outline">Send Password Reset Email</Button>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Account Actions</h3>
                  <div className="flex flex-col space-y-2">
                    <Button
                      variant={user.status === "suspended" ? "outline" : "destructive"}
                      onClick={() => setUser({ ...user, status: user.status === "suspended" ? "active" : "suspended" })}
                    >
                      {user.status === "suspended" ? "Unsuspend Account" : "Suspend Account"}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Delete User Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="mb-2">
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteUser}>
              Delete User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
