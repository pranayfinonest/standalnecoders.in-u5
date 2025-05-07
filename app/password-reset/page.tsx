import { Suspense } from "react"
import PasswordResetForm from "@/components/auth/password-reset-form"

export const dynamic = "force-static"

export default function PasswordResetPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Suspense fallback={<div className="text-center">Loading password reset form...</div>}>
        <PasswordResetForm />
      </Suspense>
    </div>
  )
}
