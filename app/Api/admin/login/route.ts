export const runtime = "nodejs"
import { NextRequest, NextResponse } from "next/server"
import { createAdminSession, buildAdminSessionCookie } from "@/lib/auth-cookie"

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "obwandaouma@gmail.com"
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123"

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()
    if (typeof email !== "string" || typeof password !== "string") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
    }

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const { name, value, maxAge } = await buildAdminSessionCookie(email)
      const res = NextResponse.json({ ok: true })
      res.headers.append(
        "Set-Cookie",
        `${name}=${value}; Path=/; Max-Age=${maxAge}; HttpOnly; SameSite=Lax${process.env.NODE_ENV === "production" ? "; Secure" : ""}`
      )
      return res
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}


