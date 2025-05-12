"use client"

import { useState, useEffect } from "react"
import { specialOffers, type SpecialOffer } from "@/data/special-offers"

// Function to fetch offers from an API
async function fetchOffers(): Promise<SpecialOffer[]> {
  try {
    // Try to fetch from API first
    const response = await fetch("/api/special-offers")
    if (response.ok) {
      const data = await response.json()
      return data.offers
    }
    throw new Error("Failed to fetch from API")
  } catch (error) {
    console.log("Using fallback offer data")
    // Fall back to static data if API fails
    return specialOffers
  }
}

export function useOffers() {
  const [offers, setOffers] = useState<SpecialOffer[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getOffers = async () => {
      try {
        setIsLoading(true)
        const offerData = await fetchOffers()

        // Filter expired offers
        const now = new Date()
        const validOffers = offerData.filter((offer) => {
          const validUntil = new Date(offer.validUntil)
          return validUntil >= now
        })

        // Sort by priority if available
        const sortedOffers = validOffers.sort((a, b) =>
          a.priority !== undefined && b.priority !== undefined ? a.priority - b.priority : 0,
        )

        setOffers(sortedOffers)
      } catch (err) {
        setError("Failed to load offers")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    getOffers()
  }, [])

  return { offers, isLoading, error }
}
