"use client"

import AdminAuthWrapper from "@/components/admin-auth-wrapper"
import { exportToCSV } from "@/lib/utils"
import { useEffect, useState } from "react"
import { supabase, hasValidConfig } from "@/lib/supabase"

type Volunteer = {
  id: string
  name: string
  email: string
  phone: string
  location: string
  skills?: string[]
  availability?: string
  status: "pending" | "active" | "inactive" | "rejected"
  applied_at?: string
}

export default function AdminVolunteersPage() {
  const [activeTab, setActiveTab] = useState<"trainer" | "ambassador" | "coordinator" | "responder">("trainer")
  const [items, setItems] = useState<Record<string, Volunteer[]>>({
    trainer: [],
    ambassador: [],
    coordinator: [],
    responder: [],
  })
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState("")

  const tableForTab = (tab: typeof activeTab) => {
    switch (tab) {
      case "trainer":
        return "volunteer_cyber_trainers"
      case "ambassador":
        return "volunteer_awareness_ambassadors"
      case "coordinator":
        return "volunteer_community_coordinators"
      case "responder":
        return "volunteer_incident_responders"
    }
  }

  const load = async (tab: typeof activeTab) => {
    if (!hasValidConfig || !supabase) return
    const table = tableForTab(tab)
    const { data, error } = await supabase
      .from(table)
      .select("id, name, email, phone, location, skills, availability, status, applied_at")
      .order("applied_at", { ascending: false })
      .limit(500)
    if (error) setError(error.message)
    else setItems((prev) => ({ ...prev, [tab]: ((data as any) || []) }))
  }

  useEffect(() => {
    load("trainer")
    load("ambassador")
    load("coordinator")
    load("responder")
  }, [])

  const updateStatus = async (tab: typeof activeTab, v: Volunteer, status: Volunteer["status"]) => {
    if (!supabase) return
    const table = tableForTab(tab)

    // Ask admin for a short message to include in the email
    const defaultMsg =
      status === "active"
        ? "Congratulations! Your volunteer application has been approved."
        : status === "inactive"
        ? "Your volunteer profile has been deactivated. Contact us if this was unexpected."
        : "We appreciate your interest. Unfortunately, your application was not approved at this time."

    const message = typeof window !== "undefined" ? (window.prompt(`Optional message to include in the email:`, defaultMsg) || defaultMsg) : defaultMsg

    const { error } = await supabase.from(table).update({ status }).eq("id", v.id)
    if (error) {
      setError(error.message)
      return
    }
    // Open email draft to notify the volunteer
    try {
      const subjectMap: Record<typeof status, string> = {
        active: "Volunteer Application Approved",
        inactive: "Volunteer Profile Deactivated",
        rejected: "Volunteer Application Update",
        pending: "Volunteer Application Update",
      }
      const subject = subjectMap[status] || "Volunteer Application Update"
      const body = `${message}\n\nRegards,\nDigishield Admin`
      const mailto = `mailto:${encodeURIComponent(v.email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      if (typeof window !== "undefined") {
        window.location.href = mailto
      }
    } catch {}

    load(tab)
  }

  const filtered = (items[activeTab] || []).filter((v) =>
    (v.name + v.email + (v.skills || []).join(",")).toLowerCase().includes(filter.toLowerCase())
  )

  const openEmail = (to: string, subject: string, body: string) => {
    const mailto = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    if (typeof window !== "undefined") window.location.href = mailto
  }

  return (
    <AdminAuthWrapper>
      <div className="min-h-screen pt-4">
        <div className="max-w-6xl mx-auto p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Volunteer Applications</h1>
            <button
              onClick={() => exportToCSV(items[activeTab] || [], { filename: `volunteers-${activeTab}` })}
              className="px-3 py-2 border rounded hover:bg-gray-50"
            >
              Download CSV
            </button>
          </div>
          {error && <p className="text-sm text-red-600 mb-3">{error}</p>}

          {/* Tabs */}
          <div className="flex gap-2 mb-4">
            <button onClick={() => setActiveTab("trainer")} className={`px-3 py-2 border rounded ${activeTab === "trainer" ? "bg-blue-600 text-white" : ""}`}>Cyber Trainers</button>
            <button onClick={() => setActiveTab("ambassador")} className={`px-3 py-2 border rounded ${activeTab === "ambassador" ? "bg-blue-600 text-white" : ""}`}>Awareness Ambassadors</button>
            <button onClick={() => setActiveTab("coordinator")} className={`px-3 py-2 border rounded ${activeTab === "coordinator" ? "bg-blue-600 text-white" : ""}`}>Community Coordinators</button>
            <button onClick={() => setActiveTab("responder")} className={`px-3 py-2 border rounded ${activeTab === "responder" ? "bg-blue-600 text-white" : ""}`}>Incident Responders</button>
          </div>

          <div className="mb-4">
            <input
              placeholder="Search by name, email or skills"
              className="w-full border px-3 py-2 rounded"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>

          <div className="space-y-3">
            {filtered.map((v) => (
              <div key={v.id} className="border rounded p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-semibold">{v.name}</div>
                    <div className="text-sm text-gray-600">{v.email} • {v.phone} • {v.location}</div>
                    {v.skills && v.skills.length > 0 && (
                      <div className="text-xs text-gray-600 mt-1">Skills: {v.skills.join(", ")}</div>
                    )}
                    {v.availability && (
                      <div className="text-xs text-gray-600 mt-1">Availability: {v.availability}</div>
                    )}
                  </div>
                  <div className="text-xs text-gray-500">{v.applied_at ? new Date(v.applied_at).toLocaleDateString() : ""}</div>
                </div>
                <div className="mt-3 flex gap-2 items-center">
                  <span className="px-2 py-1 rounded bg-gray-100 text-xs">{v.status}</span>
                  <button onClick={() => updateStatus(activeTab, v, "active")} className="btn-secondary">Activate</button>
                  <button onClick={() => updateStatus(activeTab, v, "inactive")} className="px-3 py-2 border rounded">Deactivate</button>
                  <button onClick={() => updateStatus(activeTab, v, "rejected")} className="px-3 py-2 border rounded text-red-600">Reject</button>
                  <button
                    onClick={() => openEmail(
                      v.email,
                      "Interview Invitation - Digishield Volunteers",
                      `Hello ${v.name},\n\nThank you for applying to volunteer with Digishield. We'd like to schedule a short interview. Please reply with your availability.\n\nRegards,\nDigishield Admin`,
                    )}
                    className="px-3 py-2 border rounded"
                  >
                    Schedule Interview
                  </button>
                  <button
                    onClick={() => openEmail(
                      v.email,
                      "Training Session - Digishield Volunteers",
                      `Hello ${v.name},\n\nCongratulations! We'd like to invite you to our volunteer training. Please confirm your availability for the proposed date/time.\n\nRegards,\nDigishield Admin`,
                    )}
                    className="px-3 py-2 border rounded"
                  >
                    Schedule Training
                  </button>
                  <button
                    onClick={() => openEmail(
                      v.email,
                      "Welcome to Digishield Volunteers",
                      `Hello ${v.name},\n\nWelcome aboard! Your start date is: ____. We will share onboarding details shortly.\n\nRegards,\nDigishield Admin`,
                    )}
                    className="px-3 py-2 border rounded"
                  >
                    Send Welcome
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminAuthWrapper>
  )
}


