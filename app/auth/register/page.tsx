import { Suspense } from "react"
import RegisterForm from "@/components/auth/register-form"

export const dynamic = "force-static"

export default function RegisterPage() {
  return (
    <div className="container mx-auto py-10">
      <Suspense
        fallback={<div className="w-full max-w-md mx-auto p-6 border rounded-lg">Loading registration form...</div>}
      >
        <RegisterForm />
      </Suspense>
    </div>
  )
}
