import ServiceDetail from "@/components/service-detail"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Creative Services | StandaloneCoders",
  description: "Innovative creative services to elevate your brand and captivate your audience.",
}

export default function CreativeServicesPage() {
  const serviceData = {
    title: "Creative Services",
    description:
      "Our Creative Services help businesses establish a strong brand identity and create compelling visual content that resonates with their target audience. From brand design and development to UI/UX design and video production, we provide comprehensive creative solutions tailored to your specific needs.",
    imageSrc: "/confident-leader.png",
    features: [
      {
        title: "Brand Design & Development",
        description:
          "Create a distinctive brand identity that reflects your company's values and resonates with your target audience.",
      },
      {
        title: "UI/UX Design",
        description:
          "Design intuitive and engaging user interfaces that provide exceptional user experiences across all digital platforms.",
      },
      {
        title: "Graphic Design",
        description:
          "Create visually compelling graphics for marketing materials, social media, and other communication channels.",
      },
      {
        title: "Video Production",
        description: "Produce high-quality videos that tell your brand story and engage your audience effectively.",
      },
    ],
    process: [
      {
        title: "Discovery",
        description:
          "We learn about your brand, target audience, and objectives to understand your creative needs fully.",
      },
      {
        title: "Concept Development",
        description: "We develop creative concepts that align with your brand identity and marketing goals.",
      },
      {
        title: "Execution",
        description:
          "Our creative team brings the concepts to life, ensuring high-quality deliverables that meet your expectations.",
      },
    ],
    packages: [
      {
        title: "Essential",
        price: "$1,499",
        features: [
          "Basic brand identity package",
          "Logo design",
          "Brand color palette",
          "Typography selection",
          "Basic brand guidelines",
        ],
        cta: "Get Started",
      },
      {
        title: "Professional",
        price: "$3,999",
        features: [
          "Comprehensive brand identity",
          "Logo design with variations",
          "Extended color palette",
          "Typography system",
          "Comprehensive brand guidelines",
          "Social media templates",
          "Basic marketing materials",
        ],
        cta: "Choose Plan",
        popular: true,
      },
      {
        title: "Enterprise",
        price: "$7,999",
        features: [
          "Complete brand ecosystem",
          "Logo design with extensive variations",
          "Comprehensive visual identity system",
          "Detailed brand guidelines",
          "Full marketing collateral design",
          "Website design concepts",
          "Social media strategy and templates",
          "Video brand elements",
        ],
        cta: "Contact Us",
      },
    ],
    faqs: [
      {
        question: "How long does the branding process take?",
        answer:
          "The branding process typically takes 4-8 weeks, depending on the scope of the project and the complexity of your requirements. This includes discovery, concept development, design iterations, and finalization.",
      },
      {
        question: "Do I own the rights to the creative work you produce?",
        answer:
          "Yes, once the project is completed and paid for, you own the rights to all the creative work we produce for you. We provide all necessary files and assets for your use across various platforms and applications.",
      },
      {
        question: "How many revisions are included in your design process?",
        answer:
          "Our standard packages include up to three rounds of revisions to ensure your complete satisfaction. Additional revisions can be accommodated at an hourly rate if needed.",
      },
      {
        question: "Can you work with our existing brand guidelines?",
        answer:
          "We can work within your existing brand guidelines to create new materials that align with your established brand identity. We can also help evolve your brand while maintaining its core essence if that's what you're looking for.",
      },
    ],
  }

  return <ServiceDetail {...serviceData} />
}
