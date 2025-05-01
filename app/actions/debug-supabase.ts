"use server"

import { getServerSupabaseClient } from "@/utils/supabase"

export async function debugSupabaseConnection() {
  try {
    const supabase = getServerSupabaseClient()

    // Test basic connection
    const { data: connectionTest, error: connectionError } = await supabase
      .from("_dummy_query")
      .select("*")
      .limit(1)
      .catch((err) => ({ data: null, error: err }))

    // Check if todos table exists
    const { data: tables, error: tablesError } = await supabase
      .from("information_schema.tables")
      .select("table_name")
      .eq("table_schema", "public")
      .catch((err) => ({ data: null, error: err }))

    return {
      success: true,
      connectionWorking: !!connectionError, // Ironically, an error means the connection works
      tables: tables || [],
      tablesError: tablesError ? `${tablesError.code}: ${tablesError.message}` : null,
      connectionError: connectionError ? `${connectionError.code}: ${connectionError.message}` : null,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}
