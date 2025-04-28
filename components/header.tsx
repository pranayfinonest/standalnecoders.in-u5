"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown, LogIn, LogOut } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

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

  // Update the navLinks array to include the booking link

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
        scrolled ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md" : "bg-white dark:bg-gray-900"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gradient flex items-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400 font-extrabold">
            Standalone
          </span>
          <span className="text-gray-900 dark:text-white">Coders</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) =>
            link.dropdown ? (
              <div key={link.name} className="relative group">
                <button
                  onClick={toggleServices}
                  className={`flex items-center font-medium transition-colors ${
                    isActive(link.href)
                      ? "text-blue-600 dark:text-blue-400"
                      : "hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                >
                  {link.name}
                  <ChevronDown className="ml-1 w-4 h-4" />
                </button>
                <div className="absolute left-0 mt-2 w-64 rounded-md shadow-lg bg-white dark:bg-gray-900 ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="py-1">
                    {link.items.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`block px-4 py-2 text-sm ${
                          isActive(item.href)
                            ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
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
                target="_blank"
                rel="noopener noreferrer"
                className={`font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-blue-600 dark:text-blue-400"
                    : "hover:text-blue-600 dark:hover:text-blue-400"
                }`}
              >
                {link.name}
              </Link>
            ),
          )}

          {/* Add login/logout button */}
          {mounted && (
            <button
              onClick={isLoggedIn ? handleLogout : handleLogin}
              className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
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
            </button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          {/* Add login/logout button for mobile */}
          {mounted && (
            <button
              onClick={isLoggedIn ? handleLogout : handleLogin}
              className="p-2 mr-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition-colors"
              aria-label={isLoggedIn ? "Logout" : "Login"}
            >
              {isLoggedIn ? <LogOut size={20} /> : <LogIn size={20} />}
            </button>
          )}
          <button
            onClick={toggleMenu}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white dark:bg-gray-900 py-4 px-6 shadow-lg">
          <ul className="space-y-4">
            {navLinks.map((link) =>
              link.dropdown ? (
                <li key={link.name}>
                  <button
                    onClick={toggleServices}
                    className={`flex items-center font-medium w-full text-left ${
                      isActive(link.href)
                        ? "text-blue-600 dark:text-blue-400"
                        : "hover:text-blue-600 dark:hover:text-blue-400"
                    }`}
                  >
                    {link.name}
                    <ChevronDown className="ml-1 w-4 h-4" />
                  </button>
                  {isServicesOpen && (
                    <ul className="mt-2 ml-4 space-y-2">
                      {link.items.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`block font-medium ${
                              isActive(item.href)
                                ? "text-blue-600 dark:text-blue-400"
                                : "hover:text-blue-600 dark:hover:text-blue-400"
                            }`}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block font-medium ${
                      isActive(link.href)
                        ? "text-blue-600 dark:text-blue-400"
                        : "hover:text-blue-600 dark:hover:text-blue-400"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>
      )}
    </header>
  )
}
