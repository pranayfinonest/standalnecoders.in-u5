import AdminLoginForm from "@/components/admin/admin-login-form"
import type { Metadata } from "next"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Admin Login | StandaloneCoders",
  description: "Login to the admin dashboard",
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4">
          <a href="/" className="text-xl font-bold">
            <span className="text-blue-600">Standalone</span>
            <span className="text-gray-900">Coders</span>
          </a>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md">
          <AdminLoginForm />
        </div>
      </main>

      <footer className="bg-white py-4 border-t">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} StandaloneCoders. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
