"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, ArrowLeft } from "lucide-react"
import Link from "next/link"
import ProfileSkeleton from "@/components/profile/profile-skeleton"

export default function CartPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return <ProfileSkeleton />
  }

  if (!user) {
    return null
  }

  // This would typically come from a cart context or API
  const cartItems = []

  return (
    <div className="container max-w-5xl py-8 px-4 md:px-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link href="/profile">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Profile
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">My Cart</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Shopping Cart</CardTitle>
          <CardDescription>Items you've added to your cart</CardDescription>
        </CardHeader>
        <CardContent>
          {cartItems.length > 0 ? (
            <div>
              {/* Cart items would go here */}
              <p>You have {cartItems.length} items in your cart.</p>
            </div>
          ) : (
            <div className="text-center py-8">
              <ShoppingCart className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
              <Button asChild>
                <Link href="/booking/templates">Browse Templates</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
