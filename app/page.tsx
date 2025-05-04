import Hero from "@/components/hero"
import Services from "@/components/services"
import Portfolio from "@/components/portfolio"
import WhyChooseUs from "@/components/why-choose-us"
import { ResponsiveContainer } from "@/components/responsive-container"
import AboutUs from "@/components/about-us"

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
      </ResponsiveContainer>
    </main>
  )
}
