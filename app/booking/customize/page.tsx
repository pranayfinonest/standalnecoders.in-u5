import CustomizeForm from "@/components/booking/customize-form"
import Header from "@/components/header"
import Footer from "@/components/footer"

export const metadata = {
  title: "Customize Your Website | StandaloneCoders",
  description: "Customize your selected website template with your specific requirements and preferences.",
}

export default function CustomizePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header />
      <main>
        <CustomizeForm />
      </main>
      <Footer />
    </div>
  )
}
