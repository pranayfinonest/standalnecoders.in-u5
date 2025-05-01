import { Search } from "lucide-react"
import ServiceCategoryTemplate from "@/components/service-category-template"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Digital Marketing Services | StandaloneCoders",
  description:
    "Comprehensive digital marketing services to grow your online presence. SEO, social media marketing, content marketing, and more.",
}

export default function DigitalMarketingPage() {
  return (
    <ServiceCategoryTemplate
      title="Digital Marketing"
      description="Our digital marketing services help businesses increase their online visibility, attract more qualified leads, and convert those leads into customers through strategic and data-driven approaches."
      icon={<Search className="h-8 w-8 text-yellow-600" />}
      image="/interconnected-world.png"
      features={[
        "Search Engine Optimization (SEO)",
        "Social Media Marketing",
        "Content Marketing",
        "Pay-Per-Click (PPC) Advertising",
        "Email Marketing Campaigns",
        "Analytics and Performance Tracking",
      ]}
      benefits={[
        "Increase website traffic and visibility",
        "Generate more qualified leads",
        "Improve conversion rates",
        "Build brand awareness and recognition",
        "Target specific customer segments",
        "Measure and optimize marketing ROI",
      ]}
    />
  )
}
