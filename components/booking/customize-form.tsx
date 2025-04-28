"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, ArrowRight, Info, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useToast } from "@/hooks/use-toast"

// Mock template data - in a real app, this would come from an API
const templates = [
  {
    id: 1,
    name: "Business Pro",
    description: "Professional template for established businesses",
    image: "/templates/business-template.png",
    basePrice: 599,
  },
  {
    id: 2,
    name: "E-Commerce Plus",
    description: "Complete solution for online stores",
    image: "/templates/ecommerce-template.png",
    basePrice: 899,
  },
  {
    id: 3,
    name: "Portfolio Minimal",
    description: "Clean showcase for creative professionals",
    image: "/templates/portfolio-template.png",
    basePrice: 499,
  },
  {
    id: 4,
    name: "Blog Standard",
    description: "Classic blog layout with modern features",
    image: "/templates/blog-template.png",
    basePrice: 549,
  },
  {
    id: 5,
    name: "Startup Launch",
    description: "Perfect for new ventures and startups",
    image: "/templates/startup-template.png",
    basePrice: 649,
  },
  {
    id: 6,
    name: "Restaurant Deluxe",
    description: "Showcase your menu and restaurant information",
    image: "/templates/restaurant-template.png",
    basePrice: 699,
  },
]

// Available add-ons
const addOns = [
  { id: 1, name: "SEO Optimization", description: "Improve your search engine rankings", price: 199 },
  { id: 2, name: "Content Creation", description: "Professional copywriting for your pages", price: 299 },
  { id: 3, name: "Logo Design", description: "Custom logo design for your brand", price: 249 },
  { id: 4, name: "Social Media Integration", description: "Connect your website to social platforms", price: 149 },
  { id: 5, name: "Analytics Setup", description: "Track visitor behavior and conversions", price: 99 },
  {
    id: 6,
    name: "Contact Form with Email Notifications",
    description: "Receive inquiries directly to your inbox",
    price: 79,
  },
]

export default function CustomizeForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  const templateId = searchParams.get("template") ? Number.parseInt(searchParams.get("template")) : null
  const selectedTemplate = templates.find((t) => t.id === templateId) || templates[0]

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
    selectedAddOns: [],
    specialRequirements: "",
  })

  const [newPage, setNewPage] = useState("")
  const [totalPrice, setTotalPrice] = useState(selectedTemplate.basePrice)

  // Calculate total price whenever relevant form data changes
  useEffect(() => {
    let price = selectedTemplate.basePrice

    // Add price for additional pages (₹50 per page)
    price += formData.additionalPages.length * 50

    // Add price for selected add-ons
    formData.selectedAddOns.forEach((addOnId) => {
      const addOn = addOns.find((a) => a.id === addOnId)
      if (addOn) {
        price += addOn.price
      }
    })

    setTotalPrice(price)
  }, [formData.additionalPages, formData.selectedAddOns, selectedTemplate.basePrice])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
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

  const handleSubmit = (e) => {
    e.preventDefault()

    // In a real app, you would send this data to your backend
    // For now, we'll store it in localStorage to simulate persistence
    const cartItem = {
      id: Date.now(),
      template: selectedTemplate,
      customizations: formData,
      price: totalPrice,
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
                      <p className="font-medium">Base Price: ₹{selectedTemplate.basePrice}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

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
                          Your template includes standard pages. Add any additional pages you need (₹50 per page).
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
                                <Button type="button" variant="ghost" size="sm" onClick={() => handleRemovePage(index)}>
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

                <AccordionItem value="add-ons">
                  <AccordionTrigger>Add-ons & Extras</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 p-1">
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
                                {addOn.name} - ₹{addOn.price}
                              </Label>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{addOn.description}</p>
                            </div>
                          </div>
                        ))}
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
                  <div className="flex justify-between">
                    <span>Template Base Price</span>
                    <span>₹{selectedTemplate.basePrice}</span>
                  </div>

                  {formData.additionalPages.length > 0 && (
                    <div className="flex justify-between">
                      <span>Additional Pages ({formData.additionalPages.length})</span>
                      <span>₹{formData.additionalPages.length * 50}</span>
                    </div>
                  )}

                  {formData.selectedAddOns.length > 0 && (
                    <div>
                      <div className="flex justify-between font-medium">
                        <span>Add-ons</span>
                        <span>
                          ₹
                          {formData.selectedAddOns.reduce((total, addOnId) => {
                            const addOn = addOns.find((a) => a.id === addOnId)
                            return total + (addOn ? addOn.price : 0)
                          }, 0)}
                        </span>
                      </div>
                      <ul className="mt-2 space-y-1 text-sm text-gray-500 dark:text-gray-400">
                        {formData.selectedAddOns.map((addOnId) => {
                          const addOn = addOns.find((a) => a.id === addOnId)
                          return addOn ? (
                            <li key={addOn.id} className="flex justify-between">
                              <span>{addOn.name}</span>
                              <span>₹{addOn.price}</span>
                            </li>
                          ) : null
                        })}
                      </ul>
                    </div>
                  )}

                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>₹{totalPrice}</span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Taxes may apply at checkout</p>
                  </div>
                </div>

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
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
