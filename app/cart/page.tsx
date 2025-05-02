import { Suspense } from "react"
import { Loader } from "lucide-react"
import CartPage from "@/components/cart/cart-page"

export const metadata = {
  title: "Shopping Cart | StandaloneCoders",
  description: "View and manage your cart items at StandaloneCoders",
}

export default function Cart() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      <Suspense
        fallback={
          <div className="flex justify-center py-20">
            <Loader className="animate-spin h-8 w-8" />
          </div>
        }
      >
        <CartPage />
      </Suspense>
    </div>
  )
}
