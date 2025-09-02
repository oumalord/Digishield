import { supabase } from "@/lib/supabase"

type CreateUserInput = {
  name: string
  email: string
  password: string
}

export async function createUser({ name, email, password }: CreateUserInput): Promise<{ user: any | null; error: string | null }> {
  if (!supabase) {
    return { user: null, error: "Supabase not configured" }
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name },
    },
  })

  if (error) {
    return { user: null, error: error.message }
  }

  return { user: data.user, error: null }
}


