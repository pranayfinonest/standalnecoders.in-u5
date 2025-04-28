import { Suspense } from "react"
import Hero from "@/components/hero"
import Services from "@/components/services"
import Portfolio from "@/components/portfolio"
import WhyChooseUs from "@/components/why-choose-us"
import Contact from "@/components/contact"

export const dynamic = "force-static"

export default function Home() {
  return (
    <main>
      <Suspense
        fallback={
          <div className="h-[60vh] flex items-center justify-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
              <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        }
      >
        <Hero />
      </Suspense>

      <Suspense fallback={<div className="h-[40vh]"></div>}>
        <Services />
      </Suspense>

      <Suspense fallback={<div className="h-[40vh]"></div>}>
        <Portfolio />
      </Suspense>

      <Suspense fallback={<div className="h-[40vh]"></div>}>
        <WhyChooseUs />
      </Suspense>

      <Suspense fallback={<div className="h-[40vh]"></div>}>
        <Contact />
      </Suspense>
    </main>
  )
}
