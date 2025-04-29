import Link from "next/link"
import { Shield, BarChart, Database, Smartphone } from "lucide-react"

export default function Services() {
  const services = [
    {
      title: "Cybersecurity Services",
      description: "Penetration testing, security audits, ISO 27001 compliance, and comprehensive threat analysis.",
      icon: <Shield className="w-12 h-12 text-blue-600 mb-4" />,
      link: "/services/cybersecurity",
    },
    {
      title: "Digital Marketing",
      description:
        "SEO optimization, lead generation, content creation, and comprehensive digital marketing strategies.",
      icon: <BarChart className="w-12 h-12 text-blue-600 mb-4" />,
      link: "/services/digital-marketing",
    },
    {
      title: "AI & Technology Solutions",
      description: "AI implementation, prompt engineering, CRM management, and custom technology solutions.",
      icon: <Database className="w-12 h-12 text-blue-600 mb-4" />,
      link: "/services/ai-technology",
    },
    {
      title: "Creative Services",
      description: "Video editing, graphic design, banner creation, and comprehensive content development.",
      icon: <Smartphone className="w-12 h-12 text-blue-600 mb-4" />,
      link: "/services/creative-services",
    },
  ]

  return (
    <section id="services" className="section-spacing bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="badge mx-auto mb-4">
            <span className="w-2 h-2 rounded-full bg-blue-600 mr-2"></span>
            Our Expertise
          </div>
          <h2 className="section-title mx-auto">Our Services</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mt-6">
            Comprehensive technology and business solutions to help your organization thrive in the digital world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Link href={service.link} key={index} className="block">
              <div className="modern-card p-8 hover:translate-y-[-8px] group">
                <div className="absolute top-0 left-0 w-full h-1 bg-blue-100"></div>
                <div className="flex flex-col items-center text-center">
                  <div className="p-4 rounded-full bg-blue-100 mb-6 group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{service.title}</h3>
                  <p className="text-gray-700">{service.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
