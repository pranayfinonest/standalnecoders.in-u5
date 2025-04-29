import type { Metadata } from "next"
import Link from "next/link"
import { Shield, BarChart, Database, Smartphone, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Our Services | StandaloneCoders",
  description:
    "Explore our comprehensive range of services including cybersecurity, digital marketing, AI solutions, and creative services.",
}

export default function ServicesPage() {
  const services = [
    {
      title: "Cybersecurity Services",
      description:
        "Comprehensive security solutions to protect your business from cyber threats and ensure data integrity.",
      icon: <Shield className="w-16 h-16 text-blue-600 mb-6" />,
      link: "/services/cybersecurity",
      features: [
        "Penetration Testing",
        "Security Audits",
        "ISO 27001 Compliance",
        "Threat Analysis",
        "Security Training",
      ],
    },
    {
      title: "Digital Marketing",
      description: "Strategic digital marketing services to boost your online presence and drive business growth.",
      icon: <BarChart className="w-16 h-16 text-blue-600 mb-6" />,
      link: "/services/digital-marketing",
      features: [
        "SEO Optimization",
        "Content Marketing",
        "Social Media Management",
        "PPC Campaigns",
        "Analytics & Reporting",
      ],
    },
    {
      title: "AI & Technology Solutions",
      description:
        "Cutting-edge AI and technology solutions to streamline operations and enhance customer experiences.",
      icon: <Database className="w-16 h-16 text-blue-600 mb-6" />,
      link: "/services/ai-technology",
      features: [
        "AI Implementation",
        "Prompt Engineering",
        "CRM Management",
        "Custom Software Development",
        "Technology Consulting",
      ],
    },
    {
      title: "Creative Services",
      description: "Professional creative services to enhance your brand identity and visual communication.",
      icon: <Smartphone className="w-16 h-16 text-blue-600 mb-6" />,
      link: "/services/creative-services",
      features: ["Video Editing", "Graphic Design", "Banner Creation", "UI/UX Design", "Brand Identity Development"],
    },
  ]

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-6">Our Services</h1>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
          We provide comprehensive technology solutions to help businesses thrive in the digital landscape.
        </p>
      </div>

      <div className="space-y-24">
        {services.map((service, index) => (
          <div
            key={index}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
              index % 2 === 1 ? "lg:flex-row-reverse" : ""
            }`}
          >
            <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
              <div className="bg-blue-100 p-8 rounded-full inline-block mb-6">{service.icon}</div>
              <h2 className="text-3xl font-bold mb-4">{service.title}</h2>
              <p className="text-lg text-gray-700 mb-6">{service.description}</p>
              <ul className="mb-8 space-y-2">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={service.link}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Learn More <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
            <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
              <div className="bg-gray-100 rounded-xl p-8 h-80 flex items-center justify-center">
                <img
                  src={`/abstract-geometric-shapes.png?height=400&width=600&query=${encodeURIComponent(service.title)}`}
                  alt={service.title}
                  className="max-w-full max-h-full rounded-lg"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-24 bg-blue-50 rounded-2xl p-12 text-center">
        <h2 className="text-3xl font-bold mb-6">Need a Custom Solution?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          We can create tailored solutions to meet your specific business requirements.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Contact Us <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
      </div>
    </div>
  )
}
