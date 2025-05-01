"use client"

import { useState, useEffect } from "react"

export interface ServiceItem {
  id: string
  title: string
  price: string
  description?: string
  features?: string[]
  image?: string
  category: string
  packageType: string
}

// Custom hook for cart management
export function useCart() {
  const [cartItems, setCartItems] = useState<ServiceItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load cart from localStorage on component mount
  useEffect(() => {
    const storedCart = localStorage.getItem("serviceCart")
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart))
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error)
      }
    }
    setIsLoaded(true)
  }, [])

  // Update localStorage whenever cart changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("serviceCart", JSON.stringify(cartItems))
    }
  }, [cartItems, isLoaded])

  // Add item to cart
  const addToCart = (item: ServiceItem) => {
    // Check if item already exists in cart
    const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id)

    if (existingItemIndex >= 0) {
      // Item already in cart, show notification or handle as needed
      return false
    } else {
      // Add new item to cart
      setCartItems((prev) => [...prev, item])
      return true
    }
  }

  // Remove item from cart
  const removeFromCart = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId))
  }

  // Clear entire cart
  const clearCart = () => {
    setCartItems([])
  }

  // Get cart count
  const getCartCount = () => {
    return cartItems.length
  }

  return {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getCartCount,
    isLoaded,
  }
}

// Function to format price string to number
export function priceStringToNumber(priceString: string): number {
  // Remove currency symbol, commas and any other non-numeric characters except decimal point
  const numericString = priceString.replace(/[^\d.]/g, "")
  return Number.parseFloat(numericString)
}

// Function to generate a unique ID
export function generateId(prefix = "service"): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}
