"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, Check, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { TemplateShowcase } from "./template-showcase"

interface TemplateDetailsProps {
  templateId: string | number
}

export function TemplateDetails({ templateId }: TemplateDetailsProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  // This would typically come from an API or database
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
      additionalFeatures: [
        "Mobile-Optimized Layout",
        "Browser Compatibility Testing",
        "Google Analytics Integration",
        "Performance Optimization",
        "Content Management System",
        "Email Setup (up to 5 accounts)",
        "SSL Certificate",
        "Regular Backups",
        "30 Days Post-Launch Support",
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
      additionalFeatures: [
        "Team Members Section",
        "Client Logo Showcase",
        "Google Maps Integration",
        "Newsletter Signup",
        "Social Media Links",
        "Basic SEO Setup",
        "Contact Form with Email Notifications",
      ],
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
      additionalFeatures: [
        "Product Filtering & Search",
        "Inventory Management",
        "Discount Codes",
        "Tax Calculation",
        "Shipping Options",
        "Order Tracking",
        "Product Reviews",
        "Wishlist Functionality",
        "Related Products",
      ],
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
      additionalFeatures: [
        "Project Filtering",
        "Image Lightbox",
        "Downloadable Resume",
        "Testimonials Section",
        "Services Overview",
        "Blog Integration (Optional)",
        "Social Media Integration",
      ],
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
      additionalFeatures: [
        "Featured Posts Slider",
        "Related Articles",
        "Social Sharing",
        "Reading Time Estimation",
        "Popular Posts Widget",
        "Newsletter Subscription",
        "RSS Feed",
        "Print-Friendly Articles",
      ],
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
      additionalFeatures: [
        "Animated Counters",
        "Product/Service Showcase",
        "Investor Information",
        "Timeline/Roadmap",
        "Press Kit Downloads",
        "Job Openings Section",
        "Blog Integration",
      ],
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
      additionalFeatures: [
        "Online Ordering",
        "Special Events Calendar",
        "Chef Profiles",
        "Food Gallery with Filtering",
        "Customer Reviews Integration",
        "Gift Card Sales",
        "Newsletter Signup",
      ],
      popular: false,
    },
    {
      id: "custom",
      name: "Custom Design",
      description: "Fully customized website designed from scratch",
      image: "/modern-portfolio-design.png",
      price: 35000,
      category: "custom",
      features: [
        "Unique Design",
        "Custom Functionality",
        "Unlimited Revisions",
        "Premium Support",
        "Advanced Features",
      ],
      additionalFeatures: [
        "Completely Custom UI/UX",
        "Tailored Functionality",
        "Custom Animations",
        "Advanced Integrations",
        "Personalized Consultation",
        "Dedicated Project Manager",
        "Extended Support Period",
        "Performance Optimization",
        "Custom Admin Dashboard",
      ],
      popular: false,
    },
  ]

  const template = templates.find((t) => t.id.toString() === templateId.toString())

  if (!template) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Template Not Found</h2>
        <p className="mb-6">The template you're looking for doesn't exist.</p>
        <Button onClick={() => router.push("/booking/templates")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Templates
        </Button>
      </div>
    )
  }

  const handleSelectTemplate = () => {
    setLoading(true)
    router.push(`/booking/customize?template=${templateId}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" onClick={() => router.push("/booking/templates")} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Templates
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>{template.name}</CardTitle>
              <CardDescription>{template.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video w-full mb-6">
                <Image
                  src={template.image || "/placeholder.svg"}
                  alt={template.name}
                  fill
                  className="object-cover rounded-md"
                  priority
                  quality={90}
                />
              </div>

              <TemplateShowcase templateId={template.id} templateName={template.name} templateImage={template.image} />

              <Separator className="my-8" />

              <div>
                <h3 className="text-xl font-semibold mb-4">Template Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                  {[...template.features, ...template.additionalFeatures].map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Template Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Price</p>
                  <p className="text-2xl font-bold">₹{template.price.toLocaleString()}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Category</p>
                  <p className="capitalize">{template.category.replace("-", " ")}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Key Features</p>
                  <ul className="space-y-1 mt-1">
                    {template.features.slice(0, 5).map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleSelectTemplate} disabled={loading}>
                {loading ? "Loading..." : "Customize This Template"}
                {!loading && <ChevronRight className="ml-2 h-4 w-4" />}
              </Button>
            </CardFooter>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Not sure if this template is right for you? Our team is here to help you choose the perfect solution for
                your needs.
              </p>
              <Button variant="outline" className="w-full" onClick={() => router.push("/contact")}>
                Contact Us
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
