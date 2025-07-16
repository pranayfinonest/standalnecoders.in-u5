"use client"

import { useState, useEffect } from "react"
import { Loader2, AlertCircle, Plus } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import ProtectedRoute from "@/components/auth/protected-route"
import UserProfile from "@/components/auth/user-profile"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import nhost from "@/utils/nhost"

interface Todo {
  id: number
  title: string
  completed: boolean
  description?: string
  user_id: string
  created_at: string
}

export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [newTodo, setNewTodo] = useState("")
  const { user } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    if (!user) return

    const fetchTodos = async () => {
      try {
        setLoading(true)

        const { data, error } = await nhost.graphql.request(`
          query GetTodos {
            todos(where: { user_id: { _eq: "${user.id}" } }, order_by: { created_at: desc }) {
              id
              title
              completed
              description
              user_id
              created_at
            }
          }
        `)

        if (error) {
          throw new Error(error.message)
        }

        setTodos(data?.todos || [])
      } catch (err) {
        console.error("Error fetching todos:", err)
        setError(err instanceof Error ? err.message : "Failed to fetch todos")
      } finally {
        setLoading(false)
      }
    }

    fetchTodos()
  }, [user])

  const addTodo = async () => {
    if (!newTodo.trim() || !user) return

    try {
      const { data, error } = await nhost.graphql.request(
        `
        mutation AddTodo($title: String!, $user_id: uuid!) {
          insert_todos_one(object: { title: $title, completed: false, user_id: $user_id }) {
            id
            title
            completed
            user_id
            created_at
          }
        }
      `,
        {
          title: newTodo.trim(),
          user_id: user.id,
        },
      )

      if (error) {
        throw new Error(error.message)
      }

      if (data?.insert_todos_one) {
        setTodos([data.insert_todos_one, ...todos])
        setNewTodo("")
        toast({
          title: "Todo added",
          description: "Your todo has been added successfully.",
        })
      }
    } catch (err) {
      console.error("Error adding todo:", err)
      toast({
        title: "Failed to add todo",
        description: err instanceof Error ? err.message : "An error occurred",
        variant: "destructive",
      })
    }
  }

  const toggleTodo = async (id: number, completed: boolean) => {
    try {
      const { data, error } = await nhost.graphql.request(
        `
        mutation ToggleTodo($id: Int!, $completed: Boolean!) {
          update_todos_by_pk(pk_columns: { id: $id }, _set: { completed: $completed }) {
            id
            completed
          }
        }
      `,
        {
          id,
          completed: !completed,
        },
      )

      if (error) {
        throw new Error(error.message)
      }

      setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !completed } : todo)))
    } catch (err) {
      console.error("Error toggling todo:", err)
      toast({
        title: "Failed to update todo",
        description: err instanceof Error ? err.message : "An error occurred",
        variant: "destructive",
      })
    }
  }

  const deleteTodo = async (id: number) => {
    try {
      const { data, error } = await nhost.graphql.request(
        `
        mutation DeleteTodo($id: Int!) {
          delete_todos_by_pk(id: $id) {
            id
          }
        }
      `,
        { id },
      )

      if (error) {
        throw new Error(error.message)
      }

      setTodos(todos.filter((todo) => todo.id !== id))
      toast({
        title: "Todo deleted",
        description: "Your todo has been deleted successfully.",
      })
    } catch (err) {
      console.error("Error deleting todo:", err)
      toast({
        title: "Failed to delete todo",
        description: err instanceof Error ? err.message : "An error occurred",
        variant: "destructive",
      })
    }
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <UserProfile />
          </div>
          <div className="md:col-span-3">
            <h1 className="text-2xl font-bold mb-6">Your Todo List</h1>

            <div className="flex gap-2 mb-6">
              <Input
                type="text"
                placeholder="Add a new todo..."
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTodo()}
              />
              <Button onClick={addTodo}>
                <Plus className="h-4 w-4 mr-2" /> Add
              </Button>
            </div>

            {loading ? (
              <div className="flex justify-center items-center min-h-[200px]">
                <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
              </div>
            ) : error ? (
              <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="h-5 w-5" />
                  <h2 className="text-lg font-semibold">Error</h2>
                </div>
                <p>{error}</p>
              </div>
            ) : todos.length === 0 ? (
              <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-gray-500">No todos found. Add your first todo above!</p>
              </div>
            ) : (
              <ul className="space-y-2">
                {todos.map((todo) => (
                  <li
                    key={todo.id}
                    className={`p-4 border rounded-md ${
                      todo.completed ? "bg-gray-50 border-gray-200" : "bg-white border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={todo.completed}
                          onChange={() => toggleTodo(todo.id, todo.completed)}
                          className="h-5 w-5 rounded border-gray-300"
                        />
                        <span className={todo.completed ? "line-through text-gray-500" : ""}>{todo.title}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => deleteTodo(todo.id)}
                      >
                        Delete
                      </Button>
                    </div>
                    {todo.description && <p className="mt-2 text-sm text-gray-600 pl-8">{todo.description}</p>}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
