import { Suspense } from "react"
import ServiceDetail from "@/components/service-detail"

export const dynamic = "force-static"

export default function AITechnologyPage() {
  const serviceData = {
    title: "AI & Technology Solutions",
    description:
      "Leverage the power of artificial intelligence and cutting-edge technology to help businesses innovate, automate processes, and gain competitive advantages. Our solutions are designed to solve complex problems and drive digital transformation.",
    features: [
      "Custom AI Solutions Development",
      "Machine Learning Implementation",
      "Data Analytics & Business Intelligence",
      "Process Automation",
      "AI Integration with Existing Systems",
      "Natural Language Processing",
      "Computer Vision Solutions",
      "Predictive Analytics",
      "AI Strategy Consulting",
      "AI Model Training & Optimization",
    ],
    process: [
      {
        step: 1,
        title: "Discovery & Assessment",
        description:
          "We begin by understanding your business challenges and objectives to identify opportunities where AI can create value.",
      },
      {
        step: 2,
        title: "Solution Design",
        description:
          "Our experts design a tailored AI solution that addresses your specific needs and integrates with your existing systems.",
      },
      {
        step: 3,
        title: "Development & Implementation",
        description:
          "We develop and implement the AI solution, ensuring it meets quality standards and performance requirements.",
      },
      {
        step: 4,
        title: "Testing & Validation",
        description:
          "Rigorous testing ensures the solution performs as expected and delivers accurate results across various scenarios.",
      },
      {
        step: 5,
        title: "Deployment & Integration",
        description: "We deploy the solution and integrate it seamlessly with your existing workflows and systems.",
      },
      {
        step: 6,
        title: "Monitoring & Optimization",
        description:
          "Ongoing monitoring and optimization ensure your AI solution continues to deliver value and improves over time.",
      },
    ],
    packages: [
      {
        name: "AI Starter",
        price: "$5,000",
        description: "Basic AI implementation for small businesses looking to start their AI journey.",
        features: [
          "Single use case implementation",
          "Basic data integration",
          "Model training with existing data",
          "Basic reporting dashboard",
          "30 days support",
        ],
      },
      {
        name: "AI Professional",
        price: "$15,000",
        popular: true,
        description: "Comprehensive AI solution for growing businesses with moderate complexity needs.",
        features: [
          "Multiple use case implementation",
          "Advanced data integration",
          "Custom model development",
          "Interactive analytics dashboard",
          "API development for integration",
          "3 months support and maintenance",
          "Knowledge transfer sessions",
        ],
      },
      {
        name: "AI Enterprise",
        price: "Custom",
        description:
          "Enterprise-grade AI solutions for organizations with complex requirements and large-scale implementation needs.",
        features: [
          "Enterprise-wide AI strategy",
          "Multiple complex use cases",
          "Advanced model development",
          "Full system integration",
          "Custom analytics platform",
          "Ongoing support and optimization",
          "Dedicated AI consultant",
          "Staff training program",
        ],
      },
    ],
    faqs: [
      {
        question: "How can AI benefit my business?",
        answer:
          "AI can benefit your business in numerous ways, including automating repetitive tasks, extracting insights from data, improving decision-making, enhancing customer experiences, optimizing operations, and creating new business opportunities through innovation.",
      },
      {
        question: "Do I need a large amount of data to implement AI?",
        answer:
          "While having quality data is important for AI implementation, you don't necessarily need massive amounts. We can work with your existing data and also help you identify strategies for data collection and enrichment if needed.",
      },
      {
        question: "How long does it take to implement an AI solution?",
        answer:
          "Implementation timelines vary based on the complexity of the solution, ranging from a few weeks for simple implementations to several months for complex enterprise solutions. We'll provide a detailed timeline during the solution design phase.",
      },
      {
        question: "How do you ensure the security of our data?",
        answer:
          "We implement robust security measures throughout the AI development process, including data encryption, secure access controls, and compliance with relevant data protection regulations. We can also work within your existing security frameworks.",
      },
      {
        question: "Will we need specialized staff to maintain the AI solution?",
        answer:
          "Our solutions are designed with usability in mind. While some technical knowledge is beneficial, we provide training and documentation to enable your team to manage the solution. We also offer ongoing support and maintenance packages.",
      },
    ],
    cta: {
      title: "Ready to Transform Your Business with AI?",
      description:
        "Contact us today to discuss how our AI and technology solutions can help your business innovate and grow.",
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
