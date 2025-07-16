/**
 * Temporary shim so legacy imports (`@/utils/supabase`) don’t break the build.
 * Remove this once all Supabase code has been deleted.
 */
export function createServerSupabaseClient() {
  console.warn("[utils/supabase] Supabase has been removed from the project — this shim is a no-op.")

  /* A minimal fake client that satisfies existing code paths */
  return {
    auth: {
      /* eslint-disable @typescript-eslint/no-unused-vars */
      async exchangeCodeForSession(_code: string) {
        return {
          data: null,
          error: new Error("Supabase is no longer available in this project."),
        }
      },
    },
  }
}
