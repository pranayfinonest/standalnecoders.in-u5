import { Suspense } from "react"
import LoginForm from "@/components/auth/login-form"

export const dynamic = "force-static"

export default function LoginPage() {
  return (
    <div className="container mx-auto py-10">
      <Suspense fallback={<div className="w-full max-w-md mx-auto p-6 border rounded-lg">Loading login form...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  )
}
