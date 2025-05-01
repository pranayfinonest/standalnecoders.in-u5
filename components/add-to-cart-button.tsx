"use client"

import { useState } from "react"
import { ShoppingCart, Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useCart, type ServiceItem, generateId } from "@/utils/cart"

interface AddToCartButtonProps {
  service: {
    title: string
    price: string
    features?: string[]
    description?: string
    image?: string
  }
  category: string
  packageType: string
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  className?: string
}

export default function AddToCartButton({
  service,
  category,
  packageType,
  variant = "default",
  className = "",
}: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [isAdded, setIsAdded] = useState(false)
  const { addToCart } = useCart()
  const { toast } = useToast()

  const handleAddToCart = () => {
    setIsAdding(true)

    // Create service item
    const serviceItem: ServiceItem = {
      id: generateId(),
      title: service.title,
      price: service.price,
      description: service.description,
      features: service.features,
      image: service.image,
      category,
      packageType,
    }

    // Simulate network delay
    setTimeout(() => {
      const added = addToCart(serviceItem)

      if (added) {
        setIsAdded(true)
        toast({
          title: "Added to cart",
          description: `${service.title} has been added to your cart.`,
        })

        // Reset button after 2 seconds
        setTimeout(() => {
          setIsAdded(false)
        }, 2000)
      } else {
        toast({
          title: "Already in cart",
          description: `${service.title} is already in your cart.`,
          variant: "destructive",
        })
      }

      setIsAdding(false)
    }, 600)
  }

  return (
    <Button onClick={handleAddToCart} disabled={isAdding || isAdded} variant={variant} className={className}>
      {isAdding ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Adding...
        </>
      ) : isAdded ? (
        <>
          <Check className="mr-2 h-4 w-4" />
          Added to Cart
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </>
      )}
    </Button>
  )
}
