import { notFound } from "next/navigation"
import { Suspense } from "react"
import TemplateDetail from "@/components/booking/template-detail"

// This would typically come from a database or API
const templates = [
  {
    id: "complete",
    name: "Complete Website Package",
    description: "All-inclusive website with essential features at a fixed price",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJ1c2luZXNzJTIwd2Vic2l0ZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    imageCredit: "Unsplash",
    price: 19999,
    category: "all-in-one",
    features: [
      "Responsive Design",
      "5 Custom Pages",
      "Contact Form",
      "Basic SEO Setup",
      "Social Media Integration",
      "1 Year Free Hosting",
      "Free Domain for 1 Year",
    ],
    popular: true,
  },
  {
    id: "1",
    name: "Business Pro",
    description: "Professional template for established businesses",
    image:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YnVzaW5lc3MlMjB3ZWJzaXRlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    imageCredit: "Unsplash",
    price: 15000,
    category: "business",
    features: ["Responsive Design", "About Us Page", "Services Page", "Contact Form", "Testimonials Section"],
    popular: false,
  },
  // Other templates would be here
]

export async function generateMetadata({ params }) {
  const template = templates.find((t) => t.id.toString() === params.id)

  if (!template) {
    return {
      title: "Template Not Found | StandaloneCoders",
      description: "The requested template could not be found.",
    }
  }

  return {
    title: `${template.name} | Website Templates | StandaloneCoders`,
    description: template.description,
  }
}

export default function TemplatePage({ params }) {
  const templateId = params.id
  const template = templates.find((t) => t.id.toString() === templateId)

  if (!template) {
    notFound()
  }

  return (
    <Suspense fallback={<div>Loading template details...</div>}>
      <TemplateDetail template={template} />
    </Suspense>
  )
}
