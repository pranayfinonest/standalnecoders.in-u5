"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Lock, CreditCard, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import RazorpayCheckout from "@/components/payment/razorpay-checkout"
import { formatCurrency } from "@/utils/currency"

export default function CheckoutForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [cartItems, setCartItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
    additionalNotes: "",
  })

  useEffect(() => {
    // Load cart items from localStorage
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]")
    setCartItems(storedCart)
    setIsLoading(false)

    // Pre-fill form with user data if available
    const userData = JSON.parse(localStorage.getItem("user") || "{}")
    if (userData.name) {
      setFormData((prev) => ({
        ...prev,
        fullName: userData.name,
        email: userData.email || prev.email,
      }))
    }
  }, [])

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0)
  }

  const calculateTax = () => {
    // Calculate 18% GST
    return Math.round(calculateSubtotal() * 0.18)
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax()
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handlePaymentSuccess = (data) => {
    // This is handled inside the RazorpayCheckout component
    console.log("Payment successful:", data)
  }

  const handlePaymentError = (error) => {
    console.error("Payment error:", error)
    toast({
      title: "Payment failed",
      description: "There was an error processing your payment. Please try again.",
      variant: "destructive",
    })
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            You need to add items to your cart before checking out.
          </p>
          <Button asChild>
            <Link href="/booking/templates">Browse Templates</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <Button variant="ghost" className="mb-6" asChild>
          <Link href="/booking/cart">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Cart
          </Link>
        </Button>

        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="mb-8 border-0 shadow-md">
              <CardHeader className="bg-gray-50 dark:bg-gray-800/50 px-6 py-4">
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8 border-0 shadow-md">
              <CardHeader className="bg-gray-50 dark:bg-gray-800/50 px-6 py-4">
                <CardTitle>Billing Address</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Address *</Label>
                    <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input id="city" name="city" value={formData.city} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State/Province *</Label>
                      <Input id="state" name="state" value={formData.state} onChange={handleChange} required />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Postal Code *</Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country *</Label>
                      <Input id="country" name="country" value={formData.country} onChange={handleChange} required />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8 border-0 shadow-md">
              <CardHeader className="bg-gray-50 dark:bg-gray-800/50 px-6 py-4">
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="p-6 border rounded-lg bg-white dark:bg-gray-800 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <h3 className="text-lg font-medium">Pay with Card & UPI</h3>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                    Secure payment processing with all major payment methods supported
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="border rounded-md p-4 bg-blue-50 dark:bg-blue-900/20 flex flex-col items-center justify-center gap-2">
                      <CreditCard className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      <p className="font-medium text-blue-600 dark:text-blue-400">Credit/Debit Card</p>
                      <p className="text-xs text-blue-600/70 dark:text-blue-400/70 text-center">
                        Visa, Mastercard, RuPay & more
                      </p>
                    </div>

                    <div className="border rounded-md p-4 bg-green-50 dark:bg-green-900/20 flex flex-col items-center justify-center gap-2">
                      <Smartphone className="h-6 w-6 text-green-600 dark:text-green-400" />
                      <p className="font-medium text-green-600 dark:text-green-400">UPI Payment</p>
                      <p className="text-xs text-green-600/70 dark:text-green-400/70 text-center">
                        Google Pay, PhonePe, BHIM & more
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-center space-x-4 mb-6">
                    <div className="h-8 w-12 bg-blue-100 dark:bg-blue-900/20 rounded flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                      Visa
                    </div>
                    <div className="h-8 w-12 bg-red-100 dark:bg-red-900/20 rounded flex items-center justify-center text-red-600 dark:text-red-400 font-bold">
                      MC
                    </div>
                    <div className="h-8 w-12 bg-yellow-100 dark:bg-yellow-900/20 rounded flex items-center justify-center text-yellow-600 dark:text-yellow-400 font-bold">
                      Amex
                    </div>
                    <div className="h-8 w-12 bg-purple-100 dark:bg-purple-900/20 rounded flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold">
                      RuPay
                    </div>
                  </div>

                  <div className="flex items-center mb-6 text-sm">
                    <Lock className="h-4 w-4 text-green-600 dark:text-green-400 mr-2" />
                    <span className="text-gray-600 dark:text-gray-400">
                      Your payment information is encrypted and secure
                    </span>
                  </div>

                  <RazorpayCheckout
                    amount={calculateTotal()}
                    name="StandaloneCoders"
                    description={`Payment for ${cartItems.length} item(s)`}
                    customerName={formData.fullName}
                    customerEmail={formData.email}
                    customerPhone={formData.phone}
                    notes={{
                      address: `${formData.address}, ${formData.city}, ${formData.state}, ${formData.postalCode}, ${formData.country}`,
                      items: JSON.stringify(cartItems.map((item) => item.template.name)),
                    }}
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8 border-0 shadow-md">
              <CardHeader className="bg-gray-50 dark:bg-gray-800/50 px-6 py-4">
                <CardTitle>Additional Information</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-2">
                  <Label htmlFor="additionalNotes">Order Notes (Optional)</Label>
                  <Textarea
                    id="additionalNotes"
                    name="additionalNotes"
                    placeholder="Notes about your order, e.g. special instructions for delivery"
                    value={formData.additionalNotes}
                    onChange={handleChange}
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="border-0 shadow-md">
                <CardHeader className="bg-gray-50 dark:bg-gray-800/50 px-6 py-4">
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>{item.template.name}</span>
                        <span>{formatCurrency(item.price)}</span>
                      </div>
                    ))}

                    <Separator />

                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>{formatCurrency(calculateSubtotal())}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>GST (18%)</span>
                      <span>{formatCurrency(calculateTax())}</span>
                    </div>

                    <Separator />

                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>{formatCurrency(calculateTotal())}</span>
                    </div>
                  </div>

                  <div className="mt-6 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-md flex items-center text-sm">
                    <Lock className="h-4 w-4 text-green-600 dark:text-green-400 mr-2" />
                    <span className="text-gray-600 dark:text-gray-400">
                      Your payment information is encrypted and secure
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
