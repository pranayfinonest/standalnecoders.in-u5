import ServiceDetail from "@/components/service-detail"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI & Technology Solutions | StandaloneCoders",
  description: "Cutting-edge AI and technology solutions to streamline operations and enhance customer experiences.",
}

export default function AITechnologyPage() {
  const serviceData = {
    title: "AI & Technology Solutions",
    description:
      "Our AI & Technology Solutions help businesses leverage cutting-edge technologies to streamline operations, enhance customer experiences, and drive innovation. From AI implementation to custom software development, we provide comprehensive technology solutions tailored to your specific needs.",
    imageSrc: "/vibrant-tech-hub.png",
    features: [
      {
        title: "AI Implementation",
        description:
          "Integrate artificial intelligence into your business processes to automate tasks, gain insights, and improve decision-making.",
      },
      {
        title: "Prompt Engineering",
        description:
          "Optimize AI interactions with expertly crafted prompts that enhance the performance of language models and other AI systems.",
      },
      {
        title: "CRM Management",
        description:
          "Implement and manage customer relationship management systems to improve customer service and streamline sales processes.",
      },
      {
        title: "Custom Software Development",
        description: "Create tailored software solutions designed specifically for your business needs and objectives.",
      },
    ],
    process: [
      {
        title: "Assessment",
        description:
          "We analyze your current technology infrastructure and identify opportunities for improvement and innovation.",
      },
      {
        title: "Strategy Development",
        description: "We create a comprehensive technology strategy aligned with your business goals and objectives.",
      },
      {
        title: "Implementation",
        description:
          "Our team of experts implements the technology solutions, ensuring seamless integration with your existing systems.",
      },
    ],
    packages: [
      {
        title: "Starter",
        price: "$1,999",
        features: [
          "Basic AI implementation",
          "CRM setup",
          "1 custom software module",
          "30 days support",
          "Basic training",
        ],
        cta: "Get Started",
      },
      {
        title: "Professional",
        price: "$4,999",
        features: [
          "Advanced AI implementation",
          "CRM setup and customization",
          "3 custom software modules",
          "90 days support",
          "Comprehensive training",
          "Monthly performance reports",
        ],
        cta: "Choose Plan",
        popular: true,
      },
      {
        title: "Enterprise",
        price: "$9,999",
        features: [
          "Full AI ecosystem implementation",
          "Enterprise CRM integration",
          "Unlimited custom software modules",
          "1 year priority support",
          "Executive training sessions",
          "Quarterly strategy reviews",
          "Dedicated account manager",
        ],
        cta: "Contact Us",
      },
    ],
    faqs: [
      {
        question: "How can AI benefit my business?",
        answer:
          "AI can automate repetitive tasks, provide valuable insights from data, enhance customer experiences, improve decision-making, and create new business opportunities through innovation.",
      },
      {
        question: "What is prompt engineering?",
        answer:
          "Prompt engineering is the process of designing and optimizing inputs to AI systems, particularly language models, to generate more accurate, relevant, and useful outputs.",
      },
      {
        question: "How long does it take to implement a custom software solution?",
        answer:
          "The timeline for custom software development varies depending on the complexity and scope of the project. Simple applications may take 1-3 months, while more complex enterprise solutions can take 6-12 months or more.",
      },
      {
        question: "Do you provide ongoing support after implementation?",
        answer:
          "Yes, we offer various support packages to ensure your technology solutions continue to function optimally. Our support includes maintenance, updates, troubleshooting, and continuous improvement.",
      },
    ],
  }

  return <ServiceDetail {...serviceData} />
}
