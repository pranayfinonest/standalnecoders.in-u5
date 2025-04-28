import Link from "next/link"
import { Check, ArrowRight } from "lucide-react"

interface ServiceDetailProps {
  title: string
  description: string
  features: string[]
  packages: {
    name: string
    price: string
    description: string
    features: string[]
    popular?: boolean
  }[]
  faqs: {
    question: string
    answer: string
  }[]
  process: {
    step: number
    title: string
    description: string
  }[]
  cta: {
    title: string
    description: string
  }
}

export default function ServiceDetail({
  title,
  description,
  features,
  packages,
  faqs,
  process,
  cta,
}: ServiceDetailProps) {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-center opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/services"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 mb-6 hover:underline"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                ></path>
              </svg>
              Back to Services
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>
            <p className="text-xl text-gray-700 dark:text-gray-300">{description}</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Key Features</h2>
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 gradient-border">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 p-1 bg-blue-100 dark:bg-blue-900/50 rounded-full mr-3">
                      <Check className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Process</h2>
            <div className="space-y-12">
              {process.map((step, index) => (
                <div key={index} className="flex flex-col md:flex-row">
                  <div className="md:w-1/4 flex justify-center md:justify-start">
                    <div className="w-12 h-12 rounded-full bg-blue-600 dark:bg-blue-500 text-white flex items-center justify-center text-xl font-bold">
                      {step.step}
                    </div>
                  </div>
                  <div className="md:w-3/4 mt-4 md:mt-0">
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-gray-700 dark:text-gray-300">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Pricing Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {packages.map((pkg, index) => (
                <div
                  key={index}
                  className={`bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden ${
                    pkg.popular ? "ring-2 ring-blue-500 dark:ring-blue-400" : ""
                  }`}
                >
                  {pkg.popular && (
                    <div className="bg-blue-600 text-white text-center py-2 text-sm font-medium">Most Popular</div>
                  )}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold">{pkg.price}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">{pkg.description}</p>
                    <ul className="space-y-3 mb-8">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <div className="flex-shrink-0 p-1 bg-blue-100 dark:bg-blue-900/50 rounded-full mr-3">
                            <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <span className="text-gray-700 dark:text-gray-300 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/contact"
                      className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center ${
                        pkg.popular
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100"
                      }`}
                    >
                      Get Started
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
                  <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">{cta.title}</h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">{cta.description}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
              >
                Contact Us
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/services"
                className="px-8 py-4 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-medium rounded-lg shadow-lg hover:shadow-xl border border-blue-200 dark:border-gray-700 transition-all flex items-center justify-center"
              >
                Explore Other Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
