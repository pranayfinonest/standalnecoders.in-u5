"use client"

import { useState, useEffect } from "react"
import { specialOffers, type SpecialOffer } from "@/data/special-offers"

export function useSpecialOffers() {
  const [offers, setOffers] = useState<SpecialOffer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        // In a real application, this would be an API call
        // const response = await fetch('/api/special-offers');
        // const data = await response.json();

        // For now, we'll use our local data
        const validOffers = specialOffers.filter((offer) => {
          const validUntil = new Date(offer.validUntil)
          return validUntil >= new Date()
        })

        setOffers(validOffers)
        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch offers"))
        setLoading(false)
      }
    }

    fetchOffers()
  }, [])

  return { offers, loading, error }
}
