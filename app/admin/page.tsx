"use client"

import AdminAuthWrapper from "@/components/admin-auth-wrapper"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminIndexPage() {
  const [stats, setStats] = useState<any | null>(null)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/Api/admin/stats", { cache: "no-store" })
        const json = await res.json()
        if (!res.ok) throw new Error(json?.error || "Failed to load stats")
        setStats(json.stats)
      } catch (e: any) {
        setError(e.message)
      }
    }
    load()
  }, [])

  return (
    <AdminAuthWrapper>
      <div className="min-h-screen pt-4">
        <div className="max-w-5xl mx-auto p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold mb-1">Admin Dashboard</h1>
              <p className="text-gray-600">Manage Digishield content and operations</p>
            </div>
            <button
              onClick={async () => {
                try {
                  await fetch("/Api/admin/logout", { method: "POST", credentials: "include" })
                } finally {
                  router.push("/admin/login")
                }
              }}
              className="px-3 py-2 border rounded hover:bg-gray-50"
            >
              Logout
            </button>
          </div>
          {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="p-4 border rounded">
              <div className="text-xs text-gray-500">Resources</div>
              <div className="text-2xl font-semibold">{stats?.resources ?? "-"}</div>
            </div>
            <div className="p-4 border rounded">
              <div className="text-xs text-gray-500">Incidents</div>
              <div className="text-2xl font-semibold">{stats?.incidents?.total ?? "-"}</div>
            </div>
            <div className="p-4 border rounded">
              <div className="text-xs text-gray-500">Inquiries</div>
              <div className="text-2xl font-semibold">{stats?.contacts?.total ?? "-"}</div>
            </div>
            <div className="p-4 border rounded">
              <div className="text-xs text-gray-500">Subscribers</div>
              <div className="text-2xl font-semibold">{stats?.newsletterSubscribers ?? "-"}</div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/admin/media" className="block p-6 border rounded-lg hover:shadow card-hover">
              <div className="font-semibold mb-2">Media Manager</div>
              <div className="text-sm text-gray-600">Upload images and manage gallery</div>
            </Link>
            <Link href="/admin/team" className="block p-6 border rounded-lg hover:shadow card-hover">
              <div className="font-semibold mb-2">Team Members</div>
              <div className="text-sm text-gray-600">Add/edit team roster</div>
            </Link>
            <Link href="/admin/resources" className="block p-6 border rounded-lg hover:shadow card-hover">
              <div className="font-semibold mb-2">Resources</div>
              <div className="text-sm text-gray-600">Manage downloadable resources</div>
            </Link>
            <Link href="/admin/newsletter" className="block p-6 border rounded-lg hover:shadow card-hover">
              <div className="font-semibold mb-2">Newsletter</div>
              <div className="text-sm text-gray-600">View subscribers</div>
            </Link>
            <Link href="/admin/incidents" className="block p-6 border rounded-lg hover:shadow card-hover">
              <div className="font-semibold mb-2">Incidents</div>
              <div className="text-sm text-gray-600">Update status and resolution</div>
            </Link>
            <Link href="/admin/contact" className="block p-6 border rounded-lg hover:shadow card-hover">
              <div className="font-semibold mb-2">Contact Messages</div>
              <div className="text-sm text-gray-600">View and respond to contact form submissions</div>
            </Link>
            <Link href="/admin/volunteers" className="block p-6 border rounded-lg hover:shadow card-hover">
              <div className="font-semibold mb-2">Volunteers</div>
              <div className="text-sm text-gray-600">View role-based applications</div>
            </Link>
            <Link href="/admin/applications" className="block p-6 border rounded-lg hover:shadow card-hover">
              <div className="font-semibold mb-2">Applications</div>
              <div className="text-sm text-gray-600">Manage organisation applicants</div>
            </Link>
          </div>
        </div>
      </div>
    </AdminAuthWrapper>
  )
}
