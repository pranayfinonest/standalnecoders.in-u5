import Image from "next/image"
import Link from "next/link"
import { ChevronRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function ServiceCategoryTemplate({
  title,
  description,
  icon,
  services,
  benefits,
  process,
  technologies,
  faqs,
  cta,
}) {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-lg mb-6">{icon}</div>
          <h1 className="text-4xl font-bold mb-6">{title}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">{description}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg">
              <Link href="/contact">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/booking/templates">
                View Pricing <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
          <Image
            src="/abstract-geometric-shapes.png"
            alt={`${title} Services`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      </div>

      {/* Services List */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold mb-12 text-center">Our {title} Services</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="h-full hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="rounded-full bg-blue-100 dark:bg-blue-900/20 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                {service.link && (
                  <Button asChild variant="outline" className="w-full">
                    <Link href={service.link}>
                      Learn More <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="mb-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold mb-6">Benefits of Our {title} Services</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">{benefits.description}</p>
            <ul className="space-y-4">
              {benefits.items.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <div className="rounded-full bg-green-100 dark:bg-green-900/20 p-1 mr-4 mt-1">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{benefit.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{benefit.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="order-1 md:order-2 relative h-[400px] rounded-xl overflow-hidden shadow-xl">
            <Image
              src="/yogendra-singh.png"
              alt="Yogendra Singh - Expert"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold mb-12 text-center">Our {title} Process</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {process.steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="rounded-full bg-blue-100 dark:bg-blue-900/20 w-16 h-16 flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl font-bold text-blue-600">{index + 1}</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-center">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-center">{step.description}</p>
              {index < process.steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-blue-100 dark:bg-blue-900/20 -z-10 transform -translate-x-1/2"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Technologies Section */}
      {technologies && (
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Technologies We Use</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="mb-4">{tech.icon}</div>
                <h3 className="font-medium text-center">{tech.name}</h3>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FAQs Section */}
      {faqs && (
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
                <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8 md:p-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">{cta.title}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">{cta.description}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/booking/templates">
                  View Pricing <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative h-[300px] rounded-xl overflow-hidden shadow-xl">
            <Image
              src="/yogendra-singh.png"
              alt="Yogendra Singh - Expert"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
