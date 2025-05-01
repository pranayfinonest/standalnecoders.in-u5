import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import SpecialDiscounts from "./special-discounts"

interface ServiceFeature {
  title: string
  description: string
  icon?: React.ReactNode
  features?: string[]
}

interface BenefitItem {
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

interface Technology {
  name: string
  icon: React.ReactNode
}

interface ServiceCategoryProps {
  title: string
  description: string
  imageSrc: string
  icon?: React.ReactNode
  services: ServiceFeature[]
  benefits: {
    description: string
    items: BenefitItem[]
  }
  process: {
    steps: ProcessStep[]
  }
  packages: ServicePackage[]
  faqs: FAQ[]
  technologies: Technology[]
  cta: {
    title: string
    description: string
  }
}

export default function ServiceCategoryTemplate({
  title,
  description,
  imageSrc,
  icon,
  services,
  benefits,
  process,
  packages,
  faqs,
  technologies,
  cta,
}: ServiceCategoryProps) {
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
          <div className="flex items-center mb-4">
            {icon && <div className="mr-3">{icon}</div>}
            <h1 className="text-4xl font-bold">{title}</h1>
          </div>
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

      {/* Services Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our {title} Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {service.icon && <div className="mr-3">{service.icon}</div>}
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                </div>
                <p className="text-gray-600 mb-6">{service.description}</p>
                {service.features && (
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
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
                )}
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full"
                >
                  Learn More
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="mb-16 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-4 text-center">Benefits</h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">{benefits.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.items.map((item, index) => (
            <div key={index} className="flex">
              <div className="mr-4 mt-1">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                  {index + 1}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Process Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {process.steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-white text-2xl flex items-center justify-center mx-auto mb-4">
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Packages Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Packages</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <Card key={index} className={`overflow-hidden relative ${pkg.popular ? "border-primary border-2" : ""}`}>
              {pkg.popular && (
                <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 text-sm font-medium">
                  Popular
                </div>
              )}
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-center">{pkg.title}</h3>
                <p className="text-3xl font-bold text-center mb-6">{pkg.price}</p>
                <ul className="space-y-2 mb-6">
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
                <Link
                  href="/booking/flow"
                  className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                    pkg.popular
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                  } h-10 px-4 py-2 w-full`}
                >
                  {pkg.cta}
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Technologies Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Technologies We Use</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {technologies.map((tech, index) => (
            <div key={index} className="text-center">
              <div className="mb-4 flex justify-center">{tech.icon}</div>
              <p className="font-medium">{tech.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary text-white rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">{cta.title}</h2>
        <p className="mb-6 max-w-2xl mx-auto">{cta.description}</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-primary hover:bg-gray-100 h-10 px-6 py-2"
          >
            Contact Us
          </Link>
          <Link
            href="/booking/flow"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-white bg-transparent hover:bg-white/10 h-10 px-6 py-2"
          >
            Start Your Project
          </Link>
        </div>
      </div>
    </div>
  )
}
