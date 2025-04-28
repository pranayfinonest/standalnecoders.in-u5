"use client"

import { Check, Info } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Maintenance plans
const maintenancePlans = [
  {
    id: "none",
    name: "No Maintenance",
    description: "No ongoing maintenance plan. Support available at hourly rates.",
    price: 0,
    features: [],
    popular: false,
  },
  {
    id: "basic",
    name: "Basic Maintenance",
    description: "Essential maintenance to keep your website running smoothly.",
    price: 1999,
    interval: "month",
    features: [
      "Monthly Website Updates",
      "Security Monitoring",
      "Weekly Backups",
      "Basic SEO Monitoring",
      "5 Content Updates per Month",
      "Email Support",
    ],
    popular: false,
  },
  {
    id: "standard",
    name: "Standard Maintenance",
    description: "Comprehensive maintenance with regular updates and support.",
    price: 3999,
    interval: "month",
    features: [
      "Bi-weekly Website Updates",
      "Advanced Security Monitoring",
      "Daily Backups",
      "Monthly SEO Reports",
      "10 Content Updates per Month",
      "Priority Email Support",
      "Monthly Performance Reports",
      "2 Hours of Development Time",
    ],
    popular: true,
  },
  {
    id: "premium",
    name: "Premium Maintenance",
    description: "Complete website care with priority support and advanced features.",
    price: 7999,
    interval: "month",
    features: [
      "Weekly Website Updates",
      "Real-time Security Monitoring",
      "Daily Backups with 30-day Retention",
      "Weekly SEO Reports & Optimization",
      "Unlimited Content Updates",
      "24/7 Priority Support",
      "Monthly Strategy Calls",
      "5 Hours of Development Time",
      "Performance Optimization",
      "Monthly Analytics Reports",
    ],
    popular: false,
  },
]

export default function MaintenancePlanSelection({ formData, updateFormData }) {
  const handlePlanSelect = (planId) => {
    const plan = maintenancePlans.find((p) => p.id === planId)
    if (!plan) return

    updateFormData({
      maintenancePlan: plan.name,
      maintenancePrice: plan.id === "none" ? 0 : plan.price * 12, // Annual price
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium mb-2">Maintenance Plan</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Choose a maintenance plan to keep your website secure, updated, and performing well.
        </p>
      </div>

      <RadioGroup
        value={maintenancePlans.find((p) => p.name === formData.maintenancePlan)?.id || "none"}
        onValueChange={handlePlanSelect}
        className="grid grid-cols-1 gap-4"
      >
        {maintenancePlans.map((plan) => (
          <Label key={plan.id} htmlFor={`plan-${plan.id}`} className="cursor-pointer">
            <Card
              className={`overflow-hidden transition-all ${
                formData.maintenancePlan === plan.name ? "border-blue-500 ring-1 ring-blue-500" : ""
              }`}
            >
              <CardContent className="p-0">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 border-b flex items-center justify-between relative">
                  <div className="flex items-center gap-4">
                    <RadioGroupItem id={`plan-${plan.id}`} value={plan.id} />
                    <div>
                      <h3 className="font-bold text-lg">{plan.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{plan.description}</p>
                    </div>
                  </div>
                  {plan.popular && <Badge className="absolute top-2 right-2 bg-orange-500">Popular</Badge>}
                </div>
                <div className="p-4">
                  {plan.id !== "none" ? (
                    <>
                      <div className="mb-4">
                        <span className="text-3xl font-bold">₹{plan.price.toLocaleString()}</span>
                        <span className="text-gray-600 dark:text-gray-400">/{plan.interval}</span>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          Billed annually (₹{(plan.price * 12).toLocaleString()}/year)
                        </p>
                      </div>

                      <ul className="space-y-2 mb-2">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <p className="text-gray-600 dark:text-gray-400 py-2">
                      No ongoing maintenance. Support available at ₹1,500/hour as needed.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </Label>
        ))}
      </RadioGroup>

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <div className="flex items-start">
          <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 mt-0.5" />
          <div>
            <h3 className="font-medium text-blue-800 dark:text-blue-400">Why Choose a Maintenance Plan?</h3>
            <p className="text-sm text-blue-700 dark:text-blue-500 mt-1">
              Websites require regular updates, security patches, and content refreshes to stay secure and relevant. A
              maintenance plan ensures your site remains in optimal condition without unexpected costs.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
