import type React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Legal Information | StandaloneCoders",
  description: "Legal information, policies, and terms for StandaloneCoders.",
}

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link href="/legal" className="hover:text-blue-600 dark:hover:text-blue-400">
              Legal
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-gray-900 dark:text-gray-200 font-medium">Policies</span>
          </div>
        </div>
      </div>

      <main>{children}</main>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Other Legal Documents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/legal/privacy-policy"
              className="p-4 bg-white dark:bg-gray-700 rounded-md shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-medium">Privacy Policy</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">How we collect and use your information</p>
            </Link>
            <Link
              href="/legal/terms-and-conditions"
              className="p-4 bg-white dark:bg-gray-700 rounded-md shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-medium">Terms and Conditions</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Rules for using our website and services</p>
            </Link>
            <Link
              href="/legal/cancellation-refund-policy"
              className="p-4 bg-white dark:bg-gray-700 rounded-md shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-medium">Cancellation & Refund Policy</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Our policies on cancellations and refunds</p>
            </Link>
            <Link
              href="/legal/shipping-delivery-policy"
              className="p-4 bg-white dark:bg-gray-700 rounded-md shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-medium">Shipping & Delivery Policy</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">How we deliver our digital services</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
