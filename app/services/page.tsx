import type { Metadata } from "next"
import Link from "next/link"
import {
  Globe,
  Smartphone,
  Code,
  CheckCircle,
  Palette,
  Cloud,
  BarChart,
  Headphones,
  Cpu,
  ArrowRight,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Our Services | StandaloneCoders",
  description:
    "Explore our comprehensive range of services including website development, mobile apps, software solutions, UI/UX design, cloud services, and more.",
}

export default function ServicesPage() {
  const serviceCategories = [
    {
      title: "Website Development",
      description:
        "Custom websites, e-commerce solutions, and content management systems tailored to your business needs.",
      icon: <Globe className="w-16 h-16 text-blue-600 mb-6" />,
      link: "/services/website-development",
      services: [
        "Custom Website Design & Development",
        "E-commerce Development (Shopify, WooCommerce, Custom React.js / Node.js)",
        "Static, Dynamic & CMS-based Websites (WordPress, Webflow, etc.)",
        "Landing Pages & Sales Funnels",
        "API Integration & Backend Development",
        "Website Maintenance & Support",
      ],
    },
    {
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications for Android and iOS platforms.",
      icon: <Smartphone className="w-16 h-16 text-blue-600 mb-6" />,
      link: "/services/mobile-app-development",
      services: [
        "Android App Development (Native/Kotlin/Java)",
        "iOS App Development (Swift)",
        "Cross-Platform Apps (React Native, Flutter)",
        "App Deployment on Play Store and App Store",
        "App UI/UX Design",
      ],
    },
    {
      title: "Software & SaaS Development",
      description: "Custom software solutions and SaaS applications to streamline your business operations.",
      icon: <Code className="w-16 h-16 text-blue-600 mb-6" />,
      link: "/services/software-development",
      services: [
        "Custom Software Solutions (CRM, ERP, HRMS, LMS)",
        "SaaS (Software as a Service) Application Development",
        "Admin Dashboards and Backend Systems",
      ],
    },
    {
      title: "Custom Software Development",
      description: "Tailored software solutions designed to solve your unique business challenges and drive growth.",
      icon: <Code className="w-16 h-16 text-blue-600 mb-6" />,
      link: "/services/custom-software",
      services: [
        "Enterprise Applications",
        "CRM & ERP Systems",
        "Workflow Automation",
        "Legacy System Modernization",
        "Secure Financial Software",
        "Custom Integrations",
      ],
    },
    {
      title: "Quality Assurance & Testing",
      description: "Comprehensive testing services to ensure your software meets the highest quality standards.",
      icon: <CheckCircle className="w-16 h-16 text-blue-600 mb-6" />,
      link: "/services/quality-assurance",
      services: [
        "Manual Testing",
        "Automation Testing (Selenium, Cypress)",
        "Mobile App Testing",
        "Security Testing",
        "API Testing",
        "Performance and Load Testing",
      ],
    },
    {
      title: "UI/UX Design Services",
      description: "User-centered design solutions that enhance user experience and drive engagement.",
      icon: <Palette className="w-16 h-16 text-blue-600 mb-6" />,
      link: "/services/ui-ux-design",
      services: [
        "Website and App Wireframing",
        "Prototype Designing",
        "User Journey Mapping",
        "Mobile and Web App Design",
        "Branding, Logo, and Graphic Designing",
      ],
    },
    {
      title: "Cloud & DevOps Solutions",
      description: "Cloud infrastructure and DevOps services to optimize your development workflow.",
      icon: <Cloud className="w-16 h-16 text-blue-600 mb-6" />,
      link: "/services/cloud-devops",
      services: [
        "Server Setup and Cloud Deployment (AWS, Azure, GCP)",
        "CI/CD Pipeline Setup",
        "Server Monitoring and Maintenance",
        "Docker & Kubernetes Solutions",
      ],
    },
    {
      title: "SEO & Digital Marketing",
      description: "Strategic digital marketing services to boost your online presence and drive business growth.",
      icon: <BarChart className="w-16 h-16 text-blue-600 mb-6" />,
      link: "/services/digital-marketing",
      services: [
        "Search Engine Optimization (SEO)",
        "Pay-Per-Click (PPC) Campaigns (Google Ads, Facebook Ads)",
        "Social Media Management",
        "Email Marketing Campaigns",
        "Content Marketing and Copywriting",
      ],
    },
    {
      title: "IT Consulting & Support",
      description: "Expert IT consulting and technical support to guide your technology decisions.",
      icon: <Headphones className="w-16 h-16 text-blue-600 mb-6" />,
      link: "/services/it-consulting",
      services: [
        "Project Planning and Architecture Consulting",
        "Tech Stack Selection Guidance",
        "Business Process Automation",
        "Dedicated Developer Hiring Model",
      ],
    },
    {
      title: "AI & Emerging Technologies",
      description: "Cutting-edge solutions leveraging artificial intelligence and emerging technologies.",
      icon: <Cpu className="w-16 h-16 text-blue-600 mb-6" />,
      link: "/services/ai-technologies",
      services: [
        "Chatbot Development",
        "AI/ML Model Integration",
        "Blockchain Application Development",
        "Internet of Things (IoT) Solutions",
      ],
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
        {serviceCategories.map((category, index) => (
          <div
            key={index}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
              index % 2 === 1 ? "lg:flex-row-reverse" : ""
            }`}
          >
            <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
              <div className="bg-blue-100 p-8 rounded-full inline-block mb-6">{category.icon}</div>
              <h2 className="text-3xl font-bold mb-4">{category.title}</h2>
              <p className="text-lg text-gray-700 mb-6">{category.description}</p>
              <ul className="mb-8 space-y-3">
                {category.services.map((service, i) => (
                  <li key={i} className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2"></span>
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={category.link}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Learn More <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
            <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
              <div className="bg-gray-100 rounded-xl p-8 h-80 flex items-center justify-center">
                <img
                  src={`/abstract-geometric-shapes.png?height=400&width=600&query=${encodeURIComponent(category.title)}`}
                  alt={category.title}
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
