export const runtime = "nodejs"
import { NextRequest, NextResponse } from "next/server"
import { getAdminSession } from "@/lib/auth-cookie"
import { supabase, hasValidConfig } from "@/lib/supabase"

export async function GET(req: NextRequest) {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  if (!hasValidConfig || !supabase) return NextResponse.json({ error: "Supabase not configured" }, { status: 500 })

  try {
    const [resourcesCount, incidentsAll, contactsAll, subsCount] = await Promise.all([
      supabase.from("resources").select("id", { count: "exact", head: true }),
      supabase.from("incidents").select("status", { count: "exact" }),
      supabase.from("contact_messages").select("status", { count: "exact" }),
      supabase.from("newsletter_subscriptions").select("id", { count: "exact", head: true }),
    ])

    const incidents = {
      total: incidentsAll.count || 0,
      pending: (incidentsAll.data || []).filter((i: any) => i.status === "pending").length,
      in_progress: (incidentsAll.data || []).filter((i: any) => i.status === "in_progress").length,
      resolved: (incidentsAll.data || []).filter((i: any) => i.status === "resolved").length,
      closed: (incidentsAll.data || []).filter((i: any) => i.status === "closed").length,
    }

    const contacts = {
      total: contactsAll.count || 0,
      pending: (contactsAll.data || []).filter((i: any) => i.status === "pending").length,
      responded: (contactsAll.data || []).filter((i: any) => i.status === "responded").length,
      closed: (contactsAll.data || []).filter((i: any) => i.status === "closed").length,
    }

    const stats = {
      resources: resourcesCount.count || 0,
      incidents,
      contacts,
      newsletterSubscribers: subsCount.count || 0,
    }

    return NextResponse.json({ stats })
  } catch (e) {
    return NextResponse.json({ error: "Failed to compute stats" }, { status: 500 })
  }
}


