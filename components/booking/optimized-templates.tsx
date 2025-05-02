"use client"

import { useState, useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { OptimizedImage } from "../performance/optimized-image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Template {
  id: string
  name: string
  description: string
  image: string
  category: string
  price: number
}

export function OptimizedTemplates() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const [visibleTemplates, setVisibleTemplates] = useState<Template[]>([])
  const [ref, inView] = useInView({
    triggerOnce: false,
    rootMargin: "200px 0px",
  })

  // Simulate fetching templates
  useEffect(() => {
    const fetchTemplates = async () => {
      // In a real app, this would be an API call
      // For now, we'll use mock data
      const mockTemplates: Template[] = [
        {
          id: "business",
          name: "Business Website",
          description: "Professional business website template",
          image: "/templates/business-template.png",
          category: "business",
          price: 299,
        },
        {
          id: "ecommerce",
          name: "E-Commerce Store",
          description: "Complete online store template",
          image: "/templates/ecommerce-template.png",
          category: "ecommerce",
          price: 499,
        },
        {
          id: "portfolio",
          name: "Portfolio",
          description: "Showcase your work with this template",
          image: "/templates/portfolio-template.png",
          category: "portfolio",
          price: 199,
        },
        {
          id: "blog",
          name: "Blog",
          description: "Start your blog with this template",
          image: "/templates/blog-template.png",
          category: "blog",
          price: 149,
        },
        {
          id: "startup",
          name: "Startup",
          description: "Perfect for startups and new businesses",
          image: "/templates/startup-template.png",
          category: "business",
          price: 349,
        },
        {
          id: "restaurant",
          name: "Restaurant",
          description: "Showcase your restaurant with this template",
          image: "/templates/restaurant-template.png",
          category: "business",
          price: 249,
        },
      ]

      // Simulate network delay
      setTimeout(() => {
        setTemplates(mockTemplates)
        setLoading(false)
      }, 500)
    }

    fetchTemplates()
  }, [])

  // Load templates progressively as they come into view
  useEffect(() => {
    if (inView && templates.length > visibleTemplates.length) {
      // Add more templates when in view
      const nextBatch = templates.slice(visibleTemplates.length, visibleTemplates.length + 3)
      setVisibleTemplates((prev) => [...prev, ...nextBatch])
    } else if (templates.length > 0 && visibleTemplates.length === 0) {
      // Initial load - show first 3 templates
      setVisibleTemplates(templates.slice(0, 3))
    }
  }, [inView, templates, visibleTemplates])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-gray-200 animate-pulse" />
            <div className="p-4 space-y-2">
              <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
              <div className="h-10 bg-gray-200 rounded animate-pulse w-1/2 mt-4" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleTemplates.map((template, index) => (
          <div
            key={template.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative h-48">
              <OptimizedImage
                src={template.image}
                alt={template.name}
                fill
                position={index < 3 ? "above-fold" : "below-fold"}
                className="w-full h-full"
                quality={index < 3 ? 85 : 75}
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">{template.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{template.description}</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">${template.price}</span>
                <div className="space-x-2">
                  <Link href={`/booking/templates/${template.id}`}>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </Link>
                  <Link href={`/booking/customize?template=${template.id}`}>
                    <Button size="sm">Customize</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Intersection observer reference element */}
      {templates.length > visibleTemplates.length && (
        <div ref={ref} className="h-10 mt-8 flex justify-center">
          <div className="animate-pulse flex space-x-2">
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          </div>
        </div>
      )}
    </>
  )
}
