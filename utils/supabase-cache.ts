import { createClient } from "@supabase/supabase-js"
import LRUCache from "lru-cache"

// Configure the cache
const cache = new LRUCache<string, any>({
  max: 100, // Maximum number of items to store
  ttl: 1000 * 60 * 5, // 5 minutes
})

// Create a cached Supabase client for improved performance
export function createCachedSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  const supabase = createClient(supabaseUrl, supabaseAnonKey)

  // Override the select method to implement caching
  const originalSelect = supabase.from("").select

  supabase.from = (table: string) => {
    const methods = originalSelect.call(supabase, table)

    const originalSelectMethod = methods.select

    methods.select = function (columns: string) {
      const selectMethods = originalSelectMethod.call(this, columns)

      const originalExecute = selectMethods.then

      selectMethods.then = async function (callback: any) {
        // Create a cache key based on the query
        const cacheKey = `${table}:${columns || "*"}:${JSON.stringify(this)}`

        // Check if we have a cached result
        if (cache.has(cacheKey)) {
          return callback(cache.get(cacheKey))
        }

        // Execute the original query
        const result = await originalExecute.call(this, (data: any) => data)

        // Cache the result
        if (result && !result.error) {
          cache.set(cacheKey, result)
        }

        return callback(result)
      }

      return selectMethods
    }

    return methods
  }

  return supabase
}

// Helper to invalidate specific cache items
export function invalidateCache(table: string) {
  // Clear all cache entries related to this table
  const cacheKeysToDelete: string[] = []

  cache.forEach((value, key) => {
    if (key.startsWith(`${table}:`)) {
      cacheKeysToDelete.push(key)
    }
  })

  cacheKeysToDelete.forEach((key) => cache.delete(key))
}
