"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2, LogOut } from "lucide-react"

export default function UserProfile() {
  const { user, signOut } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const handleSignOut = async () => {
    setIsLoading(true)
    await signOut()
    setIsLoading(false)
  }

  if (!user) {
    return null
  }

  // Get user initials for avatar fallback
  const getInitials = () => {
    const name = user.user_metadata?.name || user.email || ""
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Your Profile</CardTitle>
        <CardDescription>Manage your account settings</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={user.user_metadata?.avatar_url || ""} alt={user.user_metadata?.name || "User"} />
          <AvatarFallback>{getInitials()}</AvatarFallback>
        </Avatar>
        <div className="text-center">
          <h3 className="text-lg font-medium">{user.user_metadata?.name || "User"}</h3>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={handleSignOut} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing out
            </>
          ) : (
            <>
              <LogOut className="mr-2 h-4 w-4" /> Sign out
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
