import { Suspense } from "react"
import TodoList from "@/components/todos/todo-list"
import TodoForm from "@/components/todos/todo-form"

export const dynamic = "force-static"

export default function TodosPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-12 flex justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
            <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      }
    >
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Todo List</h1>
        <TodoForm />
        <div className="mt-8">
          <TodoList />
        </div>
      </div>
    </Suspense>
  )
}
