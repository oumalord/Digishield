import { NextResponse } from "next/server"
export const runtime = "nodejs"
export const dynamic = "force-dynamic"
import fs from "fs"
import path from "path"
import { supabaseAdmin, hasServiceRole } from "@/lib/supabase-admin"

function walkDir(dirPath: string, exts: string[]): string[] {
  const results: string[] = []
  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    const full = path.join(dirPath, entry.name)
    if (entry.isDirectory()) {
      results.push(...walkDir(full, exts))
    } else if (exts.includes(path.extname(entry.name).toLowerCase())) {
      results.push(full)
    }
  }
  return results
}

export async function POST() {
  try {
    if (!hasServiceRole || !supabaseAdmin) {
      return NextResponse.json({ error: "Server is missing SUPABASE_SERVICE_ROLE_KEY" }, { status: 500 })
    }

    const publicDir = path.join(process.cwd(), "public")
    if (!fs.existsSync(publicDir)) {
      return NextResponse.json({ error: "public directory not found" }, { status: 404 })
    }

    const exts = [".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg"]
    const files = walkDir(publicDir, exts)

    const rows = files.map((absPath) => {
      const relPath = absPath.replace(publicDir, "").replace(/\\/g, "/")
      const url = relPath.startsWith("/") ? relPath : `/${relPath}`
      const name = path.basename(absPath)
      const title = name.replace(/[-_]+/g, " ").replace(/\.[^.]+$/, "").replace(/\b\w/g, (l) => l.toUpperCase())
      return {
        title,
        description: null,
        category: "Public Assets",
        image_url: url,
      }
    })

    // Insert unique records by URL (avoid duplicates)
    const { data: existing, error: existingError } = await supabaseAdmin
      .from("media_items")
      .select("image_url")
      .in("image_url", rows.map((r) => r.image_url))

    if (existingError) {
      return NextResponse.json({ error: existingError.message }, { status: 500 })
    }

    const existingSet = new Set((existing || []).map((r: any) => r.image_url))
    const toInsert = rows.filter((r) => !existingSet.has(r.image_url))

    let inserted = 0
    if (toInsert.length > 0) {
      const { error: insertError, count } = await supabaseAdmin
        .from("media_items")
        .insert(toInsert, { count: "exact" })
      if (insertError) return NextResponse.json({ error: insertError.message }, { status: 500 })
      inserted = count || toInsert.length
    }

    return NextResponse.json({ scanned: files.length, inserted })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Sync failed" }, { status: 500 })
  }
}


