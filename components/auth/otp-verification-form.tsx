import { Suspense } from "react"
import OtpVerificationFormClient from "./otp-verification-form-client"

export default function OtpVerificationForm() {
  return (
    <Suspense
      fallback={
        <div className="w-full max-w-md mx-auto p-8 rounded-lg border border-gray-200 animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-8 w-3/4"></div>
          <div className="h-10 bg-gray-200 rounded mb-6"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      }
    >
      <OtpVerificationFormClient />
    </Suspense>
  )
}
