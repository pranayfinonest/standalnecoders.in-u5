"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, FileText, Home, CreditCard, Settings, User, HelpCircle, Search, LineChart } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
}

export function DashboardSidebar() {
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState("")

  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <Home className="h-5 w-5" />,
    },
    {
      title: "Projects",
      href: "/dashboard/projects",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Analytics",
      href: "/dashboard/analytics",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      title: "SEO",
      href: "/dashboard/seo",
      icon: <LineChart className="h-5 w-5" />,
    },
    {
      title: "Billing",
      href: "/dashboard/billing",
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      title: "Profile",
      href: "/dashboard/profile",
      icon: <User className="h-5 w-5" />,
    },
    {
      title: "Support",
      href: "/dashboard/support",
      icon: <HelpCircle className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  const filteredItems = navItems.filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="flex flex-col h-full border-r bg-background">
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <nav className="flex-1 overflow-auto py-2">
        <div className="px-2 space-y-1">
          {filteredItems.map((item) => (
            <Button
              key={item.href}
              variant={pathname === item.href ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start",
                pathname === item.href
                  ? "bg-secondary text-secondary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
              asChild
            >
              <Link href={item.href}>
                {item.icon}
                <span className="ml-3">{item.title}</span>
              </Link>
            </Button>
          ))}
        </div>
      </nav>
      <div className="p-4 border-t">
        <p className="text-xs text-muted-foreground">StandaloneCoders.in © {new Date().getFullYear()}</p>
      </div>
    </div>
  )
}
