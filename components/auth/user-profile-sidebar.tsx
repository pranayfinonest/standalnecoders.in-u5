"use client"

import { useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { User, ShoppingCart, CreditCard, Settings, LogOut, X } from "lucide-react"

interface UserProfileSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function UserProfileSidebar({ isOpen, onClose }: UserProfileSidebarProps) {
  const { user, signOut } = useAuth()
  const pathname = usePathname()

  // Close sidebar when route changes
  useEffect(() => {
    onClose()
  }, [pathname, onClose])

  if (!user) return null

  // Get user initials for avatar fallback
  const getInitials = () => {
    const name = user.user_metadata?.name || user.email || ""
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  const handleSignOut = async () => {
    await signOut()
    onClose()
  }

  const navItems = [
    { label: "Profile", href: "/profile", icon: <User className="h-5 w-5" /> },
    { label: "My Cart", href: "/profile/cart", icon: <ShoppingCart className="h-5 w-5" /> },
    { label: "Payment Methods", href: "/profile/payment-methods", icon: <CreditCard className="h-5 w-5" /> },
    { label: "Settings", href: "/profile/settings", icon: <Settings className="h-5 w-5" /> },
  ]

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-[85vw] max-w-xs">
        <SheetHeader className="border-b pb-4 mb-4">
          <div className="flex items-center justify-between">
            <SheetTitle>My Account</SheetTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.user_metadata?.avatar_url || ""} alt={user.user_metadata?.name || "User"} />
              <AvatarFallback>{getInitials()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{user.user_metadata?.name || user.email?.split("@")[0]}</p>
              <p className="text-sm text-gray-500 truncate max-w-[180px]">{user.email}</p>
            </div>
          </div>
        </SheetHeader>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                pathname === item.href ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}

          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-3 py-2 rounded-md w-full text-left text-gray-700 hover:bg-gray-100 transition-colors mt-4"
          >
            <LogOut className="h-5 w-5" />
            <span>Sign out</span>
          </button>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
