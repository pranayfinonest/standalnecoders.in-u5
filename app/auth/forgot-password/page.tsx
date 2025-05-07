import ForgotPasswordForm from "@/components/auth/forgot-password-form"
import { Suspense } from "react"

export const dynamic = "force-static"

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Suspense fallback={<div className="w-full max-w-md py-12">Loading...</div>}>
        <ForgotPasswordForm />
      </Suspense>
    </div>
  )
}
