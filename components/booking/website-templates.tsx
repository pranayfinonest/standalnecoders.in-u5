"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowRight, Check, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

// Mock template data - in a real app, this would come from an API
const templates = [
  {
    id: "complete",
    name: "Complete Website Package",
    description: "All-inclusive website with essential features at a fixed price",
    image: "/templates/complete-package.png",
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
    id: 1,
    name: "Business Pro",
    description: "Professional template for established businesses",
    image: "/templates/business-template.png",
    price: 15000,
    category: "business",
    features: ["Responsive Design", "About Us Page", "Services Page", "Contact Form", "Testimonials Section"],
    popular: false,
  },
  {
    id: 2,
    name: "E-Commerce Plus",
    description: "Complete solution for online stores",
    image: "/templates/ecommerce-template.png",
    price: 25000,
    category: "ecommerce",
    features: ["Product Catalog", "Shopping Cart", "Payment Gateway", "Order Management", "Customer Accounts"],
    popular: true,
  },
  {
    id: 3,
    name: "Portfolio Minimal",
    description: "Clean showcase for creative professionals",
    image: "/templates/portfolio-template.png",
    price: 18000,
    category: "portfolio",
    features: ["Project Gallery", "About Me Section", "Skills Showcase", "Contact Form", "Minimalist Design"],
    popular: false,
  },
  {
    id: 4,
    name: "Blog Standard",
    description: "Classic blog layout with modern features",
    image: "/templates/blog-template.png",
    price: 16000,
    category: "blog",
    features: ["Article Layout", "Categories & Tags", "Author Profiles", "Comments Section", "Search Functionality"],
    popular: false,
  },
  {
    id: 5,
    name: "Startup Launch",
    description: "Perfect for new ventures and startups",
    image: "/templates/startup-template.png",
    price: 20000,
    category: "business",
    features: ["Hero Section", "Feature Highlights", "Team Members", "Pricing Tables", "Newsletter Signup"],
    popular: false,
  },
  {
    id: 6,
    name: "Restaurant Deluxe",
    description: "Showcase your menu and restaurant information",
    image: "/templates/restaurant-template.png",
    price: 22000,
    category: "business",
    features: ["Menu Display", "Reservation System", "Location Map", "Photo Gallery", "Opening Hours"],
    popular: false,
  },
  {
    id: "custom",
    name: "Custom Design",
    description: "Fully customized website designed from scratch",
    image: "/modern-portfolio-design.png",
    price: 35000,
    category: "custom",
    features: ["Unique Design", "Custom Functionality", "Unlimited Revisions", "Premium Support", "Advanced Features"],
    popular: false,
  },
]

const categories = [
  { id: "all", name: "All Templates" },
  { id: "all-in-one", name: "Complete Packages" },
  { id: "business", name: "Business" },
  { id: "ecommerce", name: "E-Commerce" },
  { id: "portfolio", name: "Portfolio" },
  { id: "blog", name: "Blog" },
  { id: "custom", name: "Custom" },
]

export default function WebsiteTemplates() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState("all")

  const filteredTemplates = templates.filter((template) => {
    // Filter by category
    const categoryMatch = selectedCategory === "all" || template.category === selectedCategory

    // Filter by search query
    const searchMatch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase())

    // Filter by price range
    let priceMatch = true
    if (priceRange === "under20k") {
      priceMatch = template.price < 20000
    } else if (priceRange === "20k-30k") {
      priceMatch = template.price >= 20000 && template.price <= 30000
    } else if (priceRange === "above30k") {
      priceMatch = template.price > 30000
    }

    return categoryMatch && searchMatch && priceMatch
  })

  const handleSelectTemplate = (templateId) => {
    router.push(`/booking/customize?template=${templateId}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Choose a Website Template</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="search" className="text-base font-medium">
                      Search
                    </Label>
                    <div className="relative mt-1.5">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                      <Input
                        id="search"
                        placeholder="Search templates..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <Label className="text-base font-medium">Categories</Label>
                    <RadioGroup
                      value={selectedCategory}
                      onValueChange={setSelectedCategory}
                      className="mt-2 space-y-1.5"
                    >
                      {categories.map((category) => (
                        <div key={category.id} className="flex items-center space-x-2">
                          <RadioGroupItem value={category.id} id={`category-${category.id}`} />
                          <Label htmlFor={`category-${category.id}`} className="cursor-pointer">
                            {category.name}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <Separator />

                  <div>
                    <Label className="text-base font-medium">Price Range</Label>
                    <RadioGroup value={priceRange} onValueChange={setPriceRange} className="mt-2 space-y-1.5">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="all" id="price-all" />
                        <Label htmlFor="price-all" className="cursor-pointer">
                          All Prices
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="under20k" id="price-under20k" />
                        <Label htmlFor="price-under20k" className="cursor-pointer">
                          Under ₹20,000
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="20k-30k" id="price-20k-30k" />
                        <Label htmlFor="price-20k-30k" className="cursor-pointer">
                          ₹20,000 - ₹30,000
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="above30k" id="price-above30k" />
                        <Label htmlFor="price-above30k" className="cursor-pointer">
                          Above ₹30,000
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="lg:col-span-3">
          {filteredTemplates.length === 0 ? (
            <div className="text-center py-12">
              <Filter className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-600" />
              <h2 className="mt-4 text-lg font-medium">No templates found</h2>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                Try adjusting your filters or search query to find what you're looking for.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredTemplates.map((template) => (
                <Card key={template.id} className="overflow-hidden flex flex-col h-full">
                  <div className="relative aspect-video">
                    <Image
                      src={template.image || "/placeholder.svg"}
                      alt={template.name}
                      fill
                      className="object-cover"
                    />
                    {template.popular && (
                      <Badge className="absolute top-2 right-2 bg-orange-500 hover:bg-orange-600">Popular</Badge>
                    )}
                    {template.id === "complete" && (
                      <Badge className="absolute top-2 right-2 bg-green-500 hover:bg-green-600">Best Value</Badge>
                    )}
                  </div>
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg">{template.name}</h3>
                      <span className="font-bold">₹{template.price.toLocaleString()}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{template.description}</p>

                    <div className="mt-auto">
                      <h4 className="text-sm font-medium mb-2">Key Features:</h4>
                      <ul className="space-y-1 mb-4">
                        {template.features.map((feature, index) => (
                          <li key={index} className="text-sm flex items-start">
                            <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Button className="w-full mt-2" onClick={() => handleSelectTemplate(template.id)}>
                        Customize <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
