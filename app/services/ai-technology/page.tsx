import { BrainCircuit } from "lucide-react"
import ServiceCategoryTemplate from "@/components/service-category-template"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI Technology Services | StandaloneCoders",
  description:
    "Advanced AI solutions for businesses. Chatbots, machine learning integration, natural language processing, and computer vision solutions.",
}

export default function AITechnologyPage() {
  return (
    <ServiceCategoryTemplate
      title="AI Technology"
      description="We leverage artificial intelligence to create intelligent solutions that automate processes, provide valuable insights, and enhance customer experiences for businesses across various industries."
      icon={<BrainCircuit className="h-8 w-8 text-purple-600" />}
      image="/intricate-logic-flow.png"
      features={[
        "AI Chatbots and Virtual Assistants",
        "Machine Learning Integration",
        "Natural Language Processing (NLP)",
        "Computer Vision Solutions",
        "Predictive Analytics",
        "AI-Powered Automation",
      ]}
      benefits={[
        "Automate repetitive tasks and processes",
        "Gain valuable insights from data",
        "Enhance customer service and support",
        "Personalize user experiences",
        "Make data-driven business decisions",
        "Stay at the forefront of technological innovation",
      ]}
    />
  )
}
