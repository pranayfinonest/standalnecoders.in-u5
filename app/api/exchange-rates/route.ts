import { NextResponse } from "next/server"

// Static fallback rate to use during build time
const FALLBACK_RATE = 83.0

export async function GET() {
  // Check if we're in a build/production environment
  const isBuildTime = process.env.NODE_ENV === "production" && !process.env.VERCEL_URL

  // During build time, always return the fallback rate
  if (isBuildTime) {
    return NextResponse.json({
      success: true,
      rate: FALLBACK_RATE,
      currency: "INR",
      base: "USD",
      timestamp: Date.now(),
      isEstimate: true,
    })
  }

  try {
    // Only attempt to fetch live rates when not in build time
    const response = await fetch("https://api.exchangerate.host/latest?base=USD&symbols=INR")

    if (!response.ok) {
      throw new Error("Failed to fetch exchange rate")
    }

    const data = await response.json()

    // Check if the data has the expected structure
    if (!data || !data.rates || typeof data.rates.INR === "undefined") {
      throw new Error("Invalid response format")
    }

    return NextResponse.json({
      success: true,
      rate: data.rates.INR,
      currency: "INR",
      base: "USD",
      timestamp: Date.now(),
    })
  } catch (error) {
    console.error("Error fetching exchange rate:", error)

    // Return a fallback rate in case of error
    return NextResponse.json({
      success: true,
      rate: FALLBACK_RATE,
      currency: "INR",
      base: "USD",
      timestamp: Date.now(),
      isEstimate: true,
    })
  }
}

// Use a fixed value for the dynamic export
export const dynamic = "force-dynamic"

// Revalidate every 6 hours
export const revalidate = 21600
