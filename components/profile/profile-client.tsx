"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import ProfileDetails from "@/components/profile/profile-details"
import type { User } from "@supabase/supabase-js"

interface ProfileClientProps {
  user: User
}

export default function ProfileClient({ user }: ProfileClientProps) {
  const [activeTab, setActiveTab] = useState("details")

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="details">Profile Details</TabsTrigger>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="payment">Payment Methods</TabsTrigger>
      </TabsList>
      <TabsContent value="details">
        <ProfileDetails user={user} />
      </TabsContent>
      <TabsContent value="orders">
        <Card>
          <CardHeader>
            <CardTitle>Your Orders</CardTitle>
            <CardDescription>View your recent orders and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">You haven't placed any orders yet.</p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="payment">
        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>Manage your payment methods</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">No payment methods added yet.</p>
            <Button className="mt-4" asChild>
              <a href="/profile/payment-methods">Manage Payment Methods</a>
            </Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
