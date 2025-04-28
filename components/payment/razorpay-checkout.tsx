"use client"

import { useState } from "react"
import Script from "next/script"
import { Button } from "@/components/ui/button"
import { createOrder } from "@/app/actions/payment"
import { getRazorpayKey } from "@/app/actions/razorpay"

export default function RazorpayCheckout({
  amount,
  name,
  description,
  onSuccess,
  onError,
  prefill = {},
  notes = {},
  openInNewTab = true,
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [isScriptLoaded, setIsScriptLoaded] = useState(false)

  const handleScriptLoad = () => {
    setIsScriptLoaded(true)
  }

  const handlePayment = async () => {
    if (!isScriptLoaded) {
      console.error("Razorpay script not loaded")
      return
    }

    setIsLoading(true)

    try {
      // Create order on the server
      const order = await createOrder(amount * 100) // Convert to paise

      if (!order || !order.id) {
        throw new Error("Failed to create order")
      }

      // Initialize payment
      const keyResponse = await getRazorpayKey()
      const options = {
        key: keyResponse.keyId,
        amount: amount * 100, // in paise
        currency: "INR",
        name: "StandaloneCoders",
        description: description || "Website Development Services",
        order_id: order.id,
        handler: (response) => {
          setIsLoading(false)
          if (onSuccess) onSuccess(response)
        },
        prefill: {
          name: prefill.name || "",
          email: prefill.email || "",
          contact: prefill.contact || "",
        },
        notes: {
          ...notes,
        },
        theme: {
          color: "#3B82F6",
        },
        modal: {
          ondismiss: () => {
            setIsLoading(false)
          },
          escape: true,
          confirm_close: true,
        },
      }

      const razorpay = new window.Razorpay(options)

      if (openInNewTab) {
        // Open in new tab by creating a form and submitting it
        const form = document.createElement("form")
        form.method = "POST"
        form.action = "https://api.razorpay.com/v1/checkout/embedded"
        form.target = "_blank"

        const keyResponse = await getRazorpayKey()
        const keyInput = document.createElement("input")
        keyInput.type = "hidden"
        keyInput.name = "key_id"
        keyInput.value = keyResponse.keyId

        const orderIdInput = document.createElement("input")
        orderIdInput.type = "hidden"
        orderIdInput.name = "order_id"
        orderIdInput.value = order.id

        const amountInput = document.createElement("input")
        amountInput.type = "hidden"
        amountInput.name = "amount"
        amountInput.value = (amount * 100).toString()

        const nameInput = document.createElement("input")
        nameInput.type = "hidden"
        nameInput.name = "name"
        nameInput.value = "StandaloneCoders"

        const descriptionInput = document.createElement("input")
        descriptionInput.type = "hidden"
        descriptionInput.name = "description"
        descriptionInput.value = description || "Website Development Services"

        const prefillNameInput = document.createElement("input")
        prefillNameInput.type = "hidden"
        prefillNameInput.name = "prefill[name]"
        prefillNameInput.value = prefill.name || ""

        const prefillEmailInput = document.createElement("input")
        prefillEmailInput.type = "hidden"
        prefillEmailInput.name = "prefill[email]"
        prefillEmailInput.value = prefill.email || ""

        const prefillContactInput = document.createElement("input")
        prefillContactInput.type = "hidden"
        prefillContactInput.name = "prefill[contact]"
        prefillContactInput.value = prefill.contact || ""

        form.appendChild(keyInput)
        form.appendChild(orderIdInput)
        form.appendChild(amountInput)
        form.appendChild(nameInput)
        form.appendChild(descriptionInput)
        form.appendChild(prefillNameInput)
        form.appendChild(prefillEmailInput)
        form.appendChild(prefillContactInput)

        document.body.appendChild(form)
        form.submit()
        document.body.removeChild(form)

        // Handle success callback after payment
        window.addEventListener("message", (e) => {
          if (e.data && e.data.razorpay_payment_id) {
            onSuccess(e.data)
          }
        })
      } else {
        // Open in same window
        razorpay.open()
      }
    } catch (error) {
      console.error("Payment error:", error)
      setIsLoading(false)
      if (onError) onError(error)
    }
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" onLoad={handleScriptLoad} strategy="lazyOnload" />
      <Button onClick={handlePayment} disabled={isLoading || !isScriptLoaded} className="w-full">
        {isLoading ? "Processing..." : "Pay Now"}
      </Button>
    </>
  )
}
