/**
 * Currency conversion utility for fetching and caching exchange rates
 */

// Fallback rate to use when API is unavailable
const FALLBACK_RATE = 83.0

/**
 * Fetches the latest USD to INR exchange rate
 * Falls back to a reasonable estimate if the API fails
 */
export async function getUSDtoINRRate(): Promise<number> {
  // During build time, always return the fallback rate
  if (process.env.NODE_ENV === "production") {
    return FALLBACK_RATE
  }

  try {
    // Only attempt to fetch in development/runtime
    const response = await fetch("/api/exchange-rates")

    if (!response.ok) {
      return FALLBACK_RATE
    }

    const data = await response.json()

    if (!data || !data.success || typeof data.rate !== "number") {
      return FALLBACK_RATE
    }

    return data.rate
  } catch (error) {
    console.error("Error fetching exchange rate:", error)
    return FALLBACK_RATE
  }
}

/**
 * Converts USD amount to INR
 * @param usdAmount - Amount in USD
 * @returns Promise resolving to amount in INR
 */
export async function convertUSDtoINR(usdAmount: number): Promise<number> {
  const rate = await getUSDtoINRRate()
  return usdAmount * rate
}

/**
 * Extracts numeric value from a price string (e.g., "$999" -> 999)
 * @param priceString - Price string with currency symbol
 * @returns Numeric value
 */
export function extractNumericValue(priceString: string): number {
  // Remove currency symbol and any non-numeric characters except decimal point
  const numericString = priceString.replace(/[^0-9.]/g, "")
  return Number.parseFloat(numericString) || 0 // Return 0 if parsing fails
}

/**
 * Formats a number as INR currency string
 * @param amount - Amount to format
 * @returns Formatted INR string
 */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount)
}
