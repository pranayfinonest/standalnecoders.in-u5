// Function to get USD to INR exchange rate
export async function getUSDtoINRRate(): Promise<number> {
  try {
    // Try to fetch from an exchange rate API
    const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD", {
      next: { revalidate: 3600 }, // Revalidate every hour
    })

    if (!response.ok) {
      throw new Error("Failed to fetch exchange rate")
    }

    const data = await response.json()

    // Check if the response has the expected structure
    if (data && data.rates && data.rates.INR) {
      return data.rates.INR
    }

    // Fallback to a reasonable default if the API doesn't return the expected data
    console.warn("Exchange rate API did not return expected data, using fallback rate")
    return 83.0 // Fallback rate (approximate USD to INR rate)
  } catch (error) {
    console.error("Error fetching exchange rate:", error)
    // Return a fallback rate if the API call fails
    return 83.0 // Fallback rate (approximate USD to INR rate)
  }
}

// Function to convert USD to INR
export function convertUSDtoINR(amountUSD: number, rate: number): number {
  return amountUSD * rate
}

// Function to format currency
export function formatCurrency(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount)
}
