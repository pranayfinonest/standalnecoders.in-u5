"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, ArrowRight, Info, Plus, Trash2, CheckCircle2, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"

// Mock template data - in a real app, this would come from an API
const templates = [
  {
    id: 1,
    name: "Business Pro",
    description: "Professional template for established businesses",
    image: "/templates/business-template.png",
    basePrice: 15000,
  },
  {
    id: 2,
    name: "E-Commerce Plus",
    description: "Complete solution for online stores",
    image: "/templates/ecommerce-template.png",
    basePrice: 25000,
  },
  {
    id: 3,
    name: "Portfolio Minimal",
    description: "Clean showcase for creative professionals",
    image: "/templates/portfolio-template.png",
    basePrice: 18000,
  },
  {
    id: 4,
    name: "Blog Standard",
    description: "Classic blog layout with modern features",
    image: "/templates/blog-template.png",
    basePrice: 16000,
  },
  {
    id: 5,
    name: "Startup Launch",
    description: "Perfect for new ventures and startups",
    image: "/templates/startup-template.png",
    basePrice: 20000,
  },
  {
    id: 6,
    name: "Restaurant Deluxe",
    description: "Showcase your menu and restaurant information",
    image: "/templates/restaurant-template.png",
    basePrice: 22000,
  },
  {
    id: "custom",
    name: "Custom Design",
    description: "Fully customized website designed from scratch",
    image: "/modern-portfolio-design.png",
    basePrice: 35000,
  },
  {
    id: "complete",
    name: "Complete Website Package",
    description: "All-inclusive website with essential features at a fixed price",
    image: "/templates/complete-package.png",
    basePrice: 19999,
  },
]

// Technology options
const technologies = [
  { id: "react", name: "React", description: "Modern UI library for interactive interfaces", price: 5000 },
  { id: "nextjs", name: "Next.js", description: "React framework with server-side rendering", price: 8000 },
  { id: "wordpress", name: "WordPress", description: "Content management system with easy updates", price: 3000 },
  { id: "shopify", name: "Shopify", description: "E-commerce platform with built-in payment processing", price: 10000 },
  { id: "node", name: "Node.js", description: "Backend JavaScript runtime environment", price: 7000 },
  { id: "php", name: "PHP", description: "Server-side scripting language for web development", price: 4000 },
  { id: "laravel", name: "Laravel", description: "PHP framework with elegant syntax", price: 6000 },
  { id: "python", name: "Python/Django", description: "Versatile language with powerful web framework", price: 9000 },
]

// Available add-ons
const addOns = [
  { id: 1, name: "SEO Optimization", description: "Improve your search engine rankings", price: 5000 },
  { id: 2, name: "Content Creation", description: "Professional copywriting for your pages", price: 8000 },
  { id: 3, name: "Logo Design", description: "Custom logo design for your brand", price: 7000 },
  { id: 4, name: "Social Media Integration", description: "Connect your website to social platforms", price: 3000 },
  { id: 5, name: "Analytics Setup", description: "Track visitor behavior and conversions", price: 2500 },
  {
    id: 6,
    name: "Contact Form with Email Notifications",
    description: "Receive inquiries directly to your inbox",
    price: 2000,
  },
  {
    id: 7,
    name: "Blog Setup",
    description: "Fully configured blog section with categories and tags",
    price: 4500,
  },
  {
    id: 8,
    name: "Multilingual Support",
    description: "Make your website available in multiple languages",
    price: 7500,
  },
  {
    id: 9,
    name: "Membership System",
    description: "User registration and member-only content",
    price: 12000,
  },
  {
    id: 10,
    name: "Payment Gateway Integration",
    description: "Accept payments online through multiple gateways",
    price: 9000,
  },
]

// Features options
const featureOptions = {
  business: [
    { id: "portfolio", name: "Portfolio Gallery", price: 5000 },
    { id: "testimonials", name: "Testimonials Section", price: 3000 },
    { id: "team", name: "Team Members Section", price: 4000 },
    { id: "services", name: "Detailed Services Pages", price: 6000 },
    { id: "booking", name: "Appointment Booking System", price: 8000 },
  ],
  ecommerce: [
    { id: "products", name: "Advanced Product Filtering", price: 6000 },
    { id: "wishlist", name: "Customer Wishlist", price: 3000 },
    { id: "reviews", name: "Product Reviews System", price: 4000 },
    { id: "inventory", name: "Inventory Management", price: 7000 },
    { id: "discounts", name: "Discount & Coupon System", price: 5000 },
  ],
  general: [
    { id: "chat", name: "Live Chat Support", price: 4500 },
    { id: "newsletter", name: "Newsletter Subscription", price: 2500 },
    { id: "maps", name: "Google Maps Integration", price: 2000 },
    { id: "social", name: "Social Media Feed", price: 3500 },
    { id: "analytics", name: "Advanced Analytics Dashboard", price: 6000 },
  ],
}

// Complete package features (included in the ₹19,999 package)
const completePackageFeatures = [
  "Responsive Design for All Devices",
  "5 Custom Pages",
  "Contact Form with Email Notifications",
  "Basic SEO Setup",
  "Social Media Integration",
  "Google Analytics Integration",
  "Content Management System",
  "1 Year Free Hosting",
  "Free Domain for 1 Year",
  "SSL Certificate",
  "24/7 Customer Support",
  "Mobile-Friendly Design",
]

export default function CustomizeForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  const templateId = searchParams.get("template") || "1"
  const selectedTemplate = templates.find((t) => t.id.toString() === templateId) || templates[0]

  const [formData, setFormData] = useState({
    templateId: selectedTemplate.id,
    businessName: "",
    businessType: "",
    contactEmail: "",
    contactPhone: "",
    websiteGoals: "",
    colorPreferences: "",
    existingBranding: false,
    brandingFiles: [],
    additionalPages: [],
    selectedTechnology: [],
    selectedFeatures: [],
    selectedAddOns: [],
    specialRequirements: "",
    pricingOption: selectedTemplate.id === "complete" ? "fixed" : "custom",
    customBudget: 20000,
    customRequirements: "",
  })

  const [newPage, setNewPage] = useState("")
  const [totalPrice, setTotalPrice] = useState(selectedTemplate.basePrice)
  const [activeTab, setActiveTab] = useState("tech")

  // Calculate total price whenever relevant form data changes
  useEffect(() => {
    if (formData.pricingOption === "fixed" && selectedTemplate.id === "complete") {
      setTotalPrice(19999)
      return
    }

    if (formData.pricingOption === "quotation") {
      setTotalPrice(formData.customBudget)
      return
    }

    let price = selectedTemplate.basePrice

    // Add price for additional pages (₹3000 per page)
    price += formData.additionalPages.length * 3000

    // Add price for selected technologies
    formData.selectedTechnology.forEach((techId) => {
      const tech = technologies.find((t) => t.id === techId)
      if (tech) {
        price += tech.price
      }
    })

    // Add price for selected features
    formData.selectedFeatures.forEach((featureId) => {
      const allFeatures = [...featureOptions.business, ...featureOptions.ecommerce, ...featureOptions.general]
      const feature = allFeatures.find((f) => f.id === featureId)
      if (feature) {
        price += feature.price
      }
    })

    // Add price for selected add-ons
    formData.selectedAddOns.forEach((addOnId) => {
      const addOn = addOns.find((a) => a.id === addOnId)
      if (addOn) {
        price += addOn.price
      }
    })

    setTotalPrice(price)
  }, [
    formData.additionalPages,
    formData.selectedTechnology,
    formData.selectedAddOns,
    formData.selectedFeatures,
    formData.pricingOption,
    formData.customBudget,
    selectedTemplate.basePrice,
    selectedTemplate.id,
  ])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleTechnologyToggle = (techId) => {
    setFormData((prev) => {
      const isSelected = prev.selectedTechnology.includes(techId)
      return {
        ...prev,
        selectedTechnology: isSelected
          ? prev.selectedTechnology.filter((id) => id !== techId)
          : [...prev.selectedTechnology, techId],
      }
    })
  }

  const handleFeatureToggle = (featureId) => {
    setFormData((prev) => {
      const isSelected = prev.selectedFeatures.includes(featureId)
      return {
        ...prev,
        selectedFeatures: isSelected
          ? prev.selectedFeatures.filter((id) => id !== featureId)
          : [...prev.selectedFeatures, featureId],
      }
    })
  }

  const handleAddOnToggle = (addOnId) => {
    setFormData((prev) => {
      const isSelected = prev.selectedAddOns.includes(addOnId)
      return {
        ...prev,
        selectedAddOns: isSelected
          ? prev.selectedAddOns.filter((id) => id !== addOnId)
          : [...prev.selectedAddOns, addOnId],
      }
    })
  }

  const handleAddPage = () => {
    if (!newPage.trim()) return

    setFormData((prev) => ({
      ...prev,
      additionalPages: [...prev.additionalPages, newPage.trim()],
    }))
    setNewPage("")
  }

  const handleRemovePage = (index) => {
    setFormData((prev) => ({
      ...prev,
      additionalPages: prev.additionalPages.filter((_, i) => i !== index),
    }))
  }

  const handleBudgetChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      customBudget: value[0],
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // In a real app, you would send this data to your backend
    // For now, we'll store it in localStorage to simulate persistence
    const cartItem = {
      id: Date.now(),
      template: selectedTemplate,
      customizations: formData,
      price: totalPrice,
      pricingOption: formData.pricingOption,
    }

    // Get existing cart or initialize empty array
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]")
    localStorage.setItem("cart", JSON.stringify([...existingCart, cartItem]))

    toast({
      title: "Added to cart!",
      description: `${selectedTemplate.name} has been added to your cart.`,
    })

    router.push("/booking/cart")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Templates
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-2xl font-bold mb-6">Customize Your Website</h1>

          <form onSubmit={handleSubmit}>
            <div className="space-y-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="relative w-full md:w-1/3 aspect-video rounded-md overflow-hidden">
                      <Image
                        src={selectedTemplate.image || "/placeholder.svg"}
                        alt={selectedTemplate.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-bold">{selectedTemplate.name}</h2>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">{selectedTemplate.description}</p>

                      {selectedTemplate.id === "complete" ? (
                        <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-md border border-green-200 dark:border-green-800 mt-2">
                          <p className="font-medium text-green-700 dark:text-green-400 flex items-center">
                            <CheckCircle2 className="h-4 w-4 mr-2" /> Fixed Price: ₹19,999
                          </p>
                          <p className="text-sm text-green-600 dark:text-green-500 mt-1">
                            All-inclusive package with essential features
                          </p>
                        </div>
                      ) : (
                        <p className="font-medium">Base Price: ₹{selectedTemplate.basePrice.toLocaleString()}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pricing Options */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Pricing Options</h2>

                  <RadioGroup
                    value={formData.pricingOption}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, pricingOption: value }))}
                    className="space-y-4"
                  >
                    {selectedTemplate.id === "complete" && (
                      <div className="flex items-start space-x-2 p-4 border rounded-md bg-green-50 dark:bg-green-900/10">
                        <RadioGroupItem value="fixed" id="pricing-fixed" />
                        <div className="grid gap-1.5 leading-none">
                          <Label htmlFor="pricing-fixed" className="text-base font-medium">
                            Complete Website Package - ₹19,999
                          </Label>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            All-inclusive website with essential features at a fixed price
                          </p>
                          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                            {completePackageFeatures.map((feature, index) => (
                              <div key={index} className="flex items-center text-sm">
                                <CheckCircle2 className="h-3.5 w-3.5 text-green-600 dark:text-green-400 mr-2" />
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start space-x-2 p-4 border rounded-md">
                      <RadioGroupItem
                        value="custom"
                        id="pricing-custom"
                        disabled={selectedTemplate.id === "complete" && formData.pricingOption === "fixed"}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <Label htmlFor="pricing-custom" className="text-base font-medium">
                          Custom Build - ₹{selectedTemplate.basePrice.toLocaleString()} base price
                        </Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          Customize your website with specific features and add-ons
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2 p-4 border rounded-md">
                      <RadioGroupItem value="quotation" id="pricing-quotation" />
                      <div className="grid gap-1.5 leading-none w-full">
                        <Label htmlFor="pricing-quotation" className="text-base font-medium">
                          Custom Quotation - Set your budget
                        </Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          Tell us your budget and requirements, and we'll create a custom solution
                        </p>

                        {formData.pricingOption === "quotation" && (
                          <div className="mt-4 space-y-4">
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <Label>Your Budget: ₹{formData.customBudget.toLocaleString()}</Label>
                              </div>
                              <Slider
                                defaultValue={[20000]}
                                min={10000}
                                max={100000}
                                step={1000}
                                value={[formData.customBudget]}
                                onValueChange={handleBudgetChange}
                              />
                              <div className="flex justify-between text-xs text-gray-500">
                                <span>₹10,000</span>
                                <span>₹100,000</span>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="customRequirements">Your Requirements</Label>
                              <Textarea
                                id="customRequirements"
                                name="customRequirements"
                                placeholder="Describe what you need in your website, including any specific features or functionality"
                                value={formData.customRequirements}
                                onChange={handleChange}
                                rows={4}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {formData.pricingOption !== "quotation" && formData.pricingOption !== "fixed" && (
                <Accordion type="single" collapsible defaultValue="business-info">
                  <AccordionItem value="business-info">
                    <AccordionTrigger>Business Information</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 p-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="businessName">Business Name *</Label>
                            <Input
                              id="businessName"
                              name="businessName"
                              value={formData.businessName}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="businessType">Business Type/Industry *</Label>
                            <Input
                              id="businessType"
                              name="businessType"
                              value={formData.businessType}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="contactEmail">Contact Email *</Label>
                            <Input
                              id="contactEmail"
                              name="contactEmail"
                              type="email"
                              value={formData.contactEmail}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="contactPhone">Contact Phone</Label>
                            <Input
                              id="contactPhone"
                              name="contactPhone"
                              value={formData.contactPhone}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="websiteGoals">Website Goals *</Label>
                          <Textarea
                            id="websiteGoals"
                            name="websiteGoals"
                            placeholder="What are the main goals for your website? (e.g., generate leads, sell products, showcase portfolio)"
                            value={formData.websiteGoals}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="technology">
                    <AccordionTrigger>Technology & Features</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-6 p-1">
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                          <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="tech">Technologies</TabsTrigger>
                            <TabsTrigger value="features">Features</TabsTrigger>
                            <TabsTrigger value="add-ons">Add-ons</TabsTrigger>
                          </TabsList>

                          <TabsContent value="tech" className="mt-4">
                            <div className="space-y-4">
                              <h3 className="font-medium">Select Technologies</h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                Choose the technologies you want for your website development.
                              </p>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {technologies.map((tech) => (
                                  <div key={tech.id} className="flex items-start space-x-3 p-3 border rounded-md">
                                    <Checkbox
                                      id={`tech-${tech.id}`}
                                      checked={formData.selectedTechnology.includes(tech.id)}
                                      onCheckedChange={() => handleTechnologyToggle(tech.id)}
                                    />
                                    <div className="flex-1">
                                      <Label htmlFor={`tech-${tech.id}`} className="font-medium">
                                        {tech.name} - ₹{tech.price.toLocaleString()}
                                      </Label>
                                      <p className="text-sm text-gray-500 dark:text-gray-400">{tech.description}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </TabsContent>

                          <TabsContent value="features" className="mt-4">
                            <div className="space-y-4">
                              <h3 className="font-medium">Select Website Features</h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                Choose the features you want to include in your website.
                              </p>

                              <h4 className="text-sm font-medium mt-4 mb-2">Business Features</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {featureOptions.business.map((feature) => (
                                  <div key={feature.id} className="flex items-start space-x-3 p-3 border rounded-md">
                                    <Checkbox
                                      id={`feature-${feature.id}`}
                                      checked={formData.selectedFeatures.includes(feature.id)}
                                      onCheckedChange={() => handleFeatureToggle(feature.id)}
                                    />
                                    <div className="flex-1">
                                      <Label htmlFor={`feature-${feature.id}`} className="font-medium">
                                        {feature.name} - ₹{feature.price.toLocaleString()}
                                      </Label>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              <h4 className="text-sm font-medium mt-4 mb-2">E-Commerce Features</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {featureOptions.ecommerce.map((feature) => (
                                  <div key={feature.id} className="flex items-start space-x-3 p-3 border rounded-md">
                                    <Checkbox
                                      id={`feature-${feature.id}`}
                                      checked={formData.selectedFeatures.includes(feature.id)}
                                      onCheckedChange={() => handleFeatureToggle(feature.id)}
                                    />
                                    <div className="flex-1">
                                      <Label htmlFor={`feature-${feature.id}`} className="font-medium">
                                        {feature.name} - ₹{feature.price.toLocaleString()}
                                      </Label>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              <h4 className="text-sm font-medium mt-4 mb-2">General Features</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {featureOptions.general.map((feature) => (
                                  <div key={feature.id} className="flex items-start space-x-3 p-3 border rounded-md">
                                    <Checkbox
                                      id={`feature-${feature.id}`}
                                      checked={formData.selectedFeatures.includes(feature.id)}
                                      onCheckedChange={() => handleFeatureToggle(feature.id)}
                                    />
                                    <div className="flex-1">
                                      <Label htmlFor={`feature-${feature.id}`} className="font-medium">
                                        {feature.name} - ₹{feature.price.toLocaleString()}
                                      </Label>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </TabsContent>

                          <TabsContent value="add-ons" className="mt-4">
                            <div className="space-y-4">
                              <h3 className="font-medium">Select Add-ons</h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                Enhance your website with these additional services and features.
                              </p>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {addOns.map((addOn) => (
                                  <div key={addOn.id} className="flex items-start space-x-3 p-3 border rounded-md">
                                    <Checkbox
                                      id={`addon-${addOn.id}`}
                                      checked={formData.selectedAddOns.includes(addOn.id)}
                                      onCheckedChange={() => handleAddOnToggle(addOn.id)}
                                    />
                                    <div className="flex-1">
                                      <Label htmlFor={`addon-${addOn.id}`} className="font-medium">
                                        {addOn.name} - ₹{addOn.price.toLocaleString()}
                                      </Label>
                                      <p className="text-sm text-gray-500 dark:text-gray-400">{addOn.description}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="design-preferences">
                    <AccordionTrigger>Design Preferences</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 p-1">
                        <div className="space-y-2">
                          <Label htmlFor="colorPreferences">Color Preferences</Label>
                          <Textarea
                            id="colorPreferences"
                            name="colorPreferences"
                            placeholder="Describe your preferred color scheme or specific colors to use"
                            value={formData.colorPreferences}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id="existingBranding"
                            name="existingBranding"
                            checked={formData.existingBranding}
                            onCheckedChange={(checked) =>
                              setFormData((prev) => ({ ...prev, existingBranding: checked === true }))
                            }
                          />
                          <div className="grid gap-1.5 leading-none">
                            <Label
                              htmlFor="existingBranding"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              I have existing branding materials (logo, style guide, etc.)
                            </Label>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              You'll be able to upload these during the checkout process
                            </p>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="pages-content">
                    <AccordionTrigger>Pages & Content</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 p-1">
                        <div>
                          <Label className="mb-2 block">Additional Pages</Label>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                            Your template includes standard pages. Add any additional pages you need (₹3,000 per page).
                          </p>

                          <div className="flex gap-2 mb-4">
                            <Input
                              placeholder="Page name (e.g., FAQ, Team, Gallery)"
                              value={newPage}
                              onChange={(e) => setNewPage(e.target.value)}
                              className="flex-1"
                            />
                            <Button type="button" onClick={handleAddPage} size="sm">
                              <Plus className="h-4 w-4 mr-1" /> Add
                            </Button>
                          </div>

                          {formData.additionalPages.length > 0 ? (
                            <ul className="space-y-2">
                              {formData.additionalPages.map((page, index) => (
                                <li
                                  key={index}
                                  className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-2 rounded-md"
                                >
                                  <span>{page}</span>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleRemovePage(index)}
                                  >
                                    <Trash2 className="h-4 w-4 text-red-500" />
                                  </Button>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                              No additional pages added yet
                            </p>
                          )}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="special-requirements">
                    <AccordionTrigger>Special Requirements</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 p-1">
                        <div className="space-y-2">
                          <Label htmlFor="specialRequirements">Additional Requirements or Notes</Label>
                          <Textarea
                            id="specialRequirements"
                            name="specialRequirements"
                            placeholder="Any special features, functionality, or other requirements not covered above"
                            value={formData.specialRequirements}
                            onChange={handleChange}
                            rows={5}
                          />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )}

              {formData.pricingOption === "fixed" && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4">Business Information</h2>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="businessName">Business Name *</Label>
                          <Input
                            id="businessName"
                            name="businessName"
                            value={formData.businessName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="businessType">Business Type/Industry *</Label>
                          <Input
                            id="businessType"
                            name="businessType"
                            value={formData.businessType}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="contactEmail">Contact Email *</Label>
                          <Input
                            id="contactEmail"
                            name="contactEmail"
                            type="email"
                            value={formData.contactEmail}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="contactPhone">Contact Phone</Label>
                          <Input
                            id="contactPhone"
                            name="contactPhone"
                            value={formData.contactPhone}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="websiteGoals">Website Goals *</Label>
                        <Textarea
                          id="websiteGoals"
                          name="websiteGoals"
                          placeholder="What are the main goals for your website? (e.g., generate leads, sell products, showcase portfolio)"
                          value={formData.websiteGoals}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {formData.pricingOption === "quotation" && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4">Business Information</h2>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="businessName">Business Name *</Label>
                          <Input
                            id="businessName"
                            name="businessName"
                            value={formData.businessName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="businessType">Business Type/Industry *</Label>
                          <Input
                            id="businessType"
                            name="businessType"
                            value={formData.businessType}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="contactEmail">Contact Email *</Label>
                          <Input
                            id="contactEmail"
                            name="contactEmail"
                            type="email"
                            value={formData.contactEmail}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="contactPhone">Contact Phone</Label>
                          <Input
                            id="contactPhone"
                            name="contactPhone"
                            value={formData.contactPhone}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex justify-end">
                <Button type="submit" size="lg">
                  Add to Cart <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </form>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                <div className="space-y-4">
                  {formData.pricingOption === "fixed" ? (
                    <div className="flex justify-between font-medium">
                      <span>Complete Website Package</span>
                      <span>₹19,999</span>
                    </div>
                  ) : formData.pricingOption === "quotation" ? (
                    <div className="flex justify-between font-medium">
                      <span>Custom Quotation</span>
                      <span>₹{formData.customBudget.toLocaleString()}</span>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between">
                        <span>Template Base Price</span>
                        <span>₹{selectedTemplate.basePrice.toLocaleString()}</span>
                      </div>

                      {formData.selectedTechnology.length > 0 && (
                        <div>
                          <div className="flex justify-between font-medium">
                            <span>Technologies</span>
                            <span>
                              ₹
                              {formData.selectedTechnology
                                .reduce((total, techId) => {
                                  const tech = technologies.find((t) => t.id === techId)
                                  return total + (tech ? tech.price : 0)
                                }, 0)
                                .toLocaleString()}
                            </span>
                          </div>
                          <ul className="mt-2 space-y-1 text-sm text-gray-500 dark:text-gray-400">
                            {formData.selectedTechnology.map((techId) => {
                              const tech = technologies.find((t) => t.id === techId)
                              return tech ? (
                                <li key={tech.id} className="flex justify-between">
                                  <span>{tech.name}</span>
                                  <span>₹{tech.price.toLocaleString()}</span>
                                </li>
                              ) : null
                            })}
                          </ul>
                        </div>
                      )}

                      {formData.selectedFeatures.length > 0 && (
                        <div>
                          <div className="flex justify-between font-medium">
                            <span>Features</span>
                            <span>
                              ₹
                              {formData.selectedFeatures
                                .reduce((total, featureId) => {
                                  const allFeatures = [
                                    ...featureOptions.business,
                                    ...featureOptions.ecommerce,
                                    ...featureOptions.general,
                                  ]
                                  const feature = allFeatures.find((f) => f.id === featureId)
                                  return total + (feature ? feature.price : 0)
                                }, 0)
                                .toLocaleString()}
                            </span>
                          </div>
                          <ul className="mt-2 space-y-1 text-sm text-gray-500 dark:text-gray-400">
                            {formData.selectedFeatures.map((featureId) => {
                              const allFeatures = [
                                ...featureOptions.business,
                                ...featureOptions.ecommerce,
                                ...featureOptions.general,
                              ]
                              const feature = allFeatures.find((f) => f.id === featureId)
                              return feature ? (
                                <li key={feature.id} className="flex justify-between">
                                  <span>{feature.name}</span>
                                  <span>₹{feature.price.toLocaleString()}</span>
                                </li>
                              ) : null
                            })}
                          </ul>
                        </div>
                      )}

                      {formData.additionalPages.length > 0 && (
                        <div className="flex justify-between">
                          <span>Additional Pages ({formData.additionalPages.length})</span>
                          <span>₹{(formData.additionalPages.length * 3000).toLocaleString()}</span>
                        </div>
                      )}

                      {formData.selectedAddOns.length > 0 && (
                        <div>
                          <div className="flex justify-between font-medium">
                            <span>Add-ons</span>
                            <span>
                              ₹
                              {formData.selectedAddOns
                                .reduce((total, addOnId) => {
                                  const addOn = addOns.find((a) => a.id === addOnId)
                                  return total + (addOn ? addOn.price : 0)
                                }, 0)
                                .toLocaleString()}
                            </span>
                          </div>
                          <ul className="mt-2 space-y-1 text-sm text-gray-500 dark:text-gray-400">
                            {formData.selectedAddOns.map((addOnId) => {
                              const addOn = addOns.find((a) => a.id === addOnId)
                              return addOn ? (
                                <li key={addOn.id} className="flex justify-between">
                                  <span>{addOn.name}</span>
                                  <span>₹{addOn.price.toLocaleString()}</span>
                                </li>
                              ) : null
                            })}
                          </ul>
                        </div>
                      )}
                    </>
                  )}

                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>₹{totalPrice.toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Taxes may apply at checkout</p>
                  </div>
                </div>

                {formData.pricingOption === "quotation" && (
                  <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
                    <div className="flex items-start">
                      <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-blue-600 dark:text-blue-400">Custom Quotation</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          Our team will review your requirements and budget, and provide a detailed quotation within 24
                          hours.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {formData.pricingOption === "fixed" && (
                  <div className="mt-6 bg-green-50 dark:bg-green-900/20 p-4 rounded-md">
                    <div className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-green-600 dark:text-green-400">All-Inclusive Package</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          Get a complete website with all essential features at a fixed price of ₹19,999.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {formData.pricingOption === "custom" && (
                  <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
                    <div className="flex items-start">
                      <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-blue-600 dark:text-blue-400">Need Help?</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          Our team is available to assist with your website customization. Contact us for any questions.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
