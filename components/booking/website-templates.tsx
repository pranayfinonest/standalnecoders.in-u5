"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Check, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const templates = [
  {
    id: 1,
    name: "Business Pro",
    description: "Professional template for established businesses",
    image: "/templates/business-template.png",
    category: "business",
    features: ["Responsive Design", "Contact Form", "About Page", "Services Section"],
    price: 15000,
  },
  {
    id: 2,
    name: "E-Commerce Plus",
    description: "Complete solution for online stores",
    image: "/templates/ecommerce-template.png",
    category: "ecommerce",
    features: ["Product Catalog", "Shopping Cart", "Payment Integration", "Order Management"],
    price: 25000,
  },
  {
    id: 3,
    name: "Portfolio Minimal",
    description: "Clean showcase for creative professionals",
    image: "/templates/portfolio-template.png",
    category: "portfolio",
    features: ["Project Gallery", "About Section", "Skills Display", "Contact Form"],
    price: 18000,
  },
  {
    id: 4,
    name: "Blog Standard",
    description: "Classic blog layout with modern features",
    image: "/templates/blog-template.png",
    category: "blog",
    features: ["Article Layout", "Categories", "Search Function", "Author Profiles"],
    price: 16000,
  },
  {
    id: 5,
    name: "Startup Launch",
    description: "Perfect for new ventures and startups",
    image: "/templates/startup-template.png",
    category: "business",
    features: ["Hero Section", "Feature Highlights", "Pricing Table", "Newsletter Signup"],
    price: 20000,
  },
  {
    id: 6,
    name: "Restaurant Deluxe",
    description: "Showcase your menu and restaurant information",
    image: "/templates/restaurant-template.png",
    category: "business",
    features: ["Menu Display", "Reservation System", "Gallery", "Location Map"],
    price: 22000,
  },
]

export default function WebsiteTemplates() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedTemplate, setSelectedTemplate] = useState(null)

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handlePreview = (template) => {
    setSelectedTemplate(template)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search templates..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="h-4 w-4 text-gray-500" />
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="ecommerce">E-Commerce</SelectItem>
              <SelectItem value="portfolio">Portfolio</SelectItem>
              <SelectItem value="blog">Blog</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="overflow-hidden group">
            <div className="relative h-48 overflow-hidden">
              <Image
                src={template.image || "/placeholder.svg"}
                alt={template.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="secondary" size="sm" onClick={() => handlePreview(template)}>
                      Preview Template
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>{template.name}</DialogTitle>
                      <DialogDescription>{template.description}</DialogDescription>
                    </DialogHeader>
                    <div className="mt-4">
                      <div className="relative h-[400px] w-full rounded-md overflow-hidden">
                        <Image
                          src={template.image || "/placeholder.svg"}
                          alt={template.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="mt-6 grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-2">Features</h4>
                          <ul className="space-y-1">
                            {template.features.map((feature, index) => (
                              <li key={index} className="flex items-center text-sm">
                                <Check className="h-4 w-4 mr-2 text-green-500" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Starting Price</h4>
                          <p className="text-2xl font-bold">₹{template.price.toLocaleString()}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Customizable options available</p>
                          <Button className="mt-4 w-full" asChild>
                            <Link href={`/booking/customize?template=${template.id}`}>Select & Customize</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold">{template.name}</h3>
                <Badge variant="outline">{template.category}</Badge>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{template.description}</p>
              <p className="font-bold">Starting at ₹{template.price.toLocaleString()}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/booking/customize?template=${template.id}`}>Select & Customize</Link>
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" onClick={() => handlePreview(template)}>
                    Preview
                  </Button>
                </DialogTrigger>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">No templates found</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Try adjusting your search or filter criteria</p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm("")
              setSelectedCategory("all")
            }}
          >
            Reset Filters
          </Button>
        </div>
      )}

      <div className="mt-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 text-center">
        <h3 className="text-xl font-bold mb-2">Need a Custom Design?</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-2xl mx-auto">
          Don't see what you're looking for? Our team can create a completely custom website design tailored to your
          specific needs and brand.
        </p>
        <Button asChild>
          <Link href="/booking/customize?template=custom">
            Request Custom Design <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
