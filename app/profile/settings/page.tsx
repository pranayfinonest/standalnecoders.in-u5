import { Suspense } from "react"
import { getServerSearchParam } from "@/utils/server-params"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SettingsFormClient from "@/components/profile/settings-form-client"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Account Settings | StandaloneCoders",
  description: "Manage your account settings and preferences",
}

export default function SettingsPage() {
  // Get active tab from server-side search params
  const activeTab = getServerSearchParam("tab") || "password"

  return (
    <div className="container max-w-5xl py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6">Account Settings</h1>

      <Suspense
        fallback={
          <div className="animate-pulse p-8 space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        }
      >
        <Tabs defaultValue={activeTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your password to keep your account secure</CardDescription>
              </CardHeader>
              <CardContent>
                <SettingsFormClient />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Manage how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Notification settings coming soon.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Suspense>
    </div>
  )
}
