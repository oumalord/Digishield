import { NextRequest, NextResponse } from "next/server"
import path from "path"
import fs from "fs"
import { supabase, hasValidConfig } from "@/lib/supabase"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")
    const file = searchParams.get("file")

    if (!id || !file) {
      return NextResponse.json({ error: "Missing id or file parameter" }, { status: 400 })
    }

    if (hasValidConfig && supabase) {
      try {
        await supabase.rpc("increment_downloads", { resource_id: id })
      } catch (error) {
        console.warn("Failed to increment download count:", error)
      }
    }

    // Normalize and resolve requested file under public/resources
    const safeFile = path.basename(file)
    const publicPath = path.join(process.cwd(), "public", "resources", safeFile)

    if (!fs.existsSync(publicPath)) {
      return NextResponse.json({ error: "File not found" }, { status: 404 })
    }

    const fileBuffer = fs.readFileSync(publicPath)
    const ext = path.extname(publicPath).toLowerCase()
    const contentType = ext === ".pdf" ? "application/pdf" : "application/octet-stream"

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${safeFile}"`,
        "Cache-Control": "no-cache",
      },
    })
  } catch (error: any) {
    console.error("Download API error:", error)
    return NextResponse.json(
      { error: "Download failed", details: error?.message || "Unknown error" },
      { status: 500 },
    )
  }
}

// This file is deprecated; route moved to lowercase app/api path.
export {}




