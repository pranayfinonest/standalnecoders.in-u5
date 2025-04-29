import { createClient } from "@supabase/supabase-js"

// Server-side Supabase client (for server components, API routes, and server actions)
export const createServerSupabaseClient = () => {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase environment variables")
    return null
  }

  return createClient(supabaseUrl, supabaseKey)
}

// Client-side Supabase client (singleton pattern to avoid multiple instances)
let clientSupabaseInstance: ReturnType<typeof createClient> | null = null

export const createClientSupabaseClient = () => {
  if (clientSupabaseInstance) return clientSupabaseInstance

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase public environment variables")
    return null
  }

  clientSupabaseInstance = createClient(supabaseUrl, supabaseKey)
  return clientSupabaseInstance
}

// Helper function to get server-side client with error handling
export const getServerSupabaseClient = () => {
  const client = createServerSupabaseClient()
  if (!client) {
    throw new Error("Failed to initialize Supabase client")
  }
  return client
}
