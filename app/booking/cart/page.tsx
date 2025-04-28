import Cart from "@/components/booking/cart"
import Header from "@/components/header"
import Footer from "@/components/footer"

export const metadata = {
  title: "Shopping Cart | StandaloneCoders",
  description: "Review and manage the items in your shopping cart.",
}

export default function CartPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header />
      <main>
        <Cart />
      </main>
      <Footer />
    </div>
  )
}
