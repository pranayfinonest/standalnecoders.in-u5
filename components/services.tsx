import { Code, Layout, Smartphone, Database } from "lucide-react"

export default function Services() {
  const services = [
    {
      title: "Website Development",
      description: "Custom, Business, E-commerce websites tailored to your specific needs and brand identity.",
      icon: <Code className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />,
    },
    {
      title: "Website Templates",
      description: "SEO-optimized, ready-to-use designs that get your business online quickly and effectively.",
      icon: <Layout className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />,
    },
    {
      title: "App Development",
      description: "Android, iOS, and Cross-platform applications that engage your users and extend your reach.",
      icon: <Smartphone className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />,
    },
    {
      title: "Technology Solutions",
      description: "Cloud services, CRM/ERP systems, and API integrations to streamline your business operations.",
      icon: <Database className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />,
    },
  ]

  return (
    <section id="services" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            We offer comprehensive technology solutions to help your business thrive in the digital world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            >
              <div className="flex flex-col items-center text-center">
                {service.icon}
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
