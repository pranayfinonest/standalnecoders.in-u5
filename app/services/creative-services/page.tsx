import ServiceDetail from "@/components/service-detail"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Creative Services | StandaloneCoders",
  description: "Professional creative services to enhance your brand identity and visual communication.",
}

export default function CreativeServicesPage() {
  const serviceData = {
    title: "Creative Services",
    description:
      "Our Creative Services help businesses establish a strong visual identity and communicate effectively with their audience. From video editing to graphic design and UI/UX development, we provide comprehensive creative solutions to enhance your brand.",
    imageSrc: "/confident-leader.png",
    features: [
      {
        title: "Video Editing",
        description:
          "Professional video editing services to create engaging content for marketing, training, or social media.",
      },
      {
        title: "Graphic Design",
        description:
          "Eye-catching graphic design that communicates your brand message and captures audience attention.",
      },
      {
        title: "Banner Creation",
        description: "Compelling banner designs for websites, social media, and digital advertising campaigns.",
      },
      {
        title: "UI/UX Design",
        description: "User-centered interface and experience design that enhances usability and customer satisfaction.",
      },
    ],
    process: [
      {
        title: "Discovery",
        description: "We learn about your brand, target audience, and creative goals to inform our design approach.",
      },
      {
        title: "Concept Development",
        description: "We create initial concepts and prototypes based on your requirements and brand guidelines.",
      },
      {
        title: "Refinement & Delivery",
        description:
          "We refine the designs based on your feedback and deliver the final assets in your preferred formats.",
      },
    ],
    packages: [
      {
        title: "Basic",
        price: "$799",
        features: [
          "Logo design",
          "Basic brand guidelines",
          "Social media graphics (5)",
          "1 banner design",
          "2 revision rounds",
        ],
        cta: "Get Started",
      },
      {
        title: "Standard",
        price: "$1,999",
        features: [
          "Logo design with variations",
          "Comprehensive brand guidelines",
          "Social media graphics (10)",
          "3 banner designs",
          "Basic video editing (1 video)",
          "3 revision rounds",
        ],
        cta: "Choose Plan",
        popular: true,
      },
      {
        title: "Premium",
        price: "$3,999",
        features: [
          "Complete brand identity package",
          "Extensive brand guidelines",
          "Social media graphics (20)",
          "5 banner designs",
          "Advanced video editing (3 videos)",
          "UI/UX design for one platform",
          "Unlimited revision rounds",
        ],
        cta: "Contact Us",
      },
    ],
    faqs: [
      {
        question: "What file formats do you provide for graphic designs?",
        answer:
          "We provide designs in various formats including JPG, PNG, PDF, AI, and PSD, depending on your requirements and the specific deliverables.",
      },
      {
        question: "How long does it take to complete a video editing project?",
        answer:
          "The timeline for video editing projects varies depending on the complexity and length of the video. Simple edits may take 2-3 days, while more complex projects can take 1-2 weeks.",
      },
      {
        question: "Do you provide source files for the designs?",
        answer:
          "Yes, we provide source files for all designs upon project completion, giving you full ownership and the ability to make future modifications if needed.",
      },
      {
        question: "Can you help with print materials as well as digital designs?",
        answer:
          "We create designs for both digital and print media, ensuring they're optimized for their respective formats and maintaining brand consistency across all materials.",
      },
    ],
  }

  return <ServiceDetail {...serviceData} />
}
