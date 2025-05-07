import { Radar } from "lucide-react"
import type { Metadata } from "next"
import CybersecurityServiceTemplate from "@/components/services/cybersecurity-service-template"

export const metadata: Metadata = {
  title: "Network & Cyber Threat Intelligence | StandaloneCoders",
  description:
    "Advanced network security and threat intelligence services to protect your organization from evolving cyber threats",
  keywords: "threat intelligence, network security, cyber threats, security monitoring, threat detection",
}

export default function NetworkCyberThreatIntelligencePage() {
  return (
    <CybersecurityServiceTemplate
      title="Network & Cyber Threat Intelligence"
      subTitle="Stay ahead of emerging threats with actionable intelligence"
      description="Our network security and threat intelligence services help you anticipate, identify, and respond to cyber threats before they impact your business."
      icon={<Radar className="w-6 h-6 text-white" />}
      categoryName="Security Services"
      categoryColor="blue"
      heroImage="/intricate-logic-flow.png"
      benefits={[
        {
          title: "Proactive Threat Detection",
          description: "Identify potential threats before they impact your organization with early warning indicators.",
        },
        {
          title: "Reduced Response Time",
          description:
            "Dramatically decrease the time between threat detection and mitigation with actionable intelligence.",
        },
        {
          title: "Strategic Security Planning",
          description: "Make informed security decisions based on real-world threat data relevant to your industry.",
        },
        {
          title: "Enhanced Network Visibility",
          description:
            "Gain comprehensive visibility into your network traffic, behavior patterns, and potential anomalies.",
        },
      ]}
      features={[
        {
          title: "Strategic Intelligence Reports",
          description: "Regular reports on threat landscape relevant to your industry and business operations.",
        },
        {
          title: "Threat Feed Integration",
          description: "Custom threat feeds that can be integrated with your existing security tools and platforms.",
        },
        {
          title: "Network Traffic Analysis",
          description: "Advanced analysis of network traffic to identify suspicious patterns and potential threats.",
        },
        {
          title: "Adversary Tracking",
          description: "Monitoring of threat actors and groups that may target your industry or organization.",
        },
        {
          title: "Dark Web Monitoring",
          description: "Surveillance of dark web forums and marketplaces for mentions of your organization or data.",
        },
        {
          title: "Security Alert Triage",
          description: "Expert analysis and prioritization of security alerts to reduce false positives.",
        },
      ]}
      process={[
        {
          step: 1,
          title: "Intelligence Requirements Definition",
          description: "We work with you to understand your specific intelligence needs and security priorities.",
        },
        {
          step: 2,
          title: "Collection & Analysis Setup",
          description: "Implementation of custom collection methods and analytical frameworks tailored to your needs.",
        },
        {
          step: 3,
          title: "Ongoing Intelligence Collection",
          description: "Continuous monitoring of multiple sources for relevant threat data and indicators.",
        },
        {
          step: 4,
          title: "Analysis & Contextualization",
          description: "Our analysts evaluate collected data and provide context specific to your organization.",
        },
        {
          step: 5,
          title: "Actionable Reporting",
          description: "Delivery of intelligence products with clear, actionable recommendations.",
        },
      ]}
      faqs={[
        {
          question: "What types of threat intelligence do you provide?",
          answer:
            "We provide strategic, tactical, and operational intelligence, including threat actor profiles, IOCs (Indicators of Compromise), TTPs (Tactics, Techniques, and Procedures), and strategic industry threat assessments.",
        },
        {
          question: "How will threat intelligence benefit our security operations?",
          answer:
            "Threat intelligence empowers your security team to make informed decisions, prioritize resources effectively, reduce detection and response times, and proactively address potential vulnerabilities before they can be exploited.",
        },
        {
          question: "Do you customize threat intelligence for our industry?",
          answer:
            "Yes, we tailor our intelligence services to focus on threats and threat actors relevant to your specific industry, organization size, geographic location, and business operations.",
        },
        {
          question: "Can we integrate your threat feeds with our existing security tools?",
          answer:
            "Absolutely. Our threat intelligence can be delivered in multiple formats compatible with SIEMs, firewalls, intrusion detection systems, and other security platforms.",
        },
      ]}
      pricing={[
        {
          name: "Basic Intelligence",
          price: "₹60,000",
          description: "Essential threat intelligence for small businesses",
          features: [
            "Monthly threat briefings",
            "Basic IOC feeds",
            "Industry-specific alerts",
            "Email notifications for critical threats",
            "Basic dark web monitoring",
          ],
        },
        {
          name: "Advanced Intelligence",
          price: "₹120,000",
          description: "Comprehensive intelligence for medium organizations",
          features: [
            "Weekly threat briefings",
            "Customized IOC and TTP feeds",
            "Organization-specific monitoring",
            "API access to threat feeds",
            "Advanced dark web monitoring",
            "Quarterly executive briefings",
          ],
          recommended: true,
        },
        {
          name: "Premium Intelligence",
          price: "Custom",
          description: "Enterprise-grade intelligence solution",
          features: [
            "Daily intelligence updates",
            "24/7 critical threat alerts",
            "Dedicated intelligence analyst",
            "Custom threat hunting",
            "Full integration support",
            "Monthly executive briefings",
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
          title: "Specialized Security Solutions",
          link: "/services/cybersecurity/specialized-security-solutions-incident-response",
        },
      ]}
    />
  )
}
