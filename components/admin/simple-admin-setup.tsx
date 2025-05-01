"use client"

import { useState } from "react"
import { setupAdminUser } from "@/app/actions/setup-admin"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function SimpleAdminSetup() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleSetup = async () => {
    setLoading(true)
    setError("")

    try {
      const result = await setupAdminUser()

      if (result.success) {
        setSuccess(true)
        setTimeout(() => {
          router.push("/admin/login")
        }, 3000)
      } else {
        setError(result.error || "Failed to set up admin user")
      }
    } catch (err) {
      console.error("Error setting up admin:", err)
      setError("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-900">Admin Setup</h1>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

        {success ? (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
            Admin user created successfully! Redirecting to login page...
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-700">This will create an admin user with the following credentials:</p>
            <div className="bg-gray-50 p-4 rounded border">
              <p>
                <strong>Email:</strong> standalonecoders@gmail.com
              </p>
              <p>
                <strong>Password:</strong> [Predefined secure password]
              </p>
            </div>
            <p className="text-sm text-gray-500">
              Note: This setup can only be performed once. After the admin is created, this page will no longer be
              accessible.
            </p>
            <button
              onClick={handleSetup}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin h-4 w-4 mr-2" /> Setting up admin...
                </>
              ) : (
                "Set Up Admin"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
