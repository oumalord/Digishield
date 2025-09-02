"use client"

import AdminAuthWrapper from "@/components/admin-auth-wrapper"
import { exportToCSV } from "@/lib/utils"
import { useEffect, useState } from "react"
import { supabase, hasValidConfig } from "@/lib/supabase"

type Resource = { id: number; title: string; description?: string; file_url?: string }

export default function AdminResourcesPage() {
  const [items, setItems] = useState<Resource[]>([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [fileUrl, setFileUrl] = useState("")
  const [message, setMessage] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<number | null>(null)

  const load = async () => {
    if (!hasValidConfig || !supabase) return
    const { data } = await supabase.from("resources").select("id, title, description, file_url").order("id", { ascending: false })
    setItems((data as any) || [])
  }

  useEffect(() => {
    load()
  }, [])

  const add = async () => {
    if (!hasValidConfig || !supabase) {
      setMessage("Supabase not configured")
      return
    }
    if (editingId) {
      const { error } = await supabase.from("resources").update({ title, description, file_url: fileUrl }).eq("id", editingId)
      if (error) setMessage(error.message)
      else {
        setMessage("Resource updated")
        setTitle("")
        setDescription("")
        setFileUrl("")
        setEditingId(null)
        load()
      }
      return
    }
    const { error } = await supabase.from("resources").insert([{ title, description, file_url: fileUrl }])
    if (error) setMessage(error.message)
    else {
      setMessage("Resource added")
      setTitle("")
      setDescription("")
      setFileUrl("")
      load()
    }
  }

  const edit = (r: Resource) => {
    setEditingId(r.id)
    setTitle(r.title)
    setDescription(r.description || "")
    setFileUrl(r.file_url || "")
  }

  const remove = async (id: number) => {
    if (!hasValidConfig || !supabase) return
    const { error } = await supabase.from("resources").delete().eq("id", id)
    if (error) setMessage(error.message)
    else load()
  }

  return (
    <AdminAuthWrapper>
      <div className="min-h-screen pt-4">
        <div className="max-w-4xl mx-auto p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Resources Manager</h1>
            <button
              onClick={() => exportToCSV(items, { filename: "resources" })}
              className="px-3 py-2 border rounded hover:bg-gray-50"
            >
              Download CSV
            </button>
          </div>
          <div className="p-4 border rounded space-y-3">
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full border px-3 py-2 rounded" />
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="w-full border px-3 py-2 rounded" />
            <input value={fileUrl} onChange={(e) => setFileUrl(e.target.value)} placeholder="File URL (public)" className="w-full border px-3 py-2 rounded" />
            <div className="flex gap-3">
              <button onClick={add} className="btn-primary">{editingId ? "Update Resource" : "Add Resource"}</button>
              {editingId && (
                <button onClick={() => { setEditingId(null); setTitle(""); setDescription(""); setFileUrl("") }} className="btn-secondary">Cancel</button>
              )}
            </div>
            {message && <p className="text-sm text-gray-700">{message}</p>}
          </div>
          <div className="border rounded overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-3 py-2">Title</th>
                  <th className="px-3 py-2">Description</th>
                  <th className="px-3 py-2">File URL</th>
                  <th className="px-3 py-2"/>
                </tr>
              </thead>
              <tbody>
                {items.map((r) => (
                  <tr key={r.id} className="border-t">
                    <td className="px-3 py-2">{r.title}</td>
                    <td className="px-3 py-2">{r.description}</td>
                    <td className="px-3 py-2 truncate max-w-[240px]">
                      {r.file_url ? <a href={r.file_url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Open</a> : "-"}
                    </td>
                    <td className="px-3 py-2 space-x-2">
                      <button onClick={() => edit(r)} className="px-2 py-1 border rounded">Edit</button>
                      <button onClick={() => remove(r.id)} className="px-2 py-1 border rounded text-red-600">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminAuthWrapper>
  )
}



