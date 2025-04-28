import ServiceDetail from "@/components/service-detail"

export default function CybersecurityPage() {
  return (
    <ServiceDetail
      title="Cybersecurity Services"
      description="Comprehensive security solutions to protect your digital assets and infrastructure from evolving threats. Our cybersecurity services are designed to identify vulnerabilities, implement robust security measures, and ensure your business remains protected."
      features={[
        "Penetration Testing & Vulnerability Assessment",
        "Security Audits & Compliance (ISO 27001)",
        "Network Security Implementation",
        "Security Awareness Training",
        "Incident Response Planning",
        "Threat Intelligence & Monitoring",
        "Data Protection & Encryption",
        "Mobile Device Security",
      ]}
      process={[
        {
          step: 1,
          title: "Security Assessment",
          description:
            "We begin with a comprehensive assessment of your current security posture, identifying vulnerabilities and potential threats to your systems.",
        },
        {
          step: 2,
          title: "Strategy Development",
          description:
            "Based on the assessment, we develop a tailored security strategy that addresses your specific needs and aligns with industry best practices.",
        },
        {
          step: 3,
          title: "Implementation",
          description:
            "Our team implements the security measures, including technical controls, policies, and procedures to protect your digital assets.",
        },
        {
          step: 4,
          title: "Monitoring & Maintenance",
          description:
            "We provide ongoing monitoring and maintenance to ensure your security measures remain effective against evolving threats.",
        },
      ]}
      packages={[
        {
          name: "Basic Security",
          price: "₹25,000",
          description: "Essential security measures for small businesses",
          features: [
            "Vulnerability Assessment",
            "Basic Security Audit",
            "Security Policy Development",
            "Staff Awareness Training (Basic)",
          ],
        },
        {
          name: "Advanced Security",
          price: "₹60,000",
          description: "Comprehensive security for growing businesses",
          features: [
            "Everything in Basic Security",
            "Penetration Testing",
            "Network Security Implementation",
            "Incident Response Planning",
            "Quarterly Security Reviews",
          ],
          popular: true,
        },
        {
          name: "Enterprise Security",
          price: "₹1,20,000+",
          description: "Complete security solution for large organizations",
          features: [
            "Everything in Advanced Security",
            "ISO 27001 Compliance Assistance",
            "Advanced Threat Intelligence",
            "24/7 Security Monitoring",
            "Custom Security Solutions",
          ],
        },
      ]}
      faqs={[
        {
          question: "How often should we conduct security assessments?",
          answer:
            "We recommend conducting comprehensive security assessments at least annually, with additional assessments following significant changes to your IT infrastructure or after security incidents.",
        },
        {
          question: "What is ISO 27001 compliance and do we need it?",
          answer:
            "ISO 27001 is an international standard for information security management. While not mandatory for all businesses, it demonstrates your commitment to security and may be required by certain clients or industries.",
        },
        {
          question: "How do you handle security incidents?",
          answer:
            "We follow a structured incident response process that includes identification, containment, eradication, recovery, and lessons learned to minimize impact and prevent future incidents.",
        },
        {
          question: "Can you help with regulatory compliance requirements?",
          answer:
            "Yes, we can assist with various regulatory compliance requirements including GDPR, HIPAA, PCI DSS, and others depending on your industry and location.",
        },
      ]}
      cta={{
        title: "Secure Your Business Today",
        description:
          "Don't wait for a security breach to take action. Contact us today to discuss how our cybersecurity services can protect your business.",
      }}
    />
  )
}
