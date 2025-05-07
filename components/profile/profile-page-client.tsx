"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { getClientUrlParam } from "@/utils/client-navigation"

export default function ProfilePageClient() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("profile")
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    bio: "",
  })
  const [exchangeRates, setExchangeRates] = useState({
    USD: 1,
    EUR: 0.85,
    GBP: 0.75,
    JPY: 110.2,
    AUD: 1.35,
    CAD: 1.25,
    INR: 74.5,
  })

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    if (!isLoggedIn) {
      window.location.href = "/auth/login?redirect=/profile"
      return
    }

    // Load user data
    const userData = JSON.parse(localStorage.getItem("user") || "{}")
    if (!userData.email) {
      window.location.href = "/auth/login?redirect=/profile"
      return
    }

    setUser(userData)
    setFormData({
      name: userData.name || "",
      email: userData.email || "",
      phone: userData.phone || "",
      company: userData.company || "",
      address: userData.address || "",
      bio: userData.bio || "",
    })

    // Check for tab in URL
    const tabParam = getClientUrlParam("tab")
    if (tabParam) {
      setActiveTab(tabParam)
    }

    // Fetch exchange rates
    fetchExchangeRates()

    setIsLoading(false)
  }, [])

  const fetchExchangeRates = async () => {
    try {
      const response = await fetch("/api/exchange-rates")
      if (response.ok) {
        const data = await response.json()
        setExchangeRates(data.rates)
      }
    } catch (error) {
      console.error("Error fetching exchange rates:", error)
      // Use fallback rates
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSaveProfile = () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      const updatedUser = {
        ...user,
        name: formData.name,
        phone: formData.phone,
        company: formData.company,
        address: formData.address,
        bio: formData.bio,
      }

      // Update localStorage
      localStorage.setItem("user", JSON.stringify(updatedUser))
      setUser(updatedUser)

      setIsSaving(false)
      setIsEditing(false)

      toast({
        title: "Profile updated",
        description: "Your profile information has been saved successfully.",
      })
    }, 1000)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="space-y-1">
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </div>
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
              ) : (
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveProfile} disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.name || "User"}`}
                    alt={user?.name}
                  />
                  <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      {isEditing ? (
                        <Input id="name" name="name" value={formData.name} onChange={handleInputChange} />
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      {isEditing ? (
                        <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} />
                      ) : (
                        <div className="p-2 border rounded-md bg-gray-50 dark:bg-gray-800">
                          {user?.phone || "Not provided"}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company">Company/Organization</Label>
                      {isEditing ? (
                        <Input id="company" name="company" value={formData.company} onChange={handleInputChange} />
                      ) : (
                        <div className="p-2 border rounded-md bg-gray-50 dark:bg-gray-800">
                          {user?.company || "Not provided"}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                {isEditing ? (
                  <Input id="address" name="address" value={formData.address} onChange={handleInputChange} />
                ) : (
                  <div className="p-2 border rounded-md bg-gray-50 dark:bg-gray-800">
                    {user?.address || "Not provided"}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                {isEditing ? (
                  <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                    rows={4}
                  />
                ) : (
                  <div className="p-2 border rounded-md bg-gray-50 dark:bg-gray-800 min-h-[100px]">
                    {user?.bio || "No bio provided"}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Security</CardTitle>
              <CardDescription>Manage your account security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Password</h3>
                  <p className="text-sm text-gray-500">Last changed: Never</p>
                </div>
                <Button variant="outline">Change Password</Button>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Two-Factor Authentication</h3>
                  <p className="text-sm text-gray-500">Not enabled</p>
                </div>
                <Button variant="outline">Enable</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Display Settings</CardTitle>
              <CardDescription>Customize your display preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Theme</h3>
                  <p className="text-sm text-gray-500">Choose your preferred theme</p>
                </div>
                <select className="p-2 border rounded-md">
                  <option>System Default</option>
                  <option>Light</option>
                  <option>Dark</option>
                </select>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Currency</h3>
                  <p className="text-sm text-gray-500">Set your preferred currency</p>
                </div>
                <select className="p-2 border rounded-md">
                  <option>INR (₹)</option>
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                  <option>GBP (£)</option>
                </select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Email Notifications</h3>
                  <p className="text-sm text-gray-500">Receive updates via email</p>
                </div>
                <input type="checkbox" className="toggle" defaultChecked />
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Order Updates</h3>
                  <p className="text-sm text-gray-500">Get notified about order status changes</p>
                </div>
                <input type="checkbox" className="toggle" defaultChecked />
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Marketing Emails</h3>
                  <p className="text-sm text-gray-500">Receive promotional offers and updates</p>
                </div>
                <input type="checkbox" className="toggle" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
              <CardDescription>Manage your billing details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Current Plan</h3>
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold">Free Plan</p>
                      <p className="text-sm text-gray-500">Basic features and functionality</p>
                    </div>
                    <Button>Upgrade</Button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Payment Methods</h3>
                <Button variant="outline" className="w-full justify-start">
                  <span className="mr-2">+</span> Add Payment Method
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Currency Exchange Rates</CardTitle>
              <CardDescription>Current exchange rates for reference</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Base Currency: USD</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(exchangeRates).map(([currency, rate]) => (
                    <div key={currency} className="p-3 border rounded-md">
                      <p className="font-bold">{currency}</p>
                      <p className="text-sm">{rate.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-4">Rates last updated: {new Date().toLocaleDateString()}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
