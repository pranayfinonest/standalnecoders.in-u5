import type { Metadata } from "next"
import Link from "next/link"
import { FileText, Shield, RefreshCw, Truck } from "lucide-react"

export const metadata: Metadata = {
  title: "Legal Information | StandaloneCoders",
  description: "Legal information, policies, and terms for StandaloneCoders.",
}

export default function LegalPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Legal Information</h1>

      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        At StandaloneCoders, we are committed to transparency and compliance with all applicable laws and regulations.
        Below you'll find our legal policies and documents that govern the use of our website and services.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <Link
          href="/legal/privacy-policy"
          className="flex flex-col p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center mb-4">
            <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
            <h2 className="text-xl font-semibold">Privacy Policy</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Learn how we collect, use, and protect your personal information when you use our website and services.
          </p>
          <span className="text-blue-600 dark:text-blue-400 mt-auto">Read Privacy Policy →</span>
        </Link>

        <Link
          href="/legal/terms-and-conditions"
          className="flex flex-col p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center mb-4">
            <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
            <h2 className="text-xl font-semibold">Terms and Conditions</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Understand the rules and guidelines that govern the use of our website and services.
          </p>
          <span className="text-blue-600 dark:text-blue-400 mt-auto">Read Terms and Conditions →</span>
        </Link>

        <Link
          href="/legal/cancellation-refund-policy"
          className="flex flex-col p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center mb-4">
            <RefreshCw className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
            <h2 className="text-xl font-semibold">Cancellation & Refund Policy</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Learn about our cancellation procedures and refund terms for our services and products.
          </p>
          <span className="text-blue-600 dark:text-blue-400 mt-auto">Read Cancellation & Refund Policy →</span>
        </Link>

        <Link
          href="/legal/shipping-delivery-policy"
          className="flex flex-col p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center mb-4">
            <Truck className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
            <h2 className="text-xl font-semibold">Shipping & Delivery Policy</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Understand how we deliver our digital services and products, including timelines and processes.
          </p>
          <span className="text-blue-600 dark:text-blue-400 mt-auto">Read Shipping & Delivery Policy →</span>
        </Link>
      </div>

      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Need Legal Assistance?</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          If you have any questions about our legal policies or need further clarification, please don't hesitate to
          contact us.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Contact Us
          </Link>
          <Link
            href="mailto:legal@standalonecoders.com"
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            Email Legal Team
          </Link>
        </div>
      </div>
    </div>
  )
}
