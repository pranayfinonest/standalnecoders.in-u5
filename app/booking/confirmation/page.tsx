import { Suspense } from "react"
import OrderConfirmation from "@/components/booking/order-confirmation"
import Header from "@/components/header"
import Footer from "@/components/footer"

export const metadata = {
  title: "Order Confirmation | StandaloneCoders",
  description: "Your order has been confirmed. View your order details and next steps.",
}

export default function ConfirmationPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header />
      <main>
        <Suspense
          fallback={
            <div className="container mx-auto px-4 py-12 flex justify-center">
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          }
        >
          <OrderConfirmation />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
