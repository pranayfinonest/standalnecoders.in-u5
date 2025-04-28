"use server"

import { createServerSupabaseClient } from "@/utils/supabase"

export async function getTodos() {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("todos").select("*")

  if (error) {
    console.error("Error fetching todos:", error)
    return { todos: [], error: error.message }
  }

  return { todos: data || [], error: null }
}

export async function addTodo(formData: FormData) {
  const supabase = createServerSupabaseClient()
  const title = formData.get("title") as string

  if (!title?.trim()) {
    return { success: false, error: "Title is required" }
  }

  const { error } = await supabase.from("todos").insert([{ title, completed: false }])

  if (error) {
    console.error("Error adding todo:", error)
    return { success: false, error: error.message }
  }

  return { success: true, error: null }
}

export async function toggleTodo(id: string, completed: boolean) {
  const supabase = createServerSupabaseClient()

  const { error } = await supabase.from("todos").update({ completed }).eq("id", id)

  if (error) {
    console.error("Error updating todo:", error)
    return { success: false, error: error.message }
  }

  return { success: true, error: null }
}

export async function deleteTodo(id: string) {
  const supabase = createServerSupabaseClient()

  const { error } = await supabase.from("todos").delete().eq("id", id)

  if (error) {
    console.error("Error deleting todo:", error)
    return { success: false, error: error.message }
  }

  return { success: true, error: null }
}
