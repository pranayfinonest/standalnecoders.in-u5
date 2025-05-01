import Hero from "@/components/hero"
import Services from "@/components/services"
import Portfolio from "@/components/portfolio"
import WhyChooseUs from "@/components/why-choose-us"
import { ResponsiveContainer } from "@/components/responsive-container"
import AboutUs from "@/components/about-us"
import EnhancedSpecialOffers from "@/components/enhanced-special-offers"
import Testimonials from "@/components/testimonials"
import FAQ from "@/components/faq"
import ProductDemo from "@/components/product-demo"

export const dynamic = "force-static"

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <ResponsiveContainer>
        <Services />
        <WhyChooseUs />
        <ProductDemo />
        <Portfolio />
        <AboutUs />
        <EnhancedSpecialOffers />
        <Testimonials />
        <FAQ />
        {/* Contact section removed as requested */}
      </ResponsiveContainer>
    </main>
  )
}
