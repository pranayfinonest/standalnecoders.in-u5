"use client"

import { useEffect, useState } from "react"

export default function PricingSummary({ formData }) {
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    const price = formData.basePrice + formData.technologiesPrice + formData.featuresPrice + formData.maintenancePrice

    setTotalPrice(price)
  }, [formData.basePrice, formData.technologiesPrice, formData.featuresPrice, formData.maintenancePrice])

  // Format currency in INR
  const formatINR = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-md">
      <h3 className="font-medium mb-2">Pricing Summary</h3>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Base Price</span>
          <span>{formatINR(formData.basePrice)}</span>
        </div>

        {formData.technologiesPrice > 0 && (
          <div className="flex justify-between">
            <span>Technologies</span>
            <span>{formatINR(formData.technologiesPrice)}</span>
          </div>
        )}

        {formData.featuresPrice > 0 && (
          <div className="flex justify-between">
            <span>Features</span>
            <span>{formatINR(formData.featuresPrice)}</span>
          </div>
        )}

        {formData.domainPrice > 0 && (
          <div className="flex justify-between">
            <span>Domain</span>
            <span>{formatINR(formData.domainPrice)}</span>
          </div>
        )}

        {formData.maintenancePrice > 0 && (
          <div className="flex justify-between">
            <span>Maintenance</span>
            <span>{formatINR(formData.maintenancePrice)}</span>
          </div>
        )}

        <div className="border-t pt-4 mt-2">
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>{formatINR(totalPrice)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
