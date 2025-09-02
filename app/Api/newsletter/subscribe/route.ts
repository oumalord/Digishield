import { NextRequest, NextResponse } from "next/server"
import { subscribeToNewsletter } from "@/lib/database-operations"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type")
    if (!contentType || !contentType.includes("application/json")) {
      return NextResponse.json({ error: "Content-Type must be application/json" }, { status: 400 })
    }

    const body = await request.json().catch(() => ({}))
    const { email, name } = body || {}
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const result = await subscribeToNewsletter({ email, name })
    if (!result.success) {
      return NextResponse.json({ error: result.error || "Failed to subscribe" }, { status: 400 })
    }

    return NextResponse.json({ success: true, data: result.data }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Unexpected error" }, { status: 500 })
  }
}

 