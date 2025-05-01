export const logWebhookEvent = (event, payload, isError = false) => {
  const timestamp = new Date().toISOString()
  const logMessage = `[${timestamp}] Webhook Event: ${event}`

  if (isError) {
    console.error(logMessage, payload)
  } else {
    console.log(logMessage, payload)
  }
}
