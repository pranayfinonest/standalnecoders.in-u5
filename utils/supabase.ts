import { createClient } from "@supabase/supabase-js"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

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

// Client-side Supabase client using auth-helpers-nextjs
export const createClientSupabaseClient = () => {
  try {
    return createClientComponentClient({
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    })
  } catch (error) {
    console.error("Error creating Supabase client:", error)
    return null
  }
}

// Helper function to get server-side client with error handling
export const getServerSupabaseClient = () => {
  const client = createServerSupabaseClient()
  if (!client) {
    throw new Error("Failed to initialize Supabase client")
  }
  return client
}
