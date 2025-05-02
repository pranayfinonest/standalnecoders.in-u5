"use client"

import { useState, useEffect } from "react"
import { createClientSupabaseClient } from "./supabase"
import { v4 as uuidv4 } from "uuid"
import { useAuth } from "@/contexts/auth-context"

export interface CartItem {
  id: string
  product_id: number
  name: string
  price: number
  quantity: number
  image_url?: string
  customizations?: any
}

// Get cart from localStorage
export const getLocalCart = (): CartItem[] => {
  if (typeof window === "undefined") return []

  try {
    const cart = localStorage.getItem("cart")
    return cart ? JSON.parse(cart) : []
  } catch (error) {
    console.error("Error getting cart from localStorage:", error)
    return []
  }
}

// Save cart to localStorage
export const saveLocalCart = (cart: CartItem[]): void => {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem("cart", JSON.stringify(cart))
  } catch (error) {
    console.error("Error saving cart to localStorage:", error)
  }
}

// Get or create session ID for guest users
export const getSessionId = (): string => {
  if (typeof window === "undefined") return ""

  let sessionId = localStorage.getItem("cartSessionId")

  if (!sessionId) {
    sessionId = uuidv4()
    localStorage.setItem("cartSessionId", sessionId)
  }

  return sessionId
}

// Custom hook for cart management
export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()
  const supabase = createClientSupabaseClient()

  // Load cart on component mount
  useEffect(() => {
    const loadCart = async () => {
      setIsLoading(true)

      if (user) {
        // User is logged in, fetch cart from database
        await syncLocalCartToDatabase()
        await fetchCartFromDatabase()
      } else {
        // User is not logged in, use localStorage
        const localCart = getLocalCart()
        setCart(localCart)
      }

      setIsLoading(false)
    }

    loadCart()
  }, [user])

  // Fetch cart from database
  const fetchCartFromDatabase = async () => {
    if (!user || !supabase) return

    try {
      // First get the user's cart
      const { data: cartData, error: cartError } = await supabase
        .from("carts")
        .select("id")
        .eq("user_id", user.id)
        .single()

      if (cartError && cartError.code !== "PGRST116") {
        console.error("Error fetching cart:", cartError)
        return
      }

      if (!cartData) {
        // No cart found, create one
        const { data: newCart, error: createError } = await supabase
          .from("carts")
          .insert({ user_id: user.id })
          .select("id")
          .single()

        if (createError) {
          console.error("Error creating cart:", createError)
          return
        }

        setCart([])
        return
      }

      // Now get the cart items
      const { data: items, error: itemsError } = await supabase
        .from("cart_items")
        .select(`
          id,
          quantity,
          customizations,
          products (
            id,
            name,
            price,
            image_url
          )
        `)
        .eq("cart_id", cartData.id)

      if (itemsError) {
        console.error("Error fetching cart items:", itemsError)
        return
      }

      // Transform the data to match our CartItem interface
      const cartItems: CartItem[] = items.map((item) => ({
        id: item.id,
        product_id: item.products.id,
        name: item.products.name,
        price: item.products.price,
        quantity: item.quantity,
        image_url: item.products.image_url,
        customizations: item.customizations,
      }))

      setCart(cartItems)
    } catch (error) {
      console.error("Error in fetchCartFromDatabase:", error)
    }
  }

  // Sync localStorage cart to database when user logs in
  const syncLocalCartToDatabase = async () => {
    if (!user || !supabase) return

    try {
      const localCart = getLocalCart()
      if (localCart.length === 0) return

      // Get or create user cart
      const { data: cartData, error: cartError } = await supabase
        .from("carts")
        .select("id")
        .eq("user_id", user.id)
        .single()

      let cartId: string

      if (cartError && cartError.code === "PGRST116") {
        // No cart found, create one
        const { data: newCart, error: createError } = await supabase
          .from("carts")
          .insert({ user_id: user.id })
          .select("id")
          .single()

        if (createError) {
          console.error("Error creating cart:", createError)
          return
        }

        cartId = newCart.id
      } else if (cartError) {
        console.error("Error fetching cart:", cartError)
        return
      } else {
        cartId = cartData.id
      }

      // Add local cart items to database
      for (const item of localCart) {
        // Check if product exists
        const { data: productData, error: productError } = await supabase
          .from("products")
          .select("id")
          .eq("id", item.product_id)
          .single()

        if (productError) {
          console.error(`Product ${item.product_id} not found:`, productError)
          continue
        }

        // Check if item already exists in cart
        const { data: existingItem, error: existingError } = await supabase
          .from("cart_items")
          .select("id, quantity")
          .eq("cart_id", cartId)
          .eq("product_id", item.product_id)
          .single()

        if (existingError && existingError.code !== "PGRST116") {
          console.error("Error checking existing item:", existingError)
          continue
        }

        if (existingItem) {
          // Update quantity
          await supabase
            .from("cart_items")
            .update({
              quantity: existingItem.quantity + item.quantity,
              customizations: item.customizations || null,
            })
            .eq("id", existingItem.id)
        } else {
          // Insert new item
          await supabase.from("cart_items").insert({
            cart_id: cartId,
            product_id: item.product_id,
            quantity: item.quantity,
            customizations: item.customizations || null,
          })
        }
      }

      // Clear local cart after syncing
      localStorage.removeItem("cart")
    } catch (error) {
      console.error("Error in syncLocalCartToDatabase:", error)
    }
  }

  // Add item to cart
  const addToCart = async (item: Omit<CartItem, "id">) => {
    try {
      if (user && supabase) {
        // User is logged in, add to database
        // Get user's cart
        const { data: cartData, error: cartError } = await supabase
          .from("carts")
          .select("id")
          .eq("user_id", user.id)
          .single()

        let cartId: string

        if (cartError && cartError.code === "PGRST116") {
          // No cart found, create one
          const { data: newCart, error: createError } = await supabase
            .from("carts")
            .insert({ user_id: user.id })
            .select("id")
            .single()

          if (createError) {
            console.error("Error creating cart:", createError)
            return false
          }

          cartId = newCart.id
        } else if (cartError) {
          console.error("Error fetching cart:", cartError)
          return false
        } else {
          cartId = cartData.id
        }

        // Check if item already exists in cart
        const { data: existingItem, error: existingError } = await supabase
          .from("cart_items")
          .select("id, quantity")
          .eq("cart_id", cartId)
          .eq("product_id", item.product_id)
          .single()

        if (existingError && existingError.code !== "PGRST116") {
          console.error("Error checking existing item:", existingError)
          return false
        }

        if (existingItem) {
          // Update quantity
          const { error: updateError } = await supabase
            .from("cart_items")
            .update({
              quantity: existingItem.quantity + item.quantity,
              customizations: item.customizations || null,
            })
            .eq("id", existingItem.id)

          if (updateError) {
            console.error("Error updating cart item:", updateError)
            return false
          }
        } else {
          // Insert new item
          const { error: insertError } = await supabase.from("cart_items").insert({
            cart_id: cartId,
            product_id: item.product_id,
            quantity: item.quantity,
            customizations: item.customizations || null,
          })

          if (insertError) {
            console.error("Error adding item to cart:", insertError)
            return false
          }
        }

        // Refresh cart
        await fetchCartFromDatabase()
        return true
      } else {
        // User is not logged in, use localStorage
        const localCart = getLocalCart()
        const existingItemIndex = localCart.findIndex((i) => i.product_id === item.product_id)

        if (existingItemIndex >= 0) {
          // Update quantity
          localCart[existingItemIndex].quantity += item.quantity
        } else {
          // Add new item
          localCart.push({
            ...item,
            id: uuidv4(),
          })
        }

        saveLocalCart(localCart)
        setCart(localCart)
        return true
      }
    } catch (error) {
      console.error("Error in addToCart:", error)
      return false
    }
  }

  // Update item quantity
  const updateQuantity = async (itemId: string, quantity: number) => {
    try {
      if (quantity <= 0) {
        return removeFromCart(itemId)
      }

      if (user && supabase) {
        // User is logged in, update in database
        const { error } = await supabase.from("cart_items").update({ quantity }).eq("id", itemId)

        if (error) {
          console.error("Error updating cart item:", error)
          return false
        }

        // Refresh cart
        await fetchCartFromDatabase()
        return true
      } else {
        // User is not logged in, update in localStorage
        const localCart = getLocalCart()
        const itemIndex = localCart.findIndex((i) => i.id === itemId)

        if (itemIndex >= 0) {
          localCart[itemIndex].quantity = quantity
          saveLocalCart(localCart)
          setCart(localCart)
          return true
        }

        return false
      }
    } catch (error) {
      console.error("Error in updateQuantity:", error)
      return false
    }
  }

  // Remove item from cart
  const removeFromCart = async (itemId: string) => {
    try {
      if (user && supabase) {
        // User is logged in, remove from database
        const { error } = await supabase.from("cart_items").delete().eq("id", itemId)

        if (error) {
          console.error("Error removing cart item:", error)
          return false
        }

        // Refresh cart
        await fetchCartFromDatabase()
        return true
      } else {
        // User is not logged in, remove from localStorage
        const localCart = getLocalCart()
        const updatedCart = localCart.filter((i) => i.id !== itemId)
        saveLocalCart(updatedCart)
        setCart(updatedCart)
        return true
      }
    } catch (error) {
      console.error("Error in removeFromCart:", error)
      return false
    }
  }

  // Clear cart
  const clearCart = async () => {
    try {
      if (user && supabase) {
        // User is logged in, clear database cart
        // First get the user's cart
        const { data: cartData, error: cartError } = await supabase
          .from("carts")
          .select("id")
          .eq("user_id", user.id)
          .single()

        if (cartError) {
          console.error("Error fetching cart:", cartError)
          return false
        }

        // Delete all items
        const { error } = await supabase.from("cart_items").delete().eq("cart_id", cartData.id)

        if (error) {
          console.error("Error clearing cart:", error)
          return false
        }

        setCart([])
        return true
      } else {
        // User is not logged in, clear localStorage
        localStorage.removeItem("cart")
        setCart([])
        return true
      }
    } catch (error) {
      console.error("Error in clearCart:", error)
      return false
    }
  }

  // Calculate cart total
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  // Get cart item count
  const getCartItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0)
  }

  return {
    cart,
    isLoading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartItemCount,
    refreshCart: fetchCartFromDatabase,
  }
}
