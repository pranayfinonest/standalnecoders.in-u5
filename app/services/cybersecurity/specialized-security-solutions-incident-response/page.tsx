import { AlertTriangle } from "lucide-react"
import type { Metadata } from "next"
import CybersecurityServiceTemplate from "@/components/services/cybersecurity-service-template"

export const metadata: Metadata = {
  title: "Specialized Security Solutions & Incident Response | StandaloneCoders",
  description: "Advanced security solutions and incident response services for complex security challenges",
  keywords:
    "incident response, breach response, forensics, advanced security, specialized security, security consulting",
}

export default function SpecializedSecuritySolutionsPage() {
  return (
    <CybersecurityServiceTemplate
      title="Specialized Security Solutions & Incident Response"
      subTitle="Advanced security expertise for complex challenges"
      description="Our specialized security solutions and incident response services provide expert assistance for advanced security challenges, breaches, and emerging threats."
      icon={<AlertTriangle className="w-6 h-6 text-white" />}
      categoryName="Security Services"
      categoryColor="blue"
      heroImage="/abstract-tech-logo.png"
      benefits={[
        {
          title: "Expert Crisis Management",
          description:
            "Access to experienced incident responders who can guide you through security breaches and crises.",
        },
        {
          title: "Rapid Response Capability",
          description: "Quick deployment of security experts to address active security incidents and minimize damage.",
        },
        {
          title: "Advanced Technical Expertise",
          description: "Specialized knowledge and capabilities for addressing complex or unique security challenges.",
        },
        {
          title: "Customized Security Solutions",
          description: "Tailored approaches to address specific security requirements not met by standard solutions.",
        },
      ]}
      features={[
        {
          title: "Incident Response",
          description:
            "Rapid response to security breaches including containment, investigation, and recovery assistance.",
        },
        {
          title: "Digital Forensics",
          description:
            "Collection and analysis of digital evidence to understand incident scope, impact, and attribution.",
        },
        {
          title: "Advanced Persistent Threat (APT) Detection",
          description: "Specialized hunting and detection of sophisticated threat actors in your environment.",
        },
        {
          title: "Red Team Exercises",
          description: "Advanced simulated attacks to test your defenses against real-world attack techniques.",
        },
        {
          title: "IoT & OT Security",
          description: "Specialized security solutions for Internet of Things and Operational Technology environments.",
        },
        {
          title: "Custom Security Engineering",
          description: "Development of bespoke security solutions for unique or complex security requirements.",
        },
      ]}
      process={[
        {
          step: 1,
          title: "Initial Consultation",
          description: "We discuss your specialized security needs or incident details to understand requirements.",
        },
        {
          step: 2,
          title: "Solution Design",
          description: "Development of a customized approach tailored to your specific security challenge.",
        },
        {
          step: 3,
          title: "Rapid Deployment",
          description: "Quick implementation of necessary resources, tools, and expertise to address the situation.",
        },
        {
          step: 4,
          title: "Execution & Response",
          description: "Delivery of specialized security services or incident response activities.",
        },
        {
          step: 5,
          title: "Analysis & Reporting",
          description: "Thorough analysis and detailed reporting on findings, actions taken, and results.",
        },
        {
          step: 6,
          title: "Recommendations",
          description:
            "Strategic and tactical recommendations to prevent similar incidents or further improve security.",
        },
      ]}
      faqs={[
        {
          question: "How quickly can you respond to a security incident?",
          answer:
            "We offer several response time options based on your needs. Our standard response time is within 4 hours for critical incidents. For clients with retainer agreements, we can guarantee faster response times as short as 1 hour.",
        },
        {
          question: "Do you provide remote incident response or only on-site?",
          answer:
            "We offer both remote and on-site incident response capabilities. Many incidents can be effectively handled remotely, which allows for faster initial response. For complex or severe incidents, we can deploy consultants on-site as needed.",
        },
        {
          question: "What types of specialized security challenges can you help with?",
          answer:
            "We handle a wide range of specialized security needs including IoT/OT security, cloud security architecture, secure DevOps implementation, hardware security, supply chain security, AI/ML security, and custom security solutions for unique business requirements.",
        },
        {
          question: "How do you maintain confidentiality during incident response?",
          answer:
            "We operate under strict confidentiality protocols. All our consultants sign comprehensive NDAs, we use secure communication channels, and we can work under legal privilege with your counsel when appropriate. We never disclose our clients' incidents without explicit permission.",
        },
        {
          question: "Can you help with regulatory reporting requirements after a breach?",
          answer:
            "Yes, we assist with regulatory notification requirements following a breach. Our team is familiar with reporting obligations under various regulations including GDPR, HIPAA, PCI DSS, and other relevant frameworks.",
        },
        {
          question: "Do you offer incident response planning and preparation services?",
          answer:
            "Absolutely. We strongly recommend proactive incident response planning. We offer services including incident response plan development, tabletop exercises, breach simulation, and response team training to ensure you're prepared before an incident occurs.",
        },
      ]}
      pricing={[
        {
          name: "Incident Response Retainer",
          price: "From ₹120,000/year",
          description: "Guaranteed response time for security incidents",
          features: [
            "Guaranteed response SLAs",
            "Priority incident handling",
            "Annual incident response plan review",
            "Incident response tabletop exercise",
            "Prepaid incident response hours",
            "Quarterly security advisory",
          ],
        },
        {
          name: "Incident Response",
          price: "₹25,000/hour",
          description: "Emergency response services for active incidents",
          features: [
            "Remote incident response",
            "Initial containment guidance",
            "Incident investigation",
            "Evidence preservation",
            "Remediation recommendations",
            "Incident documentation",
          ],
          recommended: true,
        },
        {
          name: "Specialized Security Consulting",
          price: "Custom",
          description: "Expert consulting for complex security challenges",
          features: [
            "Custom security architecture",
            "Advanced security testing",
            "Specialized threat hunting",
            "IoT/OT security solutions",
            "Custom security development",
            "Security technology evaluation",
          ],
        },
      ]}
      relatedServices={[
        {
          title: "Cybersecurity Assessments",
          link: "/services/cybersecurity/assessments",
        },
        {
          title: "Managed Security Services",
          link: "/services/cybersecurity/managed-security-services",
        },
        {
          title: "Network & Cyber Threat Intelligence",
          link: "/services/cybersecurity/network-cyber-threat-intelligence",
        },
      ]}
    />
  )
}
