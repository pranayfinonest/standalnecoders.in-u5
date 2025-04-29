import { Suspense } from "react"
import ServiceDetail from "@/components/service-detail"
import type { Metadata } from "next"
import { ServiceDetailSkeleton } from "@/components/service-detail-skeleton"

export const metadata: Metadata = {
  title: "Digital Marketing Services | StandaloneCoders",
  description: "Strategic digital marketing solutions to boost your online presence and drive business growth.",
}

export default function DigitalMarketingPage() {
  const serviceData = {
    title: "Digital Marketing Services",
    description:
      "Our Digital Marketing Services help businesses establish a strong online presence, reach their target audience, and drive meaningful engagement. From SEO and content marketing to social media management and PPC campaigns, we provide comprehensive digital marketing solutions tailored to your specific goals.",
    imageSrc: "/interconnected-world.png",
    features: [
      {
        title: "Search Engine Optimization (SEO)",
        description:
          "Improve your website's visibility in search engine results to drive organic traffic and increase conversions.",
      },
      {
        title: "Content Marketing",
        description:
          "Create and distribute valuable, relevant content to attract and engage your target audience and drive profitable customer action.",
      },
      {
        title: "Social Media Management",
        description:
          "Build and maintain your brand presence across social media platforms to engage with your audience and drive business growth.",
      },
      {
        title: "Pay-Per-Click (PPC) Advertising",
        description: "Create targeted ad campaigns to drive immediate traffic and conversions to your website.",
      },
    ],
    process: [
      {
        title: "Analysis",
        description:
          "We analyze your current digital presence, target audience, and competitors to identify opportunities for growth.",
      },
      {
        title: "Strategy Development",
        description:
          "We create a comprehensive digital marketing strategy aligned with your business goals and objectives.",
      },
      {
        title: "Implementation",
        description:
          "Our team of experts implements the digital marketing strategy, ensuring consistent messaging and brand voice.",
      },
    ],
    packages: [
      {
        title: "Starter",
        price: "$999/month",
        features: [
          "Basic SEO optimization",
          "Social media management (2 platforms)",
          "Monthly content creation (2 posts)",
          "Basic analytics reporting",
          "Email marketing setup",
        ],
        cta: "Get Started",
      },
      {
        title: "Professional",
        price: "$2,499/month",
        features: [
          "Advanced SEO optimization",
          "Social media management (4 platforms)",
          "Weekly content creation",
          "PPC campaign management",
          "Comprehensive analytics reporting",
          "Email marketing campaigns",
        ],
        cta: "Choose Plan",
        popular: true,
      },
      {
        title: "Enterprise",
        price: "$4,999/month",
        features: [
          "Full-scale SEO strategy",
          "Social media management (all platforms)",
          "Daily content creation",
          "Advanced PPC campaign management",
          "Custom analytics dashboard",
          "Marketing automation",
          "Dedicated account manager",
        ],
        cta: "Contact Us",
      },
    ],
    faqs: [
      {
        question: "How long does it take to see results from SEO?",
        answer:
          "SEO is a long-term strategy, and results typically take 3-6 months to become noticeable. However, this timeline can vary depending on factors such as your industry, competition, website history, and the specific SEO tactics being implemented.",
      },
      {
        question: "Which social media platforms should my business be on?",
        answer:
          "The best social media platforms for your business depend on your target audience, industry, and marketing goals. We'll help you identify the platforms where your audience is most active and develop a strategy to effectively engage with them.",
      },
      {
        question: "How do you measure the success of digital marketing campaigns?",
        answer:
          "We track key performance indicators (KPIs) such as website traffic, conversion rates, engagement metrics, lead generation, and return on investment (ROI). We provide regular reports that show the impact of our digital marketing efforts on your business goals.",
      },
      {
        question: "Do you offer one-time projects or only ongoing services?",
        answer:
          "We offer both one-time projects and ongoing digital marketing services. For best results, we recommend ongoing services as digital marketing requires consistent effort and optimization over time. However, we can also help with specific one-time projects based on your needs.",
      },
    ],
  }

  return (
    <Suspense fallback={<ServiceDetailSkeleton />}>
      <ServiceDetail {...serviceData} />
    </Suspense>
  )
}
