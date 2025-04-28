"use server"

import crypto from "crypto"

// This would typically come from environment variables
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || "yoursecrethere"

export async function verifyPayment(
  razorpay_payment_id: string,
  razorpay_order_id: string,
  razorpay_signature: string,
) {
  try {
    // Generate the expected signature
    const payload = `${razorpay_order_id}|${razorpay_payment_id}`
    const expectedSignature = crypto.createHmac("sha256", RAZORPAY_KEY_SECRET).update(payload).digest("hex")

    // Verify the signature
    const isValid = expectedSignature === razorpay_signature

    if (!isValid) {
      return { success: false, error: "Invalid payment signature" }
    }

    // Here you would typically:
    // 1. Update the order status in your database
    // 2. Send confirmation emails
    // 3. Update inventory, etc.

    return {
      success: true,
      orderId: crypto.randomBytes(8).toString("hex").toUpperCase(),
    }
  } catch (error) {
    console.error("Error verifying payment:", error)
    return { success: false, error: "Failed to verify payment" }
  }
}

export async function createOrder(amount: number, currency = "INR", receipt?: string, notes?: any) {
  try {
    // Create a Razorpay order
    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`).toString("base64")}`,
      },
      body: JSON.stringify({
        amount: amount, // Razorpay expects amount in paise
        currency,
        receipt,
        notes,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Razorpay API error:", errorData)
      return null
    }

    const order = await response.json()

    return {
      id: order.id,
      amount: order.amount,
      currency: order.currency,
    }
  } catch (error) {
    console.error("Error creating Razorpay order:", error)
    return null
  }
}
