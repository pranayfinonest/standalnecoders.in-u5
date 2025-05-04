"use client"

import { useState, useEffect } from "react"
import { Clock, Tag, Sparkles, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"

interface SpecialDiscountProps {
  title?: string
  discounts: {
    id: string
    name: string
    description: string
    code: string
    discount: string
    validUntil?: string
    isNew?: boolean
  }[]
}

export default function SpecialDiscounts({ title = "Special Offers", discounts }: SpecialDiscountProps) {
  const [showBanner, setShowBanner] = useState(true)
  const [currentDiscountIndex, setCurrentDiscountIndex] = useState(0)

  useEffect(() => {
    if (discounts.length > 1) {
      const interval = setInterval(() => {
        setCurrentDiscountIndex((prevIndex) => (prevIndex + 1) % discounts.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [discounts.length])

  if (!showBanner || discounts.length === 0) return null

  const currentDiscount = discounts[currentDiscountIndex]

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
          <Card className="border-2 border-primary/20 bg-primary/5 overflow-hidden">
            <CardContent className="p-0">
              <div className="relative">
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-24 h-24 bg-primary/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/10 rounded-full translate-x-1/2 translate-y-1/2" />

                <div className="relative p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <Sparkles className="h-5 w-5 text-primary mr-2" />
                      <h3 className="text-xl font-bold text-primary">{title}</h3>
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

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
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

                    <div className="flex flex-col justify-center items-center md:items-end space-y-2">
                      <div className="flex items-center">
                        <Tag className="h-4 w-4 text-primary mr-1" />
                        <span className="font-mono font-bold">{currentDiscount.code}</span>
                      </div>
                      <div className="text-2xl font-bold text-primary">{currentDiscount.discount}</div>
                      <Button size="sm" className="w-full md:w-auto">
                        Apply Discount
                      </Button>
                    </div>
                  </div>

                  {discounts.length > 1 && (
                    <div className="flex justify-center mt-4 space-x-1">
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
