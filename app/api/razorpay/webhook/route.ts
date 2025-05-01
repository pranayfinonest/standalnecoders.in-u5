import { NextResponse } from "next/server"
import crypto from "crypto"
import { logWebhookEvent } from "@/utils/webhook-logger"

// Make sure the webhook secret is properly accessed from environment variables
const RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET

// Also add better error handling if the secret is missing:
if (!RAZORPAY_WEBHOOK_SECRET) {
  console.error("Webhook Error: RAZORPAY_WEBHOOK_SECRET is not defined in environment variables")
}

// Ensure proper error handling and logging
export async function POST(request: Request) {
  if (!RAZORPAY_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
  }
  try {
    const body = await request.text()
    const signature = request.headers.get("x-razorpay-signature")

    if (!signature) {
      console.error("Webhook Error: Missing signature")
      return NextResponse.json({ error: "Missing signature" }, { status: 400 })
    }

    // Verify the webhook signature
    const expectedSignature = crypto.createHmac("sha256", RAZORPAY_WEBHOOK_SECRET).update(body).digest("hex")

    if (expectedSignature !== signature) {
      console.error("Webhook Error: Invalid signature")
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    // Parse the webhook payload
    const payload = JSON.parse(body)
    const event = payload.event

    logWebhookEvent(event, payload)

    // Handle different webhook events
    switch (event) {
      case "payment.authorized":
        // Payment was authorized but not yet captured
        console.log("Payment authorized:", payload.payload.payment.entity.id)
        break

      case "payment.captured":
        // Payment was successfully captured
        console.log("Payment captured:", payload.payload.payment.entity.id)
        // Update your database, mark the order as paid, etc.
        break

      case "payment.failed":
        // Payment failed
        console.log("Payment failed:", payload.payload.payment?.entity?.id)
        // Update your database, notify the customer, etc.
        break

      case "order.paid":
        // Order was paid
        console.log("Order paid:", payload.payload.order.entity.id)
        // Update order status in your database
        break

      default:
        // Handle other events or ignore them
        console.log(`Unhandled webhook event: ${event}`)
        break
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    logWebhookEvent("error", { message: error.message, stack: error.stack }, true)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
