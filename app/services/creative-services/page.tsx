import { Suspense } from "react"
import ServiceDetail from "@/components/service-detail"

export const dynamic = "force-static"

export default function CreativeServicesPage() {
  const serviceData = {
    title: "Creative Services",
    description:
      "Bring your brand to life with our creative services. From logo design and brand identity to website design and multimedia content creation.",
    features: [
      "Brand Identity Design",
      "Logo Creation & Refinement",
      "Website UI/UX Design",
      "Print & Digital Marketing Materials",
      "Social Media Graphics",
      "Video Production & Editing",
      "Animation & Motion Graphics",
      "Photography & Image Editing",
      "Illustration & Custom Graphics",
      "Packaging Design",
    ],
    process: [
      {
        step: 1,
        title: "Discovery & Brief",
        description:
          "We start by understanding your brand, target audience, goals, and creative vision through in-depth discussions.",
      },
      {
        step: 2,
        title: "Research & Concept Development",
        description:
          "Our creative team researches your industry and competitors, then develops initial concepts based on your brief.",
      },
      {
        step: 3,
        title: "Design Creation",
        description:
          "We create detailed designs and present them for your feedback, explaining our creative decisions.",
      },
      {
        step: 4,
        title: "Refinement",
        description:
          "Based on your feedback, we refine the designs until they perfectly match your vision and requirements.",
      },
      {
        step: 5,
        title: "Finalization & Delivery",
        description:
          "We finalize all assets, prepare them in appropriate formats, and deliver them with usage guidelines.",
      },
    ],
    packages: [
      {
        name: "Brand Starter",
        price: "$2,500",
        description: "Essential branding package for new businesses or rebrands.",
        features: [
          "Logo design (3 concepts)",
          "Brand color palette",
          "Typography selection",
          "Basic brand guidelines",
          "Business card design",
          "Social media profile graphics",
        ],
      },
      {
        name: "Brand Professional",
        price: "$5,000",
        popular: true,
        description: "Comprehensive branding solution for established businesses looking to elevate their brand.",
        features: [
          "Logo design (5 concepts)",
          "Extended brand guidelines",
          "Complete stationery design",
          "Social media templates",
          "Email signature design",
          "One-page website design",
          "Brand messaging development",
        ],
      },
      {
        name: "Brand Enterprise",
        price: "$10,000+",
        description: "Complete brand identity system for businesses requiring extensive brand assets.",
        features: [
          "Logo design (unlimited concepts)",
          "Comprehensive brand guidelines",
          "Complete marketing collateral",
          "Custom illustration style",
          "Video intro/outro animations",
          "Multi-page website design",
          "Packaging design concepts",
          "Brand strategy consultation",
        ],
      },
    ],
    faqs: [
      {
        question: "How long does the creative process typically take?",
        answer:
          "Timelines vary based on project scope. A basic brand identity might take 2-3 weeks, while a comprehensive brand system could take 6-8 weeks. Website designs typically take 3-6 weeks depending on complexity. We'll provide a detailed timeline during our initial consultation.",
      },
      {
        question: "How many revisions are included in your creative services?",
        answer:
          "Our packages typically include 2-3 rounds of revisions. We believe in getting things right and will work closely with you to ensure you're completely satisfied with the final result. Additional revision rounds can be arranged if needed.",
      },
      {
        question: "Do you provide the source files for the designs?",
        answer:
          "Yes, upon project completion and final payment, we provide all source files and assets in appropriate formats for your future use. We also include guidelines on how to properly use these assets to maintain brand consistency.",
      },
      {
        question: "Can you work with our existing brand elements?",
        answer:
          "We can work with your existing brand elements and either refresh them or expand upon them. Our goal is to enhance your brand while maintaining its core identity and recognition.",
      },
      {
        question: "Do you offer ongoing creative support after project completion?",
        answer:
          "Yes, we offer retainer packages for ongoing creative support. This can include regular content creation, design updates, and brand management to ensure consistency across all your marketing efforts.",
      },
    ],
    cta: {
      title: "Ready to Transform Your Brand?",
      description:
        "Contact us today to discuss how our creative services can help elevate your brand and captivate your audience.",
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
