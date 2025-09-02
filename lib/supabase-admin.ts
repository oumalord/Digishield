import { createClient } from "@supabase/supabase-js"

const serviceUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

export const hasServiceRole = !!(serviceUrl && serviceKey && serviceKey.length > 40)

export const supabaseAdmin = hasServiceRole
  ? createClient(serviceUrl!, serviceKey!)
  : null


