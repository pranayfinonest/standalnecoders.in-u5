import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export const metadata = {
  title: "Verify Email - StandaloneCoders",
  description: "Verify your email address to complete your registration",
}

export default function VerifyStaticPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Verify Your Email</CardTitle>
            <CardDescription>
              We've sent a verification code to your email. Please check your inbox and click the verification link.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              If you didn't receive an email, please check your spam folder or contact our support team.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button asChild className="w-full">
              <Link href="/auth/login">Return to Login</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/contact">Contact Support</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
