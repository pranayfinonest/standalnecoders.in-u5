"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, Tag, Clock } from "lucide-react"
import { formatCurrency } from "@/utils/currency"

interface Offer {
  id: string
  title: string
  description: string
  discountPercentage: number
  originalPrice: number
  validUntil: string
  isNew: boolean
  code: string
}

export default function EnhancedSpecialOffers() {
  const [isVisible, setIsVisible] = useState(true)
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  // Sample offers data - in production, this would come from an API
  const offers: Offer[] = [
    {
      id: "1",
      title: "Limited Time Offer",
      description: "Get 20% off on all website development services",
      discountPercentage: 20,
      originalPrice: 25000,
      validUntil: "2023-12-31",
      isNew: true,
      code: "WEB20",
    },
    {
      id: "2",
      title: "Digital Marketing Bundle",
      description: "SEO + Social Media Management at a special price",
      discountPercentage: 15,
      originalPrice: 15000,
      validUntil: "2023-11-30",
      isNew: false,
      code: "DIGIBUNDLE",
    },
    {
      id: "3",
      title: "New Client Special",
      description: "First-time clients receive a complimentary SEO audit",
      discountPercentage: 10,
      originalPrice: 5000,
      validUntil: "2023-12-15",
      isNew: true,
      code: "NEWCLIENT",
    },
  ]

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentOfferIndex((prevIndex) => (prevIndex + 1) % offers.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isHovered, offers.length])

  const handlePrevious = () => {
    setCurrentOfferIndex((prevIndex) => (prevIndex - 1 + offers.length) % offers.length)
  }

  const handleNext = () => {
    setCurrentOfferIndex((prevIndex) => (prevIndex + 1) % offers.length)
  }

  const currentOffer = offers[currentOfferIndex]
  const discountedPrice = currentOffer.originalPrice * (1 - currentOffer.discountPercentage / 100)
  const daysRemaining = Math.ceil(
    (new Date(currentOffer.validUntil).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
  )

  if (!isVisible) return null

  return (
    <div className="relative">
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg rounded-lg mx-4 my-6 overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 text-white/80 hover:text-white focus:outline-none z-10"
          aria-label="Close offer banner"
        >
          <X size={20} />
        </button>

        <div className="relative px-6 py-4 md:px-8 md:py-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentOffer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col md:flex-row items-center justify-between"
            >
              <div className="flex-1 mb-4 md:mb-0">
                <div className="flex items-center mb-2">
                  <Tag className="mr-2" size={18} />
                  <h3 className="text-xl font-bold">{currentOffer.title}</h3>
                  {currentOffer.isNew && (
                    <span className="ml-2 bg-yellow-400 text-blue-900 text-xs font-bold px-2 py-1 rounded-full">
                      NEW
                    </span>
                  )}
                </div>
                <p className="text-white/90 mb-2">{currentOffer.description}</p>
                <div className="flex items-center text-sm">
                  <Clock size={16} className="mr-1" />
                  <span>
                    {daysRemaining > 0
                      ? `Offer ends in ${daysRemaining} day${daysRemaining > 1 ? "s" : ""}`
                      : "Offer expired"}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-center md:items-end">
                <div className="text-center md:text-right">
                  <div className="flex items-center justify-center md:justify-end">
                    <span className="text-white/70 line-through text-sm mr-2">
                      {formatCurrency(currentOffer.originalPrice)}
                    </span>
                    <span className="text-2xl font-bold">{formatCurrency(discountedPrice)}</span>
                  </div>
                  <div className="bg-white/20 px-3 py-1 rounded-full text-sm mt-2 flex items-center">
                    <span className="font-mono font-bold">{currentOffer.code}</span>
                    <span className="ml-2 text-xs">Use this code at checkout</span>
                  </div>
                </div>

                <button className="mt-4 bg-white text-blue-700 hover:bg-blue-50 font-bold py-2 px-6 rounded-full transition-all transform hover:scale-105 shadow-md">
                  Claim Offer
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {offers.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center md:justify-end md:right-8 gap-2">
              <button
                onClick={handlePrevious}
                className="bg-white/20 hover:bg-white/30 rounded-full p-1"
                aria-label="Previous offer"
              >
                <ChevronLeft size={16} />
              </button>
              <div className="flex gap-1">
                {offers.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentOfferIndex(index)}
                    className={`w-2 h-2 rounded-full ${index === currentOfferIndex ? "bg-white" : "bg-white/40"}`}
                    aria-label={`Go to offer ${index + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={handleNext}
                className="bg-white/20 hover:bg-white/30 rounded-full p-1"
                aria-label="Next offer"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
