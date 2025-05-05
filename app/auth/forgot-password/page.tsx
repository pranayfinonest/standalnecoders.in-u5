"use client"

import type React from "react"

import { useState, useEffect, Suspense } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { AlertCircle, ArrowLeft, CheckCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useSearchParams } from "next/navigation"
import OtpInput from "@/components/auth/otp-input"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isResetting, setIsResetting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [step, setStep] = useState<"email" | "otp" | "password" | "success">("email")
  const [countdown, setCountdown] = useState(60)
  const { forgotPassword, verifyOtp, resetPassword, resendOtp } = useAuth()
  const searchParams = useSearchParams()

  // Create a client component that uses searchParams
  function SearchParamsHandler({ setError }: { setError: (error: string | null) => void }) {
    const searchParams = useSearchParams()

    useEffect(() => {
      const urlError = searchParams?.get("error")
      if (urlError) {
        setError(decodeURIComponent(urlError))
      }
    }, [searchParams, setError])

    return null
  }

  // Handle countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null

    if (step === "otp" && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1)
      }, 1000)
    }

    return () => {
      if (timer) clearInterval(timer)
    }
  }, [step, countdown])

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      console.log("Requesting password reset OTP for:", email)
      const { error, success } = await forgotPassword(email)

      if (error) {
        setError(error.message)
        return
      }

      // Store email in session storage for OTP verification
      sessionStorage.setItem("resetEmail", email)

      // Move to OTP verification step
      setStep("otp")
      setCountdown(60)
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsVerifying(true)
    setError(null)

    if (!otp || otp.length < 6) {
      setError("Please enter a valid verification code")
      setIsVerifying(false)
      return
    }

    try {
      const { error, success } = await verifyOtp(email, otp, "recovery")

      if (error) {
        setError(error.message || "Invalid or expired verification code")
        return
      }

      // Move to password reset step
      setStep("password")
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
      console.error(err)
    } finally {
      setIsVerifying(false)
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsResetting(true)
    setError(null)

    // Validate passwords
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsResetting(false)
      return
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long")
      setIsResetting(false)
      return
    }

    try {
      const { error, success } = await resetPassword(password)

      if (error) {
        setError(error.message)
        return
      }

      // Clear stored email
      sessionStorage.removeItem("resetEmail")

      // Move to success step
      setStep("success")
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
      console.error(err)
    } finally {
      setIsResetting(false)
    }
  }

  const handleResendOtp = async () => {
    setError(null)

    try {
      const { error, success } = await resendOtp(email, "recovery")

      if (error) {
        setError(error.message)
        return
      }

      // Reset countdown
      setCountdown(60)
    } catch (err) {
      setError("Failed to resend verification code")
      console.error(err)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Suspense fallback={null}>
        <SearchParamsHandler setError={setError} />
      </Suspense>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {step === "email" && "Reset Password"}
            {step === "otp" && "Verify Your Email"}
            {step === "password" && "Set New Password"}
            {step === "success" && "Password Reset Complete"}
          </CardTitle>
          <CardDescription className="text-center">
            {step === "email" && "Enter your email address to receive a verification code"}
            {step === "otp" && `Enter the verification code sent to ${email}`}
            {step === "password" && "Create a new password for your account"}
            {step === "success" && "Your password has been successfully reset"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {step === "email" && (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full"
                  placeholder="your.email@example.com"
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                  </>
                ) : (
                  "Send Verification Code"
                )}
              </Button>
            </form>
          )}

          {step === "otp" && (
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp" className="block text-center mb-2">
                  Enter Verification Code
                </Label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  renderInput={(props) => <Input {...props} className="w-12 h-12 text-center text-lg" />}
                  containerStyle="flex justify-center gap-2"
                  inputStyle={{
                    width: "3rem",
                    height: "3rem",
                    fontSize: "1.5rem",
                    textAlign: "center",
                  }}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isVerifying || otp.length < 6}>
                {isVerifying ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying...
                  </>
                ) : (
                  "Verify Code"
                )}
              </Button>
              <div className="text-center mt-4">
                <p className="text-sm text-gray-500 mb-2">Didn't receive the code?</p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleResendOtp}
                  disabled={countdown > 0}
                  className="text-xs"
                >
                  {countdown > 0 ? `Resend in ${countdown}s` : "Resend Code"}
                </Button>
              </div>
            </form>
          )}

          {step === "password" && (
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full"
                  placeholder="••••••••"
                  minLength={8}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="block w-full"
                  placeholder="••••••••"
                  minLength={8}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isResetting}>
                {isResetting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...
                  </>
                ) : (
                  "Reset Password"
                )}
              </Button>
            </form>
          )}

          {step === "success" && (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <AlertTitle className="text-green-800">Success!</AlertTitle>
              <AlertDescription className="text-green-700">
                Your password has been reset successfully. You can now log in with your new password.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          {step === "success" ? (
            <Link href="/auth/login" className="w-full">
              <Button variant="default" className="w-full">
                Go to Login
              </Button>
            </Link>
          ) : (
            <Link href="/auth/login" className="flex items-center text-sm text-gray-600 hover:text-gray-900">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to login
            </Link>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
