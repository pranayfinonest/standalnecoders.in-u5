import BookingFlow from "@/components/booking/booking-flow"
import Header from "@/components/header"
import Footer from "@/components/footer"

export const metadata = {
  title: "Book Your Website | StandaloneCoders",
  description: "Select technologies, features, and options to create your custom website.",
}

export default function BookingFlowPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header />
      <main>
        <BookingFlow />
      </main>
      <Footer />
    </div>
  )
}
