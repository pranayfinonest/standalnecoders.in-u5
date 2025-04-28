import CheckoutForm from "@/components/booking/checkout-form"
import Header from "@/components/header"
import Footer from "@/components/footer"

export const metadata = {
  title: "Checkout | StandaloneCoders",
  description: "Complete your order and payment for your website project.",
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header />
      <main>
        <CheckoutForm />
      </main>
      <Footer />
    </div>
  )
}
