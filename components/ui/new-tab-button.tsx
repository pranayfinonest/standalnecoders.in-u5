"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { openInNewTab } from "@/utils/navigation"

interface NewTabButtonProps {
  href?: string
  onClick?: () => void
  children: React.ReactNode
  className?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  disabled?: boolean
}

export function NewTabButton({
  href,
  onClick,
  children,
  className = "",
  variant = "default",
  size = "default",
  disabled = false,
}: NewTabButtonProps) {
  const handleClick = () => {
    if (href) {
      openInNewTab(href)
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
