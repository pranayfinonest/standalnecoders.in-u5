"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function CustomizeForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const template = searchParams.get("template") || ""

  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "",
    primaryColor: "#0070f3",
    secondaryColor: "#00a8ff",
    logo: null,
    description: "",
    features: {
      blog: false,
      ecommerce: false,
      booking: false,
      gallery: false,
      contactForm: true,
      socialMedia: true,
      newsletter: false,
      testimonials: true,
    },
    pages: {
      home: true,
      about: true,
      services: true,
      portfolio: true,
      contact: true,
      blog: false,
      shop: false,
    },
    additionalNotes: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewImage, setPreviewImage] = useState("")

  useEffect(() => {
    // Set default values based on template
    if (template === "business") {
      setFormData((prev) => ({
        ...prev,
        businessType: "Corporate",
        features: {
          ...prev.features,
          blog: true,
          contactForm: true,
          socialMedia: true,
          testimonials: true,
        },
      }))
      setPreviewImage("/templates/business-template.png")
    } else if (template === "ecommerce") {
      setFormData((prev) => ({
        ...prev,
        businessType: "E-commerce",
        features: {
          ...prev.features,
          ecommerce: true,
          gallery: true,
          contactForm: true,
          socialMedia: true,
        },
        pages: {
          ...prev.pages,
          shop: true,
        },
      }))
      setPreviewImage("/templates/ecommerce-template.png")
    } else if (template === "portfolio") {
      setFormData((prev) => ({
        ...prev,
        businessType: "Creative",
        features: {
          ...prev.features,
          gallery: true,
          contactForm: true,
          socialMedia: true,
        },
      }))
      setPreviewImage("/templates/portfolio-template.png")
    } else if (template === "blog") {
      setFormData((prev) => ({
        ...prev,
        businessType: "Blog",
        features: {
          ...prev.features,
          blog: true,
          newsletter: true,
          socialMedia: true,
        },
        pages: {
          ...prev.pages,
          blog: true,
        },
      }))
      setPreviewImage("/templates/blog-template.png")
    } else if (template === "startup") {
      setFormData((prev) => ({
        ...prev,
        businessType: "Startup",
        features: {
          ...prev.features,
          contactForm: true,
          socialMedia: true,
          newsletter: true,
        },
      }))
      setPreviewImage("/templates/startup-template.png")
    } else if (template === "restaurant") {
      setFormData((prev) => ({
        ...prev,
        businessType: "Restaurant",
        features: {
          ...prev.features,
          gallery: true,
          booking: true,
          contactForm: true,
        },
      }))
      setPreviewImage("/templates/restaurant-template.png")
    } else if (template === "complete") {
      setFormData((prev) => ({
        ...prev,
        businessType: "Complete Package",
        features: {
          ...prev.features,
          blog: true,
          ecommerce: true,
          booking: true,
          gallery: true,
          contactForm: true,
          socialMedia: true,
          newsletter: true,
          testimonials: true,
        },
        pages: {
          ...prev.pages,
          blog: true,
          shop: true,
        },
      }))
      setPreviewImage("/templates/complete-package.png")
    }
  }, [template])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFeatureChange = (feature, checked) => {
    setFormData((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        [feature]: checked,
      },
    }))
  }

  const handlePageChange = (page, checked) => {
    setFormData((prev) => ({
      ...prev,
      pages: {
        ...prev.pages,
        [page]: checked,
      },
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Store in localStorage for demo purposes
      localStorage.setItem("websiteCustomization", JSON.stringify(formData))

      // Redirect to checkout
      router.push("/booking/checkout")
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-2">Customize Your Website</h1>
      <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
        Tailor your website to match your brand and business needs
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="design">Design</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="pages">Pages</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Business Information</CardTitle>
                    <CardDescription>Enter the basic details about your business</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="businessName" className="text-base">
                        Business Name
                      </Label>
                      <Input
                        id="businessName"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        placeholder="e.g., Acme Corporation"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="businessType" className="text-base">
                        Business Type
                      </Label>
                      <Select
                        value={formData.businessType}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, businessType: value }))}
                      >
                        <SelectTrigger id="businessType" className="mt-1">
                          <SelectValue placeholder="Select business type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Corporate">Corporate</SelectItem>
                          <SelectItem value="E-commerce">E-commerce</SelectItem>
                          <SelectItem value="Creative">Creative/Portfolio</SelectItem>
                          <SelectItem value="Blog">Blog/Magazine</SelectItem>
                          <SelectItem value="Startup">Startup</SelectItem>
                          <SelectItem value="Restaurant">Restaurant</SelectItem>
                          <SelectItem value="Complete Package">Complete Package</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="description" className="text-base">
                        Business Description
                      </Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Briefly describe your business and what you do..."
                        className="mt-1"
                        rows={4}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="design" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Design Preferences</CardTitle>
                    <CardDescription>Choose colors and upload your logo</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="primaryColor" className="text-base">
                        Primary Color
                      </Label>
                      <div className="flex items-center mt-1 gap-3">
                        <Input
                          type="color"
                          id="primaryColor"
                          name="primaryColor"
                          value={formData.primaryColor}
                          onChange={handleChange}
                          className="w-16 h-10 p-1"
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{formData.primaryColor}</span>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="secondaryColor" className="text-base">
                        Secondary Color
                      </Label>
                      <div className="flex items-center mt-1 gap-3">
                        <Input
                          type="color"
                          id="secondaryColor"
                          name="secondaryColor"
                          value={formData.secondaryColor}
                          onChange={handleChange}
                          className="w-16 h-10 p-1"
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{formData.secondaryColor}</span>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="logo" className="text-base">
                        Logo (Optional)
                      </Label>
                      <Input
                        type="file"
                        id="logo"
                        accept="image/*"
                        className="mt-1"
                        onChange={(e) => {
                          const file = e.target.files[0]
                          if (file) {
                            setFormData((prev) => ({ ...prev, logo: file }))
                          }
                        }}
                      />
                      <p className="text-sm text-gray-500 mt-1">Recommended size: 200x200px, Max size: 2MB</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="features" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Website Features</CardTitle>
                    <CardDescription>Select the features you want to include in your website</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="blog"
                          checked={formData.features.blog}
                          onCheckedChange={(checked) => handleFeatureChange("blog", checked)}
                        />
                        <div>
                          <Label htmlFor="blog" className="text-base font-medium">
                            Blog
                          </Label>
                          <p className="text-sm text-gray-500">Share articles and updates with your audience</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="ecommerce"
                          checked={formData.features.ecommerce}
                          onCheckedChange={(checked) => handleFeatureChange("ecommerce", checked)}
                        />
                        <div>
                          <Label htmlFor="ecommerce" className="text-base font-medium">
                            E-commerce
                          </Label>
                          <p className="text-sm text-gray-500">Sell products or services online</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="booking"
                          checked={formData.features.booking}
                          onCheckedChange={(checked) => handleFeatureChange("booking", checked)}
                        />
                        <div>
                          <Label htmlFor="booking" className="text-base font-medium">
                            Booking System
                          </Label>
                          <p className="text-sm text-gray-500">Allow customers to book appointments or services</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="gallery"
                          checked={formData.features.gallery}
                          onCheckedChange={(checked) => handleFeatureChange("gallery", checked)}
                        />
                        <div>
                          <Label htmlFor="gallery" className="text-base font-medium">
                            Image Gallery
                          </Label>
                          <p className="text-sm text-gray-500">Showcase your work with a beautiful gallery</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="contactForm"
                          checked={formData.features.contactForm}
                          onCheckedChange={(checked) => handleFeatureChange("contactForm", checked)}
                        />
                        <div>
                          <Label htmlFor="contactForm" className="text-base font-medium">
                            Contact Form
                          </Label>
                          <p className="text-sm text-gray-500">Let visitors get in touch with you easily</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="socialMedia"
                          checked={formData.features.socialMedia}
                          onCheckedChange={(checked) => handleFeatureChange("socialMedia", checked)}
                        />
                        <div>
                          <Label htmlFor="socialMedia" className="text-base font-medium">
                            Social Media Integration
                          </Label>
                          <p className="text-sm text-gray-500">Connect your social media accounts</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="newsletter"
                          checked={formData.features.newsletter}
                          onCheckedChange={(checked) => handleFeatureChange("newsletter", checked)}
                        />
                        <div>
                          <Label htmlFor="newsletter" className="text-base font-medium">
                            Newsletter Signup
                          </Label>
                          <p className="text-sm text-gray-500">Collect email subscribers</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="testimonials"
                          checked={formData.features.testimonials}
                          onCheckedChange={(checked) => handleFeatureChange("testimonials", checked)}
                        />
                        <div>
                          <Label htmlFor="testimonials" className="text-base font-medium">
                            Testimonials
                          </Label>
                          <p className="text-sm text-gray-500">Display customer reviews and testimonials</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="pages" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Website Pages</CardTitle>
                    <CardDescription>Select the pages you want to include in your website</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="homePage"
                          checked={formData.pages.home}
                          onCheckedChange={(checked) => handlePageChange("home", checked)}
                          disabled
                        />
                        <Label htmlFor="homePage" className="text-base">
                          Home Page
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="aboutPage"
                          checked={formData.pages.about}
                          onCheckedChange={(checked) => handlePageChange("about", checked)}
                        />
                        <Label htmlFor="aboutPage" className="text-base">
                          About Us
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="servicesPage"
                          checked={formData.pages.services}
                          onCheckedChange={(checked) => handlePageChange("services", checked)}
                        />
                        <Label htmlFor="servicesPage" className="text-base">
                          Services
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="portfolioPage"
                          checked={formData.pages.portfolio}
                          onCheckedChange={(checked) => handlePageChange("portfolio", checked)}
                        />
                        <Label htmlFor="portfolioPage" className="text-base">
                          Portfolio
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="contactPage"
                          checked={formData.pages.contact}
                          onCheckedChange={(checked) => handlePageChange("contact", checked)}
                        />
                        <Label htmlFor="contactPage" className="text-base">
                          Contact
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="blogPage"
                          checked={formData.pages.blog}
                          onCheckedChange={(checked) => handlePageChange("blog", checked)}
                        />
                        <Label htmlFor="blogPage" className="text-base">
                          Blog
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="shopPage"
                          checked={formData.pages.shop}
                          onCheckedChange={(checked) => handlePageChange("shop", checked)}
                        />
                        <Label htmlFor="shopPage" className="text-base">
                          Shop
                        </Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Additional Notes</CardTitle>
                    <CardDescription>Any other specific requirements or preferences</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      id="additionalNotes"
                      name="additionalNotes"
                      value={formData.additionalNotes}
                      onChange={handleChange}
                      placeholder="Any other details you'd like us to know..."
                      rows={4}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <CardFooter className="flex justify-end px-0">
              <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
                {isSubmitting ? "Processing..." : "Continue to Checkout"}
              </Button>
            </CardFooter>
          </form>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Template Preview</CardTitle>
              <CardDescription>
                {template ? `${template.charAt(0).toUpperCase() + template.slice(1)} Template` : "Selected Template"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {previewImage ? (
                <div className="relative aspect-video overflow-hidden rounded-md border border-gray-200 dark:border-gray-800">
                  <Image
                    src={previewImage || "/placeholder.svg"}
                    alt={`${template} template preview`}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
                  <p className="text-gray-500 dark:text-gray-400">No preview available</p>
                </div>
              )}

              <div className="mt-4 space-y-3">
                <h3 className="font-medium text-lg">Selected Features:</h3>
                <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                  {Object.entries(formData.features)
                    .filter(([_, enabled]) => enabled)
                    .map(([feature]) => (
                      <li key={feature} className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-2 text-green-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature.charAt(0).toUpperCase() + feature.slice(1).replace(/([A-Z])/g, " $1")}
                      </li>
                    ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
