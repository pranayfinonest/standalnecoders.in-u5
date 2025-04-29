import type { ReactNode } from "react"

export default function ServicesLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      {/* No additional header here to prevent duplication */}
      {children}
    </div>
  )
}
