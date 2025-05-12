import { Suspense } from "react"
import VerifyClient from "./VerifyClient"

export const metadata = {
  title: "Verify Email - StandaloneCoders",
  description: "Verify your email address to complete your registration",
}

export default function VerifyStaticPage() {
  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold mb-6">Verify Your Email</h1>
      <Suspense fallback={<p>Loading verification details...</p>}>
        <VerifyClient />
      </Suspense>
    </div>
  )
}
