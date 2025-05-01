import Image from "next/image"
import Link from "next/link"
import SpecialDiscounts from "./special-discounts"
import AddToCartButton from "./add-to-cart-button"

// Define types for the service data
interface Feature {
  title: string
  description: string
}

interface ProcessStep {
  title: string
  description: string
}

interface ServicePackage {
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

export interface ServiceDetailProps {
  title: string
  description: string
  imageSrc: string
  features: Feature[]
  process: ProcessStep[]
  packages: ServicePackage[]
  faqs: FAQ[]
}

// Main service detail component - completely static with NO client components
export default function ServiceDetailStatic({
  title,
  description,
  imageSrc,
  features,
  process,
  packages,
  faqs,
}: ServiceDetailProps) {
  // Special discounts data
  const discounts = [
    {
      id: "early-bird",
      name: "Early Bird Discount",
      description: "Book any service package before the end of the month and get a special discount!",
      code: "EARLYBIRD",
      discount: "15% OFF",
      validUntil: "31 May 2025",
      isNew: true,
    },
    {
      id: "bundle",
      name: "Bundle & Save",
      description: "Purchase any two services together and save on your total order.",
      code: "BUNDLE2025",
      discount: "20% OFF",
      validUntil: "30 June 2025",
    },
    {
      id: "first-time",
      name: "First-Time Customer",
      description: "New to StandaloneCoders? Get a special discount on your first service.",
      code: "WELCOME",
      discount: "₹5,000 OFF",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Special Discounts Section */}
      <SpecialDiscounts discounts={discounts} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div>
          <h1 className="text-4xl font-bold mb-6">{title}</h1>
          <p className="text-lg text-gray-700 mb-8">{description}</p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Get a Quote
            </Link>
            <Link
              href="/booking/flow"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
            >
              Start Project
            </Link>
          </div>
        </div>
        <div className="relative h-[300px] lg:h-[400px] rounded-lg overflow-hidden">
          <Image
            src={imageSrc || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      </div>

      {/* Process Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {process.map((step, index) => (
            <div key={index} className="bg-card p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold mr-4">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
              </div>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-card p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Pricing Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`bg-card p-6 rounded-lg shadow relative ${pkg.popular ? "border-2 border-primary shadow-lg" : ""}`}
            >
              {pkg.popular && (
                <div className="absolute top-4 right-4 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
                  Popular
                </div>
              )}
              <h3 className="text-xl font-semibold mb-2">{pkg.title}</h3>
              <p className="text-3xl font-bold mb-6">{pkg.price}</p>
              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="space-y-3">
                <AddToCartButton
                  service={{
                    title: pkg.title,
                    price: pkg.price,
                    features: pkg.features,
                    description: `${title} - ${pkg.title} Package`,
                    image: imageSrc,
                  }}
                  category={title}
                  packageType={pkg.title}
                  className="w-full"
                />
                <Link
                  href="/contact"
                  className={`inline-flex w-full items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                    pkg.popular
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                  } h-10 px-4 py-2`}
                >
                  {pkg.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        <div className="space-y-6 max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-card p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold mb-6">Ready to get started?</h2>
        <div className="flex justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Contact Us
          </Link>
          <Link
            href="/booking/flow"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            Start Your Project
          </Link>
        </div>
      </div>
    </div>
  )
}
