"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Eye, EyeOff, AlertCircle, CheckCircle2 } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function ResetPasswordForm() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isResetComplete, setIsResetComplete] = useState(false)
  const [hasResetToken, setHasResetToken] = useState(false)
  const { resetPassword } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    // Check if the URL contains a reset token
    // We're using window directly instead of useSearchParams() to avoid build errors
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search)
      const type = urlParams.get("type")
      const code = urlParams.get("code")

      if (type === "recovery" && code) {
        setHasResetToken(true)
      } else {
        setHasResetToken(false)
        toast({
          title: "Invalid or missing reset token",
          description: "Please use the link from your email or request a new password reset",
          variant: "destructive",
        })
      }
    }
  }, [toast])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validate password
    if (password.length < 8) {
      toast({
        title: "Password too short",
        description: "Password must be at least 8 characters long",
        variant: "destructive",
      })
      return
    }

    // Validate password confirmation
    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please ensure both passwords match",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const { error, success } = await resetPassword(password)

      if (error) {
        throw error
      }

      if (success) {
        setIsResetComplete(true)
        toast({
          title: "Password reset successful",
          description: "Your password has been reset successfully",
        })
      }
    } catch (error) {
      console.error("Password reset error:", error)
      toast({
        title: "Password reset failed",
        description: error instanceof Error ? error.message : "Please try again or contact support",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRedirectToLogin = () => {
    router.push("/auth/login")
  }

  if (!hasResetToken && !isResetComplete) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <CardDescription>Invalid or missing reset token</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-yellow-50 p-4 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">Reset link invalid</h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>The password reset link is invalid or has expired. Please request a new one.</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/auth/forgot-password">
            <Button>Request New Reset Link</Button>
          </Link>
        </CardFooter>
      </Card>
    )
  }

  if (isResetComplete) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Password Reset Complete</CardTitle>
          <CardDescription>Your password has been successfully reset</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-green-50 p-4 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">Success</h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>Your password has been successfully reset. You can now log in with your new password.</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={handleRedirectToLogin}>Go to Login</Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Reset Your Password</CardTitle>
        <CardDescription>Create a new password for your account</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">New Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={8}
                disabled={isSubmitting}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <p className="text-xs text-gray-500">Password must be at least 8 characters long</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
              disabled={isSubmitting}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Resetting Password
              </>
            ) : (
              "Reset Password"
            )}
          </Button>
          <p className="text-sm text-center text-gray-600">
            Remember your password?{" "}
            <Link href="/auth/login" className="text-blue-600 hover:text-blue-800 font-medium">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}
