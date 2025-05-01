import { Globe } from "lucide-react"
import ServiceCategoryTemplate from "@/components/service-category-template"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Website Development Services | StandaloneCoders",
  description:
    "Professional website development services for businesses of all sizes. Custom websites, e-commerce solutions, and content management systems.",
}

export default function WebsiteDevelopmentPage() {
  return (
    <ServiceCategoryTemplate
      title="Website Development"
      description="We create custom websites that are designed to meet your specific business needs and goals. From simple informational sites to complex e-commerce platforms, we have the expertise to deliver high-quality solutions."
      icon={<Globe className="h-8 w-8 text-blue-600" />}
      image="/digital-transformation-blueprint.png"
      features={[
        "Custom Website Design & Development",
        "E-commerce Development (Shopify, WooCommerce, Custom)",
        "Content Management Systems (WordPress, Webflow, etc.)",
        "Progressive Web Applications (PWAs)",
        "Responsive Design for All Devices",
        "SEO-Friendly Architecture",
      ]}
      benefits={[
        "Establish a professional online presence",
        "Increase visibility and reach new customers",
        "Improve user experience and engagement",
        "Generate more leads and conversions",
        "Streamline business operations",
        "Stay ahead of competitors",
      ]}
    />
  )
}
