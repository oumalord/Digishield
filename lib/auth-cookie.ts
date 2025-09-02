import { cookies } from "next/headers"

const COOKIE_NAME = "digishield_admin_session"
const DEFAULT_TTL_SECONDS = 60 * 60 * 8 // 8 hours

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret || secret.length < 16) {
    // Developer-friendly fallback warning only in dev; still functional but predictable
    return "dev-insecure-secret-change-me"
  }
  return secret
}

async function sign(data: string): Promise<string> {
  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  )
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(data))
  const b64 = Buffer.from(new Uint8Array(sig)).toString("base64url")
  return b64
}

async function verify(data: string, signature: string): Promise<boolean> {
  try {
    const enc = new TextEncoder()
    const key = await crypto.subtle.importKey(
      "raw",
      enc.encode(getSecret()),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign", "verify"],
    )
    const expected = await crypto.subtle.sign("HMAC", key, enc.encode(data))
    const expectedB64 = Buffer.from(new Uint8Array(expected)).toString("base64url")
    
    // Use simple string comparison instead of timingSafeEqual for browser compatibility
    return expectedB64 === signature
  } catch (error) {
    console.error("Verification error:", error)
    return false
  }
}

export type AdminSession = {
  email: string
  iat: number
  exp: number
}

export async function createAdminSession(email: string, ttlSeconds = DEFAULT_TTL_SECONDS) {
  const now = Math.floor(Date.now() / 1000)
  const payload: AdminSession = { email, iat: now, exp: now + ttlSeconds }
  const payloadStr = JSON.stringify(payload)
  const sig = await sign(payloadStr)
  const value = Buffer.from(payloadStr).toString("base64url") + "." + sig
  cookies().set(COOKIE_NAME, value, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ttlSeconds,
  })
  return payload
}

// Build cookie string for explicit response setting in route handlers
export async function buildAdminSessionCookie(email: string, ttlSeconds = DEFAULT_TTL_SECONDS) {
  const now = Math.floor(Date.now() / 1000)
  const payload: AdminSession = { email, iat: now, exp: now + ttlSeconds }
  const payloadStr = JSON.stringify(payload)
  const sig = await sign(payloadStr)
  const value = Buffer.from(payloadStr).toString("base64url") + "." + sig
  return { name: COOKIE_NAME, value, maxAge: ttlSeconds, payload }
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const cookie = cookies().get(COOKIE_NAME)
  if (!cookie?.value) return null
  const parts = cookie.value.split(".")
  if (parts.length !== 2) return null
  try {
    const json = Buffer.from(parts[0], "base64url").toString("utf8")
    const valid = await verify(json, parts[1])
    if (!valid) return null
    const payload = JSON.parse(json) as AdminSession
    const now = Math.floor(Date.now() / 1000)
    if (payload.exp < now) return null
    return payload
  } catch (error) {
    console.error("Cookie parsing error:", error)
    return null
  }
}

export function clearAdminSession() {
  cookies().set(COOKIE_NAME, "", { httpOnly: true, path: "/", maxAge: 0 })
}

export const ADMIN_COOKIE = { NAME: COOKIE_NAME }


