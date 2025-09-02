"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navigationItems = [
  { name: "Dashboard", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Resources", href: "/resources" },
  { name: "Team", href: "/team" },
  { name: "Get Involved", href: "/get-involved" },
  { name: "Contact", href: "/contact" },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  if (pathname?.startsWith("/admin")) return null

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <nav className="bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 shadow-md sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
            {/* Logo Image - Increased size */}
            <div className="flex-shrink-0">
              {" "}
              {/* Prevents logo from shrinking */}
              <img
                src="https://lgbcvwlrqkvrmbvlbxnn.supabase.co/storage/v1/object/sign/leadersphotos/logomain-removebg-preview.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85M2IzZTk2OS1kYzQ5LTQwYTMtYWU1ZC0wZmM1ODFmZTAzOTgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsZWFkZXJzcGhvdG9zL2xvZ29tYWluLXJlbW92ZWJnLXByZXZpZXcucG5nIiwiaWF0IjoxNzU1MTY1OTk0LCJleHAiOjI3OTU4NTM5OTR9.UzLw4j0GMGzfJeRIosVyf6WAYBZGBlvfOKLkSQmxITY"
                alt="Digishield Logo"
                className="h-30 w-16 object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors relative group ${
                  pathname === item.href ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                }`}
              >
                {item.name}
                <span className={`absolute -bottom-2 left-0 h-[2px] transition-all duration-200 ${pathname === item.href ? "w-full bg-blue-600" : "w-0 bg-blue-600 group-hover:w-full"}`} />
              </Link>
            ))}
            <Link href="/report-incident">
              <Button className="bg-red-600 hover:bg-red-700 text-white">Report Incident</Button>
            </Link>
            {/* Admin entry removed from public navigation */}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mobile-menu">
            <div className="mobile-menu-content">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200 overflow-y-auto">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={closeMenu}
                    className={`mobile-menu-item transition-colors ${
                      pathname === item.href ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-blue-600"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="px-6 py-4">
                  <Link href="/report-incident" onClick={closeMenu}>
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white touch-target">
                      Report Incident
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
