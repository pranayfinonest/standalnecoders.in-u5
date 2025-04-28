"use client"

import { useState } from "react"
import { Info } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"

// Feature options
const features = {
  essential: [
    {
      id: "responsive",
      name: "Responsive Design",
      description: "Website adapts to all screen sizes and devices",
      price: 3000,
      popular: true,
    },
    {
      id: "seo",
      name: "SEO Optimization",
      description: "Basic search engine optimization setup",
      price: 4000,
      popular: true,
    },
    {
      id: "analytics",
      name: "Analytics Integration",
      description: "Track website traffic and user behavior",
      price: 2000,
      popular: true,
    },
    {
      id: "contact",
      name: "Contact Form",
      description: "Form with email notifications for inquiries",
      price: 1500,
      popular: true,
    },
    {
      id: "social",
      name: "Social Media Integration",
      description: "Connect your website to social platforms",
      price: 1000,
      popular: false,
    },
  ],
  content: [
    {
      id: "blog",
      name: "Blog System",
      description: "Fully functional blog with categories and tags",
      price: 5000,
      popular: true,
    },
    {
      id: "portfolio",
      name: "Portfolio Gallery",
      description: "Showcase your work with a beautiful gallery",
      price: 4000,
      popular: false,
    },
    {
      id: "testimonials",
      name: "Testimonials Section",
      description: "Display customer reviews and feedback",
      price: 2500,
      popular: true,
    },
    {
      id: "team",
      name: "Team Members Section",
      description: "Showcase your team with profiles",
      price: 3000,
      popular: false,
    },
    {
      id: "faq",
      name: "FAQ Section",
      description: "Frequently asked questions with accordion",
      price: 2000,
      popular: false,
    },
  ],
  ecommerce: [
    {
      id: "products",
      name: "Product Catalog",
      description: "Display products with details and images",
      price: 6000,
      popular: true,
    },
    {
      id: "cart",
      name: "Shopping Cart",
      description: "Add to cart functionality with checkout",
      price: 7000,
      popular: true,
    },
    {
      id: "payment",
      name: "Payment Gateway",
      description: "Accept online payments securely",
      price: 8000,
      popular: true,
    },
    {
      id: "inventory",
      name: "Inventory Management",
      description: "Track stock levels and manage products",
      price: 5000,
      popular: false,
    },
    {
      id: "wishlist",
      name: "Wishlist & Favorites",
      description: "Allow users to save products for later",
      price: 3000,
      popular: false,
    },
  ],
  advanced: [
    {
      id: "auth",
      name: "User Authentication",
      description: "Secure login and registration system",
      price: 7000,
      popular: true,
    },
    {
      id: "multilingual",
      name: "Multilingual Support",
      description: "Website available in multiple languages",
      price: 6000,
      popular: false,
    },
    {
      id: "chat",
      name: "Live Chat Support",
      description: "Real-time chat with customers",
      price: 5000,
      popular: true,
    },
    {
      id: "booking",
      name: "Appointment Booking",
      description: "Calendar-based booking system",
      price: 6500,
      popular: false,
    },
    {
      id: "membership",
      name: "Membership System",
      description: "Paid or free membership with restricted content",
      price: 8000,
      popular: false,
    },
  ],
}

export default function FeatureSelection({ formData, updateFormData }) {
  const [activeTab, setActiveTab] = useState("essential")

  const handleFeatureToggle = (featureId, featureCategory) => {
    const feature = features[featureCategory].find((f) => f.id === featureId)
    if (!feature) return

    const isSelected = formData.selectedFeatures.some((f) => f.id === featureId)

    let updatedFeatures
    let updatedPrice = formData.featuresPrice

    if (isSelected) {
      updatedFeatures = formData.selectedFeatures.filter((f) => f.id !== featureId)
      updatedPrice -= feature.price
    } else {
      updatedFeatures = [
        ...formData.selectedFeatures,
        {
          id: feature.id,
          name: feature.name,
          category: featureCategory,
          price: feature.price,
        },
      ]
      updatedPrice += feature.price
    }

    updateFormData({
      selectedFeatures: updatedFeatures,
      featuresPrice: updatedPrice,
    })
  }

  const isFeatureSelected = (featureId) => {
    return formData.selectedFeatures.some((f) => f.id === featureId)
  }

  const handleCustomFeaturesChange = (e) => {
    updateFormData({
      customFeatures: e.target.value,
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium mb-2">Select Features</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Choose the features you want to include in your website. Your selections will affect the final price.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="essential">Essential</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="ecommerce">E-commerce</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        {Object.keys(features).map((category) => (
          <TabsContent key={category} value={category} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features[category].map((feature) => (
                <div
                  key={feature.id}
                  className={`flex items-start space-x-4 p-4 border rounded-lg transition-colors relative
                    ${
                      isFeatureSelected(feature.id)
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "border-gray-200 dark:border-gray-700"
                    }`}
                >
                  {feature.popular && (
                    <Badge className="absolute top-2 right-2 bg-orange-500 hover:bg-orange-600">Popular</Badge>
                  )}
                  <Checkbox
                    id={`feature-${feature.id}`}
                    checked={isFeatureSelected(feature.id)}
                    onCheckedChange={() => handleFeatureToggle(feature.id, category)}
                    className="mt-1"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center">
                      <Label htmlFor={`feature-${feature.id}`} className="font-medium cursor-pointer">
                        {feature.name}
                      </Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 ml-2 text-gray-400 cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">{feature.description}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{feature.description}</p>
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mt-1">
                      ₹{feature.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="mt-8 space-y-4">
        <Label htmlFor="customFeatures" className="text-base font-medium">
          Custom Features (Optional)
        </Label>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Describe any custom features you need that aren't listed above. We'll provide a quote for these separately.
        </p>
        <Textarea
          id="customFeatures"
          placeholder="Describe your custom feature requirements..."
          rows={4}
          value={formData.customFeatures}
          onChange={handleCustomFeaturesChange}
        />
      </div>

      {formData.selectedFeatures.length > 0 && (
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <h3 className="font-medium mb-2">Selected Features:</h3>
          <div className="flex flex-wrap gap-2">
            {formData.selectedFeatures.map((feature) => (
              <div
                key={feature.id}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200"
              >
                {feature.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
