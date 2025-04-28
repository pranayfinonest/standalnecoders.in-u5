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
