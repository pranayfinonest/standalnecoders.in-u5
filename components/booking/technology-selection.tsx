"use client"

import { useState } from "react"
import Image from "next/image"
import { Info } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Technology options
const technologies = {
  frontend: [
    {
      id: "react",
      name: "React",
      description: "A JavaScript library for building user interfaces",
      price: 5000,
      icon: "/tech-icons/react.png",
    },
    {
      id: "vue",
      name: "Vue.js",
      description: "Progressive JavaScript framework for UIs",
      price: 4500,
      icon: "/tech-icons/vue.png",
    },
    {
      id: "angular",
      name: "Angular",
      description: "Platform for building mobile & desktop web applications",
      price: 6000,
      icon: "/tech-icons/angular.png",
    },
    {
      id: "nextjs",
      name: "Next.js",
      description: "React framework with hybrid static & server rendering",
      price: 7000,
      icon: "/tech-icons/nextjs.png",
    },
    {
      id: "nuxt",
      name: "Nuxt.js",
      description: "Vue framework for creating universal applications",
      price: 6500,
      icon: "/tech-icons/nuxt.png",
    },
  ],
  backend: [
    {
      id: "node",
      name: "Node.js",
      description: "JavaScript runtime built on Chrome's V8 engine",
      price: 6000,
      icon: "/tech-icons/nodejs.png",
    },
    {
      id: "express",
      name: "Express.js",
      description: "Fast, unopinionated, minimalist web framework for Node.js",
      price: 3000,
      icon: "/tech-icons/express.png",
    },
    {
      id: "django",
      name: "Django",
      description: "High-level Python web framework",
      price: 7000,
      icon: "/tech-icons/django.png",
    },
    {
      id: "laravel",
      name: "Laravel",
      description: "PHP web application framework with elegant syntax",
      price: 6500,
      icon: "/tech-icons/laravel.png",
    },
    {
      id: "ruby",
      name: "Ruby on Rails",
      description: "Server-side web application framework written in Ruby",
      price: 7000,
      icon: "/tech-icons/rails.png",
    },
  ],
  cms: [
    {
      id: "wordpress",
      name: "WordPress",
      description: "Popular CMS for blogs and websites",
      price: 4000,
      icon: "/tech-icons/wordpress.png",
    },
    {
      id: "shopify",
      name: "Shopify",
      description: "E-commerce platform for online stores",
      price: 8000,
      icon: "/tech-icons/shopify.png",
    },
    {
      id: "strapi",
      name: "Strapi",
      description: "Open-source headless CMS",
      price: 5500,
      icon: "/tech-icons/strapi.png",
    },
    {
      id: "contentful",
      name: "Contentful",
      description: "API-first content management platform",
      price: 6000,
      icon: "/tech-icons/contentful.png",
    },
    {
      id: "drupal",
      name: "Drupal",
      description: "Content management framework for complex websites",
      price: 7000,
      icon: "/tech-icons/drupal.png",
    },
  ],
  database: [
    {
      id: "mongodb",
      name: "MongoDB",
      description: "NoSQL document database",
      price: 4000,
      icon: "/tech-icons/mongodb.png",
    },
    {
      id: "mysql",
      name: "MySQL",
      description: "Open-source relational database",
      price: 3500,
      icon: "/tech-icons/mysql.png",
    },
    {
      id: "postgresql",
      name: "PostgreSQL",
      description: "Advanced open-source relational database",
      price: 4500,
      icon: "/tech-icons/postgresql.png",
    },
    {
      id: "firebase",
      name: "Firebase",
      description: "Google's platform for mobile and web applications",
      price: 5000,
      icon: "/tech-icons/firebase.png",
    },
    {
      id: "supabase",
      name: "Supabase",
      description: "Open-source Firebase alternative",
      price: 4500,
      icon: "/tech-icons/supabase.png",
    },
  ],
}

export default function TechnologySelection({ formData, updateFormData }) {
  const [activeTab, setActiveTab] = useState("frontend")

  const handleTechnologyToggle = (techId, techCategory) => {
    const tech = technologies[techCategory].find((t) => t.id === techId)
    if (!tech) return

    const isSelected = formData.selectedTechnologies.some((t) => t.id === techId)

    let updatedTechnologies
    let updatedPrice = formData.technologiesPrice

    if (isSelected) {
      updatedTechnologies = formData.selectedTechnologies.filter((t) => t.id !== techId)
      updatedPrice -= tech.price
    } else {
      updatedTechnologies = [
        ...formData.selectedTechnologies,
        {
          id: tech.id,
          name: tech.name,
          category: techCategory,
          price: tech.price,
        },
      ]
      updatedPrice += tech.price
    }

    updateFormData({
      selectedTechnologies: updatedTechnologies,
      technologiesPrice: updatedPrice,
    })
  }

  const isTechnologySelected = (techId) => {
    return formData.selectedTechnologies.some((t) => t.id === techId)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium mb-2">Select Technologies</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Choose the technologies you want to use for your website. Your selections will affect the final price.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="frontend">Frontend</TabsTrigger>
          <TabsTrigger value="backend">Backend</TabsTrigger>
          <TabsTrigger value="cms">CMS</TabsTrigger>
          <TabsTrigger value="database">Database</TabsTrigger>
        </TabsList>

        {Object.keys(technologies).map((category) => (
          <TabsContent key={category} value={category} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {technologies[category].map((tech) => (
                <div
                  key={tech.id}
                  className={`flex items-start space-x-4 p-4 border rounded-lg transition-colors
                    ${
                      isTechnologySelected(tech.id)
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "border-gray-200 dark:border-gray-700"
                    }`}
                >
                  <Checkbox
                    id={`tech-${tech.id}`}
                    checked={isTechnologySelected(tech.id)}
                    onCheckedChange={() => handleTechnologyToggle(tech.id, category)}
                    className="mt-1"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center">
                      <div className="relative w-6 h-6 mr-2">
                        <Image
                          src={tech.icon || `/placeholder.svg?height=24&width=24&query=${tech.name}`}
                          alt={tech.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <Label htmlFor={`tech-${tech.id}`} className="font-medium cursor-pointer">
                        {tech.name}
                      </Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 ml-2 text-gray-400 cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">{tech.description}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{tech.description}</p>
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mt-1">
                      ₹{tech.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {formData.selectedTechnologies.length > 0 && (
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <h3 className="font-medium mb-2">Selected Technologies:</h3>
          <div className="flex flex-wrap gap-2">
            {formData.selectedTechnologies.map((tech) => (
              <div
                key={tech.id}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200"
              >
                {tech.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
