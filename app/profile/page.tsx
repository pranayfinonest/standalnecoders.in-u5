import { Suspense } from "react"
import { getServerUser } from "@/app/actions/auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import ProfileClient from "@/components/profile/profile-client"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Your Profile | StandaloneCoders",
  description: "Manage your profile and account settings",
}

export default async function ProfilePage() {
  // Get user from server-side session
  const user = await getServerUser()

  // Redirect if not logged in
  if (!user) {
    redirect("/auth/login?redirect=/profile")
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
    <div className="container max-w-5xl py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Summary Card */}
        <Card className="md:col-span-1">
          <CardHeader className="text-center">
            <Avatar className="h-24 w-24 mx-auto">
              <AvatarImage src={user.user_metadata?.avatar_url || ""} alt={user.user_metadata?.name || "User"} />
              <AvatarFallback className="text-xl">{getInitials()}</AvatarFallback>
            </Avatar>
            <CardTitle className="mt-4">{user.user_metadata?.name || "User"}</CardTitle>
            <CardDescription className="truncate max-w-full">{user.email}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full" asChild>
              <a href="/profile/settings">Edit Profile</a>
            </Button>
          </CardContent>
        </Card>

        {/* Main Content Area */}
        <div className="md:col-span-2">
          <Suspense
            fallback={
              <div className="animate-pulse space-y-4">
                <div className="h-10 bg-gray-200 rounded"></div>
                <div className="h-64 bg-gray-200 rounded"></div>
              </div>
            }
          >
            <ProfileClient user={user} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
