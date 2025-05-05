export default function ForgotPasswordLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <div className="h-8 bg-gray-200 rounded animate-pulse mb-4"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse mb-8"></div>
        <div className="space-y-4">
          <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}
