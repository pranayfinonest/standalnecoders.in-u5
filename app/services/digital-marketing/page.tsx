import ServiceDetail from "@/components/service-detail"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Digital Marketing Services | StandaloneCoders",
  description: "Strategic digital marketing services to boost your online presence and drive business growth.",
}

export default function DigitalMarketingPage() {
  const serviceData = {
    title: "Digital Marketing",
    description:
      "Our Digital Marketing services help businesses establish a strong online presence, reach their target audience, and drive conversions. From SEO optimization to content marketing and social media management, we provide comprehensive digital marketing solutions.",
    imageSrc: "/interconnected-world.png",
    features: [
      {
        title: "SEO Optimization",
        description:
          "Improve your website's visibility in search engine results to drive organic traffic and increase conversions.",
      },
      {
        title: "Content Marketing",
        description:
          "Create valuable, relevant content that attracts and engages your target audience while establishing your brand authority.",
      },
      {
        title: "Social Media Management",
        description:
          "Build and maintain a strong social media presence to connect with your audience and promote your brand.",
      },
      {
        title: "PPC Campaigns",
        description: "Drive targeted traffic to your website through strategic pay-per-click advertising campaigns.",
      },
    ],
    process: [
      {
        title: "Research & Analysis",
        description:
          "We analyze your market, competitors, and target audience to develop an effective marketing strategy.",
      },
      {
        title: "Strategy Development",
        description:
          "We create a comprehensive digital marketing strategy aligned with your business goals and objectives.",
      },
      {
        title: "Implementation & Optimization",
        description: "Our team implements the marketing strategy and continuously optimizes it for maximum results.",
      },
    ],
    packages: [
      {
        title: "Starter",
        price: "$999/mo",
        features: [
          "Basic SEO optimization",
          "Content creation (2 posts/mo)",
          "Social media management (2 platforms)",
          "Monthly performance report",
          "Email support",
        ],
        cta: "Get Started",
      },
      {
        title: "Growth",
        price: "$2,499/mo",
        features: [
          "Advanced SEO optimization",
          "Content creation (4 posts/mo)",
          "Social media management (4 platforms)",
          "PPC campaign management",
          "Bi-weekly performance reports",
          "Email and phone support",
        ],
        cta: "Choose Plan",
        popular: true,
      },
      {
        title: "Premium",
        price: "$4,999/mo",
        features: [
          "Comprehensive SEO strategy",
          "Content creation (8 posts/mo)",
          "Social media management (all platforms)",
          "Advanced PPC campaign management",
          "Weekly performance reports",
          "Priority support",
          "Dedicated marketing manager",
        ],
        cta: "Contact Us",
      },
    ],
    faqs: [
      {
        question: "How long does it take to see results from SEO?",
        answer:
          "SEO is a long-term strategy that typically takes 3-6 months to start showing significant results. However, this can vary depending on your industry, competition, and the current state of your website.",
      },
      {
        question: "What social media platforms should my business be on?",
        answer:
          "The best social media platforms for your business depend on your target audience and industry. We'll help you identify which platforms will provide the best ROI for your specific business.",
      },
      {
        question: "How do you measure the success of digital marketing campaigns?",
        answer:
          "We track various metrics including website traffic, conversion rates, engagement rates, click-through rates, and ultimately, return on investment (ROI) to measure the success of our digital marketing campaigns.",
      },
      {
        question: "Can you help with email marketing?",
        answer:
          "Yes, we offer email marketing services including strategy development, campaign creation, automation, and performance analysis to help you nurture leads and maintain customer relationships.",
      },
    ],
  }

  return <ServiceDetail {...serviceData} />
}
