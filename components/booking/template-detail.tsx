"use client"

import { TemplateShowcase } from "./template-showcase"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import { useRouter } from "next/navigation"

interface Template {
  id: string
  name: string
  description: string
  image: string
  category: string
  price: number
  features: string[]
}

interface TemplateDetailProps {
  template: Template
}

export default function TemplateDetail({ template }: TemplateDetailProps) {
  const router = useRouter()

  return (
    <div>
      <Button variant="ghost" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Templates
      </Button>

      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>{template.name}</CardTitle>
          <CardDescription>{template.description}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="relative aspect-video w-full">
            <Image
              src={template.image || "/placeholder.svg"}
              alt={template.name}
              fill
              className="object-cover rounded-md"
              priority
              quality={90}
            />
          </div>

          <TemplateShowcase templateId={template.id} templateName={template.name} templateImage={template.image} />

          <div>
            <h3 className="text-xl font-semibold mb-4">Key Features</h3>
            <ul className="space-y-2">
              {template.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
