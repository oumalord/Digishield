import type React from "react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center">
          <a href="/admin" className="flex items-center gap-2">
            <img src="/digishield-logo.png" alt="DigiShield" className="h-8 w-auto" />
            <span className="font-semibold hidden sm:inline">Admin</span>
          </a>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
          <aside className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 h-max sticky top-4">
            <nav className="space-y-1 text-sm">
              <a href="/admin" className="block px-3 py-2 rounded text-indigo-900 hover:bg-indigo-100">Dashboard</a>
              <a href="/admin/media" className="block px-3 py-2 rounded text-indigo-900 hover:bg-indigo-100">Media</a>
              <a href="/admin/team" className="block px-3 py-2 rounded text-indigo-900 hover:bg-indigo-100">Team</a>
              <a href="/admin/resources" className="block px-3 py-2 rounded text-indigo-900 hover:bg-indigo-100">Resources</a>
              <a href="/admin/newsletter" className="block px-3 py-2 rounded text-indigo-900 hover:bg-indigo-100">Newsletter</a>
              <a href="/admin/incidents" className="block px-3 py-2 rounded text-indigo-900 hover:bg-indigo-100">Incidents</a>
              <a href="/admin/contact" className="block px-3 py-2 rounded text-indigo-900 hover:bg-indigo-100">Contact</a>
              <a href="/admin/volunteers" className="block px-3 py-2 rounded text-indigo-900 hover:bg-indigo-100">Volunteers</a>
              <a href="/admin/applications" className="block px-3 py-2 rounded text-indigo-900 hover:bg-indigo-100">Applications</a>
            </nav>
          </aside>

          <main className="min-w-0">{children}</main>
        </div>
      </div>
    </div>
  )
}


