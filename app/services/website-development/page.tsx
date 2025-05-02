import type { Metadata } from "next"
import { Globe } from "lucide-react"
import ServiceCategoryTemplate from "@/components/service-category-template"

export const metadata: Metadata = {
  title: "Website Development Services | StandaloneCoders",
  description:
    "Professional website development services including custom websites, e-commerce solutions, and content management systems tailored to your business needs.",
}

export default function WebsiteDevelopmentPage() {
  return (
    <ServiceCategoryTemplate
      title="Website Development"
      description="We create custom websites that are visually stunning, highly functional, and optimized for performance. Our web development services are tailored to meet your specific business goals and provide an exceptional user experience."
      icon={<Globe className="w-12 h-12 text-blue-600" />}
      image="/blue-ecommerce-dashboard.png"
      features={[
        "Responsive design that works on all devices",
        "Custom functionality tailored to your business needs",
        "SEO-friendly structure and coding practices",
        "Fast loading speeds and optimized performance",
        "Secure development with data protection",
        "Scalable architecture that grows with your business",
      ]}
      benefits={[
        "Establish a professional online presence",
        "Reach more customers through improved visibility",
        "Increase conversions with user-friendly design",
        "Save time with efficient content management",
        "Build customer trust with a reliable website",
        "Stay ahead of competitors with modern technology",
      ]}
    />
  )
}
