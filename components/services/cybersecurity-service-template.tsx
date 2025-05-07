import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { CheckCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface Benefit {
  title: string
  description: string
}

interface Feature {
  title: string
  description: string
}

interface ProcessStep {
  step: number
  title: string
  description: string
}

interface FAQ {
  question: string
  answer: string
}

interface PricingTier {
  name: string
  price: string
  description: string
  features: string[]
  recommended?: boolean
}

interface RelatedService {
  title: string
  link: string
}

interface CybersecurityServiceTemplateProps {
  title: string
  subTitle: string
  description: string
  icon: React.ReactNode
  categoryName: string
  categoryColor: string
  heroImage: string
  benefits: Benefit[]
  features: Feature[]
  process: ProcessStep[]
  faqs: FAQ[]
  pricing?: PricingTier[]
  relatedServices?: RelatedService[]
  caseStudies?: any[] // Optional case studies
}

export default function CybersecurityServiceTemplate({
  title,
  subTitle,
  description,
  icon,
  categoryName,
  categoryColor,
  heroImage,
  benefits,
  features,
  process,
  faqs,
  pricing,
  relatedServices,
  caseStudies,
}: CybersecurityServiceTemplateProps) {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div
        className={`bg-gradient-to-r from-blue-700 to-blue-900 rounded-2xl p-8 md:p-12 mb-16 text-white relative overflow-hidden`}
      >
        <div className="absolute inset-0 opacity-10">
          <Image
            src={heroImage || "/placeholder.svg"}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 70vw"
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-white text-sm font-medium mb-4">
            {categoryName}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{title}</h1>
          <h2 className="text-xl md:text-2xl font-semibold mb-6">{subTitle}</h2>
          <p className="text-lg mb-8">{description}</p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" asChild className="bg-white text-blue-900 hover:bg-gray-100">
              <Link href="/contact">Get a Free Consultation</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white/10">
              <Link href="#pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Key Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex">
              <div className="mr-4 mt-1">
                <CheckCircle className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="mb-16 bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Core Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Process Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Process</h2>
        <div className="space-y-6">
          {process.map((step, index) => (
            <div key={index} className="flex">
              <div className="mr-6 relative">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white font-bold">
                  {step.step}
                </div>
                {index < process.length - 1 && (
                  <div className="absolute top-12 bottom-0 left-1/2 w-0.5 -ml-px h-full bg-blue-200"></div>
                )}
              </div>
              <div className="pt-2">
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-semibold">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-400">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      {/* Pricing Section */}
      {pricing && (
        <div id="pricing" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl font-bold mb-8 text-center">Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pricing.map((tier, index) => (
              <Card
                key={index}
                className={`border ${
                  tier.recommended ? "border-blue-500 dark:border-blue-400" : "border-gray-200 dark:border-gray-800"
                } relative`}
              >
                {tier.recommended && (
                  <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 text-sm font-medium rounded-bl-lg rounded-tr-lg">
                    Recommended
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{tier.name}</CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">{tier.price}</span>
                  </div>
                  <CardDescription className="mt-2">{tier.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex">
                        <CheckCircle className="h-5 w-5 mr-2 text-blue-600 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href="/contact">Get Started</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Related Services */}
      {relatedServices && relatedServices.length > 0 && (
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Related Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedServices.map((service, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={service.link}>
                      Learn More <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Final CTA */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 rounded-2xl p-8 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Secure Your Business?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Contact our team of cybersecurity experts today to discuss your security needs and get started with our{" "}
          {title.toLowerCase()} services.
        </p>
        <Button asChild size="lg" className="bg-white text-blue-900 hover:bg-gray-100">
          <Link href="/contact">Contact Us Now</Link>
        </Button>
      </div>
    </div>
  )
}
