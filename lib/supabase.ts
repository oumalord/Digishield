import { createClient } from "@supabase/supabase-js"

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Validate URL format
const isValidUrl = (url: string | undefined): boolean => {
  if (!url) return false
  try {
    new URL(url)
    return url.includes("supabase.co") || url.includes("localhost") || url.includes("127.0.0.1")
  } catch {
    return false
  }
}

// Check if we have valid configuration
export const hasValidConfig = !!(
  supabaseUrl &&
  supabaseAnonKey &&
  isValidUrl(supabaseUrl) &&
  supabaseAnonKey.length > 20 &&
  !supabaseAnonKey.includes("your-anon-key") &&
  !supabaseAnonKey.includes("VZzKoNJzQzqQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQ")
)

// Create Supabase client only if we have valid config
export const supabase = hasValidConfig ? createClient(supabaseUrl!, supabaseAnonKey!) : null

// Export configuration status for debugging
export const config = {
  url: supabaseUrl,
  hasUrl: !!supabaseUrl,
  hasKey: !!supabaseAnonKey,
  isValidUrl: isValidUrl(supabaseUrl),
  keyLength: supabaseAnonKey?.length || 0,
  hasValidConfig,
  isDemo: !hasValidConfig,
}

// Log configuration issues in development
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  if (!hasValidConfig) {
    console.warn("🔧 Supabase Configuration Issues:", {
      hasUrl: !!supabaseUrl,
      hasKey: !!supabaseAnonKey,
      isValidUrl: isValidUrl(supabaseUrl),
      urlFormat: supabaseUrl || "Missing NEXT_PUBLIC_SUPABASE_URL",
      keyFormat: supabaseAnonKey
        ? supabaseAnonKey.includes("VZzKoNJzQzqQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQ")
          ? "❌ Using placeholder key"
          : `✅ ${supabaseAnonKey.substring(0, 10)}...`
        : "❌ Missing NEXT_PUBLIC_SUPABASE_ANON_KEY",
      message: "Running in demo mode - data will not be saved to database",
    })
  } else {
    console.log("✅ Supabase configured successfully")
  }
}
