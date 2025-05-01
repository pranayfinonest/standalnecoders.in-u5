"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import RazorpayCheckout from "@/components/payment/razorpay-checkout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatCurrency } from "@/utils/currency"

export default function CheckoutForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [cartItems, setCartItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("razorpay")

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

  const handleSubmit = async (e) => {
    e.preventDefault()

    // For manual payment methods (not Razorpay)
    if (paymentMethod !== "razorpay") {
      setIsSubmitting(true)

      try {
        // In a real app, you would process the payment here
        await new Promise((resolve) => setTimeout(resolve, 2000))

        // Clear the cart
        localStorage.setItem("cart", "[]")

        // Create an order ID
        const orderId = `ORD-${Date.now().toString().slice(-6)}`

        // Store order in localStorage for demo purposes
        const order = {
          id: orderId,
          items: cartItems,
          customer: {
            name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
          },
          billing: {
            address: formData.address,
            city: formData.city,
            state: formData.state,
            postalCode: formData.postalCode,
            country: formData.country,
          },
          payment: {
            method: paymentMethod,
            total: calculateTotal(),
          },
          status: "confirmed",
          date: new Date().toISOString(),
        }

        const orders = JSON.parse(localStorage.getItem("orders") || "[]")
        localStorage.setItem("orders", JSON.stringify([...orders, order]))

        toast({
          title: "Order placed successfully!",
          description: `Your order #${orderId} has been confirmed.`,
        })

        // Redirect to confirmation page
        router.push(`/booking/confirmation?orderId=${orderId}`)
      } catch (error) {
        toast({
          title: "Payment failed",
          description: "There was an error processing your payment. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsSubmitting(false)
      }
    }
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
      <Button variant="ghost" className="mb-6" asChild>
        <Link href="/booking/cart">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Cart
        </Link>
      </Button>

      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit}>
            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Contact Information</h2>

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

            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Billing Address</h2>

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

            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Payment Method</h2>

                <Tabs defaultValue="razorpay" onValueChange={setPaymentMethod}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="razorpay">Razorpay</TabsTrigger>
                    <TabsTrigger value="bank">Bank Transfer</TabsTrigger>
                    <TabsTrigger value="cod">Cash on Delivery</TabsTrigger>
                  </TabsList>

                  <TabsContent value="razorpay" className="mt-4">
                    <div className="p-4 border rounded-md bg-gray-50 dark:bg-gray-800/50">
                      <p className="mb-4">
                        Pay securely using Razorpay. You will be redirected to Razorpay's secure payment page.
                      </p>
                      <div className="flex items-center justify-center space-x-4 mb-4">
                        <div className="h-8 w-12 bg-blue-100 dark:bg-blue-900/20 rounded flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                          Visa
                        </div>
                        <div className="h-8 w-12 bg-red-100 dark:bg-red-900/20 rounded flex items-center justify-center text-red-600 dark:text-red-400 font-bold">
                          MC
                        </div>
                        <div className="h-8 w-12 bg-green-100 dark:bg-green-900/20 rounded flex items-center justify-center text-green-600 dark:text-green-400 font-bold">
                          UPI
                        </div>
                        <div className="h-8 w-12 bg-purple-100 dark:bg-purple-900/20 rounded flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold">
                          NB
                        </div>
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
                  </TabsContent>

                  <TabsContent value="bank" className="mt-4">
                    <div className="p-4 border rounded-md bg-gray-50 dark:bg-gray-800/50">
                      <p className="mb-4">
                        Make a direct bank transfer to our account. Please use your Order ID as the payment reference.
                      </p>
                      <div className="bg-white dark:bg-gray-900 p-4 rounded-md border mb-4">
                        <p className="font-medium">Bank Account Details:</p>
                        <p>Bank: HDFC Bank</p>
                        <p>Account Name: StandaloneCoders Pvt Ltd</p>
                        <p>Account Number: XXXX XXXX XXXX 1234</p>
                        <p>IFSC Code: HDFC0001234</p>
                      </div>
                      <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                        {isSubmitting ? "Processing..." : "Complete Order"}
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="cod" className="mt-4">
                    <div className="p-4 border rounded-md bg-gray-50 dark:bg-gray-800/50">
                      <p className="mb-4">
                        Pay with cash upon delivery. Please note that this option is only available for certain
                        locations.
                      </p>
                      <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                        {isSubmitting ? "Processing..." : "Complete Order"}
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Additional Information</h2>

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
          </form>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>

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
  )
}
