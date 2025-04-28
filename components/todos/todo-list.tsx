"use client"

import { useEffect, useState } from "react"
import type { Todo } from "@/types/todo"
import { getTodos, toggleTodo, deleteTodo } from "@/app/actions/todos"
import { Loader2, CheckCircle, Circle, Trash2 } from "lucide-react"

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadTodos() {
      setLoading(true)
      const { todos, error } = await getTodos()

      if (error) {
        setError(error)
      } else {
        setTodos(todos)
        setError(null)
      }

      setLoading(false)
    }

    loadTodos()
  }, [])

  const handleToggle = async (id: string, completed: boolean) => {
    const { success } = await toggleTodo(id, !completed)

    if (success) {
      setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !completed } : todo)))
    }
  }

  const handleDelete = async (id: string) => {
    const { success } = await deleteTodo(id)

    if (success) {
      setTodos(todos.filter((todo) => todo.id !== id))
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        <p>Error loading todos: {error}</p>
      </div>
    )
  }

  if (todos.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No todos yet. Add your first one!</p>
      </div>
    )
  }

  return (
    <ul className="divide-y divide-gray-200">
      {todos.map((todo) => (
        <li key={todo.id} className="py-4 flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => handleToggle(todo.id, todo.completed)}
              className="mr-3 text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              {todo.completed ? <CheckCircle className="h-5 w-5 text-green-500" /> : <Circle className="h-5 w-5" />}
            </button>
            <span className={`${todo.completed ? "line-through text-gray-400" : "text-gray-700"}`}>{todo.title}</span>
          </div>
          <button onClick={() => handleDelete(todo.id)} className="text-red-400 hover:text-red-500 focus:outline-none">
            <Trash2 className="h-5 w-5" />
          </button>
        </li>
      ))}
    </ul>
  )
}
