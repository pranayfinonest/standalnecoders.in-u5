"use client"

import type React from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"

interface NewTabButtonProps {
  href?: string
  onClick?: () => void
  children: React.ReactNode
  className?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  disabled?: boolean
  openInNewTab?: boolean
}

export function NewTabButton({
  href,
  onClick,
  children,
  className = "",
  variant = "default",
  size = "default",
  disabled = false,
  openInNewTab = false,
}: NewTabButtonProps) {
  const router = useRouter()

  const handleClick = () => {
    if (href) {
      if (openInNewTab) {
        window.open(href, "_blank", "noopener,noreferrer")
      } else {
        router.push(href)
      }
    } else if (onClick) {
      onClick()
    }
  }

  return (
    <Button onClick={handleClick} className={className} variant={variant} size={size} disabled={disabled}>
      {children}
    </Button>
  )
}
