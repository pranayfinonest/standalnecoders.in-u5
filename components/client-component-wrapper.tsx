"use client"

import { Suspense, type ReactNode } from "react"

interface ClientComponentWrapperProps {
  children: ReactNode
  fallback?: ReactNode
}

export default function ClientComponentWrapper({
  children,
  fallback = <div>Loading...</div>,
}: ClientComponentWrapperProps) {
  return <Suspense fallback={fallback}>{children}</Suspense>
}
