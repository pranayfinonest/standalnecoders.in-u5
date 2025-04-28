import Link from "next/link"
import { Shield, TrendingUp, Cpu, Palette } from "lucide-react"

export const dynamic = "force-static"

export default function ServicesPage() {
  const services = [
    {
      title: "Cybersecurity Services",
      description:
        "Protect your digital assets with our comprehensive cybersecurity solutions. We offer vulnerability assessments, penetration testing, security audits, and implementation of robust security measures to safeguard your business from cyber threats.",
      icon: <Shield className="w-12 h-12 text-blue-600 mb-4" />,
      link: "/services/cybersecurity",
    },
    {
      title: "Digital Marketing",
      description:
        "Boost your online presence and reach your target audience with our strategic digital marketing services. From SEO and content marketing to social media management and PPC campaigns, we help you achieve your marketing goals.",
      icon: <TrendingUp className="w-12 h-12 text-blue-600 mb-4" />,
      link: "/services/digital-marketing",
    },
    {
      title: "AI & Technology Solutions",
      description:
        "Leverage the power of artificial intelligence and cutting-edge technology to streamline your operations and gain competitive advantage. Our AI solutions include machine learning models, data analytics, and automation tools.",
      icon: <Cpu className="w-12 h-12 text-blue-600 mb-4" />,
      link: "/services/ai-technology",
    },
    {
      title: "Creative Services",
      description:
        "Bring your brand to life with our creative services. From logo design and brand identity to website design and multimedia content creation, our creative team delivers visually stunning and engaging assets.",
      icon: <Palette className="w-12 h-12 text-blue-600 mb-4" />,
      link: "/services/creative-services",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-12">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 hover:shadow-xl transition-all"
          >
            <div className="flex flex-col items-center text-center">
              <div className="p-4 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-6">{service.icon}</div>
              <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">{service.description}</p>
              <Link
                href={service.link}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
