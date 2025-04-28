import { Shield, BarChart, Database, Smartphone } from "lucide-react"

export default function Services() {
  const services = [
    {
      title: "Cybersecurity Services",
      description: "Penetration testing, security audits, ISO 27001 compliance, and comprehensive threat analysis.",
      icon: <Shield className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />,
      gradient: "from-blue-500 to-blue-600",
    },
    {
      title: "Digital Marketing",
      description:
        "SEO optimization, lead generation, content creation, and comprehensive digital marketing strategies.",
      icon: <BarChart className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />,
      gradient: "from-blue-400 to-blue-500",
    },
    {
      title: "AI & Technology Solutions",
      description: "AI implementation, prompt engineering, CRM management, and custom technology solutions.",
      icon: <Database className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />,
      gradient: "from-blue-600 to-blue-700",
    },
    {
      title: "Creative Services",
      description: "Video editing, graphic design, banner creation, and comprehensive content development.",
      icon: <Smartphone className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />,
      gradient: "from-blue-500 to-blue-600",
    },
  ]

  return (
    <section id="services" className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-3 mb-4 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full">
            Our Expertise
          </span>
          <h2 className="section-heading mb-6">Our Services</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Comprehensive technology and business solutions to help your organization thrive in the digital world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="service-card group">
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${service.gradient}`}></div>
              <div className="flex flex-col items-center text-center">
                <div className="p-4 rounded-full bg-blue-50 dark:bg-blue-900/20 mb-6 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
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
