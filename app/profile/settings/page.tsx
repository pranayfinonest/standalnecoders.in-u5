import { Suspense } from "react"
import SettingsPageClient from "@/components/profile/settings-page-client"

export const metadata = {
  title: "Account Settings | StandaloneCoders",
  description: "Manage your account settings and preferences",
}

export default function SettingsPage() {
  return (
    <Suspense
      fallback={
        <div className="container max-w-5xl py-8 px-4 md:px-6">
          <div className="animate-pulse p-8 space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      }
    >
      <SettingsPageClient />
    </Suspense>
  )
}
