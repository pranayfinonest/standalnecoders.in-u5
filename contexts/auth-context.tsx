"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import type { Session, User } from "@supabase/supabase-js"
import { createClientSupabaseClient } from "@/utils/supabase"
import { useRouter } from "next/navigation"

type AuthContextType = {
  user: User | null
  session: Session | null
  isLoading: boolean
  signUp: (
    email: string,
    password: string,
    metadata?: { name?: string },
  ) => Promise<{
    error: Error | null
    success: boolean
  }>
  signIn: (
    email: string,
    password: string,
  ) => Promise<{
    error: Error | null
    success: boolean
  }>
  verifyOtp: (
    email: string,
    token: string,
    type: "signup" | "recovery" | "invite",
  ) => Promise<{
    error: Error | null
    success: boolean
  }>
  resendOtp: (
    email: string,
    type: "signup" | "recovery" | "invite",
  ) => Promise<{
    error: Error | null
    success: boolean
  }>
  signOut: () => Promise<void>
  refreshSession: () => Promise<void>
  forgotPassword: (email: string) => Promise<{
    error: Error | null
    success: boolean
  }>
  resetPassword: (password: string) => Promise<{
    error: Error | null
    success: boolean
  }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const supabase = createClientSupabaseClient()

  useEffect(() => {
    if (!supabase) {
      console.error("Supabase client not initialized")
      setIsLoading(false)
      return
    }

    // Get initial session
    const initializeAuth = async () => {
      setIsLoading(true)
      try {
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          console.error("Error getting session:", error)
          return
        }

        setSession(data.session)
        setUser(data.session?.user || null)

        // Set up auth state change listener
        const { data: authListener } = supabase.auth.onAuthStateChange((event, newSession) => {
          console.log(`Auth state changed: ${event}`)
          setSession(newSession)
          setUser(newSession?.user || null)
          router.refresh()
        })

        return () => {
          authListener.subscription.unsubscribe()
        }
      } catch (error) {
        console.error("Error initializing auth:", error)
      } finally {
        setIsLoading(false)
      }
    }

    initializeAuth()
  }, [supabase, router])

  const signUp = async (email: string, password: string, metadata?: { name?: string }) => {
    if (!supabase) return { error: new Error("Supabase client not initialized"), success: false }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) throw error

      return { error: null, success: true }
    } catch (error) {
      console.error("Error signing up:", error)
      return { error: error as Error, success: false }
    }
  }

  const signIn = async (email: string, password: string) => {
    if (!supabase) return { error: new Error("Supabase client not initialized"), success: false }

    try {
      console.log("Attempting to sign in with:", { email })
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error("Supabase auth error:", error)
        throw error
      }

      console.log("Sign in successful:", data)
      return { error: null, success: true }
    } catch (error) {
      console.error("Error signing in:", error)
      return { error: error as Error, success: false }
    }
  }

  const verifyOtp = async (email: string, token: string, type: "signup" | "recovery" | "invite") => {
    if (!supabase) return { error: new Error("Supabase client not initialized"), success: false }

    try {
      console.log(`Verifying OTP for ${email} with type ${type}`)
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token,
        type,
      })

      if (error) {
        console.error("OTP verification error:", error)
        throw error
      }

      console.log("OTP verification successful:", data)
      return { error: null, success: true }
    } catch (error) {
      console.error("Error verifying OTP:", error)
      return { error: error as Error, success: false }
    }
  }

  const resendOtp = async (email: string, type: "signup" | "recovery" | "invite") => {
    if (!supabase) return { error: new Error("Supabase client not initialized"), success: false }

    try {
      console.log(`Resending OTP for ${email} with type ${type}`)
      const { data, error } = await supabase.auth.resend({
        type,
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        console.error("OTP resend error:", error)
        throw error
      }

      console.log("OTP resend successful")
      return { error: null, success: true }
    } catch (error) {
      console.error("Error resending OTP:", error)
      return { error: error as Error, success: false }
    }
  }

  const signOut = async () => {
    if (!supabase) return

    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error("Error signing out:", error)
        return
      }
      router.push("/auth/login")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  const refreshSession = async () => {
    if (!supabase) return

    try {
      const { data, error } = await supabase.auth.getSession()
      if (error) {
        console.error("Error refreshing session:", error)
        return
      }
      setSession(data.session)
      setUser(data.session?.user || null)
    } catch (error) {
      console.error("Error refreshing session:", error)
    }
  }

  const forgotPassword = async (email: string) => {
    if (!supabase) return { error: new Error("Supabase client not initialized"), success: false }

    try {
      console.log("Requesting password reset OTP for:", email)

      // For OTP-based password reset, we use the resend method with type 'recovery'
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        // We're not using redirectTo here since we're handling OTP verification in our app
      })

      if (error) {
        console.error("Password reset request error:", error)
        throw error
      }

      return { error: null, success: true }
    } catch (error) {
      console.error("Error sending password reset email:", error)
      return { error: error as Error, success: false }
    }
  }

  const resetPassword = async (password: string) => {
    if (!supabase) return { error: new Error("Supabase client not initialized"), success: false }

    try {
      console.log("Attempting to reset password")
      const { error } = await supabase.auth.updateUser({
        password,
      })

      if (error) {
        console.error("Password update error:", error)
        throw error
      }

      return { error: null, success: true }
    } catch (error) {
      console.error("Error resetting password:", error)
      return { error: error as Error, success: false }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        signUp,
        signIn,
        verifyOtp,
        resendOtp,
        signOut,
        refreshSession,
        forgotPassword,
        resetPassword,
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
