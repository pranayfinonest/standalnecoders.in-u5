import type React from "react"
import Link from "next/link"
import { ExternalLink } from "lucide-react"

interface NewTabLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  showIcon?: boolean
  openInNewTab?: boolean
}

export function NewTabLink({
  href,
  children,
  className = "",
  showIcon = false,
  openInNewTab = false,
}: NewTabLinkProps) {
  // Determine if the link is external
  const isExternal = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")

  return (
    <Link
      href={href}
      target={openInNewTab ? "_blank" : undefined}
      rel={openInNewTab ? "noopener noreferrer" : undefined}
      className={className}
    >
      {children}
      {showIcon && isExternal && <ExternalLink className="ml-1 h-3 w-3 inline-block" />}
    </Link>
  )
}
