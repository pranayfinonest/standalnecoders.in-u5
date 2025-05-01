import Hero from "@/components/hero"
import Services from "@/components/services"
import WhyChooseUs from "@/components/why-choose-us"
import Testimonials from "@/components/testimonials"
import FAQ from "@/components/faq"
import Contact from "@/components/contact"
import Portfolio from "@/components/portfolio"
import ProductDemo from "@/components/product-demo"
import HomepageSpecialOffers from "@/components/homepage-special-offers"

export default function Home() {
  return (
    <main>
      <HomepageSpecialOffers />
      <Hero />
      <Services />
      <WhyChooseUs />
      <ProductDemo />
      <Portfolio />
      <Testimonials />
      <FAQ />
      <Contact />
    </main>
  )
}
