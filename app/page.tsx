import Hero from "@/components/hero"
import Services from "@/components/services"
import Portfolio from "@/components/portfolio"
import WhyChooseUs from "@/components/why-choose-us"
import { ResponsiveContainer } from "@/components/responsive-container"
import AboutUs from "@/components/about-us"
import EnhancedSpecialOffers from "@/components/enhanced-special-offers"

export const dynamic = "force-static"

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <ResponsiveContainer>
        <Services />
        <WhyChooseUs />
        <Portfolio />
        <AboutUs />
        {/* Special Offers */}
        <EnhancedSpecialOffers />
      </ResponsiveContainer>
    </main>
  )
}
