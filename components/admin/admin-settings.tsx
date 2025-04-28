"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Save, User, Lock, Bell, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

export default function AdminSettings() {
  const router = useRouter()
  const { toast } = useToast()
  const [admin, setAdmin] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
    phone: "",
  })

  const [securityForm, setSecurityForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    orderUpdates: true,
    userRegistrations: true,
    systemAlerts: true,
  })

  const [siteSettings, setSiteSettings] = useState({
    siteName: "StandaloneCoders",
    siteDescription: "Professional cybersecurity, AI, digital marketing, and technology solutions for businesses.",
    contactEmail: "admin@standalonecoders.in",
    maintenanceMode: false,
  })

  useEffect(() => {
    // Check if admin is logged in
    const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true"
    if (!isAdminLoggedIn) {
      router.push("/admin/login")
      return
    }

    // Load admin data
    const adminData = JSON.parse(localStorage.getItem("admin") || "{}")
    if (!adminData.email) {
      router.push("/admin/login")
      return
    }

    setAdmin(adminData)
    setProfileForm({
      name: adminData.name || "",
      email: adminData.email || "",
      phone: adminData.phone || "",
    })

    // Load site settings
    const storedSiteSettings = JSON.parse(localStorage.getItem("siteSettings") || "{}")
    if (Object.keys(storedSiteSettings).length > 0) {
      setSiteSettings(storedSiteSettings)
    }

    // Load notification settings
    const storedNotificationSettings = JSON.parse(localStorage.getItem("notificationSettings") || "{}")
    if (Object.keys(storedNotificationSettings).length > 0) {
      setNotificationSettings(storedNotificationSettings)
    }

    setIsLoading(false)
  }, [router])

  const handleProfileSubmit = (e) => {
    e.preventDefault()
    setIsSaving(true)

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(profileForm.email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      setIsSaving(false)
      return
    }

    // Update admin data
    const updatedAdmin = {
      ...admin,
      name: profileForm.name,
      email: profileForm.email,
      phone: profileForm.phone,
    }

    localStorage.setItem("admin", JSON.stringify(updatedAdmin))
    setAdmin(updatedAdmin)

    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "Profile updated",
        description: "Your profile information has been saved successfully.",
      })
    }, 1000)
  }

  const handleSecuritySubmit = (e) => {
    e.preventDefault()
    setIsSaving(true)

    // Validate password
    if (securityForm.newPassword !== securityForm.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "New password and confirm password must match.",
        variant: "destructive",
      })
      setIsSaving(false)
      return
    }

    if (securityForm.newPassword.length < 8) {
      toast({
        title: "Password too short",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      })
      setIsSaving(false)
      return
    }

    // In a real app, you would verify the current password and update the password in the database
    // For this demo, we'll just show a success message

    setTimeout(() => {
      setIsSaving(false)
      setSecurityForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
      toast({
        title: "Password updated",
        description: "Your password has been changed successfully.",
      })
    }, 1000)
  }

  const handleNotificationSettingsSubmit = (e) => {
    e.preventDefault()
    setIsSaving(true)

    // Save notification settings
    localStorage.setItem("notificationSettings", JSON.stringify(notificationSettings))

    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "Notification settings updated",
        description: "Your notification preferences have been saved.",
      })
    }, 1000)
  }

  const handleSiteSettingsSubmit = (e) => {
    e.preventDefault()
    setIsSaving(true)

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(siteSettings.contactEmail)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid contact email address.",
        variant: "destructive",
      })
      setIsSaving(false)
      return
    }

    // Save site settings
    localStorage.setItem("siteSettings", JSON.stringify(siteSettings))

    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "Site settings updated",
        description: "Your site settings have been saved successfully.",
      })
    }, 1000)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Settings</h1>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">
            <User className="h-4 w-4 mr-2" /> Profile
          </TabsTrigger>
          <TabsTrigger value="security">
            <Lock className="h-4 w-4 mr-2" /> Security
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="site">
            <Globe className="h-4 w-4 mr-2" /> Site Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your account profile information.</CardDescription>
            </CardHeader>
            <form onSubmit={handleProfileSubmit}>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${profileForm.name || "Admin"}`}
                      alt={profileForm.name}
                    />
                    <AvatarFallback>{profileForm.name?.charAt(0) || "A"}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-medium">{profileForm.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Administrator</p>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 gap-6">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phone" className="text-right">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-b-transparent rounded-full"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" /> Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Update your password and security preferences.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSecuritySubmit}>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="current-password" className="text-right">
                      Current Password
                    </Label>
                    <Input
                      id="current-password"
                      type="password"
                      value={securityForm.currentPassword}
                      onChange={(e) => setSecurityForm({ ...securityForm, currentPassword: e.target.value })}
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="new-password" className="text-right">
                      New Password
                    </Label>
                    <Input
                      id="new-password"
                      type="password"
                      value={securityForm.newPassword}
                      onChange={(e) => setSecurityForm({ ...securityForm, newPassword: e.target.value })}
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="confirm-password" className="text-right">
                      Confirm Password
                    </Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={securityForm.confirmPassword}
                      onChange={(e) => setSecurityForm({ ...securityForm, confirmPassword: e.target.value })}
                      className="col-span-3"
                      required
                    />
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Enable Two-Factor Authentication</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Switch id="two-factor" disabled />
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Two-factor authentication is not available in the demo version.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-b-transparent rounded-full"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" /> Update Password
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage your notification settings.</CardDescription>
            </CardHeader>
            <form onSubmit={handleNotificationSettingsSubmit}>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Receive email notifications for important updates
                      </p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, emailNotifications: checked })
                      }
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Order Updates</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Receive notifications when orders are placed or updated
                      </p>
                    </div>
                    <Switch
                      id="order-updates"
                      checked={notificationSettings.orderUpdates}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, orderUpdates: checked })
                      }
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">User Registrations</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Receive notifications when new users register
                      </p>
                    </div>
                    <Switch
                      id="user-registrations"
                      checked={notificationSettings.userRegistrations}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, userRegistrations: checked })
                      }
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">System Alerts</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Receive notifications about system updates and maintenance
                      </p>
                    </div>
                    <Switch
                      id="system-alerts"
                      checked={notificationSettings.systemAlerts}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, systemAlerts: checked })
                      }
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-b-transparent rounded-full"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" /> Save Preferences
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="site">
          <Card>
            <CardHeader>
              <CardTitle>Site Settings</CardTitle>
              <CardDescription>Configure general website settings.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSiteSettingsSubmit}>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="site-name" className="text-right">
                      Site Name
                    </Label>
                    <Input
                      id="site-name"
                      value={siteSettings.siteName}
                      onChange={(e) => setSiteSettings({ ...siteSettings, siteName: e.target.value })}
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label htmlFor="site-description" className="text-right pt-2">
                      Site Description
                    </Label>
                    <Textarea
                      id="site-description"
                      value={siteSettings.siteDescription}
                      onChange={(e) => setSiteSettings({ ...siteSettings, siteDescription: e.target.value })}
                      className="col-span-3"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="contact-email" className="text-right">
                      Contact Email
                    </Label>
                    <Input
                      id="contact-email"
                      type="email"
                      value={siteSettings.contactEmail}
                      onChange={(e) => setSiteSettings({ ...siteSettings, contactEmail: e.target.value })}
                      className="col-span-3"
                      required
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Maintenance Mode</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Enable maintenance mode to temporarily disable the website
                      </p>
                    </div>
                    <Switch
                      id="maintenance-mode"
                      checked={siteSettings.maintenanceMode}
                      onCheckedChange={(checked) => setSiteSettings({ ...siteSettings, maintenanceMode: checked })}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-b-transparent rounded-full"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" /> Save Settings
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
