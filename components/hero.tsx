import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function Hero() {
  return (
    <section className="section-spacing bg-gradient-to-b from-blue-50 to-white overflow-hidden">
      <div className="container-custom relative">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="lg:w-1/2 animate-fade-in">
            <div className="badge mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-600 mr-2"></span>
              Technology Solutions Provider
            </div>

            <h1 className="mb-6 text-gray-900">
              <span className="text-blue-600">Innovative</span> Technology Solutions for{" "}
              <span className="text-blue-600">Modern</span> Business
            </h1>

            <p className="text-xl text-gray-700 mb-8 max-w-xl">
              Delivering expert solutions in Cybersecurity, AI, Digital Marketing, and comprehensive Technology Services
              tailored to your business needs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in animate-delay-200">
              <Link href="#contact" className="primary-button group" target="_blank" rel="noopener noreferrer">
                Request a Quote
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link href="#services" className="outline-button" target="_blank" rel="noopener noreferrer">
                Explore Services
              </Link>
            </div>
          </div>

          <div className="lg:w-1/2 animate-scale-in animate-delay-300">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-blue-200 rounded-2xl blur-xl opacity-50"></div>
              <div className="relative bg-white rounded-xl overflow-hidden shadow-md">
                <Image
                  src="/digital-transformation-blueprint.png"
                  alt="Digital Transformation"
                  width={600}
                  height={600}
                  className="w-full h-auto"
                  priority
                />
              </div>

              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-100 rounded-xl rotate-12"></div>
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-blue-200 rounded-xl -rotate-12"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
