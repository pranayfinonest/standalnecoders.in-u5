import { ShieldCheck } from "lucide-react"
import type { Metadata } from "next"
import CybersecurityServiceTemplate from "@/components/services/cybersecurity-service-template"

export const metadata: Metadata = {
  title: "Managed Security Services | StandaloneCoders",
  description: "Professional security monitoring and management to protect your organization around the clock",
  keywords: "managed security, security monitoring, MSSP, SOC, security operations, incident response",
}

export default function ManagedSecurityServicesPage() {
  return (
    <CybersecurityServiceTemplate
      title="Managed Security Services"
      subTitle="24/7 expert security monitoring and management"
      description="Our managed security services provide continuous monitoring, threat detection, and response capabilities to protect your organization from cyber threats."
      icon={<ShieldCheck className="w-6 h-6 text-white" />}
      categoryName="Security Services"
      categoryColor="blue"
      heroImage="/vibrant-tech-hub.png"
      benefits={[
        {
          title: "24/7 Security Coverage",
          description: "Round-the-clock monitoring and protection without the need to build and staff an internal SOC.",
        },
        {
          title: "Reduced Detection Time",
          description:
            "Significantly decrease the time between threat occurrence and detection with continuous monitoring.",
        },
        {
          title: "Expert Response",
          description:
            "Leverage our specialized security expertise for effective incident response and threat mitigation.",
        },
        {
          title: "Cost Efficiency",
          description:
            "Achieve enterprise-grade security capabilities at a fraction of the cost of building internal resources.",
        },
      ]}
      features={[
        {
          title: "Security Monitoring",
          description:
            "Continuous monitoring of your environment for potential security threats and suspicious activities.",
        },
        {
          title: "Threat Detection",
          description:
            "Advanced detection capabilities leveraging SIEM technology, threat intelligence, and behavioral analytics.",
        },
        {
          title: "Incident Response",
          description:
            "Rapid response to security incidents including containment, investigation, and remediation guidance.",
        },
        {
          title: "Vulnerability Management",
          description:
            "Ongoing scanning, prioritization, and management of security vulnerabilities across your environment.",
        },
        {
          title: "Log Management",
          description: "Collection, storage, and analysis of security logs for compliance and investigative purposes.",
        },
        {
          title: "Compliance Reporting",
          description: "Regular reporting on security status, incidents, and compliance with relevant standards.",
        },
      ]}
      process={[
        {
          step: 1,
          title: "Initial Assessment",
          description:
            "We assess your current security posture, infrastructure, and specific requirements to design an appropriate service.",
        },
        {
          step: 2,
          title: "Onboarding & Integration",
          description:
            "Implementation of monitoring agents, collectors, and integration with your existing security tools.",
        },
        {
          step: 3,
          title: "Baseline Development",
          description: "Establishment of normal behavior patterns to enable effective anomaly detection.",
        },
        {
          step: 4,
          title: "Monitoring Configuration",
          description:
            "Setup of alerts, thresholds, and playbooks tailored to your specific environment and risk profile.",
        },
        {
          step: 5,
          title: "Ongoing Operations",
          description: "Continuous monitoring, threat detection, incident response, and security management.",
        },
        {
          step: 6,
          title: "Regular Reviews",
          description: "Periodic service reviews to evaluate effectiveness and adapt to changing requirements.",
        },
      ]}
      faqs={[
        {
          question: "What technologies do you use for security monitoring?",
          answer:
            "We utilize a combination of leading SIEM platforms, EDR solutions, network monitoring tools, and proprietary detection technologies. Our platform is vendor-agnostic and can integrate with your existing security investments.",
        },
        {
          question: "How quickly do you respond to security incidents?",
          answer:
            "Our response time depends on the severity of the incident. Critical alerts are responded to within 15 minutes, high-severity within 30 minutes, and medium-severity within 2 hours. Each response includes initial triage, investigation, and remediation guidance.",
        },
        {
          question: "Do you provide 24/7 monitoring?",
          answer:
            "Yes, our Security Operations Center (SOC) operates 24 hours a day, 7 days a week, 365 days a year. We maintain continuous monitoring and response capabilities at all times.",
        },
        {
          question: "Can you monitor cloud environments?",
          answer:
            "Absolutely. We provide comprehensive monitoring for major cloud platforms including AWS, Azure, and Google Cloud, as well as SaaS applications and hybrid environments.",
        },
        {
          question: "Will you remediate security incidents or just notify us?",
          answer:
            "Our standard service includes incident notification, investigation, and remediation guidance. For clients who opt for our advanced service tier, we also offer active remediation for certain types of incidents based on pre-approved playbooks.",
        },
        {
          question: "How do you handle false positives?",
          answer:
            "We employ a multi-stage detection process that includes automated filtering, analyst review, and continuous tuning to minimize false positives. Our goal is to provide high-fidelity alerts that represent genuine security concerns.",
        },
      ]}
      pricing={[
        {
          name: "Essential Monitoring",
          price: "₹30,000/month",
          description: "Basic security monitoring for small businesses",
          features: [
            "24/7 security monitoring",
            "Critical alert detection",
            "Email notification",
            "Basic incident response guidance",
            "Weekly summary reports",
            "Up to 25 devices/endpoints",
          ],
        },
        {
          name: "Advanced Security Operations",
          price: "₹75,000/month",
          description: "Comprehensive security management",
          features: [
            "24/7 advanced monitoring",
            "Full spectrum threat detection",
            "Immediate phone & email notification",
            "Detailed incident investigation",
            "Guided remediation",
            "Vulnerability scanning",
            "Compliance reporting",
            "Up to 100 devices/endpoints",
          ],
          recommended: true,
        },
        {
          name: "Enterprise Protection",
          price: "Custom",
          description: "Advanced security operations for large environments",
          features: [
            "Customized monitoring solution",
            "Advanced threat hunting",
            "Active incident remediation",
            "Dedicated security analysts",
            "Executive reporting",
            "Custom playbook development",
            "Annual tabletop exercises",
            "Unlimited devices/endpoints",
          ],
        },
      ]}
      relatedServices={[
        {
          title: "Network & Cyber Threat Intelligence",
          link: "/services/cybersecurity/network-cyber-threat-intelligence",
        },
        {
          title: "Specialized Security Solutions",
          link: "/services/cybersecurity/specialized-security-solutions-incident-response",
        },
        {
          title: "Cybersecurity Assessments",
          link: "/services/cybersecurity/assessments",
        },
      ]}
    />
  )
}
