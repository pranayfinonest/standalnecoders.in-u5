"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Loader2 } from "lucide-react"

export default function AdminRouteGuard({ children }: { children: React.ReactNode }) {
  const [isVerifying, setIsVerifying] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        // Check if user is authenticated
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (!session) {
          // Not authenticated, redirect to login
          router.push("/admin/login")
          return
        }

        // Check if user is in admin_users table
        const { data: adminData, error: adminError } = await supabase
          .from("admin_users")
          .select("*")
          .eq("id", session.user.id)
          .single()

        if (adminError || !adminData) {
          // Not an admin, redirect to home
          console.log("Not authorized as admin")
          router.push("/")
          return
        }

        // User is an admin
        setIsAdmin(true)
      } catch (error) {
        console.error("Error verifying admin status:", error)
        router.push("/admin/login")
      } finally {
        setIsVerifying(false)
      }
    }

    // Skip verification for login and setup pages
    if (pathname === "/admin/login" || pathname === "/admin/setup") {
      setIsVerifying(false)
      return
    }

    checkAdminStatus()
  }, [router, pathname, supabase])

  // Show loading state while verifying
  if (isVerifying) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-4" />
        <p className="text-gray-600">Verifying admin access...</p>
      </div>
    )
  }

  // Only render children if user is admin or on excluded pages
  if (isAdmin || pathname === "/admin/login" || pathname === "/admin/setup") {
    return <>{children}</>
  }

  // This should not be visible as router redirects should happen first
  return null
}
