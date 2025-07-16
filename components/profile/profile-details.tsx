"use client"

import { useState } from "react"
import type { User } from "@nhost/nhost-js"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import nhost from "@/utils/nhost"

interface ProfileDetailsProps {
  user: User
}

export default function ProfileDetails({ user }: ProfileDetailsProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState(user.metadata?.name || "")
  const [phone, setPhone] = useState(user.metadata?.phone || "")
  const { toast } = useToast()

  const handleSave = async () => {
    setIsLoading(true)
    try {
      const { error } = await nhost.auth.updateUserMetadata({
        metadata: {
          name,
          phone,
        },
      })

      if (error) throw error

      toast({
        title: "Profile updated",
        description: "Your profile details have been updated successfully.",
      })
      setIsEditing(false)
    } catch (error) {
      console.error("Error updating profile:", error)
      toast({
        title: "Update failed",
        description: "There was a problem updating your profile.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Profile Details</CardTitle>
            <CardDescription>Manage your personal information</CardDescription>
          </div>
          {!isEditing && (
            <Button variant="outline" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={user.email || ""} disabled />
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} disabled={!isEditing} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} disabled={!isEditing} />
          </div>

          {isEditing && (
            <div className="flex gap-2 justify-end pt-4">
              <Button variant="outline" onClick={() => setIsEditing(false)} disabled={isLoading}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
