import { Suspense } from "react"
import ServiceDetail from "@/components/service-detail"

export const dynamic = "force-static"

export default function DigitalMarketingPage() {
  const serviceData = {
    title: "Digital Marketing Services",
    description:
      "Boost your online presence and reach your target audience with our strategic digital marketing services.",
    features: [
      "Search Engine Optimization (SEO)",
      "Pay-Per-Click Advertising (PPC)",
      "Social Media Marketing",
      "Content Marketing",
      "Email Marketing Campaigns",
      "Conversion Rate Optimization",
      "Analytics and Reporting",
      "Brand Strategy Development",
      "Competitor Analysis",
      "Local SEO and Google My Business",
    ],
    process: [
      {
        step: 1,
        title: "Discovery & Analysis",
        description:
          "We analyze your current digital presence, target audience, and competitors to identify opportunities.",
      },
      {
        step: 2,
        title: "Strategy Development",
        description:
          "We create a customized digital marketing strategy aligned with your business goals and target audience.",
      },
      {
        step: 3,
        title: "Implementation",
        description: "Our team executes the strategy across relevant channels, creating and optimizing campaigns.",
      },
      {
        step: 4,
        title: "Monitoring & Optimization",
        description:
          "We continuously monitor campaign performance and make data-driven adjustments to improve results.",
      },
      {
        step: 5,
        title: "Reporting & Analysis",
        description:
          "Regular reports provide insights into campaign performance, ROI, and recommendations for improvement.",
      },
    ],
    packages: [
      {
        name: "Starter",
        price: "$1,500/mo",
        description:
          "Essential digital marketing services for small businesses looking to establish an online presence.",
        features: [
          "Basic SEO optimization",
          "Social media management (2 platforms)",
          "Monthly content creation (2 posts)",
          "Basic Google Analytics setup",
          "Quarterly performance reports",
        ],
      },
      {
        name: "Growth",
        price: "$3,000/mo",
        popular: true,
        description: "Comprehensive digital marketing solution for businesses looking to expand their online reach.",
        features: [
          "Advanced SEO optimization",
          "Social media management (4 platforms)",
          "Weekly content creation",
          "PPC campaign management",
          "Email marketing campaigns",
          "Monthly performance reports",
          "Conversion rate optimization",
        ],
      },
      {
        name: "Enterprise",
        price: "$5,000+/mo",
        description:
          "Full-service digital marketing solution for businesses requiring extensive online presence management.",
        features: [
          "Complete digital strategy",
          "Advanced SEO & content strategy",
          "Social media management (all platforms)",
          "Advanced PPC campaign management",
          "Custom reporting dashboard",
          "Dedicated marketing manager",
          "Marketing automation setup",
          "Competitor analysis & tracking",
        ],
      },
    ],
    faqs: [
      {
        question: "How long does it take to see results from digital marketing?",
        answer:
          "Results vary depending on the strategies implemented. SEO typically takes 3-6 months to show significant results, while PPC and social media advertising can generate immediate traffic. We provide realistic timelines based on your specific goals and market conditions.",
      },
      {
        question: "How do you measure the success of digital marketing campaigns?",
        answer:
          "We track key performance indicators (KPIs) aligned with your business goals, such as website traffic, conversion rates, lead generation, engagement metrics, and ultimately, ROI. We provide regular reports with insights and recommendations.",
      },
      {
        question: "Do I need to be on all social media platforms?",
        answer:
          "No, it's better to focus on platforms where your target audience is most active. We help identify the most effective channels for your business and develop strategies specific to those platforms.",
      },
      {
        question: "How often will I receive reports on campaign performance?",
        answer:
          "Depending on your package, we provide monthly or quarterly comprehensive reports. However, we maintain open communication throughout the campaign and can provide updates as needed.",
      },
      {
        question: "Can you work with my existing marketing team?",
        answer:
          "We can complement your in-house team's efforts or provide training to help them maximize results. We're flexible in our approach and can adapt to your organizational structure.",
      },
    ],
    cta: {
      title: "Ready to Boost Your Online Presence?",
      description: "Contact us today to discuss how our digital marketing services can help your business grow.",
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
