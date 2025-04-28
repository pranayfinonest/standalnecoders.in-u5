import Image from "next/image"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 z-0"></div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in">
              Empowering Your <span className="text-blue-600 dark:text-blue-400">Digital Journey</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 animate-fade-in-delay">
              Custom Websites, Templates, Apps, and Complete Technology Solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-delay-2">
              <Link
                href="#contact"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                Request a Quote
              </Link>
              <Link
                href="#services"
                className="px-8 py-4 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-medium rounded-lg shadow-lg hover:shadow-xl border border-blue-200 dark:border-gray-700 transition-all transform hover:-translate-y-1"
              >
                Explore Services
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 animate-float">
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
    </section>
  )
}
