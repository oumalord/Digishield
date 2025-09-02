"use client"

import AdminAuthWrapper from "@/components/admin-auth-wrapper"
import { exportToCSV } from "@/lib/utils"
import { useEffect, useState } from "react"
import { supabase, hasValidConfig } from "@/lib/supabase"

type Subscriber = { id: string; email: string; name?: string; subscribed_at?: string; is_active?: boolean }

export default function AdminNewsletterPage() {
  const [subs, setSubs] = useState<Subscriber[]>([])
  const [error, setError] = useState<string | null>(null)
  const [editing, setEditing] = useState<Subscriber | null>(null)
  const [name, setName] = useState("")

  useEffect(() => {
    const load = async () => {
      if (!hasValidConfig || !supabase) return
      const { data, error } = await supabase
        .from("newsletter_subscriptions")
        .select("id, email, name, subscribed_at")
        .order("email", { ascending: true })
        .limit(200)
      if (error) setError(error.message)
      else setSubs(data as any)
    }
    load()
  }, [])

  const refresh = async () => {
    if (!hasValidConfig || !supabase) return
    const { data } = await supabase
      .from("newsletter_subscriptions")
      .select("id, email, name, subscribed_at")
      .order("email", { ascending: true })
      .limit(200)
    setSubs((data as any) || [])
  }

  const save = async () => {
    if (!editing) return
    const { error } = await supabase!
      .from("newsletter_subscriptions")
      .update({ name })
      .eq("id", editing.id)
    if (error) setError(error.message)
    else {
      setEditing(null)
      setName("")
      refresh()
    }
  }

  const toggle = async (s: Subscriber) => {
    if (s.is_active === undefined) {
      setError("'is_active' column is missing in the database. Run the migration to add it.")
      return
    }
    const { error } = await supabase!
      .from("newsletter_subscriptions")
      .update({ is_active: !s.is_active })
      .eq("id", s.id)
    if (error) setError(error.message)
    else refresh()
  }

  const remove = async (s: Subscriber) => {
    const { error } = await supabase!
      .from("newsletter_subscriptions")
      .delete()
      .eq("id", s.id)
    if (error) setError(error.message)
    else refresh()
  }

  return (
    <AdminAuthWrapper>
      <div className="min-h-screen pt-4">
        <div className="max-w-4xl mx-auto p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Newsletter Subscribers</h1>
            <button
              onClick={() => exportToCSV(subs, { filename: "newsletter-subscribers" })}
              className="px-3 py-2 border rounded hover:bg-gray-50"
            >
              Download CSV
            </button>
          </div>
          {error && <p className="text-sm text-red-600 mb-3">{error}</p>}
          <div className="overflow-x-auto border rounded">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-3 py-2">Email</th>
                  <th className="px-3 py-2">Name</th>
                  <th className="px-3 py-2">Subscribed</th>
                  <th className="px-3 py-2">Active</th>
                  <th className="px-3 py-2"/>
                </tr>
              </thead>
              <tbody>
                {subs.map((s) => (
                  <tr key={s.id} className="border-t">
                    <td className="px-3 py-2">{s.email}</td>
                    <td className="px-3 py-2">{s.name || "-"}</td>
                    <td className="px-3 py-2">{s.subscribed_at ? new Date(s.subscribed_at).toLocaleString() : "-"}</td>
                    <td className="px-3 py-2">{s.is_active === undefined ? "-" : s.is_active ? "Yes" : "No"}</td>
                    <td className="px-3 py-2 space-x-2">
                      <button onClick={() => { setEditing(s); setName(s.name || "") }} className="px-2 py-1 border rounded">Edit</button>
                      {s.is_active === undefined ? null : (
                        <button onClick={() => toggle(s)} className="px-2 py-1 border rounded">{s.is_active ? "Deactivate" : "Activate"}</button>
                      )}
                      <button onClick={() => remove(s)} className="px-2 py-1 border rounded text-red-600">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {editing && (
            <div className="mt-4 p-4 border rounded space-y-3">
              <div className="font-semibold">Edit Subscriber</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input value={editing.email} disabled className="w-full border px-3 py-2 rounded bg-gray-50" />
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="w-full border px-3 py-2 rounded" />
              </div>
              <div className="flex gap-3">
                <button onClick={save} className="btn-primary">Save</button>
                <button onClick={() => { setEditing(null); setName("") }} className="btn-secondary">Cancel</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminAuthWrapper>
  )
}



