"use client"

import type React from "react"

import { useSearchParams } from "next/navigation"

interface VerifyParamsClientProps {
  children: (email: string | null) => React.ReactNode
}

export default function VerifyParamsClient({ children }: VerifyParamsClientProps) {
  const searchParams = useSearchParams()
  const email = searchParams.get("email")

  return <>{children(email)}</>
}
