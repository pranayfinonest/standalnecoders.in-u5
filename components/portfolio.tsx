"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("all")
  const router = useRouter()

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      category: "web",
      image: "/blue-ecommerce-dashboard.png",
      description: "A comprehensive e-commerce solution with inventory management and payment processing.",
      link: "/portfolio/ecommerce-platform",
    },
    {
      id: 2,
      title: "Banking Mobile App",
      category: "mobile",
      image: "/blue-mobile-banking.png",
      description: "Secure mobile banking application with biometric authentication and transaction tracking.",
      link: "/portfolio/banking-app",
    },
    {
      id: 3,
      title: "Healthcare Dashboard",
      category: "web",
      image: "/blue-health-overview.png",
      description: "Interactive dashboard for healthcare providers to monitor patient data and analytics.",
      link: "/portfolio/healthcare-dashboard",
    },
    {
      id: 4,
      title: "Digital Transformation Blueprint",
      category: "consulting",
      image: "/digital-transformation-blueprint.png",
      description: "Strategic roadmap for businesses undergoing digital transformation initiatives.",
      link: "/portfolio/digital-transformation",
    },
    {
      id: 5,
      title: "Collaborative Coding Platform",
      category: "web",
      image: "/collaborative-coding-space.png",
      description: "Real-time collaborative coding environment for remote development teams.",
      link: "/portfolio/collaborative-coding",
    },
    {
      id: 6,
      title: "Modern Portfolio Design",
      category: "design",
      image: "/modern-portfolio-design.png",
      description: "Sleek and responsive portfolio website design for creative professionals.",
      link: "/portfolio/portfolio-design",
    },
  ]

  const handleViewProject = (link) => {
    // Navigate to the project detail page
    router.push(link)

    // Scroll to top of the page
    window.scrollTo(0, 0)
  }

  const filteredProjects = activeTab === "all" ? projects : projects.filter((project) => project.category === activeTab)

  return (
    <section id="portfolio" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Portfolio</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore our diverse range of projects that showcase our expertise in web development, mobile applications,
            design, and consulting services.
          </p>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="all">All Projects</TabsTrigger>
              <TabsTrigger value="web">Web Development</TabsTrigger>
              <TabsTrigger value="mobile">Mobile Apps</TabsTrigger>
              <TabsTrigger value="design">Design</TabsTrigger>
              <TabsTrigger value="consulting">Consulting</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value={activeTab} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="relative h-48 w-full">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
                    <Button variant="outline" onClick={() => handleViewProject(project.link)}>
                      View Project
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
