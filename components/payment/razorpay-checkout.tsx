"use client"

import { useState } from "react"
import Script from "next/script"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { verifyPayment } from "@/app/actions/payment"
import { useToast } from "@/hooks/use-toast"

interface RazorpayCheckoutProps {
  amount: number
  currency?: string
  name: string
  description: string
  customerName: string
  customerEmail: string
  customerPhone: string
  notes?: Record<string, string>
  onSuccess?: (data: any) => void
  onError?: (error: any) => void
}

declare global {
  interface Window {
    Razorpay: any
  }
}

export default function RazorpayCheckout({
  amount,
  currency = "INR",
  name,
  description,
  customerName,
  customerEmail,
  customerPhone,
  notes = {},
  onSuccess,
  onError,
}: RazorpayCheckoutProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isScriptLoaded, setIsScriptLoaded] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handlePayment = async () => {
    try {
      setIsLoading(true)

      // Create a Razorpay order
      const response = await fetch("/api/razorpay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          currency,
          receipt: `receipt_${Date.now()}`,
          notes,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to create order")
      }

      const { id: orderId, key } = await response.json()

      // Initialize Razorpay checkout
      const options = {
        key,
        amount: amount * 100, // Razorpay expects amount in paise
        currency,
        name,
        description,
        order_id: orderId,
        prefill: {
          name: customerName,
          email: customerEmail,
          contact: customerPhone,
        },
        notes,
        theme: {
          color: "#6366f1", // Indigo color to match the site theme
        },
        handler: async (response: any) => {
          try {
            // Verify the payment
            const result = await verifyPayment(
              response.razorpay_payment_id,
              response.razorpay_order_id,
              response.razorpay_signature,
            )

            if (result.success) {
              // Clear the cart
              localStorage.setItem("cart", "[]")

              // Show success toast
              toast({
                title: "Payment successful!",
                description: `Your order #${result.orderId} has been confirmed.`,
              })

              // Call the success callback if provided
              if (onSuccess) {
                onSuccess(result)
              }

              // Redirect to confirmation page
              router.push(`/booking/confirmation?orderId=${result.orderId}`)
            } else {
              throw new Error(result.error || "Payment verification failed")
            }
          } catch (error) {
            console.error("Payment verification error:", error)
            toast({
              title: "Payment verification failed",
              description: "There was an error verifying your payment. Please contact support.",
              variant: "destructive",
            })

            if (onError) {
              onError(error)
            }
          }
        },
        modal: {
          ondismiss: () => {
            setIsLoading(false)
            toast({
              title: "Payment cancelled",
              description: "You have cancelled the payment process.",
            })
          },
        },
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (error) {
      console.error("Payment error:", error)
      toast({
        title: "Payment failed",
        description: error.message || "There was an error processing your payment. Please try again.",
        variant: "destructive",
      })

      if (onError) {
        onError(error)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" onLoad={() => setIsScriptLoaded(true)} />
      <Button onClick={handlePayment} disabled={isLoading || !isScriptLoaded} className="w-full" size="lg">
        {isLoading ? "Processing..." : "Pay with Razorpay"}
      </Button>
    </>
  )
}
