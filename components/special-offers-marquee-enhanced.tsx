"use client"

import { useState, useEffect, useRef } from "react"
import { Copy, Check, X, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { toast } from "@/components/ui/use-toast"
import { useOffers } from "@/hooks/use-offers"
import type { SpecialOffer } from "@/data/special-offers"

export default function SpecialOffersMarqueeEnhanced() {
  const { offers, isLoading, error } = useOffers()
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(true)
  const marqueeRef = useRef<HTMLDivElement>(null)

  const copyToClipboard = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedCode(code)
      toast({
        title: "Discount code copied!",
        description: `${code} has been copied to your clipboard.`,
        duration: 3000,
      })

      // Reset copied state after 3 seconds
      setTimeout(() => {
        setCopiedCode(null)
      }, 3000)
    } catch (err) {
      console.error("Failed to copy: ", err)
      toast({
        title: "Failed to copy code",
        description: "Please try again or manually copy the code.",
        variant: "destructive",
        duration: 3000,
      })
    }
  }

  const closeMarquee = () => {
    setIsVisible(false)
    // Store in session storage so it stays closed during the session
    sessionStorage.setItem("offersMarqueeClosed", "true")
  }

  useEffect(() => {
    // Check if user has closed the marquee in this session
    const isClosed = sessionStorage.getItem("offersMarqueeClosed") === "true"
    setIsVisible(!isClosed)

    // Pause animation when hovering
    const marqueeElement = marqueeRef.current
    if (marqueeElement) {
      const handleMouseEnter = () => {
        const items = marqueeElement.querySelectorAll(".marquee-content")
        items.forEach((item) => {
          ;(item as HTMLElement).style.animationPlayState = "paused"
        })
      }

      const handleMouseLeave = () => {
        const items = marqueeElement.querySelectorAll(".marquee-content")
        items.forEach((item) => {
          ;(item as HTMLElement).style.animationPlayState = "running"
        })
      }

      marqueeElement.addEventListener("mouseenter", handleMouseEnter)
      marqueeElement.addEventListener("mouseleave", handleMouseLeave)

      return () => {
        marqueeElement.removeEventListener("mouseenter", handleMouseEnter)
        marqueeElement.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [])

  // Don't render if:
  // 1. User has closed the marquee
  // 2. There are no valid offers
  // 3. There's an error and we can't display offers
  if (!isVisible || (!isLoading && offers.length === 0) || (error && !isLoading)) {
    return null
  }

  return (
    <div
      className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-white py-2 relative overflow-hidden w-full"
      aria-label="Special offers marquee"
      ref={marqueeRef}
      role="region"
      aria-live="polite"
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 text-white hover:bg-blue-700 hover:text-white"
        onClick={closeMarquee}
        aria-label="Close special offers"
      >
        <X size={18} />
      </Button>

      {isLoading ? (
        <div className="flex justify-center items-center h-8">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          <span>Loading offers...</span>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-8">
          <AlertCircle className="mr-2 h-4 w-4" />
          <span>Could not load special offers</span>
        </div>
      ) : (
        <div className="flex overflow-hidden relative h-6 items-center">
          <div className="marquee-content flex animate-marquee-rtl whitespace-nowrap">
            {offers.map((offer) => (
              <OfferTile key={offer.id} offer={offer} isCopied={copiedCode === offer.code} onCopy={copyToClipboard} />
            ))}
          </div>

          {/* Duplicate for seamless looping */}
          <div className="marquee-content flex animate-marquee2-rtl whitespace-nowrap">
            {offers.map((offer) => (
              <OfferTile
                key={`${offer.id}-duplicate`}
                offer={offer}
                isCopied={copiedCode === offer.code}
                onCopy={copyToClipboard}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

interface OfferTileProps {
  offer: SpecialOffer
  isCopied: boolean
  onCopy: (code: string) => void
}

function OfferTile({ offer, isCopied, onCopy }: OfferTileProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className="flex items-center mx-2 px-2 py-0.5 rounded-md shadow-sm text-xs h-5"
            style={{
              backgroundColor: offer.backgroundColor || "#ffffff",
              color: offer.textColor || "#000000",
            }}
            tabIndex={0}
            role="button"
            aria-label={`${offer.discount} off: ${offer.description}. Code: ${offer.code}. Click to copy.`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                onCopy(offer.code)
                e.preventDefault()
              }
            }}
          >
            <span className="font-bold whitespace-nowrap">{offer.discount} OFF:</span>
            <span className="mx-1 whitespace-nowrap truncate max-w-[100px]">{offer.code}</span>
            <button
              onClick={() => onCopy(offer.code)}
              className="focus:outline-none rounded-full p-0.5 hover:bg-white/20 transition-colors"
              aria-label={isCopied ? "Copied" : "Copy discount code"}
            >
              {isCopied ? <Check size={12} /> : <Copy size={12} />}
            </button>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{offer.description} - Click to copy</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
