"use client"

import { type ReactNode, useEffect, useState } from "react"
import { getUserId } from "@/utils/statsig"

interface StatsigWrapperProps {
  children: ReactNode
}

export default function StatsigWrapper({ children }: StatsigWrapperProps) {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Ensure user ID is set in localStorage
    getUserId()
    setIsReady(true)
  }, [])

  // We no longer need to initialize Statsig on the client
  // Just render children when ready
  if (!isReady) {
    return null
  }

  return <>{children}</>
}
