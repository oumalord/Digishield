import type { NextApiRequest, NextApiResponse } from "next"
import { supabase, hasValidConfig } from "@/lib/supabase"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"])
    return res.status(405).json({ error: "Method Not Allowed" })
  }

  if (!hasValidConfig || !supabase) return res.status(500).json({ error: "Supabase not configured" })
  try {
    const { full_name, email, phone, location, role_applied, linkedin, portfolio, resume_url, answers } = req.body || {}
    if (!full_name || !email) return res.status(400).json({ error: "Missing required fields" })

    const { data, error } = await supabase
      .from("organisation_applications")
      .insert([
        {
          full_name,
          email,
          phone: phone || null,
          location: location || null,
          role_applied: role_applied || null,
          linkedin: linkedin || null,
          portfolio: portfolio || null,
          resume_url: resume_url || null,
          answers: answers || {},
          status: "submitted",
          stage: "application",
        },
      ])
      .select()
      .single()
    if (error) return res.status(400).json({ error: error.message })
    return res.status(200).json({ success: true, data })
  } catch (e: any) {
    return res.status(500).json({ error: e?.message || "Server error" })
  }
}



