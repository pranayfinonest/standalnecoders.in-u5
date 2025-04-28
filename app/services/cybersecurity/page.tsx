import { Suspense } from "react"
import ServiceDetail from "@/components/service-detail"

export const dynamic = "force-static"

export default function CybersecurityPage() {
  const serviceData = {
    title: "Cybersecurity Services",
    description:
      "Protect your digital assets with our comprehensive cybersecurity solutions designed to safeguard your business from evolving threats.",
    features: [
      "Vulnerability Assessment & Penetration Testing",
      "Security Audits & Compliance",
      "Incident Response Planning",
      "Security Awareness Training",
      "Network Security Implementation",
      "Cloud Security Solutions",
      "Data Protection & Encryption",
      "24/7 Security Monitoring",
      "Identity & Access Management",
      "Security Policy Development",
    ],
    process: [
      {
        step: 1,
        title: "Security Assessment",
        description:
          "We conduct a thorough assessment of your current security posture to identify vulnerabilities and gaps.",
      },
      {
        step: 2,
        title: "Risk Analysis",
        description: "Our experts analyze potential risks and prioritize them based on impact and likelihood.",
      },
      {
        step: 3,
        title: "Security Planning",
        description:
          "We develop a comprehensive security plan tailored to your specific business needs and risk profile.",
      },
      {
        step: 4,
        title: "Implementation",
        description: "Our team implements security measures, tools, and protocols to protect your digital assets.",
      },
      {
        step: 5,
        title: "Testing & Validation",
        description: "We conduct thorough testing to ensure all security measures are functioning effectively.",
      },
      {
        step: 6,
        title: "Ongoing Monitoring",
        description:
          "Continuous monitoring and regular security updates help maintain your security posture over time.",
      },
    ],
    packages: [
      {
        name: "Essential Security",
        price: "$2,500",
        description: "Basic security assessment and implementation for small businesses.",
        features: [
          "Vulnerability assessment",
          "Basic security policy development",
          "Security awareness training",
          "Password management solution",
          "Basic firewall configuration",
        ],
      },
      {
        name: "Advanced Protection",
        price: "$7,500",
        popular: true,
        description: "Comprehensive security solution for medium-sized businesses with sensitive data.",
        features: [
          "Full penetration testing",
          "Advanced security assessment",
          "Incident response planning",
          "Network security implementation",
          "Cloud security configuration",
          "Data encryption solutions",
          "Quarterly security reviews",
        ],
      },
      {
        name: "Enterprise Security",
        price: "Custom",
        description: "Enterprise-grade security solutions for organizations requiring the highest level of protection.",
        features: [
          "Comprehensive security program",
          "Advanced penetration testing",
          "24/7 security monitoring",
          "Custom security architecture",
          "Compliance management",
          "Executive security training",
          "Dedicated security consultant",
          "Monthly security reviews",
        ],
      },
    ],
    faqs: [
      {
        question: "How often should we conduct security assessments?",
        answer:
          "We recommend conducting comprehensive security assessments at least annually, with more frequent targeted assessments when significant changes occur in your IT environment or when new threats emerge.",
      },
      {
        question: "What compliance standards do you support?",
        answer:
          "We support a wide range of compliance standards including GDPR, HIPAA, PCI DSS, ISO 27001, SOC 2, and NIST frameworks. Our team can help you achieve and maintain compliance with these and other industry-specific regulations.",
      },
      {
        question: "How do you handle security incidents?",
        answer:
          "We follow a structured incident response process that includes detection, containment, eradication, recovery, and lessons learned. Our team works quickly to minimize damage and restore normal operations while documenting the incident for future prevention.",
      },
      {
        question: "Do you offer employee security training?",
        answer:
          "Yes, we provide comprehensive security awareness training programs that can be customized to your organization's specific needs. These include phishing simulations, security best practices, and role-specific training modules.",
      },
      {
        question: "How do you stay current with evolving cyber threats?",
        answer:
          "Our security team continuously monitors threat intelligence feeds, participates in industry forums, and maintains certifications in the latest security technologies. We regularly update our security practices and client recommendations based on emerging threats.",
      },
    ],
    cta: {
      title: "Secure Your Business Today",
      description:
        "Don't wait for a breach to happen. Contact us to strengthen your security posture and protect your valuable digital assets.",
    },
  }

  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-12 flex justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
            <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      }
    >
      <ServiceDetail
        title={serviceData.title}
        description={serviceData.description}
        features={serviceData.features}
        process={serviceData.process}
        packages={serviceData.packages}
        faqs={serviceData.faqs}
        cta={serviceData.cta}
      />
    </Suspense>
  )
}
