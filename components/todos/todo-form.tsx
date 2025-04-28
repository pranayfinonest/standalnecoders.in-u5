"use client"

import { useRef } from "react"
import { addTodo } from "@/app/actions/todos"
import { useFormStatus } from "react-dom"

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
    >
      {pending ? "Adding..." : "Add Todo"}
    </button>
  )
}

export default function TodoForm() {
  const formRef = useRef<HTMLFormElement>(null)

  async function handleAddTodo(formData: FormData) {
    const result = await addTodo(formData)

    if (result.success) {
      formRef.current?.reset()
      // We'll rely on the parent component to refresh the list
    }
  }

  return (
    <form ref={formRef} action={handleAddTodo} className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          name="title"
          placeholder="Add a new todo..."
          required
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        <SubmitButton />
      </div>
    </form>
  )
}
