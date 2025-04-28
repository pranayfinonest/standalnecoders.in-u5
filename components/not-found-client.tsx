"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

export default function NotFoundClient() {
  const searchParams = useSearchParams()
  const [path, setPath] = useState<string>("")

  useEffect(() => {
    // Safely use searchParams inside useEffect
    const currentPath = searchParams.get("from") || window.location.pathname
    setPath(currentPath)
  }, [searchParams])

  return <p className="text-sm text-muted-foreground">{path ? `Couldn't find: ${path}` : "Page not found"}</p>
}
