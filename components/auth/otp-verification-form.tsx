"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/auth-context"

export default function OtpVerificationForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [otp, setOtp] = useState("")
  const [email, setEmail] = useState("")
  const [countdown, setCountdown] = useState(60)
  const router = useRouter()
  const { toast } = useToast()
  const { verifyOtp, resendOtp } = useAuth()

  useEffect(() => {
    // Get email from session storage
    const storedEmail = sessionStorage.getItem("verificationEmail")
    if (!storedEmail) {
      toast({
        title: "Error",
        description: "No email found for verification. Please try signing up again.",
        variant: "destructive",
      })
      router.push("/auth/register")
      return
    }
    setEmail(storedEmail)

    // Set up countdown timer
    let timer: NodeJS.Timeout
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1)
      }, 1000)
    }

    return () => {
      if (timer) clearInterval(timer)
    }
  }, [countdown, router, toast])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!otp.trim()) {
      toast({
        title: "OTP required",
        description: "Please enter the verification code sent to your email.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const { error, success } = await verifyOtp(email, otp, "signup")

      if (error) {
        toast({
          title: "Verification failed",
          description: error.message || "Invalid or expired verification code. Please try again.",
          variant: "destructive",
        })
        return
      }

      if (success) {
        toast({
          title: "Verification successful",
          description: "Your account has been verified. You can now log in.",
        })

        // Clear email from session storage
        sessionStorage.removeItem("verificationEmail")

        // Redirect to login page
        router.push("/auth/login")
      }
    } catch (error) {
      toast({
        title: "Verification failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOtp = async () => {
    setIsResending(true)

    try {
      const { error, success } = await resendOtp(email, "signup")

      if (error) {
        toast({
          title: "Failed to resend code",
          description: error.message || "Please try again later.",
          variant: "destructive",
        })
        return
      }

      if (success) {
        toast({
          title: "Verification code resent",
          description: "Please check your email for the new verification code.",
        })

        // Reset countdown
        setCountdown(60)
      }
    } catch (error) {
      toast({
        title: "Failed to resend code",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsResending(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Verify Your Email</CardTitle>
        <CardDescription>
          We've sent a verification code to {email}. Please enter it below to verify your account.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="otp">Verification Code</Label>
            <Input
              id="otp"
              name="otp"
              placeholder="Enter verification code"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              autoComplete="one-time-code"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              className="text-center text-lg tracking-widest"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying
              </>
            ) : (
              "Verify Email"
            )}
          </Button>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Didn't receive the code?</p>
            <Button
              type="button"
              variant="outline"
              onClick={handleResendOtp}
              disabled={isResending || countdown > 0}
              className="text-sm"
            >
              {isResending ? (
                <>
                  <Loader2 className="mr-2 h-3 w-3 animate-spin" /> Resending
                </>
              ) : countdown > 0 ? (
                `Resend code in ${countdown}s`
              ) : (
                "Resend verification code"
              )}
            </Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  )
}
