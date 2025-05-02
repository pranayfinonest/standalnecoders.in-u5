"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowRight, Check, Filter, Search, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Template data with updated images from free sources
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
    id: 1,
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
  {
    id: 2,
    name: "E-Commerce Plus",
    description: "Complete solution for online stores",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGVjb21tZXJjZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    imageCredit: "Unsplash",
    price: 25000,
    category: "ecommerce",
    features: ["Product Catalog", "Shopping Cart", "Payment Gateway", "Order Management", "Customer Accounts"],
    popular: true,
  },
  {
    id: 3,
    name: "Portfolio Minimal",
    description: "Clean showcase for creative professionals",
    image:
      "https://images.unsplash.com/photo-1545665277-5937489579f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9ydGZvbGlvJTIwd2Vic2l0ZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    imageCredit: "Unsplash",
    price: 18000,
    category: "portfolio",
    features: ["Project Gallery", "About Me Section", "Skills Showcase", "Contact Form", "Minimalist Design"],
    popular: false,
  },
  {
    id: 4,
    name: "Blog Standard",
    description: "Classic blog layout with modern features",
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    imageCredit: "Unsplash",
    price: 16000,
    category: "blog",
    features: ["Article Layout", "Categories & Tags", "Author Profiles", "Comments Section", "Search Functionality"],
    popular: false,
  },
  {
    id: 5,
    name: "Startup Launch",
    description: "Perfect for new ventures and startups",
    image:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3RhcnR1cHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    imageCredit: "Unsplash",
    price: 20000,
    category: "business",
    features: ["Hero Section", "Feature Highlights", "Team Members", "Pricing Tables", "Newsletter Signup"],
    popular: false,
  },
  {
    id: 6,
    name: "Restaurant Deluxe",
    description: "Showcase your menu and restaurant information",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    imageCredit: "Unsplash",
    price: 22000,
    category: "business",
    features: ["Menu Display", "Reservation System", "Location Map", "Photo Gallery", "Opening Hours"],
    popular: false,
  },
  {
    id: "custom",
    name: "Custom Design",
    description: "Fully customized website designed from scratch",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGN1c3RvbSUyMGRlc2lnbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    imageCredit: "Unsplash",
    price: 35000,
    category: "custom",
    features: ["Unique Design", "Custom Functionality", "Unlimited Revisions", "Premium Support", "Advanced Features"],
    popular: false,
  },
]

// Category images
const categoryImages = {
  all: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHdlYnNpdGVzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  "all-in-one":
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YWxsJTIwaW4lMjBvbmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
  business:
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVzaW5lc3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
  ecommerce:
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWNvbW1lcmNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  portfolio:
    "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9ydGZvbGlvfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  blog: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  custom:
    "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y3VzdG9tfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
}

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
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [loadedImages, setLoadedImages] = useState(0)
  const [showImageCredits, setShowImageCredits] = useState(false)

  // Simulate image loading
  useEffect(() => {
    const totalImages = templates.length
    if (loadedImages >= totalImages && !imagesLoaded) {
      setImagesLoaded(true)
    }
  }, [loadedImages, imagesLoaded])

  const handleImageLoad = () => {
    setLoadedImages((prev) => prev + 1)
  }

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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold">Choose a Website Template</h1>
        <div className="flex items-center mt-2 md:mt-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowImageCredits(!showImageCredits)}
            className="flex items-center gap-1"
          >
            <Info className="h-4 w-4" />
            {showImageCredits ? "Hide Image Credits" : "Show Image Credits"}
          </Button>
        </div>
      </div>

      {showImageCredits && (
        <div className="bg-muted p-4 rounded-lg mb-6">
          <h3 className="font-medium mb-2">Image Credits</h3>
          <p className="text-sm text-muted-foreground mb-2">
            All images used in these templates are free stock photos from Unsplash. If you use these templates, please
            ensure you follow Unsplash's license requirements.
          </p>
          <a
            href="https://unsplash.com/license"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline"
          >
            View Unsplash License
          </a>
        </div>
      )}

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
                    <div className="mt-3 space-y-3">
                      {categories.map((category) => (
                        <div
                          key={category.id}
                          className={`
                            relative rounded-lg overflow-hidden cursor-pointer transition-all
                            ${selectedCategory === category.id ? "ring-2 ring-primary" : "hover:opacity-90"}
                          `}
                          onClick={() => setSelectedCategory(category.id)}
                        >
                          <div className="relative h-16 w-full">
                            <Image
                              src={categoryImages[category.id] || "/placeholder.svg"}
                              alt={category.name}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 300px"
                            />
                            <div className="absolute inset-0 bg-black/40"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-white font-medium">{category.name}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
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
                <Card
                  key={template.id}
                  className="overflow-hidden flex flex-col h-full group hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative aspect-video">
                    {!imagesLoaded && <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse" />}
                    <Image
                      src={template.image || "/placeholder.svg"}
                      alt={template.name}
                      fill
                      className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
                        imagesLoaded ? "opacity-100" : "opacity-0"
                      }`}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      onLoad={handleImageLoad}
                    />
                    {template.popular && (
                      <Badge className="absolute top-2 right-2 bg-orange-500 hover:bg-orange-600 z-10">Popular</Badge>
                    )}
                    {template.id === "complete" && (
                      <Badge className="absolute top-2 right-2 bg-green-500 hover:bg-green-600 z-10">Best Value</Badge>
                    )}

                    {showImageCredits && (
                      <div className="absolute bottom-2 right-2 z-10">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge variant="outline" className="bg-black/60 text-white border-none">
                                <Info className="h-3 w-3 mr-1" /> {template.imageCredit}
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Image from {template.imageCredit}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
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
                        {template.features.slice(0, 3).map((feature, index) => (
                          <li key={index} className="text-sm flex items-start">
                            <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                        {template.features.length > 3 && (
                          <li className="text-sm text-muted-foreground">
                            +{template.features.length - 3} more features
                          </li>
                        )}
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
