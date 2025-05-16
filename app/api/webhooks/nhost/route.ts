import { NextResponse } from "next/server"
import { verifyNhostWebhook } from "@/utils/nhost-server"

export async function POST(request: Request) {
  try {
    const signature = request.headers.get("x-nhost-webhook-signature")

    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 401 })
    }

    const body = await request.text()

    // Verify the webhook signature
    const isValid = verifyNhostWebhook(signature, body)

    if (!isValid) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
    }

    // Parse the webhook payload
    const payload = JSON.parse(body)
    const event = payload.trigger.name

    console.log(`Received Nhost webhook: ${event}`, payload)

    // Handle different webhook events
    switch (event) {
      case "user.created":
        // Handle user creation
        console.log("User created:", payload.event.data.user.id)
        break

      case "user.deleted":
        // Handle user deletion
        console.log("User deleted:", payload.event.data.user.id)
        break

      // Add more event handlers as needed

      default:
        console.log(`Unhandled webhook event: ${event}`)
        break
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error processing webhook:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
