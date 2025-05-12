"use client"

import { useState, useEffect, useRef } from "react"
import { Copy, Check, X } from "lucide-react"
import { specialOffers, type SpecialOffer } from "@/data/special-offers"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { toast } from "@/components/ui/use-toast"

export default function SpecialOffersMarquee() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(true)
  const marqueeRef = useRef<HTMLDivElement>(null)

  // Check if any offers are expired and filter them out
  const validOffers = specialOffers.filter((offer) => {
    const validUntil = new Date(offer.validUntil)
    return validUntil >= new Date()
  })

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

  if (!isVisible || validOffers.length === 0) return null

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

      <div className="flex overflow-hidden relative">
        <div className="marquee-content flex animate-marquee-rtl whitespace-nowrap">
          {validOffers.map((offer) => (
            <OfferTile key={offer.id} offer={offer} isCopied={copiedCode === offer.code} onCopy={copyToClipboard} />
          ))}
        </div>

        {/* Duplicate for seamless looping */}
        <div className="marquee-content flex animate-marquee2-rtl whitespace-nowrap">
          {validOffers.map((offer) => (
            <OfferTile
              key={`${offer.id}-duplicate`}
              offer={offer}
              isCopied={copiedCode === offer.code}
              onCopy={copyToClipboard}
            />
          ))}
        </div>
      </div>
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
            className="flex items-center mx-4 px-4 py-1 rounded-md shadow-sm"
            style={{
              backgroundColor: offer.backgroundColor || "#ffffff",
              color: offer.textColor || "#000000",
            }}
          >
            <div className="mr-3">
              <div className="font-bold">{offer.discount} OFF</div>
              <div className="text-xs">{offer.description}</div>
            </div>

            <div className="flex items-center border border-current rounded px-2 py-1 text-sm">
              <code className="font-mono mr-2">{offer.code}</code>
              <button
                onClick={() => onCopy(offer.code)}
                className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-full p-1 hover:bg-white/20 transition-colors"
                aria-label={isCopied ? "Copied" : "Copy discount code"}
              >
                {isCopied ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Click to copy discount code</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
