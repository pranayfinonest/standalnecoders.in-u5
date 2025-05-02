"use client"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import type React from "react"

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

interface ServiceCategoryTemplateProps {
  title: string
  description: string
  features: string[]
  benefits: string[]
  icon?: React.ReactNode
  image?: string
}

export default function ServiceCategoryTemplate({
  title,
  description,
  features,
  benefits,
  icon,
  image = "/abstract-geometric-shapes.png",
}: ServiceCategoryTemplateProps) {
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
    <div className="container mx-auto px-4 py-16">
      <Link href="/services" className="flex items-center text-blue-600 mb-8 hover:underline">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Services
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <div>
          {icon && <div className="bg-blue-100 p-6 rounded-full inline-block mb-6">{icon}</div>}
          <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">{title}</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">{description}</p>
          <Button asChild size="lg">
            <Link href={`/contact?service=${encodeURIComponent(title)}`}>Request a Quote</Link>
          </Button>
        </div>
        <div className="relative h-[300px] rounded-lg overflow-hidden shadow-lg">
          <Image
            src={image || "/placeholder.svg?height=300&width=500"}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Key Features</h2>
          <ul className="space-y-4">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Benefits</h2>
          <ul className="space-y-4">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Ready to get started?</h2>
        <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
          Contact us today to discuss your project requirements.
        </p>
        <Button asChild size="lg">
          <Link href="/contact">Contact Us</Link>
        </Button>
      </div>
    </div>
  )
}
