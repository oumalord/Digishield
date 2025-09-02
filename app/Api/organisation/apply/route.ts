import { NextRequest, NextResponse } from "next/server"
import { supabase, hasValidConfig } from "@/lib/supabase"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
  if (!hasValidConfig || !supabase) return NextResponse.json({ error: "Supabase not configured" }, { status: 500 })
  
  try {
    const formData = await req.formData()
    
    console.log("Received form data:", Object.fromEntries(formData.entries()))
    
    const full_name = formData.get('full_name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const location = formData.get('location') as string
    const role_applied = formData.get('role_applied') as string
    const linkedin = formData.get('linkedin') as string
    const portfolio = formData.get('portfolio') as string
    const answers = JSON.parse(formData.get('answers') as string || '{}')
    const resume_file = formData.get('resume_file') as File | null
    
    console.log("Parsed data:", {
      full_name,
      email,
      phone,
      location,
      role_applied,
      linkedin,
      portfolio,
      answers,
      resume_file: resume_file ? `${resume_file.name} (${resume_file.size} bytes)` : "No file"
    })
    
    if (!full_name || !email) {
      console.log("Missing required fields:", { full_name: !!full_name, email: !!email })
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    let resume_url = null
    
    // For now, just log file info without uploading
    if (resume_file && resume_file.size > 0) {
      console.log("File received:", resume_file.name, "Size:", resume_file.size)
      // TODO: Implement file upload once storage is set up
      resume_url = `File: ${resume_file.name} (${resume_file.size} bytes)`
    }

    console.log("Inserting into database...")
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
          resume_url: resume_url,
          answers: answers || {},
          status: "submitted",
          stage: "application",
        },
      ])
      .select()
      .single()
      
    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    
    console.log("Successfully inserted:", data)
    return NextResponse.json({ success: true, data })
    
  } catch (e: any) {
    console.error("API error:", e)
    return NextResponse.json({ error: e.message || "Server error" }, { status: 500 })
  }
}



