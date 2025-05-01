import { ShieldCheck } from "lucide-react"
import ServiceCategoryTemplate from "@/components/service-category-template"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cybersecurity Services | StandaloneCoders",
  description:
    "Comprehensive cybersecurity services to protect your digital assets. Security audits, penetration testing, secure development, and incident response planning.",
}

export default function CybersecurityPage() {
  return (
    <ServiceCategoryTemplate
      title="Cybersecurity"
      description="Our cybersecurity services help businesses protect their digital assets, customer data, and reputation from cyber threats through comprehensive security solutions and best practices."
      icon={<ShieldCheck className="h-8 w-8 text-red-600" />}
      image="/vibrant-tech-hub.png"
      features={[
        "Security Audits & Assessments",
        "Penetration Testing",
        "Secure Development Practices",
        "Incident Response Planning",
        "Security Awareness Training",
        "Compliance & Regulatory Support",
      ]}
      benefits={[
        "Protect sensitive business and customer data",
        "Prevent costly security breaches",
        "Build customer trust and confidence",
        "Ensure regulatory compliance",
        "Minimize downtime from security incidents",
        "Develop a strong security posture",
      ]}
    />
  )
}
