import type React from "react"
export const dynamic = "force-static"

export default function NotFoundLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">{children}</main>
    </div>
  )
}
