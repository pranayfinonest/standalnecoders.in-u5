import { createClient } from "@supabase/supabase-js"
import type { PostgrestFilterBuilder } from "@supabase/postgrest-js"

// Cache for query results
const queryCache = new Map<string, { data: any; timestamp: number }>()

// Cache TTL in milliseconds (5 minutes default)
const DEFAULT_CACHE_TTL = 5 * 60 * 1000

// Create optimized Supabase client
export function createOptimizedClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
    // Set global fetch options for better performance
    global: {
      fetch: (...args) => {
        return fetch(...args)
      },
    },
  })
}

// Function to generate cache key from query
function generateCacheKey(table: string, query: any): string {
  return `${table}:${JSON.stringify(query)}`
}

// Optimized query function with caching
export async function optimizedQuery<T>(
  table: string,
  queryFn: (supabase: ReturnType<typeof createOptimizedClient>) => PostgrestFilterBuilder<any, any, any[]>,
  options: {
    cacheTTL?: number
    bypassCache?: boolean
  } = {},
): Promise<{ data: T | null; error: Error | null }> {
  const { cacheTTL = DEFAULT_CACHE_TTL, bypassCache = false } = options
  const supabase = createOptimizedClient()

  try {
    // Generate query and cache key
    const query = queryFn(supabase)
    const cacheKey = generateCacheKey(table, query)

    // Check cache if not bypassing
    if (!bypassCache) {
      const cached = queryCache.get(cacheKey)
      const now = Date.now()

      if (cached && now - cached.timestamp < cacheTTL) {
        return { data: cached.data, error: null }
      }
    }

    // Execute query
    const { data, error } = await query

    // Cache result if successful
    if (!error && data) {
      queryCache.set(cacheKey, {
        data,
        timestamp: Date.now(),
      })
    }

    return { data, error }
  } catch (error) {
    console.error("Optimized query error:", error)
    return { data: null, error: error as Error }
  }
}

// Function to invalidate cache for a table
export function invalidateTableCache(table: string): void {
  // Remove all cache entries for this table
  for (const key of queryCache.keys()) {
    if (key.startsWith(`${table}:`)) {
      queryCache.delete(key)
    }
  }
}

// Function to clear entire cache
export function clearQueryCache(): void {
  queryCache.clear()
}
