import type { ReactNode } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface DashboardCardProps {
  title: string
  description?: string
  icon?: ReactNode
  footer?: ReactNode
  className?: string
  href?: string
  children?: ReactNode
}

export function DashboardCard({ title, description, icon, footer, className, href, children }: DashboardCardProps) {
  const CardComponent = () => (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>{children}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  )

  if (href) {
    return (
      <Link href={href} className="block">
        <CardComponent />
      </Link>
    )
  }

  return <CardComponent />
}
