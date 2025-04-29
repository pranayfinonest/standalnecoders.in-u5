import type React from "react"

interface ResponsiveContainerProps {
  children: React.ReactNode
  className?: string
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full" | "none"
  padding?: "none" | "sm" | "md" | "lg"
}

export function ResponsiveContainer({
  children,
  className = "",
  maxWidth = "xl",
  padding = "md",
}: ResponsiveContainerProps) {
  const maxWidthClasses = {
    sm: "max-w-screen-sm",
    md: "max-w-screen-md",
    lg: "max-w-screen-lg",
    xl: "max-w-screen-xl",
    "2xl": "max-w-screen-2xl",
    full: "max-w-full",
    none: "",
  }

  const paddingClasses = {
    none: "",
    sm: "px-4",
    md: "px-4 md:px-6",
    lg: "px-4 md:px-6 lg:px-8",
  }

  const containerClasses = `mx-auto ${maxWidthClasses[maxWidth]} ${paddingClasses[padding]} ${className}`

  return <div className={containerClasses}>{children}</div>
}
