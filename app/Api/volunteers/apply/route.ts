export const runtime = "nodejs"
import { NextRequest, NextResponse } from "next/server"
import { supabase, hasValidConfig } from "@/lib/supabase"

export async function POST(req: NextRequest) {
  if (!hasValidConfig || !supabase) return NextResponse.json({ error: "Supabase not configured" }, { status: 500 })
  try {
    const body = await req.json()
    const { name, email, phone, location, role, skills, availability } = body || {}
    if (!name || !email || !phone || !location || !role) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }
    const skillsArray = Array.isArray(skills) ? skills : (skills ? [String(skills)] : [])

    // Route to specific table based on role
    const roleKey = String(role).toLowerCase()
    let targetTable = "volunteer_cyber_trainers"
    if (roleKey.includes("ambassador")) targetTable = "volunteer_awareness_ambassadors"
    else if (roleKey.includes("coordinator")) targetTable = "volunteer_community_coordinators"
    else if (roleKey.includes("incident") || roleKey.includes("response")) targetTable = "volunteer_incident_responders"

    const { data, error } = await supabase
      .from(targetTable)
      .insert([
        {
          name,
          email,
          phone,
          location,
          skills: skillsArray,
          availability: availability || "",
          status: "pending",
          applied_at: new Date().toISOString(),
        },
      ])
      .select()
      .single()
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json({ success: true, data })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Server error" }, { status: 500 })
  }
}


