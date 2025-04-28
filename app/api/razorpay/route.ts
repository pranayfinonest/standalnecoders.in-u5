import { NextResponse } from "next/server"

// This would typically come from environment variables
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || "rzp_test_yourkeyhere"
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || "yoursecrethere"

export async function POST(request: Request) {
  try {
    const { amount, currency = "INR", receipt, notes } = await request.json()

    // Validate the request
    if (!amount) {
      return NextResponse.json({ error: "Amount is required" }, { status: 400 })
    }

    // Create a Razorpay order
    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString("base64")}`,
      },
      body: JSON.stringify({
        amount: amount * 100, // Razorpay expects amount in paise
        currency,
        receipt,
        notes,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Razorpay API error:", errorData)
      return NextResponse.json({ error: "Failed to create order" }, { status: response.status })
    }

    const order = await response.json()

    return NextResponse.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
    })
  } catch (error) {
    console.error("Error creating Razorpay order:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
