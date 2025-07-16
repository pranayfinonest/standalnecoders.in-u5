"use server"

import { createServerNhostClient } from "@/utils/nhost-server"

export async function debugNhostConnection() {
  try {
    const nhost = createServerNhostClient()

    // Test basic connection with a simple query
    const { data: connectionTest, error: connectionError } = await nhost.graphql.request(`
      query TestConnection {
        __typename
      }
    `)

    // Check if todos table exists by querying its structure
    const { data: tablesData, error: tablesError } = await nhost.graphql.request(`
      query GetTables {
        __type(name: "todos") {
          name
          fields {
            name
            type {
              name
              kind
            }
          }
        }
      }
    `)

    return {
      success: true,
      connectionWorking: !connectionError,
      tables: tablesData?.__type?.fields || [],
      tablesError: tablesError ? `${tablesError.message}` : null,
      connectionError: connectionError ? `${connectionError.message}` : null,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}
