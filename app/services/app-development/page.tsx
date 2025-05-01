import { Smartphone } from "lucide-react"
import ServiceCategoryTemplate from "@/components/service-category-template"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mobile App Development Services | StandaloneCoders",
  description:
    "Professional mobile app development services for iOS and Android. Native and cross-platform solutions for businesses of all sizes.",
}

export default function AppDevelopmentPage() {
  return (
    <ServiceCategoryTemplate
      title="Mobile App Development"
      description="We develop high-quality mobile applications for iOS and Android platforms that help businesses connect with their customers, streamline operations, and drive growth."
      icon={<Smartphone className="h-8 w-8 text-green-600" />}
      image="/blue-mobile-banking.png"
      features={[
        "iOS App Development (Swift)",
        "Android App Development (Kotlin/Java)",
        "Cross-Platform Development (React Native, Flutter)",
        "UI/UX Design for Mobile",
        "App Store Optimization",
        "Ongoing Maintenance and Support",
      ]}
      benefits={[
        "Reach customers on their preferred devices",
        "Enhance customer engagement and loyalty",
        "Create new revenue streams",
        "Improve business processes and efficiency",
        "Collect valuable user data and insights",
        "Stay competitive in the mobile-first world",
      ]}
    />
  )
}
