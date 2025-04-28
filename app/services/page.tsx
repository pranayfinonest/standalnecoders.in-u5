import Link from "next/link"
import { Shield, BarChart, Database, Smartphone } from "lucide-react"

export default function ServicesPage() {
  const services = [
    {
      id: "cybersecurity",
      title: "Cybersecurity Services",
      description: "Comprehensive security solutions to protect your digital assets and infrastructure.",
      icon: <Shield className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />,
      gradient: "from-blue-500 to-blue-600",
    },
    {
      id: "digital-marketing",
      title: "Digital Marketing",
      description: "Strategic marketing solutions to enhance your online presence and drive growth.",
      icon: <BarChart className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />,
      gradient: "from-blue-400 to-blue-500",
    },
    {
      id: "ai-technology",
      title: "AI & Technology Solutions",
      description: "Cutting-edge AI and technology implementations to transform your business operations.",
      icon: <Database className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />,
      gradient: "from-blue-600 to-blue-700",
    },
    {
      id: "creative-services",
      title: "Creative Services",
      description: "Professional creative solutions to enhance your brand and visual communication.",
      icon: <Smartphone className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />,
      gradient: "from-blue-500 to-blue-600",
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-center opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block py-1 px-3 mb-4 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full">
              Our Expertise
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
              Explore our comprehensive range of technology and business solutions designed to help your organization
              thrive in the digital world.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <Link key={service.id} href={`/services/${service.id}`} className="group">
                <div className="service-card h-full flex flex-col">
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${service.gradient}`}></div>
                  <div className="flex items-start p-6">
                    <div className="p-4 rounded-full bg-blue-50 dark:bg-blue-900/20 mr-6 group-hover:scale-110 transition-transform">
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">{service.description}</p>
                      <span className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium">
                        Learn more
                        <svg
                          className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          ></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
              Contact us today to discuss your project requirements and how we can help you achieve your goals.
            </p>
            <Link
              href="/contact"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all inline-flex items-center"
            >
              Contact Us
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
