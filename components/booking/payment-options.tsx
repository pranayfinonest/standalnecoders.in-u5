"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Landmark, IndianRupee } from "lucide-react"

export default function PaymentOptions({ order, onComplete }) {
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()

  const handlePayment = async () => {
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Update order with payment details
    const updatedOrder = {
      ...order,
      payment: {
        method: paymentMethod,
        status: "completed",
        date: new Date().toISOString(),
        total: order.total,
        currency: "INR",
      },
      status: "confirmed",
    }

    // Save updated order
    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]")
    const updatedOrders = [...existingOrders, updatedOrder]
    localStorage.setItem("orders", JSON.stringify(updatedOrders))

    setIsProcessing(false)
    onComplete(updatedOrder)
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Payment Options</h2>
        <p className="text-gray-600 dark:text-gray-400">Choose your preferred payment method to complete your order.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
          <CardDescription>Review your order details before payment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between">
                <div>
                  <p className="font-medium">{item.template.name} Website</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.customizations?.businessName || "Custom Website"}
                  </p>
                </div>
                <p className="font-medium">{formatCurrency(item.price)}</p>
              </div>
            ))}

            {order.addons?.map((addon, index) => (
              <div key={index} className="flex justify-between">
                <div>
                  <p className="font-medium">{addon.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{addon.description}</p>
                </div>
                <p className="font-medium">{formatCurrency(addon.price)}</p>
              </div>
            ))}

            <Separator />

            <div className="flex justify-between">
              <p className="font-medium">Subtotal</p>
              <p className="font-medium">{formatCurrency(order.subtotal)}</p>
            </div>

            {order.discount > 0 && (
              <div className="flex justify-between text-green-600">
                <p className="font-medium">Discount</p>
                <p className="font-medium">-{formatCurrency(order.discount)}</p>
              </div>
            )}

            <div className="flex justify-between">
              <p className="font-medium">GST (18%)</p>
              <p className="font-medium">{formatCurrency(order.tax)}</p>
            </div>

            <Separator />

            <div className="flex justify-between">
              <p className="font-bold text-lg">Total</p>
              <p className="font-bold text-lg">{formatCurrency(order.total)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>Select how you would like to pay</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
            <div className="flex items-center space-x-2 rounded-md border p-4">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                <CreditCard className="h-5 w-5" />
                <span>Credit/Debit Card</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2 rounded-md border p-4">
              <RadioGroupItem value="bank" id="bank" />
              <Label htmlFor="bank" className="flex items-center gap-2 cursor-pointer">
                <Landmark className="h-5 w-5" />
                <span>Bank Transfer</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2 rounded-md border p-4">
              <RadioGroupItem value="upi" id="upi" />
              <Label htmlFor="upi" className="flex items-center gap-2 cursor-pointer">
                <IndianRupee className="h-5 w-5" />
                <span>UPI Payment</span>
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
        <CardFooter>
          <Button onClick={handlePayment} disabled={isProcessing} className="w-full">
            {isProcessing ? "Processing..." : `Pay ${formatCurrency(order.total)}`}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
