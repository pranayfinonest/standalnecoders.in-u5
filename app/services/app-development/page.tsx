import type { Metadata } from "next"
import { Smartphone } from "lucide-react"
import ServiceCategoryTemplate from "@/components/service-category-template"

export const metadata: Metadata = {
  title: "Mobile App Development Services | StandaloneCoders",
  description:
    "Professional mobile app development services for iOS and Android platforms. We create native and cross-platform applications tailored to your business needs.",
}

export default function AppDevelopmentPage() {
  return (
    <ServiceCategoryTemplate
      title="Mobile App Development"
      description="We develop high-performance, feature-rich mobile applications for iOS and Android platforms. Our mobile app development services focus on creating intuitive user experiences with robust functionality."
      icon={<Smartphone className="w-12 h-12 text-green-600" />}
      image="/blue-mobile-banking.png"
      features={[
        "Native iOS and Android app development",
        "Cross-platform development with React Native and Flutter",
        "Intuitive user interface and experience design",
        "Integration with device features (camera, GPS, etc.)",
        "Push notification implementation",
        "Offline functionality and data synchronization",
      ]}
      benefits={[
        "Reach users on their preferred mobile platforms",
        "Provide seamless experiences across devices",
        "Increase customer engagement and retention",
        "Enable new revenue streams through mobile",
        "Collect valuable user data and insights",
        "Stay connected with customers on the go",
      ]}
    />
  )
}
