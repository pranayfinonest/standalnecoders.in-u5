import { Suspense } from "react"
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
        <Suspense
          fallback={
            <div className="container mx-auto px-4 py-12 flex justify-center">
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="mt-8 w-full max-w-3xl">
                  <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                  <div className="h-8 w-1/2 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                  <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
            </div>
          }
        >
          <CustomizeForm />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
