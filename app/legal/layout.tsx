import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Legal Information | Standalone Coders",
  description: "Legal information, policies, and terms for Standalone Coders.",
}

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <main className="min-h-screen bg-gray-50">{children}</main>
}
