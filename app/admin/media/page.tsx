"use client"

import AdminAuthWrapper from "@/components/admin-auth-wrapper"
import { useState } from "react"
import { supabase, hasValidConfig } from "@/lib/supabase"

export default function AdminMediaPage() {
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [syncing, setSyncing] = useState(false)

  const handleUpload = async (form: HTMLFormElement) => {
    const formData = new FormData(form)
    const file = formData.get("file") as File | null
    const title = String(formData.get("title") || "")
    const description = String(formData.get("description") || "")
    const category = String(formData.get("category") || "General")

    if (!file) {
      setMessage("Please select a file")
      return
    }

    if (!hasValidConfig || !supabase) {
      setMessage("Supabase not configured. Upload will not work in demo mode.")
      return
    }

    try {
      setUploading(true)
      setMessage(null)

      const ext = file.name.split(".").pop()
      const path = `media/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

      const { error: uploadError } = await supabase.storage.from("public").upload(path, file, {
        cacheControl: "3600",
        upsert: false,
      })
      if (uploadError) throw uploadError

      const { data: urlData } = supabase.storage.from("public").getPublicUrl(path)
      const imageUrl = urlData?.publicUrl

      const { error: insertError } = await supabase.from("media_items").insert([
        { title, description, category, image_url: imageUrl },
      ])
      if (insertError) throw insertError

      setMessage("Upload successful")
      form.reset()
    } catch (err: any) {
      setMessage(err?.message || "Upload failed")
    } finally {
      setUploading(false)
    }
  }

  return (
    <AdminAuthWrapper>
      <div className="min-h-screen pt-4">
        <div className="max-w-3xl mx-auto p-6">
          <h1 className="text-2xl font-bold mb-4">Upload Media</h1>
          <div className="mb-4">
            <button
              onClick={async () => {
                try {
                  setSyncing(true)
                  setMessage(null)
                  const res = await fetch("/Api/admin/media/sync", { method: "POST" })
                  const json = await res.json().catch(() => ({}))
                  if (!res.ok) throw new Error(json?.error || "Sync failed")
                  setMessage(`Synced ${json.inserted} new items from /public`)
                } catch (e: any) {
                  setMessage(e?.message || "Sync failed")
                } finally {
                  setSyncing(false)
                }
              }}
              className="px-3 py-2 border rounded hover:bg-gray-50"
              disabled={syncing}
            >
              {syncing ? "Syncing..." : "Sync Public Folder"}
            </button>
          </div>
          <form
            onSubmit={async (e) => {
              e.preventDefault()
              await handleUpload(e.currentTarget)
            }}
            className="space-y-4"
          >
            <input name="title" placeholder="Title" className="w-full border px-3 py-2 rounded" required />
            <textarea name="description" placeholder="Description" className="w-full border px-3 py-2 rounded" />
            <input name="category" placeholder="Category" className="w-full border px-3 py-2 rounded" />
            <input type="file" name="file" accept="image/*" className="w-full" required />
            <button type="submit" disabled={uploading} className="btn-primary">
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </form>
          {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
        </div>
      </div>
    </AdminAuthWrapper>
  )
}







