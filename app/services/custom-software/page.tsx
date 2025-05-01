import { Code } from "lucide-react"
import ServiceCategoryTemplate from "@/components/service-category-template"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Custom Software Development | StandaloneCoders",
  description:
    "Tailored software solutions for your business needs. Enterprise software, SaaS products, API development, and legacy system modernization.",
}

export default function CustomSoftwarePage() {
  return (
    <ServiceCategoryTemplate
      title="Custom Software Development"
      description="We develop tailored software solutions that address your specific business challenges, streamline operations, and provide a competitive advantage in your industry."
      icon={<Code className="h-8 w-8 text-indigo-600" />}
      image="/blue-ecommerce-dashboard.png"
      features={[
        "Enterprise Software Development",
        "SaaS Product Development",
        "API Development & Integration",
        "Legacy System Modernization",
        "Database Design & Development",
        "Cloud-Based Solutions",
      ]}
      benefits={[
        "Streamline business processes and workflows",
        "Increase operational efficiency",
        "Reduce costs and eliminate redundancies",
        "Scale your business more effectively",
        "Gain a competitive advantage",
        "Create custom solutions for unique challenges",
      ]}
    />
  )
}
