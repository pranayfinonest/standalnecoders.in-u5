import { Suspense } from "react"
import PaymentMethodsClient from "@/components/profile/payment-methods-client"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Payment Methods | StandaloneCoders",
  description: "Manage your payment methods",
}

export default function PaymentMethodsPage() {
  return (
    <div className="container max-w-5xl py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6">Payment Methods</h1>

      <Suspense
        fallback={
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-gray-200 rounded w-1/4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        }
      >
        <PaymentMethodsClient />
      </Suspense>
    </div>
  )
}
