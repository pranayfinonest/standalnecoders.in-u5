"use server"

import { createServerNhostClient } from "@/utils/nhost-server"

export async function getTodos() {
  const nhost = createServerNhostClient()

  try {
    const { data, error } = await nhost.graphql.request(`
      query GetTodos {
        todos {
          id
          title
          completed
          created_at
        }
      }
    `)

    if (error) {
      console.error("Error fetching todos:", error)
      return { todos: [], error: error.message }
    }

    return { todos: data?.todos || [], error: null }
  } catch (error) {
    console.error("Error fetching todos:", error)
    return { todos: [], error: error instanceof Error ? error.message : "Unknown error" }
  }
}

export async function addTodo(formData: FormData) {
  const nhost = createServerNhostClient()
  const title = formData.get("title") as string

  if (!title?.trim()) {
    return { success: false, error: "Title is required" }
  }

  try {
    const { data, error } = await nhost.graphql.request(
      `
      mutation AddTodo($title: String!) {
        insert_todos_one(object: { title: $title, completed: false }) {
          id
        }
      }
    `,
      { title },
    )

    if (error) {
      console.error("Error adding todo:", error)
      return { success: false, error: error.message }
    }

    return { success: true, error: null }
  } catch (error) {
    console.error("Error adding todo:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}

export async function toggleTodo(id: string, completed: boolean) {
  const nhost = createServerNhostClient()

  try {
    const { data, error } = await nhost.graphql.request(
      `
      mutation ToggleTodo($id: Int!, $completed: Boolean!) {
        update_todos_by_pk(pk_columns: { id: $id }, _set: { completed: $completed }) {
          id
        }
      }
    `,
      { id: Number.parseInt(id), completed: !completed },
    )

    if (error) {
      console.error("Error updating todo:", error)
      return { success: false, error: error.message }
    }

    return { success: true, error: null }
  } catch (error) {
    console.error("Error updating todo:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}

export async function deleteTodo(id: string) {
  const nhost = createServerNhostClient()

  try {
    const { data, error } = await nhost.graphql.request(
      `
      mutation DeleteTodo($id: Int!) {
        delete_todos_by_pk(id: $id) {
          id
        }
      }
    `,
      { id: Number.parseInt(id) },
    )

    if (error) {
      console.error("Error deleting todo:", error)
      return { success: false, error: error.message }
    }

    return { success: true, error: null }
  } catch (error) {
    console.error("Error deleting todo:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}
