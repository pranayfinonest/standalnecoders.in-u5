"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  CreditCard,
  Settings,
  LifeBuoy,
  ChevronDown,
  ChevronRight,
  Users,
  FolderKanban,
  Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
  submenu?: NavItem[]
}

interface DashboardSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function DashboardSidebar({ isOpen, onClose }: DashboardSidebarProps) {
  const pathname = usePathname()
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)

  // Close sidebar on mobile when navigating
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        // Reset mobile sidebar state when resizing to desktop
        if (!isOpen) onClose()
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [isOpen, onClose])

  const navItems: NavItem[] = [
    {
      title: "Overview",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Projects",
      href: "/dashboard/projects",
      icon: <FolderKanban className="h-5 w-5" />,
    },
    {
      title: "Analytics",
      href: "/dashboard/analytics",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      title: "SEO & Indexing",
      href: "/dashboard/seo",
      icon: <Search className="h-5 w-5" />,
    },
    {
      title: "Billing",
      href: "/dashboard/billing",
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      title: "Support",
      href: "/dashboard/support",
      icon: <LifeBuoy className="h-5 w-5" />,
      submenu: [
        {
          title: "Tickets",
          href: "/dashboard/support",
          icon: <FileText className="h-5 w-5" />,
        },
        {
          title: "New Ticket",
          href: "/dashboard/support/new",
          icon: <FileText className="h-5 w-5" />,
        },
      ],
    },
    {
      title: "Profile",
      href: "/dashboard/profile",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  const toggleSubmenu = (title: string) => {
    setOpenSubmenu(openSubmenu === title ? null : title)
  }

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-20 flex w-64 flex-col border-r bg-white transition-transform duration-300 md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-bold text-xl">StandaloneCoders</span>
        </Link>
      </div>

      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <div key={item.title}>
              {item.submenu ? (
                <div className="flex flex-col">
                  <Button
                    variant="ghost"
                    className={cn(
                      "flex w-full items-center justify-between px-3 py-2 text-left",
                      pathname.startsWith(item.href) && "bg-slate-100",
                    )}
                    onClick={() => toggleSubmenu(item.title)}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.title}</span>
                    </div>
                    {openSubmenu === item.title ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>

                  {openSubmenu === item.title && (
                    <div className="ml-6 mt-1 flex flex-col gap-1">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.title}
                          href={subitem.href}
                          className={cn(
                            "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-slate-100",
                            pathname === subitem.href && "bg-slate-100 font-medium",
                          )}
                          onClick={() => {
                            if (window.innerWidth < 768) onClose()
                          }}
                        >
                          {subitem.icon}
                          <span>{subitem.title}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 transition-colors hover:bg-slate-100",
                    pathname === item.href && "bg-slate-100 font-medium",
                  )}
                  onClick={() => {
                    if (window.innerWidth < 768) onClose()
                  }}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              )}
            </div>
          ))}
        </nav>
      </ScrollArea>

      <div className="border-t p-4">
        <div className="rounded-md bg-slate-50 p-3">
          <p className="text-sm font-medium">Need help?</p>
          <p className="text-xs text-slate-500 mt-1">Contact our support team</p>
          <Button variant="default" size="sm" className="mt-2 w-full" asChild>
            <Link href="/dashboard/support/new">Contact Support</Link>
          </Button>
        </div>
      </div>
    </aside>
  )
}
