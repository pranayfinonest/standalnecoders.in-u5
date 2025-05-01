"use client"

import { useState, useEffect } from "react"
import { Clock, Tag, Sparkles, X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

interface HomepageSpecialOffersProps {
  title?: string
}

export default function HomepageSpecialOffers({ title = "Special Offers" }: HomepageSpecialOffersProps) {
  const [showBanner, setShowBanner] = useState(true)
  const [currentDiscountIndex, setCurrentDiscountIndex] = useState(0)
  const [discounts, setDiscounts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [settings, setSettings] = useState<any>(null)
  const supabase = createClientComponentClient()

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)

      // Load website settings
      try {
        const { data: settingsData } = await supabase
          .from("website_settings")
          .select("settings")
          .eq("section", "website")
          .single()

        if (settingsData?.settings) {
          setSettings(settingsData.settings)
        }
      } catch (error) {
        console.error("Error loading website settings:", error)
      }

      // Load offers from localStorage or database
      const storedOffers = JSON.parse(localStorage.getItem("specialOffers") || "[]")
      const activeOffers = storedOffers.filter((offer) => offer.isActive)
      setDiscounts(activeOffers)

      setIsLoading(false)
    }

    fetchData()
  }, [supabase])

  useEffect(() => {
    if (discounts.length > 1) {
      const interval = setInterval(() => {
        setCurrentDiscountIndex((prevIndex) => (prevIndex + 1) % discounts.length)
      }, 8000)
      return () => clearInterval(interval)
    }
  }, [discounts.length])

  // Don't show if no offers, loading, or settings say not to show on homepage
  if (isLoading || discounts.length === 0 || !showBanner || (settings?.offers && !settings.offers.showOnHomepage)) {
    return null
  }

  const currentDiscount = discounts[currentDiscountIndex]

  const nextDiscount = () => {
    setCurrentDiscountIndex((prevIndex) => (prevIndex + 1) % discounts.length)
  }

  const prevDiscount = () => {
    setCurrentDiscountIndex((prevIndex) => (prevIndex - 1 + discounts.length) % discounts.length)
  }

  // Default colors if not specified in the discount
  const bgColor =
    currentDiscount.bgColor || "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40"
  const textColor = currentDiscount.textColor || "text-blue-600 dark:text-blue-400"

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full mb-8"
        >
          <Card className={`border-2 border-primary/20 overflow-hidden shadow-lg ${bgColor}`}>
            <CardContent className="p-0">
              <div className="relative">
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-24 h-24 bg-primary/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/10 rounded-full translate-x-1/2 translate-y-1/2" />

                <div className="relative p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <Sparkles className={`h-5 w-5 ${textColor} mr-2`} />
                      <h3 className={`text-xl font-bold ${textColor}`}>{title}</h3>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => setShowBanner(false)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Close</span>
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    {currentDiscount.image && (
                      <div className="md:col-span-3 flex justify-center">
                        <div className="relative w-24 h-24 md:w-32 md:h-32 overflow-hidden rounded-lg shadow-md">
                          <Image
                            src={currentDiscount.image || "/placeholder.svg"}
                            alt={currentDiscount.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    )}

                    <div className={`md:col-span-${currentDiscount.image ? "5" : "8"}`}>
                      <h4 className="font-semibold text-lg mb-1">{currentDiscount.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{currentDiscount.description}</p>

                      <div className="flex flex-wrap gap-2 items-center">
                        {currentDiscount.validUntil && (
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>Valid until {currentDiscount.validUntil}</span>
                          </div>
                        )}

                        {currentDiscount.isNew && (
                          <Badge variant="outline" className="bg-green-500 text-white border-0">
                            New
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="md:col-span-4 flex flex-col justify-center items-center md:items-end space-y-2">
                      <div className="flex items-center">
                        <Tag className={`h-4 w-4 ${textColor} mr-1`} />
                        <span className="font-mono font-bold">{currentDiscount.code}</span>
                      </div>
                      <div className={`text-3xl font-bold ${textColor}`}>{currentDiscount.discount}</div>
                      <Button
                        size="sm"
                        className="w-full md:w-auto"
                        onClick={() => {
                          // Copy code to clipboard
                          navigator.clipboard
                            .writeText(currentDiscount.code)
                            .then(() => {
                              alert(`Discount code ${currentDiscount.code} copied to clipboard!`)
                            })
                            .catch((err) => {
                              console.error("Could not copy text: ", err)
                            })
                        }}
                      >
                        Copy Code
                      </Button>
                    </div>
                  </div>

                  {discounts.length > 1 && (
                    <div className="flex justify-between items-center mt-4">
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={prevDiscount}>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>

                      <div className="flex justify-center space-x-1">
                        {discounts.map((_, index) => (
                          <button
                            key={index}
                            className={`w-2 h-2 rounded-full ${
                              index === currentDiscountIndex ? "bg-primary" : "bg-gray-300 dark:bg-gray-600"
                            }`}
                            onClick={() => setCurrentDiscountIndex(index)}
                          />
                        ))}
                      </div>

                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={nextDiscount}>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
