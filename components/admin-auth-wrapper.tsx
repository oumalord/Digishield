"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Shield, LogOut } from "lucide-react"

interface AdminAuthWrapperProps {
  children: React.ReactNode
}

export default function AdminAuthWrapper({ children }: AdminAuthWrapperProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    let cancelled = false
    const controller = new AbortController()
    const timer = setTimeout(() => {
      if (!cancelled) {
        setIsLoading(false)
        router.replace("/admin/login")
      }
    }, 7000)

    const check = async () => {
      try {
        const res = await fetch("/Api/admin/session", {
          cache: "no-store",
          credentials: "include",
          signal: controller.signal,
        })
        const json = await res.json().catch(() => ({}))
        if (!cancelled) {
          if (json?.authenticated) {
            setIsAuthenticated(true)
          } else {
            // if we are on login already, stay; else go to login
            if (window.location.pathname !== "/admin/login") {
              router.replace("/admin/login")
            }
          }
        }
      } catch (error) {
        if (!cancelled) router.replace("/admin/login")
      } finally {
        if (!cancelled) setIsLoading(false)
        clearTimeout(timer)
      }
    }
    check()
    return () => {
      cancelled = true
      controller.abort()
      clearTimeout(timer)
    }
  }, [router])

  const handleLogout = async () => {
    try {
      await fetch("/Api/admin/logout", { method: "POST" })
    } finally {
      router.push("/admin/login")
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying admin access...</p>
          <button
            onClick={() => router.replace("/admin/login")}
            className="mt-4 px-3 py-1.5 text-sm border rounded"
          >
            Go to login
          </button>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Will redirect to login
  }

  return (
    <div>
      {/* Admin Header */}
      <div className="bg-blue-600 text-white px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Shield className="h-5 w-5" />
          <span className="font-medium">Admin Dashboard</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm opacity-90">Admin</span>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-1 text-sm hover:bg-blue-700 px-2 py-1 rounded transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
      
      {/* Admin Content */}
      {children}
    </div>
  )
}
