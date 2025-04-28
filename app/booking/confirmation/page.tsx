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
        <OrderConfirmation />
      </main>
      <Footer />
    </div>
  )
}
