"use client"

import { useState, useEffect } from "react"
import { MessageCircle } from "lucide-react"

interface WhatsAppButtonProps {
  phoneNumber: string
  message?: string
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left"
  showOnMobile?: boolean
  className?: string
}

export default function WhatsAppButton({
  phoneNumber,
  message = "Hello! I'm interested in your services.",
  position = "bottom-right",
  showOnMobile = true,
  className = "",
}: WhatsAppButtonProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show button after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message)
    const url = `https://wa.me/${phoneNumber.replace(/\D/g, "")}?text=${encodedMessage}`
    window.open(url, "_blank")
  }

  // Position classes
  const positionClasses = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
    "top-right": "top-6 right-6",
    "top-left": "top-6 left-6",
  }

  if (!isVisible) return null

  return (
    <button
      onClick={handleClick}
      className={`fixed ${
        positionClasses[position]
      } z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${
        !showOnMobile ? "hidden md:flex" : "flex"
      } items-center justify-center ${className}`}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </button>
  )
}
