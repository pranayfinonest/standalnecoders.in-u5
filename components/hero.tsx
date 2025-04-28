import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 z-0"></div>
      <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-center opacity-5 z-0"></div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-blue-400/10 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-300/10 dark:bg-blue-400/10 rounded-full blur-3xl"></div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <span className="inline-block py-1 px-3 mb-6 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full animate-fade-in">
              Technology Solutions Provider
            </span>
            <h1 className="mb-6 leading-tight animate-fade-in">
              <span className="text-gradient">StandaloneCoders</span>.in
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 animate-fade-in-delay max-w-xl">
              Delivering expert solutions in Cybersecurity, AI, Digital Marketing, and comprehensive Technology
              Services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-delay-2">
              <Link
                href="#contact"
                className="group px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
              >
                Request a Quote
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#services"
                className="px-8 py-4 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-medium rounded-lg shadow-lg hover:shadow-xl border border-blue-200 dark:border-gray-700 transition-all"
              >
                Explore Services
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 animate-float relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg blur opacity-30 dark:opacity-40"></div>
            <div className="relative">
              <Image
                src="/digital-transformation-blueprint.png"
                alt="Digital Transformation"
                width={600}
                height={600}
                className="w-full h-auto rounded-lg shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
