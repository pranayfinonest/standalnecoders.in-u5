import { Palette } from "lucide-react"
import ServiceCategoryTemplate from "@/components/service-category-template"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Creative Services | StandaloneCoders",
  description:
    "Professional creative services for your brand. UI/UX design, brand identity, graphic design, and motion graphics & animation.",
}

export default function CreativeServicesPage() {
  return (
    <ServiceCategoryTemplate
      title="Creative Services"
      description="Our creative services help businesses establish a strong visual identity, create engaging user experiences, and communicate effectively with their audience through professional design solutions."
      icon={<Palette className="h-8 w-8 text-pink-600" />}
      image="/modern-portfolio-design.png"
      features={[
        "UI/UX Design",
        "Brand Identity Design",
        "Graphic Design",
        "Motion Graphics & Animation",
        "Print & Digital Media Design",
        "Illustration & Iconography",
      ]}
      benefits={[
        "Create a memorable brand identity",
        "Improve user experience and satisfaction",
        "Communicate your message effectively",
        "Stand out from competitors",
        "Increase engagement and conversions",
        "Maintain consistent brand presentation",
      ]}
    />
  )
}
