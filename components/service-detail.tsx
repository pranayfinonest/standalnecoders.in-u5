import Link from "next/link"
import { CheckCircle, ArrowRight } from "lucide-react"

interface Feature {
  title: string
  description: string
}

interface ProcessStep {
  title: string
  description: string
}

interface Package {
  title: string
  price: string
  features: string[]
  cta: string
  popular?: boolean
}

interface FAQ {
  question: string
  answer: string
}

interface ServiceDetailProps {
  title: string
  description: string
  imageSrc: string
  features: Feature[]
  process: ProcessStep[]
  packages: Package[]
  faqs: FAQ[]
}

export default function ServiceDetail({
  title,
  description,
  imageSrc,
  features,
  process,
  packages,
  faqs,
}: ServiceDetailProps) {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h1 className="text-4xl font-bold mb-6">{title}</h1>
          <p className="text-lg text-gray-700 mb-8">{description}</p>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get Started <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
        <div className="rounded-xl overflow-hidden shadow-xl">
          <img src={imageSrc || "/placeholder.svg"} alt={title} className="w-full h-auto" />
        </div>
      </div>

      {/* Features Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-12 text-center">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="mb-20 bg-gray-50 py-16 px-4 rounded-2xl">
        <h2 className="text-3xl font-bold mb-12 text-center">Our Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {process.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white p-8 rounded-xl shadow-md h-full">
                <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg mb-4">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                <p className="text-gray-700">{step.description}</p>
              </div>
              {index < process.length - 1 && (
                <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                  <ArrowRight className="w-6 h-6 text-blue-600" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-12 text-center">Pricing Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:transform hover:scale-105 ${
                pkg.popular ? "border-2 border-blue-600 relative" : ""
              }`}
            >
              {pkg.popular && (
                <div className="bg-blue-600 text-white text-center py-1 text-sm font-medium">Most Popular</div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4">{pkg.title}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{pkg.price}</span>
                </div>
                <ul className="mb-8 space-y-3">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`block text-center py-3 px-6 rounded-lg font-medium transition-colors ${
                    pkg.popular
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {pkg.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-xl font-bold mb-2">{faq.question}</h3>
              <p className="text-gray-700">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white rounded-2xl p-12 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Contact us today to discuss how our {title} can help your business grow and succeed.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors"
        >
          Contact Us <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
      </section>
    </div>
  )
}
