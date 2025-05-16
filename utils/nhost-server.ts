import crypto from "crypto"

// Verify Nhost webhook signature
export function verifyNhostWebhook(signature: string, payload: string): boolean {
  if (!process.env.NHOST_WEBHOOK_SECRET) {
    console.error("NHOST_WEBHOOK_SECRET is not defined")
    return false
  }

  const hmac = crypto.createHmac("sha256", process.env.NHOST_WEBHOOK_SECRET)
  const computedSignature = hmac.update(payload).digest("hex")

  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(computedSignature))
}

// Create a Nhost admin client for server-side operations
export async function nhostAdminRequest(endpoint: string, method = "GET", body?: any) {
  if (!process.env.NHOST_ADMIN_SECRET) {
    throw new Error("NHOST_ADMIN_SECRET is not defined")
  }

  const url = `${process.env.NEXT_PUBLIC_NHOST_BACKEND_URL}${endpoint}`

  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret": process.env.NHOST_ADMIN_SECRET,
    },
  }

  if (body) {
    options.body = JSON.stringify(body)
  }

  const response = await fetch(url, options)

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Nhost admin request failed: ${errorText}`)
  }

  return response.json()
}
