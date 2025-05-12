import { Suspense } from "react"
import VerifyTokenClient from "@/components/auth/verify-token-client"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export const metadata = {
  title: "Verify Email - StandaloneCoders",
  description: "Verify your email address to complete your registration",
}

export default function VerifyStaticPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <Suspense fallback={<VerificationFallback />}>
          <VerifyTokenClient />
        </Suspense>
      </div>
    </div>
  )
}

function VerificationFallback() {
  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 mb-6"></div>
        <div className="h-10 bg-gray-200 rounded w-full"></div>
      </div>
    </div>
  )
}
