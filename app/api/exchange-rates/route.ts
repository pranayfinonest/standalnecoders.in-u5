import { NextResponse } from "next/server"

// Static fallback rates for build time
const fallbackRates = {
  USD: 1,
  EUR: 0.85,
  GBP: 0.75,
  JPY: 110.2,
  AUD: 1.35,
  CAD: 1.25,
  INR: 74.5,
}

export async function GET() {
  try {
    // In a real app, you would fetch from an external API
    // For this demo, we'll use static data
    return NextResponse.json({
      base: "USD",
      rates: fallbackRates,
      timestamp: Date.now(),
    })
  } catch (error) {
    console.error("Error fetching exchange rates:", error)
    return NextResponse.json({
      base: "USD",
      rates: fallbackRates,
      timestamp: Date.now(),
      isStatic: true,
    })
  }
}

// Make this endpoint static for build time
export const dynamic = "force-static"
