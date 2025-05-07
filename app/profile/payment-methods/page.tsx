import { Suspense } from "react"
import PaymentMethodsClient from "@/components/profile/payment-methods-client"

export const dynamic = "force-static"

export default function PaymentMethodsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<div>Loading payment methods...</div>}>
        <PaymentMethodsClient />
      </Suspense>
    </div>
  )
}
