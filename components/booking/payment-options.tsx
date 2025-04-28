"use client"

import { useState } from "react"
import { CreditCard, FileText } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import RazorpayCheckout from "@/components/payment/razorpay-checkout"

export default function PaymentOptions({ formData, updateFormData, onSubmit }) {
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()

  const handlePaymentMethodChange = (value) => {
    updateFormData({ paymentMethod: value })
  }

  const handlePaymentSuccess = (data) => {
    toast({
      title: "Payment successful!",
      description: "Your payment has been processed successfully.",
    })
    onSubmit()
  }

  const handlePaymentError = (error) => {
    console.error("Payment error:", error)
    setIsProcessing(false)
    toast({
      title: "Payment failed",
      description: "There was an error processing your payment. Please try again.",
      variant: "destructive",
    })
  }

  const handleManualPayment = () => {
    setIsProcessing(true)

    // Simulate processing
    setTimeout(() => {
      toast({
        title: "Order submitted",
        description: "We'll contact you with payment instructions.",
      })
      onSubmit()
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium mb-2">Payment Method</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Choose how you'd like to pay for your website development project.
        </p>
      </div>

      <RadioGroup value={formData.paymentMethod} onValueChange={handlePaymentMethodChange} className="space-y-4">
        <div>
          <Card className={formData.paymentMethod === "razorpay" ? "border-blue-500" : ""}>
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <RadioGroupItem value="razorpay" id="payment-razorpay" />
                <div className="flex-1">
                  <Label htmlFor="payment-razorpay" className="flex items-center text-base font-medium cursor-pointer">
                    <CreditCard className="h-5 w-5 mr-2 text-blue-600" /> Pay with Razorpay
                  </Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 ml-7">
                    Secure payment via credit/debit card, UPI, or net banking. Payment window will open in a new tab.
                  </p>

                  {formData.paymentMethod === "razorpay" && (
                    <div className="mt-4 ml-7">
                      <RazorpayCheckout
                        amount={formData.totalPrice}
                        name={formData.projectName || "Website Development"}
                        description={`Order for ${formData.businessName || "your business"}`}
                        onSuccess={handlePaymentSuccess}
                        onError={handlePaymentError}
                        prefill={{
                          name: formData.contactName,
                          email: formData.contactEmail,
                          contact: formData.contactPhone,
                        }}
                        notes={{
                          projectName: formData.projectName,
                          businessType: formData.businessType,
                        }}
                        openInNewTab={true}
                      />
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className={formData.paymentMethod === "bank" ? "border-blue-500" : ""}>
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <RadioGroupItem value="bank" id="payment-bank" />
                <div className="flex-1">
                  <Label htmlFor="payment-bank" className="flex items-center text-base font-medium cursor-pointer">
                    <FileText className="h-5 w-5 mr-2 text-blue-600" /> Pay via Bank Transfer
                  </Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 ml-7">
                    We'll send you an invoice with our bank details. 50% advance payment required to start the project.
                  </p>

                  {formData.paymentMethod === "bank" && (
                    <div className="mt-4 ml-7">
                      <Button onClick={handleManualPayment} disabled={isProcessing} className="w-full">
                        {isProcessing ? "Processing..." : "Submit Order & Request Invoice"}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </RadioGroup>

      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border">
        <h3 className="font-medium mb-2">Payment Terms</h3>
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <li>• 50% advance payment required to start the project</li>
          <li>• 25% payment after design approval</li>
          <li>• 25% payment before final delivery</li>
          <li>• All payments are non-refundable once work has begun</li>
        </ul>
        <p className="text-sm mt-4">
          By proceeding with payment, you agree to our{" "}
          <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  )
}
