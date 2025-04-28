import TodoList from "@/components/todos/todo-list"
import TodoForm from "@/components/todos/todo-form"

export const metadata = {
  title: "Todo List | StandaloneCoders",
  description: "Manage your todos with our simple todo application",
}

export default function TodosPage() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Todo List</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <TodoForm />
        <TodoList />
      </div>
    </div>
  )
}
