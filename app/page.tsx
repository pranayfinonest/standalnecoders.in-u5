import Hero from "@/components/hero"
import Services from "@/components/services"
import Portfolio from "@/components/portfolio"
import WhyChooseUs from "@/components/why-choose-us"
import { ResponsiveContainer } from "@/components/responsive-container"
import AboutUs from "@/components/about-us"
import StructuredDataEnhanced from "@/components/seo/structured-data-enhanced"
import ProductDemo from "@/components/product-demo"
import type { Metadata } from "next"

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "StandaloneCoders | Web Development, Cybersecurity & Digital Solutions in Rajasthan",
  description:
    "Professional web development, cybersecurity, AI, digital marketing, and technology solutions for businesses across Rajasthan including Jaipur, Udaipur, Jodhpur, and more.",
  keywords:
    "web development, cybersecurity, digital marketing, AI technology, Rajasthan, Jaipur, Udaipur, Jodhpur, technology services, software development",
}

export default function Home() {
  return (
    <main className="flex-1">
      <StructuredDataEnhanced type="Organization" />
      <StructuredDataEnhanced type="WebSite" />
      <Hero />
      <ResponsiveContainer>
        <Services />
        <ProductDemo />
        <WhyChooseUs />
        <Portfolio />
        <AboutUs />
        <section className="py-8 mt-8">
          <h2 className="text-2xl font-bold text-center mb-6">Serving Businesses Across Rajasthan</h2>
          <div className="text-center text-sm text-muted-foreground max-w-3xl mx-auto">
            <p className="mb-4">
              StandaloneCoders provides professional technology services to businesses throughout Rajasthan, including:
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {["Jaipur", "Udaipur", "Jodhpur", "Kota", "Ajmer", "Bikaner", "Alwar", "Bharatpur", "Sikar", "Pali"].map(
                (city) => (
                  <span key={city} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
                    {city}
                  </span>
                ),
              )}
            </div>
            <p>
              Whether you need website development, cybersecurity solutions, digital marketing, or AI technology
              implementation, our team of experts is ready to help your business succeed in the digital landscape.
            </p>
          </div>
        </section>
      </ResponsiveContainer>
    </main>
  )
}
