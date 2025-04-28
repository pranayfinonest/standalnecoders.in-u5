import ServiceDetail from "@/components/service-detail"

export default function ServicesPage() {
  const services = [
    {
      title: "Cybersecurity Services",
      description:
        "Protect your digital assets with our comprehensive cybersecurity solutions. We offer vulnerability assessments, penetration testing, security audits, and implementation of robust security measures to safeguard your business from cyber threats.",
      icon: "Shield",
      link: "/services/cybersecurity",
    },
    {
      title: "Digital Marketing",
      description:
        "Boost your online presence and reach your target audience with our strategic digital marketing services. From SEO and content marketing to social media management and PPC campaigns, we help you achieve your marketing goals.",
      icon: "TrendingUp",
      link: "/services/digital-marketing",
    },
    {
      title: "AI & Technology Solutions",
      description:
        "Leverage the power of artificial intelligence and cutting-edge technology to streamline your operations and gain competitive advantage. Our AI solutions include machine learning models, data analytics, and automation tools.",
      icon: "Cpu",
      link: "/services/ai-technology",
    },
    {
      title: "Creative Services",
      description:
        "Bring your brand to life with our creative services. From logo design and brand identity to website design and multimedia content creation, our creative team delivers visually stunning and engaging assets.",
      icon: "Palette",
      link: "/services/creative-services",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-12">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service) => (
          <ServiceDetail
            key={service.title}
            title={service.title}
            description={service.description}
            icon={service.icon}
            link={service.link}
          />
        ))}
      </div>
    </div>
  )
}
