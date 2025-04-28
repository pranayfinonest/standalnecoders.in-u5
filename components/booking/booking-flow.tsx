"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import TechnologySelection from "@/components/booking/technology-selection"
import FeatureSelection from "@/components/booking/feature-selection"
import DomainHostingSelection from "@/components/booking/domain-hosting-selection"
import MaintenancePlanSelection from "@/components/booking/maintenance-plan-selection"
import ProjectDetails from "@/components/booking/project-details"
import PricingSummary from "@/components/booking/pricing-summary"
import PaymentOptions from "@/components/booking/payment-options"

const steps = [
  { id: "technologies", title: "Technologies" },
  { id: "features", title: "Features" },
  { id: "domain-hosting", title: "Domain & Hosting" },
  { id: "maintenance", title: "Maintenance" },
  { id: "details", title: "Project Details" },
  { id: "payment", title: "Payment" },
]

export default function BookingFlow() {
  const router = useRouter()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    // Technologies
    selectedTechnologies: [],

    // Features
    selectedFeatures: [],
    customFeatures: "",

    // Domain & Hosting
    domainName: "",
    domainProvider: "",
    domainPrice: 0,
    hostingPackage: "",
    hostingProvider: "",
    hostingPrice: 0,

    // Maintenance
    maintenancePlan: "",
    maintenancePrice: 0,

    // Project Details
    projectName: "",
    businessName: "",
    businessType: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    projectDescription: "",

    // Payment
    paymentMethod: "razorpay",

    // Pricing
    basePrice: 15000,
    technologiesPrice: 0,
    featuresPrice: 0,
    totalPrice: 15000,
  })

  // Calculate total price whenever relevant form data changes
  useEffect(() => {
    const total = formData.basePrice + formData.technologiesPrice + formData.featuresPrice + formData.maintenancePrice

    setFormData((prev) => ({
      ...prev,
      totalPrice: total,
    }))
  }, [formData.basePrice, formData.technologiesPrice, formData.featuresPrice, formData.maintenancePrice])

  const updateFormData = (data) => {
    setFormData((prev) => ({
      ...prev,
      ...data,
    }))
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleSubmit = async () => {
    try {
      // In a real app, you would send this data to your backend
      // For now, we'll store it in localStorage to simulate persistence
      const orderData = {
        id: `ORD-${Date.now().toString().slice(-6)}`,
        ...formData,
        status: "pending",
        date: new Date().toISOString(),
      }

      const orders = JSON.parse(localStorage.getItem("orders") || "[]")
      localStorage.setItem("orders", JSON.stringify([...orders, orderData]))

      toast({
        title: "Order submitted successfully!",
        description: "Your website development request has been received.",
      })

      // Redirect to confirmation page
      router.push(`/booking/confirmation?orderId=${orderData.id}`)
    } catch (error) {
      toast({
        title: "Error submitting order",
        description: "There was a problem submitting your order. Please try again.",
        variant: "destructive",
      })
    }
  }

  const renderStepContent = () => {
    switch (steps[currentStep].id) {
      case "technologies":
        return <TechnologySelection formData={formData} updateFormData={updateFormData} />
      case "features":
        return <FeatureSelection formData={formData} updateFormData={updateFormData} />
      case "domain-hosting":
        return <DomainHostingSelection formData={formData} updateFormData={updateFormData} />
      case "maintenance":
        return <MaintenancePlanSelection formData={formData} updateFormData={updateFormData} />
      case "details":
        return <ProjectDetails formData={formData} updateFormData={updateFormData} />
      case "payment":
        return <PaymentOptions formData={formData} updateFormData={updateFormData} onSubmit={handleSubmit} />
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 
                    ${
                      index < currentStep
                        ? "bg-green-500 border-green-500 text-white"
                        : index === currentStep
                          ? "border-blue-500 text-blue-500"
                          : "border-gray-300 text-gray-400"
                    }`}
                >
                  {index < currentStep ? <Check className="h-5 w-5" /> : <span>{index + 1}</span>}
                </div>
                <span
                  className={`text-xs mt-2 hidden sm:block 
                    ${index <= currentStep ? "text-gray-900 dark:text-gray-100" : "text-gray-400"}`}
                >
                  {step.title}
                </span>
              </div>
            ))}
          </div>
          <div className="relative mt-2">
            <div className="absolute left-0 top-1/2 h-0.5 w-full bg-gray-200 dark:bg-gray-700 -translate-y-1/2"></div>
            <div
              className="absolute left-0 top-1/2 h-0.5 bg-blue-500 -translate-y-1/2 transition-all duration-300"
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            ></div>
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-6">{steps[currentStep].title}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">{renderStepContent()}</CardContent>
            </Card>

            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={handleBack} disabled={currentStep === 0}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>

              {currentStep === steps.length - 1 ? (
                <Button onClick={handleSubmit}>Complete Order</Button>
              ) : (
                <Button onClick={handleNext}>
                  Continue <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <PricingSummary formData={formData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
