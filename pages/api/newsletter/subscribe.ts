import type { NextApiRequest, NextApiResponse } from "next"
import { subscribeToNewsletter } from "@/lib/database-operations"
import { supabaseAdmin, hasServiceRole } from "@/lib/supabase-admin"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Basic CORS for safety (same-origin calls won't need this, but mobile proxies may)
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*")
  res.setHeader("Vary", "Origin")
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept")

  if (req.method === "OPTIONS") {
    return res.status(204).end()
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]) 
    return res.status(405).json({ error: "Method Not Allowed" })
  }

  try {
    if (!req.headers["content-type"]?.toString().includes("application/json")) {
      return res.status(400).json({ error: "Content-Type must be application/json" })
    }

    const { email, name } = req.body || {}
    if (!email || typeof email !== "string") {
      return res.status(400).json({ error: "Email is required" })
    }

    // Prefer service role on the server to bypass RLS safely
    if (hasServiceRole && supabaseAdmin) {
      const { data, error } = await supabaseAdmin
        .from("newsletter_subscriptions")
        .upsert({ email, name: name ?? null }, { onConflict: "email" })
        .select()
        .single()
      if (error) return res.status(400).json({ error: error.message })
      return res.status(200).json({ success: true, data })
    }

    // Fallback to anon client (requires RLS policy allowing insert on this table)
    const result = await subscribeToNewsletter({ email, name })
    if (!result.success) return res.status(400).json({ error: result.error || "Failed to subscribe" })
    return res.status(200).json({ success: true, data: result.data })
  } catch (e: any) {
    return res.status(500).json({ error: e?.message || "Unexpected error" })
  }
}



