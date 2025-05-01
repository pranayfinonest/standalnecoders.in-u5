import type React from "react"
import { Suspense } from "react"

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Suspense fallback={<div className="container py-8 px-4">Loading...</div>}>
      <div className="min-h-screen bg-gray-50">{children}</div>
    </Suspense>
  )
}
