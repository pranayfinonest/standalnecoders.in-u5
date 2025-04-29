import type React from "react"

interface ResponsiveGridProps {
  children: React.ReactNode
  className?: string
  cols?: {
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
  gap?: "none" | "sm" | "md" | "lg"
}

export function ResponsiveGrid({
  children,
  className = "",
  cols = { sm: 1, md: 2, lg: 3, xl: 4 },
  gap = "md",
}: ResponsiveGridProps) {
  const colClasses = {
    sm: `grid-cols-${cols.sm || 1}`,
    md: `md:grid-cols-${cols.md || 2}`,
    lg: `lg:grid-cols-${cols.lg || 3}`,
    xl: `xl:grid-cols-${cols.xl || 4}`,
  }

  const gapClasses = {
    none: "gap-0",
    sm: "gap-2",
    md: "gap-4 md:gap-6",
    lg: "gap-4 md:gap-6 lg:gap-8",
  }

  const gridClasses = `grid ${colClasses.sm} ${colClasses.md} ${colClasses.lg} ${colClasses.xl} ${gapClasses[gap]} ${className}`

  return <div className={gridClasses}>{children}</div>
}
