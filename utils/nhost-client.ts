"use client"

import { useState, useEffect } from "react"
import nhost from "./nhost"

// Simple client-side utility for Nhost operations
export function useNhostClient() {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Check authentication status on mount
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/user", {
          credentials: "include",
        })

        if (response.ok) {
          const userData = await response.json()
          setUser(userData)
          setIsAuthenticated(true)
        } else {
          setUser(null)
          setIsAuthenticated(false)
        }
      } catch (error) {
        console.error("Error checking auth status:", error)
        setUser(null)
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  return {
    isLoading,
    isAuthenticated,
    user,
  }
}

// Function to handle Nhost webhook verification
export function verifyNhostWebhook(signature: string, payload: string): boolean {
  // This should be implemented on the server side
  // Client-side placeholder
  return true
}

export function createClientNhostClient() {
  return nhost
}
