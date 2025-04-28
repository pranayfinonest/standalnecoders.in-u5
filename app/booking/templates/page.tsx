import WebsiteTemplates from "@/components/booking/website-templates"
import Header from "@/components/header"
import Footer from "@/components/footer"

export const metadata = {
  title: "Website Templates | StandaloneCoders",
  description: "Browse our collection of professional website templates for your business.",
}

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header />
      <main>
        <section className="relative py-20 bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
          <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-center opacity-5"></div>
          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block py-1 px-3 mb-4 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                Website Templates
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Choose Your Perfect Design</h1>
              <p className="text-xl text-gray-700 dark:text-gray-300">
                Browse our collection of professionally designed website templates and find the perfect starting point
                for your online presence.
              </p>
            </div>
          </div>
        </section>
        <WebsiteTemplates />
      </main>
      <Footer />
    </div>
  )
}
