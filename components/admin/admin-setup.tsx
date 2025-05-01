"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2 } from "lucide-react"

export default function AdminSetup() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("standalonecoders@gmail.com")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSetup = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    console.log("Starting admin setup process...")

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    try {
      console.log("Checking if admin already exists...")
      // Check if admin already exists
      const { data: existingAdmins, error: checkError } = await supabase.from("admin_users").select("id").limit(1)

      if (checkError) {
        console.error("Error checking existing admins:", checkError)
        throw checkError
      }

      if (existingAdmins && existingAdmins.length > 0) {
        throw new Error("Admin user already exists. Please use the login page.")
      }

      console.log("Creating user in auth...")
      // Create user in auth
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      })

      if (signUpError) {
        console.error("Sign up error:", signUpError)
        throw signUpError
      }

      if (data?.user) {
        console.log("User created, adding to admin_users table...")
        // Add user to admin_users table
        const { error: insertError } = await supabase.from("admin_users").insert([
          {
            id: data.user.id,
            email,
            name,
            role: "admin",
          },
        ])

        if (insertError) {
          console.error("Insert error:", insertError)
          throw insertError
        }

        console.log("Admin setup successful!")
        setSuccess(true)
        setTimeout(() => {
          router.push("/admin/login")
        }, 3000)
      }
    } catch (error) {
      console.error("Setup error:", error)
      setError(error.message || "Failed to set up admin account.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Admin Setup</CardTitle>
          <CardDescription>Create your admin account to manage your website</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success ? (
            <Alert className="mb-4 bg-green-50 border-green-200">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <AlertDescription>Admin account created successfully! Redirecting to login page...</AlertDescription>
            </Alert>
          ) : (
            <form onSubmit={handleSetup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="standalonecoders@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
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
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
                onClick={(e) => {
                  if (!isLoading) handleSetup(e)
                }}
              >
                {isLoading ? "Creating Account..." : "Create Admin Account"}
              </Button>
            </form>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-gray-500">
            Already have an admin account?{" "}
            <a href="/admin/login" className="text-blue-600 hover:underline">
              Login
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
