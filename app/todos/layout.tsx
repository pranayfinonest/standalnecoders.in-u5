import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Todos | Standalone Coders",
  description: "Manage your todos and tasks",
}

export default function TodosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="container mx-auto py-8 px-4">{children}</div>
}
