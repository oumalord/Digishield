"use client"

import AdminAuthWrapper from "@/components/admin-auth-wrapper"
import { exportToCSV } from "@/lib/utils"
import { useEffect, useState } from "react"
import { supabase, hasValidConfig } from "@/lib/supabase"

type Incident = {
  id: number
  type: string
  description: string
  status: "pending" | "in_progress" | "resolved" | "closed"
  urgency: "low" | "medium" | "high" | "critical"
  contact_name: string
  contact_email: string
  contact_phone?: string
  location?: string
  resolution?: string
  created_at?: string
  date_occurred?: string
}

export default function AdminIncidentsPage() {
  const [incidents, setIncidents] = useState<Incident[]>([])
  const [selected, setSelected] = useState<Incident | null>(null)
  const [status, setStatus] = useState<Incident["status"]>("pending")
  const [resolution, setResolution] = useState("")
  const [error, setError] = useState<string | null>(null)

  const load = async () => {
    if (!hasValidConfig || !supabase) return
    const { data, error } = await supabase
      .from("incidents")
      .select(
        "id, type, description, status, urgency, contact_name, contact_email, contact_phone, location, resolution, created_at, date_occurred",
      )
      .order("created_at", { ascending: false })
      .limit(200)
    if (error) setError(error.message)
    else setIncidents((data as any) || [])
  }

  useEffect(() => {
    load()
  }, [])

  const onSelect = (i: Incident) => {
    setSelected(i)
    setStatus(i.status)
    setResolution(i.resolution || "")
  }

  const save = async () => {
    if (!selected) return
    const { error } = await supabase!
      .from("incidents")
      .update({ status, resolution: resolution || null })
      .eq("id", selected.id)
    if (error) setError(error.message)
    else {
      setSelected(null)
      setResolution("")
      load()
    }
  }

  const remove = async (i: Incident) => {
    const { error } = await supabase!.from("incidents").delete().eq("id", i.id)
    if (error) setError(error.message)
    else load()
  }

  return (
    <AdminAuthWrapper>
      <div className="min-h-screen pt-4">
        <div className="max-w-6xl mx-auto p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Incidents</h1>
            <button
              onClick={() => exportToCSV(incidents, { filename: "incidents" })}
              className="px-3 py-2 border rounded hover:bg-gray-50"
            >
              Download CSV
            </button>
          </div>
          {error && <p className="text-sm text-red-600 mb-3">{error}</p>}

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-3">
              {incidents.map((i) => (
                <div
                  key={i.id}
                  className={`border rounded p-4 cursor-pointer ${selected?.id === i.id ? "ring-2 ring-blue-500" : ""}`}
                  onClick={() => onSelect(i)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-semibold">{i.type}</div>
                      <div className="text-sm text-gray-600">{i.contact_name} ({i.contact_email})</div>
                    </div>
                    <div className="text-xs text-gray-500">{i.created_at ? new Date(i.created_at).toLocaleString() : ""}</div>
                  </div>
                  <div className="text-gray-700 text-sm mb-2 line-clamp-2">{i.description}</div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="px-2 py-1 rounded bg-gray-100">{i.status === "in_progress" ? "In Progress" : i.status}</span>
                    <span className="px-2 py-1 rounded bg-gray-100">{i.urgency}</span>
                    {i.location && <span className="px-2 py-1 rounded bg-gray-100">{i.location}</span>}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <div className="border rounded p-4">
                <div className="font-semibold mb-2">Edit Incident</div>
                {!selected ? (
                  <div className="text-sm text-gray-500">Select an incident to edit.</div>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-gray-600">Type</div>
                      <div className="text-sm">{selected.type}</div>
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Status</label>
                      <select
                        className="w-full border px-3 py-2 rounded"
                        value={status}
                        onChange={(e) => setStatus(e.target.value as Incident["status"])}
                      >
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                        <option value="closed">Closed</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Resolution / Notes</label>
                      <textarea
                        className="w-full border px-3 py-2 rounded"
                        rows={5}
                        value={resolution}
                        onChange={(e) => setResolution(e.target.value)}
                      />
                    </div>
                    <div className="flex gap-2">
                      <button onClick={save} className="btn-primary">Save</button>
                      <button onClick={() => setSelected(null)} className="btn-secondary">Cancel</button>
                      <button onClick={() => remove(selected)} className="px-3 py-2 border rounded text-red-600">Delete</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminAuthWrapper>
  )
}






