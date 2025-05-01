"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function SimpleAdminDashboard() {
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in as admin
    const adminLoggedIn = localStorage.getItem("adminLoggedIn")
    if (!adminLoggedIn) {
      router.push("/admin/login")
    } else {
      setIsAdmin(true)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn")
    router.push("/admin/login")
  }

  if (!isAdmin) {
    return <div className="p-8 text-center">Checking authentication...</div>
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold text-blue-600">StandaloneCoders Admin</span>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="px-4 py-8 sm:px-0">
              <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
                <div className="text-center">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Welcome to the Admin Dashboard</h2>
                  <p className="text-gray-600 mb-6">This is a simplified admin dashboard for demonstration purposes.</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                      <div className="px-4 py-5 sm:p-6">
                        <h3 className="text-lg font-medium text-gray-900">Users</h3>
                        <p className="mt-1 text-3xl font-semibold text-gray-900">12</p>
                      </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                      <div className="px-4 py-5 sm:p-6">
                        <h3 className="text-lg font-medium text-gray-900">Orders</h3>
                        <p className="mt-1 text-3xl font-semibold text-gray-900">8</p>
                      </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                      <div className="px-4 py-5 sm:p-6">
                        <h3 className="text-lg font-medium text-gray-900">Revenue</h3>
                        <p className="mt-1 text-3xl font-semibold text-gray-900">₹45,000</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
