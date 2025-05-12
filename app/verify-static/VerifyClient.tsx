"use client"

import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { CheckCircle, XCircle } from "lucide-react"

export default function VerifyClient() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const email = searchParams.get("email")

  // In a real app, you would verify the token here or call an API
  const isValid = token && token.length > 10

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {isValid ? (
            <>
              <CheckCircle className="text-green-500" size={24} />
              Verification Successful
            </>
          ) : (
            <>
              <XCircle className="text-red-500" size={24} />
              Verification Failed
            </>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isValid ? (
          <p>
            {email
              ? `Your email (${email}) has been successfully verified.`
              : "Your email has been successfully verified."}
            You can now log in to your account.
          </p>
        ) : (
          <p>
            We couldn't verify your email address. The verification link may have expired or is invalid. Please request
            a new verification link.
          </p>
        )}
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        {isValid ? (
          <Button asChild className="w-full">
            <Link href="/auth/login">Log In</Link>
          </Button>
        ) : (
          <>
            <Button asChild className="w-full">
              <Link href="/auth/resend-verification">Resend Verification</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/auth/login">Back to Login</Link>
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  )
}
