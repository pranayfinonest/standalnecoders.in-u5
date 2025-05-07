import { Suspense } from "react"
import ProfilePageClient from "@/components/profile/profile-page-client"

export const dynamic = "force-static"

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      <Suspense fallback={<div>Loading profile...</div>}>
        <ProfilePageClient />
      </Suspense>
    </div>
  )
}
