import { supabase, hasValidConfig } from "./supabase"

// Types for our database operations
export interface Incident {
  id?: string
  type: string
  description: string
  urgency: "low" | "medium" | "high" | "critical"
  status?: "pending" | "in_progress" | "resolved" | "closed"
  contact_name: string
  contact_email: string
  contact_phone?: string
  location?: string
  date_occurred?: string | null
  additional_info?: string
  resolution?: string
  created_at?: string
  updated_at?: string
}

export interface ContactMessage {
  id?: string
  first_name: string
  last_name: string
  email: string
  phone?: string
  subject: "general" | "training" | "partnership" | "volunteer" | "media" | "support"
  message: string
  status: "pending" | "responded" | "closed"
  response?: string
  responded_by?: string
  responded_at?: string
  created_at?: string
}

export interface TeamMember {
  id?: string
  name: string
  position: string
  bio?: string
  image_url?: string
  email?: string
  phone?: string
  linkedin_url?: string
  is_active: boolean
  display_order?: number
  created_at?: string
}

export interface NewsletterSubscription {
  id?: string
  email: string
  name?: string
  subscribed_at?: string
  is_active: boolean
}

// Database status check
export function getDatabaseStatus() {
  return {
    isConfigured: hasValidConfig,
    supabaseConnected: !!supabase,
    message: hasValidConfig
      ? "Database connected successfully"
      : "Supabase not configured - set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY",
    timestamp: new Date().toISOString(),
  }
}

// All operations below hit the database directly. No demo fallbacks.

// Incident Operations
export async function createIncident(
  incident: Omit<Incident, "id" | "created_at" | "updated_at">,
): Promise<{ success: boolean; data?: Incident; error?: string }> {
  try {
    if (!hasValidConfig || !supabase) {
      return { success: false, error: "Supabase not configured" }
    }

    const { data, error } = await supabase
      .from("incidents")
      .insert([
        {
          type: incident.type,
          description: incident.description,
          urgency: incident.urgency,
          status: incident.status ?? "pending",
          contact_name: incident.contact_name,
          contact_email: incident.contact_email,
          contact_phone: incident.contact_phone ?? null,
          location: incident.location ?? null,
          date_occurred: incident.date_occurred ?? null,
          additional_info: incident.additional_info ?? null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Database error creating incident:", error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Error creating incident:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}

export async function getIncidents(): Promise<{ success: boolean; data?: Incident[]; error?: string }> {
  try {
    if (!hasValidConfig || !supabase) {
      return { success: false, error: "Supabase not configured" }
    }

    const { data, error } = await supabase.from("incidents").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Database error fetching incidents:", error)
      return { success: false, error: error.message }
    }

    return { success: true, data: data || [] }
  } catch (error) {
    console.error("Error fetching incidents:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}

export async function updateIncidentStatus(
  id: string,
  status: Incident["status"],
): Promise<{ success: boolean; data?: Incident; error?: string }> {
  try {
    if (!hasValidConfig || !supabase) {
      return { success: false, error: "Supabase not configured" }
    }

    const { data, error } = await supabase
      .from("incidents")
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Database error updating incident:", error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Error updating incident:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}

// Update incident fields such as status and resolution
export async function updateIncident(
  id: string,
  updates: Partial<Pick<Incident, "status">> & { resolution?: string | null },
): Promise<{ success: boolean; data?: Incident; error?: string }> {
  try {
    if (!hasValidConfig || !supabase) {
      return { success: false, error: "Supabase not configured" }
    }

    const { data, error } = await supabase
      .from("incidents")
      .update({
        ...(updates.status ? { status: updates.status } : {}),
        ...(updates.resolution !== undefined ? { resolution: updates.resolution } : {}),
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}

// Contact Message Operations
export async function createContactMessage(
  message: Omit<ContactMessage, "id" | "created_at" | "status">,
): Promise<{ success: boolean; data?: ContactMessage; error?: string }> {
  try {
    if (!hasValidConfig || !supabase) {
      return { success: false, error: "Supabase not configured" }
    }

    const { data, error } = await supabase
      .from("contact_messages")
      .insert([
        {
          ...message,
          status: "pending",
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Database error creating contact message:", error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Error creating contact message:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}

export async function getContactMessages(): Promise<{ success: boolean; data?: ContactMessage[]; error?: string }> {
  try {
    if (!hasValidConfig || !supabase) {
      return { success: false, error: "Supabase not configured" }
    }

    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Database error fetching contact messages:", error)
      return { success: false, error: error.message }
    }

    return { success: true, data: data || [] }
  } catch (error) {
    console.error("Error fetching contact messages:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}

export async function updateContactMessage(
  id: string,
  updates: Partial<Pick<ContactMessage, "status" | "response" | "responded_at">>
): Promise<{ success: boolean; data?: ContactMessage; error?: string }> {
  try {
    if (!hasValidConfig || !supabase) {
      return { success: false, error: "Supabase not configured" }
    }

    const { data, error } = await supabase
      .from("contact_messages")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Database error updating contact message:", error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Error updating contact message:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}

// Team Member Operations
export async function getTeamMembers(): Promise<{ success: boolean; data?: TeamMember[]; error?: string }> {
  try {
    if (!hasValidConfig || !supabase) {
      return { success: false, error: "Supabase not configured" }
    }

    const { data, error } = await supabase
      .from("team_members")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true })

    if (error) {
      console.error("Database error fetching team members:", error)
      return { success: false, error: error.message }
    }

    return { success: true, data: data || [] }
  } catch (error) {
    console.error("Error fetching team members:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}

// Newsletter Operations
export async function subscribeToNewsletter(
  subscription: Omit<NewsletterSubscription, "id" | "subscribed_at" | "is_active">,
): Promise<{ success: boolean; data?: NewsletterSubscription; error?: string }> {
  try {
    if (!hasValidConfig || !supabase) {
      return { success: false, error: "Supabase not configured" }
    }

    // Use upsert without referencing schema-specific columns to avoid cache/column errors.
    // This will insert a new row or update the existing one matched by unique email.
    const { data, error } = await supabase
      .from("newsletter_subscriptions")
      .upsert(
        {
          email: subscription.email,
          name: subscription.name ?? null,
        },
        { onConflict: "email" }
      )
      .select()
      .single()

    if (error) {
      console.error("Database error upserting newsletter subscription:", error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Error creating newsletter subscription:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}

// Analytics Operations
export async function getAnalytics(): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    if (!hasValidConfig || !supabase) {
      return { success: false, error: "Supabase not configured" }
    }

    // Get real analytics from database
    const [incidentsResult, contactsResult, subscribersResult] = await Promise.all([
      supabase.from("incidents").select("status"),
      supabase.from("contact_messages").select("status"),
      supabase.from("newsletter_subscriptions").select("is_active").eq("is_active", true),
    ])

    const analytics = {
      totalIncidents: incidentsResult.data?.length || 0,
      openIncidents: incidentsResult.data?.filter((i) => i.status === "open").length || 0,
      resolvedIncidents: incidentsResult.data?.filter((i) => i.status === "resolved").length || 0,
      totalContacts: contactsResult.data?.length || 0,
      unreadContacts: contactsResult.data?.filter((c) => c.status === "unread").length || 0,
      newsletterSubscribers: subscribersResult.data?.length || 0,
      recentActivity: [], // Could be enhanced with actual recent activity
    }

    return { success: true, data: analytics }
  } catch (error) {
    console.error("Error fetching analytics:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}

// Utility function to format dates
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

// Utility function to get status colors
export function getStatusColor(status: string): string {
  const colors = {
    open: "bg-red-100 text-red-800",
    investigating: "bg-yellow-100 text-yellow-800",
    resolved: "bg-green-100 text-green-800",
    closed: "bg-gray-100 text-gray-800",
    unread: "bg-blue-100 text-blue-800",
    read: "bg-gray-100 text-gray-800",
    responded: "bg-green-100 text-green-800",
  }
  return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800"
}

// Utility function to get urgency colors
export function getUrgencyColor(urgency: string): string {
  const colors = {
    low: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-orange-100 text-orange-800",
    critical: "bg-red-100 text-red-800",
  }
  return colors[urgency as keyof typeof colors] || "bg-gray-100 text-gray-800"
}
