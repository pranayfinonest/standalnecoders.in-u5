"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Trash2, Minus, Plus, ShoppingBag, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/utils/cart-utils"
import { useAuth } from "@/contexts/auth-context"
import CartSkeleton from "./cart-skeleton"

export default function CartPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useAuth()
  const { cart, isLoading, updateQuantity, removeFromCart, getCartTotal } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)

  // Calculate cart summary
  const subtotal = getCartTotal()
  const gst = subtotal * 0.18 // 18% GST
  const total = subtotal + gst

  const handleQuantityChange = async (id: string, currentQty: number, change: number) => {
    const newQty = Math.max(1, currentQty + change)
    await updateQuantity(id, newQty)
  }

  const handleRemove = async (id: string, name: string) => {
    const success = await removeFromCart(id)
    if (success) {
      toast({
        title: "Item removed",
        description: `${name} has been removed from your cart.`,
      })
    } else {
      toast({
        title: "Error",
        description: "Could not remove item. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleCheckout = () => {
    if (!user) {
      // Redirect to login if not authenticated
      toast({
        title: "Login required",
        description: "Please login to continue to checkout.",
        variant: "destructive",
      })
      router.push("/auth/login?redirect=/booking/checkout")
      return
    }

    // Redirect to checkout
    router.push("/booking/checkout")
  }

  const handleContinueShopping = () => {
    router.push("/booking/templates")
  }

  if (isLoading) {
    return <CartSkeleton />
  }

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
        <Button onClick={handleContinueShopping}>Continue Shopping</Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Card>
          <CardContent className="p-6">
            <div className="space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row gap-4 pb-6 border-b">
                  <div className="relative w-full sm:w-24 h-24 rounded-md overflow-hidden">
                    <Image
                      src={item.image_url || "/placeholder.svg?height=96&width=96"}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 96px"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500">
                          {item.customizations
                            ? `Customized: ${JSON.stringify(item.customizations)}`
                            : "Standard package"}
                        </p>
                      </div>
                      <div className="text-lg font-bold mt-2 sm:mt-0">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                    <div className="flex flex-wrap justify-between mt-4 gap-2">
                      <div className="flex items-center border rounded-md">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="px-3">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleRemove(item.id, item.name)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" /> Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold mb-4">Order Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">GST (18%)</span>
                <span>₹{gst.toLocaleString()}</span>
              </div>
              <div className="border-t pt-3 mt-3 flex justify-between font-bold">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>

            {!user && (
              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md flex items-start gap-2 text-sm">
                <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-amber-800">Login required for checkout</p>
                  <p className="text-amber-700 mt-1">
                    You'll need to sign in or create an account to complete your purchase.
                  </p>
                </div>
              </div>
            )}

            <div className="mt-6 space-y-3">
              <Button className="w-full" size="lg" onClick={handleCheckout} disabled={isProcessing}>
                {isProcessing ? "Processing..." : "Proceed to Checkout"}
              </Button>
              <Button variant="outline" className="w-full" onClick={handleContinueShopping}>
                Continue Shopping
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
