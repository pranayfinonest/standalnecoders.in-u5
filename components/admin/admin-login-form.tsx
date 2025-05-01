"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Loader2 } from "lucide-react"

export default function AdminLoginForm() {
  const [email, setEmail] = useState("standalonecoders@gmail.com")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Only allow the specific admin email
      if (email !== "standalonecoders@gmail.com") {
        setError("Invalid admin credentials")
        return
      }

      // Sign in with Supabase
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        setError("Invalid credentials. Please try again.")
        console.error(signInError)
        return
      }

      // Check if user is in admin_users table
      const { data: adminData, error: adminError } = await supabase
        .from("admin_users")
        .select("*")
        .eq("id", data.user.id)
        .single()

      if (adminError || !adminData) {
        // Not an admin, sign out
        await supabase.auth.signOut()
        setError("This account is not authorized as an admin.")
        return
      }

      // Successful login, redirect to admin dashboard
      router.push("/admin")
      router.refresh()
    } catch (err) {
      setError("An error occurred. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-900">Admin Login</h1>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="standalonecoders@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            readOnly
          />
          <p className="text-xs text-gray-500 mt-1">Admin email is fixed for security reasons</p>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full flex items-center justify-center"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin h-4 w-4 mr-2" /> Logging in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
