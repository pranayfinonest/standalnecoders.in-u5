/**
 * Currency conversion utility for fetching and caching exchange rates
 */

// Cache for storing exchange rates with expiration
type RateCache = {
  rate: number
  timestamp: number
  expiry: number
}

// Cache object to store rates
const ratesCache: Record<string, RateCache> = {}

// Cache expiration time (6 hours in milliseconds)
const CACHE_EXPIRY = 6 * 60 * 60 * 1000

/**
 * Fetches the latest USD to INR exchange rate
 * Falls back to a reasonable estimate if the API fails
 */
export async function getUSDtoINRRate(): Promise<number> {
  // Check if we have a valid cached rate
  if (ratesCache["USD_INR"] && Date.now() < ratesCache["USD_INR"].expiry) {
    return ratesCache["USD_INR"].rate
  }

  try {
    // Fetch the latest exchange rate from a public API
    const response = await fetch(
      "https://api.exchangerate.host/latest?base=USD&symbols=INR",
      { next: { revalidate: 21600 } }, // Revalidate every 6 hours
    )

    if (!response.ok) {
      throw new Error("Failed to fetch exchange rate")
    }

    const data = await response.json()
    const rate = data.rates.INR

    // Cache the rate
    ratesCache["USD_INR"] = {
      rate,
      timestamp: Date.now(),
      expiry: Date.now() + CACHE_EXPIRY,
    }

    return rate
  } catch (error) {
    console.error("Error fetching exchange rate:", error)

    // If we have an expired cache entry, use it as fallback
    if (ratesCache["USD_INR"]) {
      return ratesCache["USD_INR"].rate
    }

    // Otherwise use a reasonable estimate (83 INR per USD as of 2023)
    return 83
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
  return Number.parseFloat(numericString)
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
