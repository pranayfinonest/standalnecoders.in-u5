import { NextResponse } from "next/server"
import { getUSDtoINRRate } from "@/utils/currency-conversion"

export async function GET() {
  try {
    const rate = await getUSDtoINRRate()

    return NextResponse.json({
      success: true,
      rate,
      currency: "INR",
      base: "USD",
      timestamp: Date.now(),
    })
  } catch (error) {
    console.error("Error fetching exchange rate:", error)

    // Return a fallback rate if there's an error
    return NextResponse.json({
      success: true,
      rate: 83.0, // Fallback rate
      currency: "INR",
      base: "USD",
      timestamp: Date.now(),
      fallback: true,
    })
  }
}

// Revalidate every 6 hours
export const revalidate = 21600
