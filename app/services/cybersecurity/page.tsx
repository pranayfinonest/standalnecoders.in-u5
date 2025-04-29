import ServiceDetail from "@/components/service-detail"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cybersecurity Services | StandaloneCoders",
  description:
    "Comprehensive security solutions to protect your business from cyber threats and ensure data integrity.",
}

export default function CybersecurityPage() {
  const serviceData = {
    title: "Cybersecurity Services",
    description:
      "Our Cybersecurity Services provide comprehensive protection for your business against evolving cyber threats. From penetration testing to security audits and compliance, we ensure your data and systems remain secure.",
    imageSrc: "/intricate-logic-flow.png",
    features: [
      {
        title: "Penetration Testing",
        description:
          "Identify vulnerabilities in your systems before hackers do with our thorough penetration testing services.",
      },
      {
        title: "Security Audits",
        description: "Comprehensive assessment of your security posture to identify gaps and recommend improvements.",
      },
      {
        title: "ISO 27001 Compliance",
        description:
          "Ensure your information security management system meets international standards for best practices.",
      },
      {
        title: "Threat Analysis",
        description: "Continuous monitoring and analysis of potential threats to your organization's digital assets.",
      },
    ],
    process: [
      {
        title: "Assessment",
        description: "We evaluate your current security posture and identify potential vulnerabilities and risks.",
      },
      {
        title: "Strategy Development",
        description:
          "We create a comprehensive security strategy tailored to your specific business needs and risk profile.",
      },
      {
        title: "Implementation",
        description: "Our team implements security measures and controls to protect your systems and data.",
      },
    ],
    packages: [
      {
        title: "Basic Security",
        price: "$1,499",
        features: [
          "Vulnerability assessment",
          "Basic security audit",
          "Security awareness training",
          "30 days support",
          "Incident response plan",
        ],
        cta: "Get Started",
      },
      {
        title: "Advanced Security",
        price: "$3,999",
        features: [
          "Comprehensive penetration testing",
          "Detailed security audit",
          "Advanced security training",
          "90 days support",
          "Incident response plan",
          "Monthly security reports",
        ],
        cta: "Choose Plan",
        popular: true,
      },
      {
        title: "Enterprise Security",
        price: "$8,999",
        features: [
          "Full-scale penetration testing",
          "Enterprise security audit",
          "ISO 27001 compliance assistance",
          "1 year priority support",
          "Advanced incident response",
          "Quarterly security reviews",
          "Dedicated security consultant",
        ],
        cta: "Contact Us",
      },
    ],
    faqs: [
      {
        question: "How often should we conduct security audits?",
        answer:
          "We recommend conducting comprehensive security audits at least annually, with more frequent targeted assessments quarterly or after significant changes to your IT infrastructure.",
      },
      {
        question: "What is penetration testing?",
        answer:
          "Penetration testing is a simulated cyber attack against your computer system to check for exploitable vulnerabilities. It helps identify security weaknesses before malicious hackers can exploit them.",
      },
      {
        question: "How can we prepare for ISO 27001 certification?",
        answer:
          "Preparing for ISO 27001 certification involves establishing an information security management system (ISMS), conducting risk assessments, implementing security controls, and documenting policies and procedures.",
      },
      {
        question: "What should we do if we experience a security breach?",
        answer:
          "In the event of a security breach, you should activate your incident response plan, contain the breach, assess the damage, notify affected parties as required by law, and work to prevent similar incidents in the future.",
      },
    ],
  }

  return <ServiceDetail {...serviceData} />
}
