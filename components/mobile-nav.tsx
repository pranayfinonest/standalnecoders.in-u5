"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"

interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

interface MobileNavProps {
  items: NavItem[]
  className?: string
}

export function MobileNav({ items, className = "" }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <div className={`md:hidden ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="flex justify-end p-4">
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="px-4 py-2">
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block py-2 text-lg ${
                      pathname === item.href ? "font-bold text-blue-600" : "text-gray-700 hover:text-blue-600"
                    }`}
                  >
                    {item.label}
                  </Link>

                  {item.children && (
                    <ul className="ml-4 mt-2 space-y-2">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className={`block py-1 ${
                              pathname === child.href
                                ? "font-semibold text-blue-600"
                                : "text-gray-600 hover:text-blue-600"
                            }`}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  )
}
