export default function ServiceCityLoading() {
  return (
    <div className="container mx-auto px-4 py-8 animate-pulse">
      <div className="h-10 w-3/4 bg-gray-200 rounded mb-6"></div>

      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="h-6 w-1/3 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
      </div>

      <div className="space-y-4">
        <div className="h-4 w-full bg-gray-200 rounded"></div>
        <div className="h-4 w-full bg-gray-200 rounded"></div>
        <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
        <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-40 bg-gray-200 rounded"></div>
        <div className="h-40 bg-gray-200 rounded"></div>
      </div>
    </div>
  )
}
