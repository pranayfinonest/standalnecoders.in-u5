import { NextResponse } from "next/server"
import { getUSDtoINRRate } from "@/utils/currency-conversion"

export async function GET() {
  try {
    const rate = await getUSDtoINRRate()

    // Add fallback if rate is undefined
    const safeRate = rate || 75.0 // Fallback to a reasonable INR/USD rate

    return NextResponse.json({
      success: true,
      rate: safeRate,
      currency: "INR",
      base: "USD",
      timestamp: Date.now(),
    })
  } catch (error) {
    console.error("Error fetching exchange rate:", error)

    // Return a fallback rate in case of error
    return NextResponse.json({
      success: true, // Still return success to prevent client errors
      rate: 75.0, // Fallback to a reasonable INR/USD rate
      currency: "INR",
      base: "USD",
      timestamp: Date.now(),
      isEstimate: true, // Flag to indicate this is an estimate
    })
  }
}

// Revalidate every 6 hours
export const revalidate = 21600
