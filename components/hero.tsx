import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-white to-gray-100 pt-20 pb-32 overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Transforming Ideas into <span className="text-blue-600">Digital Reality</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto lg:mx-0">
              We provide comprehensive technology solutions including cybersecurity, AI implementation, digital
              marketing, and creative services to help your business thrive.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/services" className="btn-primary flex items-center justify-center gap-2">
                Explore Services <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/contact" className="btn-secondary flex items-center justify-center gap-2">
                Contact Us
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <img
                src="/digital-transformation-blueprint.png"
                alt="Digital Transformation Blueprint"
                className="w-full h-auto"
              />
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-600 rounded-full filter blur-3xl opacity-20 -z-10"></div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-20 right-0 w-64 h-64 bg-blue-100 rounded-full filter blur-3xl opacity-70"></div>
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-blue-200 rounded-full filter blur-3xl opacity-70"></div>
    </section>
  )
}
