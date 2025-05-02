import type { Metadata } from "next"
import { Code } from "lucide-react"
import ServiceCategoryTemplate from "@/components/service-category-template"

export const metadata: Metadata = {
  title: "Custom Software Development Services | StandaloneCoders",
  description:
    "Tailored software solutions designed to streamline your business operations, increase efficiency, and drive growth.",
}

export default function CustomSoftwarePage() {
  return (
    <ServiceCategoryTemplate
      title="Custom Software Development"
      description="We create bespoke software solutions tailored to your specific business requirements. Our custom software development services help streamline operations, automate processes, and drive business growth."
      icon={<Code className="w-12 h-12 text-indigo-600" />}
      image="/intricate-logic-flow.png"
      features={[
        "Tailored solutions for your unique business needs",
        "Scalable architecture for future growth",
        "Integration with existing systems and databases",
        "User-friendly interfaces for improved adoption",
        "Comprehensive documentation and training",
        "Ongoing support and maintenance",
      ]}
      benefits={[
        "Streamline business processes and workflows",
        "Increase operational efficiency and productivity",
        "Reduce costs through automation",
        "Gain competitive advantage with unique solutions",
        "Improve data management and security",
        "Scale your business with flexible technology",
      ]}
    />
  )
}
