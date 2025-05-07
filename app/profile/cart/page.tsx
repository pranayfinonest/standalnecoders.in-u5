import { Suspense } from "react"
import CartPageClient from "@/components/profile/cart-page-client"

// Force static rendering for this page
export const dynamic = "force-static"

export default function CartPage() {
  return (
    <Suspense
      fallback={
        <div className="container max-w-5xl py-8 px-4 md:px-6">
          <div className="flex items-center mb-6">
            <h1 className="text-3xl font-bold">My Cart</h1>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="text-center py-8">
              <div className="h-12 w-12 mx-auto bg-gray-200 rounded-full animate-pulse mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-24 mx-auto mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-48 mx-auto mb-6 animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded w-32 mx-auto animate-pulse"></div>
            </div>
          </div>
        </div>
      }
    >
      <CartPageClient />
    </Suspense>
  )
}
