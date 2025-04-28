"use client"

import { useEffect, useState } from "react"

export default function PricingSummary({ formData }) {
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    const price = formData.basePrice + formData.technologiesPrice + formData.featuresPrice + formData.maintenancePrice

    setTotalPrice(price)
  }, [formData.basePrice, formData.technologiesPrice, formData.featuresPrice, formData.maintenancePrice])

  return (
    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-md">
      <h3 className="font-medium mb-2">Pricing Summary</h3>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Base Price</span>
          <span>₹{formData.basePrice.toLocaleString()}</span>
        </div>

        {formData.technologiesPrice > 0 && (
          <div className="flex justify-between">
            <span>Technologies</span>
            <span>₹{formData.technologiesPrice.toLocaleString()}</span>
          </div>
        )}

        {formData.featuresPrice > 0 && (
          <div className="flex justify-between">
            <span>Features</span>
            <span>₹{formData.featuresPrice.toLocaleString()}</span>
          </div>
        )}

        {formData.domainPrice > 0 && (
          <div className="flex justify-between">
            <span>Domain</span>
            <span>₹{formData.domainPrice.toLocaleString()}</span>
          </div>
        )}

        {formData.maintenancePrice > 0 && (
          <div className="flex justify-between">
            <span>Maintenance</span>
            <span>₹{formData.maintenancePrice.toLocaleString()}</span>
          </div>
        )}

        <div className="border-t pt-4 mt-2">
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>₹{totalPrice.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
