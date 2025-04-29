import { Suspense } from "react"
import ServiceDetail from "@/components/service-detail"
import type { Metadata } from "next"
import { ServiceDetailSkeleton } from "@/components/service-detail-skeleton"

export const metadata: Metadata = {
  title: "Cybersecurity Services | StandaloneCoders",
  description:
    "Comprehensive cybersecurity solutions to protect your business from digital threats and vulnerabilities.",
}

export default function CybersecurityPage() {
  const serviceData = {
    title: "Cybersecurity Services",
    description:
      "Our Cybersecurity Services provide comprehensive protection for your digital assets, ensuring your business remains secure against evolving threats. From vulnerability assessments to incident response, we offer end-to-end security solutions tailored to your specific needs.",
    imageSrc: "/intricate-logic-flow.png",
    features: [
      {
        title: "Vulnerability Assessment",
        description:
          "Identify and address security weaknesses in your systems before they can be exploited by malicious actors.",
      },
      {
        title: "Penetration Testing",
        description:
          "Simulate real-world attacks to test your defenses and identify potential entry points for hackers.",
      },
      {
        title: "Security Monitoring",
        description:
          "Continuous monitoring of your network and systems to detect and respond to security incidents in real-time.",
      },
      {
        title: "Incident Response",
        description:
          "Rapid and effective response to security breaches to minimize damage and restore operations quickly.",
      },
    ],
    process: [
      {
        title: "Assessment",
        description:
          "We conduct a thorough assessment of your current security posture to identify vulnerabilities and gaps.",
      },
      {
        title: "Strategy Development",
        description:
          "We create a comprehensive security strategy tailored to your specific business needs and risk profile.",
      },
      {
        title: "Implementation",
        description:
          "Our security experts implement robust security measures to protect your systems, data, and digital assets.",
      },
    ],
    packages: [
      {
        title: "Basic Security",
        price: "$1,499",
        features: [
          "Vulnerability assessment",
          "Basic security monitoring",
          "Security awareness training",
          "Quarterly security reports",
          "Email security",
        ],
        cta: "Get Started",
      },
      {
        title: "Advanced Security",
        price: "$3,999",
        features: [
          "Comprehensive vulnerability assessment",
          "Penetration testing",
          "24/7 security monitoring",
          "Incident response planning",
          "Monthly security reports",
          "Advanced email and web security",
        ],
        cta: "Choose Plan",
        popular: true,
      },
      {
        title: "Enterprise Security",
        price: "$8,999",
        features: [
          "Full security assessment",
          "Advanced penetration testing",
          "24/7 managed security services",
          "Dedicated security team",
          "Custom security solutions",
          "Executive security briefings",
          "Compliance management",
        ],
        cta: "Contact Us",
      },
    ],
    faqs: [
      {
        question: "How often should we conduct security assessments?",
        answer:
          "Security assessments should be conducted at least annually, but more frequent assessments are recommended for businesses with high-value data or those in regulated industries. Additionally, assessments should be performed after significant changes to your IT infrastructure.",
      },
      {
        question: "What is the difference between vulnerability assessment and penetration testing?",
        answer:
          "A vulnerability assessment identifies and reports potential security weaknesses, while penetration testing goes a step further by actively exploiting those vulnerabilities to demonstrate how a malicious actor might gain access to your systems.",
      },
      {
        question: "How do you handle security incidents?",
        answer:
          "Our incident response process includes immediate containment of the threat, thorough investigation to determine the scope and impact, eradication of the threat, recovery of affected systems, and a post-incident analysis to prevent similar incidents in the future.",
      },
      {
        question: "What security training do you provide for employees?",
        answer:
          "We offer comprehensive security awareness training that covers phishing recognition, password management, safe browsing habits, social engineering awareness, and proper handling of sensitive data. Training can be customized to address specific security concerns relevant to your business.",
      },
    ],
  }

  return (
    <Suspense fallback={<ServiceDetailSkeleton />}>
      <ServiceDetail {...serviceData} />
    </Suspense>
  )
}
