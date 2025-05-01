"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight, CreditCard, Trash2, FileText, CheckCircle2, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { formatCurrency } from "@/utils/currency"

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

  const calculateTax = () => {
    return Math.round(calculateTotal() * 0.18) // 18% GST
  }

  const calculateGrandTotal = () => {
    return calculateTotal() + calculateTax()
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
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <ShoppingCart className="h-10 w-10 text-gray-400" />
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            You haven't added any website projects to your cart yet.
          </p>
          <Button asChild size="lg" className="px-8">
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
      <div className="max-w-7xl mx-auto">
        <Button variant="ghost" className="mb-6" asChild>
          <Link href="/booking/templates">
            <ArrowLeft className="mr-2 h-4 w-4" /> Continue Shopping
          </Link>
        </Button>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Your Cart</h1>
          <Badge variant="outline" className="text-base px-3 py-1">
            {cartItems.length} {cartItems.length === 1 ? "Item" : "Items"}
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="mb-8 overflow-hidden border-0 shadow-md">
              <CardHeader className="bg-gray-50 dark:bg-gray-800/50 px-6 py-4">
                <CardTitle className="text-lg">Cart Items</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {cartItems.map((item, index) => (
                  <div key={item.id} className={`p-6 ${index !== 0 ? "border-t" : ""}`}>
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="relative w-full md:w-1/4 aspect-video rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800">
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
                            <h3 className="font-bold text-xl mb-1">{item.template.name}</h3>
                            {item.pricingOption === "fixed" && (
                              <Badge className="bg-green-500 hover:bg-green-600">Complete Package</Badge>
                            )}
                            {item.pricingOption === "quotation" && (
                              <Badge className="bg-blue-500 hover:bg-blue-600">Custom Quotation</Badge>
                            )}
                          </div>
                          <p className="font-bold text-lg">{formatCurrency(item.price)}</p>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mt-2 mb-4">{item.template.description}</p>

                        <div className="space-y-2 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-md">
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
                                Custom quotation with budget: {formatCurrency(item.customizations.customBudget)}
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
                              {item.customizations.additionalPages?.length > 0 && (
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
                                variant="outline"
                                size="sm"
                                className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-red-800 dark:hover:bg-red-900/20"
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
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="border-0 shadow-md">
                <CardHeader className="bg-gray-50 dark:bg-gray-800/50 px-6 py-4">
                  <CardTitle className="text-lg">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                      <span className="font-medium">{formatCurrency(calculateTotal())}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">GST (18%)</span>
                      <span className="font-medium">{formatCurrency(calculateTax())}</span>
                    </div>

                    <Separator />

                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>{formatCurrency(calculateGrandTotal())}</span>
                    </div>
                  </div>

                  <Button className="w-full mt-6" size="lg" onClick={handleCheckout}>
                    <CreditCard className="mr-2 h-4 w-4" /> Proceed to Checkout
                  </Button>

                  <div className="mt-6 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-md">
                    <h4 className="font-medium mb-2 text-sm">We Accept</h4>
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-12 bg-blue-100 dark:bg-blue-900/20 rounded flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xs">
                        Visa
                      </div>
                      <div className="h-8 w-12 bg-red-100 dark:bg-red-900/20 rounded flex items-center justify-center text-red-600 dark:text-red-400 font-bold text-xs">
                        MC
                      </div>
                      <div className="h-8 w-12 bg-green-100 dark:bg-green-900/20 rounded flex items-center justify-center text-green-600 dark:text-green-400 font-bold text-xs">
                        UPI
                      </div>
                      <div className="h-8 w-12 bg-purple-100 dark:bg-purple-900/20 rounded flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold text-xs">
                        NB
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
                    By proceeding to checkout, you agree to our{" "}
                    <Link
                      href="/legal/terms-and-conditions"
                      className="underline hover:text-gray-700 dark:hover:text-gray-300"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/legal/privacy-policy"
                      className="underline hover:text-gray-700 dark:hover:text-gray-300"
                    >
                      Privacy Policy
                    </Link>
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
