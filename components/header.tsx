"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, ChevronDown, LogIn, LogOut } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Header() {
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)

    // Check if user is logged in
    const loggedIn = localStorage.getItem("isLoggedIn") === "true"
    setIsLoggedIn(loggedIn)

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleServices = () => {
    setIsServicesOpen(!isServicesOpen)
  }

  // Add handleLogout function
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("user")
    setIsLoggedIn(false)
    router.push("/")
  }

  // Add handleLogin function
  const handleLogin = () => {
    router.push("/auth/login")
  }

  // Handle link click to ensure scroll to top
  const handleLinkClick = () => {
    window.scrollTo(0, 0)
  }

  const navLinks = [
    { name: "Home", href: "/" },
    {
      name: "Services",
      href: "/services",
      dropdown: true,
      items: [
        { name: "Cybersecurity Services", href: "/services/cybersecurity" },
        { name: "Digital Marketing", href: "/services/digital-marketing" },
        { name: "AI & Technology Solutions", href: "/services/ai-technology" },
        { name: "Creative Services", href: "/services/creative-services" },
      ],
    },
    { name: "About", href: "/about" },
    { name: "Book a Website", href: "/booking/templates" },
    { name: "Contact", href: "/contact" },
  ]

  const isActive = (path) => {
    if (path === "/") {
      return pathname === path
    }
    return pathname.startsWith(path)
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-sm shadow-md" : "bg-white"
      }`}
    >
      <div className="container-custom py-3 md:py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center z-10" onClick={handleLinkClick}>
          <div className="logo-3d-container">
            <h1 className="logo-3d">
              <span className="logo-3d-standalone">
                <span className="text-red-600">S</span>
                <span>tandalone</span>
              </span>
              <span className="logo-3d-coders">
                <span className="text-red-600">C</span>
                <span>oders</span>
              </span>
            </h1>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-8">
          {navLinks.map((link) =>
            link.dropdown ? (
              <div key={link.name} className="relative group">
                <button
                  onClick={toggleServices}
                  className={`flex items-center px-3 py-2 rounded-md font-medium transition-colors ${
                    isActive(link.href)
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  {link.name}
                  <ChevronDown className="ml-1 w-4 h-4" />
                </button>
                <div className="absolute left-0 mt-2 w-64 rounded-lg shadow-lg bg-white ring-1 ring-black/5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden">
                  <div className="py-1">
                    {link.items.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={handleLinkClick}
                        className={`block px-4 py-2 text-sm ${
                          isActive(item.href) ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.name}
                href={link.href}
                onClick={handleLinkClick}
                className={`px-3 py-2 rounded-md font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                {link.name}
              </Link>
            ),
          )}

          {/* Add login/logout button */}
          {mounted && (
            <Button
              onClick={isLoggedIn ? handleLogout : handleLogin}
              variant="default"
              size="sm"
              className="ml-2 whitespace-nowrap"
            >
              {isLoggedIn ? (
                <>
                  <LogOut className="w-4 h-4 mr-2" /> Logout
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4 mr-2" /> Login
                </>
              )}
            </Button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          {/* Add login/logout button for mobile */}
          {mounted && (
            <Button
              onClick={isLoggedIn ? handleLogout : handleLogin}
              variant="default"
              size="sm"
              className="mr-2"
              aria-label={isLoggedIn ? "Logout" : "Login"}
            >
              {isLoggedIn ? <LogOut size={18} /> : <LogIn size={18} />}
            </Button>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80vw] max-w-sm">
              <nav className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) =>
                  link.dropdown ? (
                    <div key={link.name} className="space-y-2">
                      <button
                        onClick={toggleServices}
                        className={`flex items-center justify-between w-full px-2 py-2 text-base font-medium rounded-md ${
                          isActive(link.href) ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-blue-600"
                        }`}
                      >
                        {link.name}
                        <ChevronDown className={`w-4 h-4 transition-transform ${isServicesOpen ? "rotate-180" : ""}`} />
                      </button>
                      {isServicesOpen && (
                        <div className="pl-4 space-y-2 border-l-2 border-gray-200">
                          {link.items.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              onClick={handleLinkClick}
                              className={`block py-2 text-sm ${
                                isActive(item.href) ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                              }`}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={handleLinkClick}
                      className={`block px-2 py-2 text-base font-medium rounded-md ${
                        isActive(link.href) ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-blue-600"
                      }`}
                    >
                      {link.name}
                    </Link>
                  ),
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
