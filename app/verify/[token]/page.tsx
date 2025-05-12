import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"

// This would be a server action to verify the token
async function verifyToken(token: string) {
  // In a real implementation, you would:
  // 1. Call your authentication service to verify the token
  // 2. Update the user's verification status in the database

  // Simulating a verification process
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // For demo purposes, let's consider tokens with "valid" in them as valid
  return token.includes("valid")
}

export default async function VerifyPage({ params }: { params: { token: string } }) {
  // Verify the token server-side
  const isValid = await verifyToken(params.token)

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-200px)]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Email Verification</CardTitle>
          <CardDescription>Verifying your account with token</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          {isValid ? (
            <>
              <div className="rounded-full bg-green-100 p-3">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-medium">Verification Successful</h3>
              <p className="text-center text-muted-foreground">
                Your email has been successfully verified. You can now access all features of your account.
              </p>
              <Button asChild className="w-full">
                <Link href="/auth/login">Continue to Login</Link>
              </Button>
            </>
          ) : (
            <>
              <div className="rounded-full bg-red-100 p-3">
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-medium">Verification Failed</h3>
              <p className="text-center text-muted-foreground">
                The verification link is invalid or has expired. Please request a new verification email.
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link href="/auth/resend-verification">Resend Verification Email</Link>
              </Button>
              <Button asChild className="w-full">
                <Link href="/auth/login">Back to Login</Link>
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
