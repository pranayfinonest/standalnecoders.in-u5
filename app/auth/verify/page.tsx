import { Suspense } from "react"
import { getServerSearchParam } from "@/utils/server-params"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import VerifyFormClient from "@/components/auth/verify-form-client"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Verify Email - StandaloneCoders",
  description: "Verify your email address to complete your registration",
}

export default function VerifyPage() {
  // Get email from server-side search params
  const email = getServerSearchParam("email")

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <Suspense
          fallback={
            <div className="w-full max-w-md mx-auto p-8 rounded-lg border border-gray-200 animate-pulse">
              <div className="h-8 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-8 w-3/4"></div>
              <div className="h-10 bg-gray-200 rounded mb-6"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          }
        >
          {email ? (
            <VerifyFormClient initialEmail={email} />
          ) : (
            <Card className="w-full max-w-md mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl">Verify Your Email</CardTitle>
                <CardDescription>Please enter your email address to receive a verification code.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" name="email" type="email" placeholder="Enter your email address" required />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <a href="/auth/register">Back to Registration</a>
                </Button>
              </CardFooter>
            </Card>
          )}
        </Suspense>
      </div>
    </div>
  )
}
