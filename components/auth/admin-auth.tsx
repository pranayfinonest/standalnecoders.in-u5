"use client"

import type React from "react"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter, usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"

interface AdminAuthProps {
  children: React.ReactNode
}

export default function AdminAuth({ children }: AdminAuthProps) {
  const [loading, setLoading] = useState(true)
  const [authorized, setAuthorized] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        setLoading(true)

        // Get current user
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (!session) {
          // If no session, redirect to login
          router.push("/admin/login")
          return
        }

        // Check if user has admin role
        const { data: profile, error } = await supabase
          .from("admin_users")
          .select("role")
          .eq("user_id", session.user.id)
          .single()

        if (error || !profile || profile.role !== "admin") {
          // If user is not an admin, redirect to homepage
          router.push("/")
          return
        }

        setAuthorized(true)
      } catch (error) {
        console.error("Admin auth error:", error)
        router.push("/")
      } finally {
        setLoading(false)
      }
    }

    checkAdminStatus()
  }, [pathname, router, supabase])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-2 text-lg">Verifying access...</span>
      </div>
    )
  }

  if (!authorized) {
    return null // Router will redirect
  }

  return <>{children}</>
}
