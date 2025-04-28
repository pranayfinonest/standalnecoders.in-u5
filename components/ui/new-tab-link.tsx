import type React from "react"
import Link from "next/link"
import { ExternalLink } from "lucide-react"

interface NewTabLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  showIcon?: boolean
}

export function NewTabLink({ href, children, className = "", showIcon = false }: NewTabLinkProps) {
  // Determine if the link is external
  const isExternal = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")

  return (
    <Link href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      {showIcon && isExternal && <ExternalLink className="ml-1 h-3 w-3 inline-block" />}
    </Link>
  )
}
