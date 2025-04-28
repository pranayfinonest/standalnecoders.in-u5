import { NextResponse } from "next/server"
import crypto from "crypto"

// This would typically come from environment variables
const RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET || "yourwebhooksecrethere"

export async function POST(request: Request) {
  try {
    const body = await request.text()
    const signature = request.headers.get("x-razorpay-signature")

    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 })
    }

    // Verify the webhook signature
    const expectedSignature = crypto.createHmac("sha256", RAZORPAY_WEBHOOK_SECRET).update(body).digest("hex")

    if (expectedSignature !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    // Parse the webhook payload
    const payload = JSON.parse(body)
    const event = payload.event

    // Handle different webhook events
    switch (event) {
      case "payment.authorized":
        // Payment was authorized but not yet captured
        // You might want to capture the payment here or let your frontend handle it
        break

      case "payment.captured":
        // Payment was successfully captured
        // Update your database, mark the order as paid, etc.
        break

      case "payment.failed":
        // Payment failed
        // Update your database, notify the customer, etc.
        break

      default:
        // Handle other events or ignore them
        break
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error processing webhook:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
