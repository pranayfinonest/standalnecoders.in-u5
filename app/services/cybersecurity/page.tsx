import type { Metadata } from "next"
import CybersecurityServicesPage from "@/components/services/cybersecurity-services"

export const metadata: Metadata = {
  title: "Cybersecurity Services | StandaloneCoders",
  description: "Comprehensive cybersecurity solutions to protect your business from evolving digital threats.",
  keywords:
    "cybersecurity, security services, network security, data protection, vulnerability assessment, penetration testing",
}

// Force static generation for this page
export const dynamic = "force-static"

export default function CybersecurityPage() {
  return <CybersecurityServicesPage />
}
