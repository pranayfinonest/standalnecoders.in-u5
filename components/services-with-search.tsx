"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface ServiceItem {
  title: string
  category: string
  description: string
  link: string
  tags: string[]
}

export default function ServicesWithSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredServices, setFilteredServices] = useState<ServiceItem[]>([])

  const allServices: ServiceItem[] = [
    {
      title: "Custom Website Development",
      category: "Website Development",
      description: "Tailored websites designed to meet your specific business needs and goals",
      link: "/services/website-development",
      tags: ["website", "web development", "custom", "responsive", "design"],
    },
    {
      title: "E-commerce Solutions",
      category: "Website Development",
      description: "Powerful online stores with secure payment gateways and inventory management",
      link: "/services/website-development",
      tags: ["ecommerce", "online store", "shopping cart", "payment gateway", "inventory"],
    },
    {
      title: "CMS Development",
      category: "Website Development",
      description: "Easy-to-manage content management systems for seamless updates",
      link: "/services/website-development",
      tags: ["cms", "wordpress", "content management", "blog", "admin"],
    },
    {
      title: "iOS App Development",
      category: "Mobile App Development",
      description: "Native applications for iPhone and iPad devices",
      link: "/services/app-development",
      tags: ["ios", "iphone", "ipad", "apple", "swift", "mobile app"],
    },
    {
      title: "Android App Development",
      category: "Mobile App Development",
      description: "Custom applications for the Android ecosystem",
      link: "/services/app-development",
      tags: ["android", "google", "kotlin", "java", "mobile app"],
    },
    {
      title: "Cross-Platform Development",
      category: "Mobile App Development",
      description: "Efficient apps that work seamlessly across multiple platforms",
      link: "/services/app-development",
      tags: ["cross-platform", "react native", "flutter", "hybrid", "mobile app"],
    },
    {
      title: "Enterprise Software Development",
      category: "Custom Software",
      description: "Scalable applications designed for large-scale business operations",
      link: "/services/custom-software",
      tags: ["enterprise", "business", "software", "scalable", "custom"],
    },
    {
      title: "SaaS Product Development",
      category: "Custom Software",
      description: "Cloud-based software solutions with subscription models",
      link: "/services/custom-software",
      tags: ["saas", "cloud", "subscription", "software as a service"],
    },
    {
      title: "UI/UX Design",
      category: "Creative Services",
      description: "User-centered design that enhances user experience and satisfaction",
      link: "/services/creative-services",
      tags: ["ui", "ux", "design", "user experience", "interface", "wireframe"],
    },
    {
      title: "Brand Identity Design",
      category: "Creative Services",
      description: "Distinctive visual elements that represent your brand's personality",
      link: "/services/creative-services",
      tags: ["brand", "identity", "logo", "branding", "visual identity"],
    },
    {
      title: "Search Engine Optimization",
      category: "Digital Marketing",
      description: "Improve your visibility in search engine results",
      link: "/services/digital-marketing",
      tags: ["seo", "search engine", "google", "ranking", "keywords"],
    },
    {
      title: "Social Media Marketing",
      category: "Digital Marketing",
      description: "Engage with your audience across popular social platforms",
      link: "/services/digital-marketing",
      tags: ["social media", "facebook", "instagram", "twitter", "linkedin"],
    },
    {
      title: "AI Chatbots",
      category: "AI Technology",
      description: "Intelligent conversational agents to enhance customer service",
      link: "/services/ai-technology",
      tags: ["ai", "chatbot", "artificial intelligence", "customer service", "automation"],
    },
    {
      title: "Machine Learning Integration",
      category: "AI Technology",
      description: "Data-driven insights and predictions for business optimization",
      link: "/services/ai-technology",
      tags: ["machine learning", "ml", "ai", "data", "predictions", "analytics"],
    },
    {
      title: "Security Audits & Assessments",
      category: "Cybersecurity",
      description: "Comprehensive evaluation of your security posture and vulnerabilities",
      link: "/services/cybersecurity",
      tags: ["security", "audit", "assessment", "vulnerability", "cybersecurity"],
    },
    {
      title: "Penetration Testing",
      category: "Cybersecurity",
      description: "Simulated cyber attacks to identify security weaknesses",
      link: "/services/cybersecurity",
      tags: ["penetration testing", "pentest", "security", "hacking", "vulnerability"],
    },
  ]

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredServices([])
    } else {
      const query = searchQuery.toLowerCase()
      const results = allServices.filter(
        (service) =>
          service.title.toLowerCase().includes(query) ||
          service.description.toLowerCase().includes(query) ||
          service.category.toLowerCase().includes(query) ||
          service.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
      setFilteredServices(results)
    }
  }, [searchQuery])

  return (
    <div className="mb-12">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search for services, technologies, or solutions..."
            className="pl-10 py-6 text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {searchQuery.trim() !== "" && (
          <div className="mt-4">
            <p className="text-sm text-gray-500 mb-2">
              {filteredServices.length} {filteredServices.length === 1 ? "result" : "results"} found
            </p>
          </div>
        )}
      </div>

      {filteredServices.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service, index) => (
            <Card key={index} className="h-full hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="mb-2 text-sm font-medium text-blue-600">{service.category}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{service.description}</p>
                <Button asChild variant="outline" className="w-full">
                  <Link href={service.link}>
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {searchQuery.trim() !== "" && filteredServices.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-bold mb-2">No services found</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            We couldn't find any services matching your search. Try different keywords or browse our service categories
            below.
          </p>
        </div>
      )}
    </div>
  )
}
