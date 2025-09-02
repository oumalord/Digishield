export const runtime = "nodejs"
import { NextResponse } from "next/server"
import { getAdminSession } from "@/lib/auth-cookie"

export async function GET() {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ authenticated: false }, { status: 200 })
  return NextResponse.json({ authenticated: true, email: session.email, exp: session.exp })
}


