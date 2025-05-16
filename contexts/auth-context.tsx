"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

// Define User type based on Nhost user structure
type User = {
  id: string
  email: string
  displayName?: string
  metadata?: {
    name?: string
    avatar_url?: string
  }
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  signIn: (email: string, password: string) => Promise<{ error: Error | null; success: boolean }>
  signUp: (email: string, password: string, metadata?: any) => Promise<{ error: Error | null; success: boolean }>
  signOut: () => Promise<void>
  refreshSession: () => Promise<void>
  verifyOtp: (email: string, token: string, type: string) => Promise<{ error: Error | null; success: boolean }>
  resendOtp: (email: string, type: string) => Promise<{ error: Error | null; success: boolean }>
  forgotPassword: (email: string) => Promise<{ error: Error | null; success: boolean }>
  resetPassword: (password: string, token: string) => Promise<{ error: Error | null; success: boolean }>
  session: any
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Function to fetch user data from Nhost
  const fetchUserData = async () => {
    try {
      const response = await fetch("/api/auth/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })

      if (response.ok) {
        const userData = await response.json()
        setUser(userData)
        return true
      } else {
        setUser(null)
        return false
      }
    } catch (error) {
      console.error("Error fetching user data:", error)
      setUser(null)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        await fetchUserData()
        return { error: null, success: true }
      } else {
        const errorData = await response.json()
        return { error: new Error(errorData.message || "Sign in failed"), success: false }
      }
    } catch (error) {
      console.error("Sign in error:", error)
      return { error: error as Error, success: false }
    } finally {
      setIsLoading(false)
    }
  }

  const signUp = async (email: string, password: string, metadata?: any) => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, metadata }),
      })

      if (response.ok) {
        return { error: null, success: true }
      } else {
        const errorData = await response.json()
        return { error: new Error(errorData.message || "Sign up failed"), success: false }
      }
    } catch (error) {
      console.error("Sign up error:", error)
      return { error: error as Error, success: false }
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    try {
      await fetch("/api/auth/signout", {
        method: "POST",
        credentials: "include",
      })
    } catch (error) {
      console.error("Sign out error:", error)
    } finally {
      setUser(null)
      router.push("/auth/login")
    }
  }

  const refreshSession = async () => {
    await fetchUserData()
  }

  const verifyOtp = async (email: string, token: string, type: string) => {
    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, token, type }),
      })

      if (response.ok) {
        return { error: null, success: true }
      } else {
        const errorData = await response.json()
        return { error: new Error(errorData.message || "OTP verification failed"), success: false }
      }
    } catch (error) {
      console.error("OTP verification error:", error)
      return { error: error as Error, success: false }
    }
  }

  const resendOtp = async (email: string, type: string) => {
    try {
      const response = await fetch("/api/auth/resend-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, type }),
      })

      if (response.ok) {
        return { error: null, success: true }
      } else {
        const errorData = await response.json()
        return { error: new Error(errorData.message || "Failed to resend OTP"), success: false }
      }
    } catch (error) {
      console.error("Resend OTP error:", error)
      return { error: error as Error, success: false }
    }
  }

  const forgotPassword = async (email: string) => {
    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        return { error: null, success: true }
      } else {
        const errorData = await response.json()
        return { error: new Error(errorData.message || "Password reset request failed"), success: false }
      }
    } catch (error) {
      console.error("Forgot password error:", error)
      return { error: error as Error, success: false }
    }
  }

  const resetPassword = async (password: string, token: string) => {
    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, token }),
      })

      if (response.ok) {
        return { error: null, success: true }
      } else {
        const errorData = await response.json()
        return { error: new Error(errorData.message || "Password reset failed"), success: false }
      }
    } catch (error) {
      console.error("Reset password error:", error)
      return { error: error as Error, success: false }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        signIn,
        signUp,
        signOut,
        refreshSession,
        verifyOtp,
        resendOtp,
        forgotPassword,
        resetPassword,
        session: user ? { user } : null,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
