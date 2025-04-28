"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight, CreditCard, Trash2, FileText, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"

export default function Cart() {
  const router = useRouter()
  const { toast } = useToast()
  const [cartItems, setCartItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [itemToRemove, setItemToRemove] = useState(null)

  useEffect(() => {
    // Load cart items from localStorage
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]")
    setCartItems(storedCart)
    setIsLoading(false)
  }, [])

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0)
  }

  const handleRemoveItem = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId)
    setCartItems(updatedCart)
    localStorage.setItem("cart", JSON.stringify(updatedCart))

    toast({
      title: "Item removed",
      description: "The item has been removed from your cart.",
    })

    setItemToRemove(null)
  }

  const handleCheckout = () => {
    // In a real app, you would redirect to a checkout page or process
    router.push("/booking/checkout")
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
            You haven't added any website projects to your cart yet.
          </p>
          <Button asChild>
            <Link href="/booking/templates">
              Browse Templates <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" className="mb-6" asChild>
        <Link href="/booking/templates">
          <ArrowLeft className="mr-2 h-4 w-4" /> Continue Shopping
        </Link>
      </Button>

      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              {cartItems.map((item, index) => (
                <div key={item.id}>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative w-full md:w-1/4 aspect-video rounded-md overflow-hidden">
                      <Image
                        src={item.template.image || "/placeholder.svg"}
                        alt={item.template.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg">{item.template.name}</h3>
                          {item.pricingOption === "fixed" && (
                            <Badge className="bg-green-500 hover:bg-green-600 mt-1">Complete Package</Badge>
                          )}
                          {item.pricingOption === "quotation" && (
                            <Badge className="bg-blue-500 hover:bg-blue-600 mt-1">Custom Quotation</Badge>
                          )}
                        </div>
                        <p className="font-bold">₹{item.price.toLocaleString()}</p>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{item.template.description}</p>

                      <div className="mt-4 space-y-2">
                        <p className="text-sm">
                          <span className="font-medium">Business:</span> {item.customizations.businessName}
                        </p>

                        {item.pricingOption === "fixed" ? (
                          <div className="flex items-start mt-2">
                            <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mr-2 mt-0.5" />
                            <p className="text-sm text-green-700 dark:text-green-400">
                              All-inclusive package with essential features
                            </p>
                          </div>
                        ) : item.pricingOption === "quotation" ? (
                          <div className="flex items-start mt-2">
                            <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2 mt-0.5" />
                            <p className="text-sm text-blue-700 dark:text-blue-400">
                              Custom quotation with budget: ₹{item.customizations.customBudget.toLocaleString()}
                            </p>
                          </div>
                        ) : (
                          <>
                            {item.customizations.selectedTechnology &&
                              item.customizations.selectedTechnology.length > 0 && (
                                <p className="text-sm">
                                  <span className="font-medium">Technologies:</span>{" "}
                                  {item.customizations.selectedTechnology.length} selected
                                </p>
                              )}
                            {item.customizations.selectedFeatures &&
                              item.customizations.selectedFeatures.length > 0 && (
                                <p className="text-sm">
                                  <span className="font-medium">Features:</span>{" "}
                                  {item.customizations.selectedFeatures.length} selected
                                </p>
                              )}
                            {item.customizations.additionalPages.length > 0 && (
                              <p className="text-sm">
                                <span className="font-medium">Additional Pages:</span>{" "}
                                {item.customizations.additionalPages.join(", ")}
                              </p>
                            )}
                            {item.customizations.selectedAddOns && item.customizations.selectedAddOns.length > 0 && (
                              <p className="text-sm">
                                <span className="font-medium">Add-ons:</span>{" "}
                                {item.customizations.selectedAddOns.length} selected
                              </p>
                            )}
                          </>
                        )}
                      </div>

                      <div className="mt-4 flex justify-end">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                            >
                              <Trash2 className="h-4 w-4 mr-1" /> Remove
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Remove Item</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to remove this item from your cart?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-red-500 hover:bg-red-600"
                                onClick={() => handleRemoveItem(item.id)}
                              >
                                Remove
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </div>
                  {index < cartItems.length - 1 && <Separator className="my-6" />}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>
                      Subtotal ({cartItems.length} {cartItems.length === 1 ? "item" : "items"})
                    </span>
                    <span>₹{calculateTotal().toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Taxes</span>
                    <span>Calculated at checkout</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-bold text-lg">
                    <span>Estimated Total</span>
                    <span>₹{calculateTotal().toLocaleString()}</span>
                  </div>
                </div>

                <Button className="w-full mt-6" size="lg" onClick={handleCheckout}>
                  <CreditCard className="mr-2 h-4 w-4" /> Proceed to Checkout
                </Button>

                <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
                  By proceeding to checkout, you agree to our{" "}
                  <Link href="/terms" className="underline hover:text-gray-700 dark:hover:text-gray-300">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="underline hover:text-gray-700 dark:hover:text-gray-300">
                    Privacy Policy
                  </Link>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
