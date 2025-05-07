import { Suspense } from "react"
import ProfilePageClient from "@/components/profile/profile-page-client"
import ProfileSkeleton from "@/components/profile/profile-skeleton"

export const dynamic = "force-static"

export default function ProfilePage() {
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <ProfilePageClient />
    </Suspense>
  )
}
