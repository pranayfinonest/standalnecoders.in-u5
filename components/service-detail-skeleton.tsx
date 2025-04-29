export function ServiceDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div>
          <div className="h-10 w-3/4 bg-gray-200 rounded mb-6 animate-pulse"></div>
          <div className="h-24 bg-gray-200 rounded mb-8 animate-pulse"></div>
          <div className="flex flex-wrap gap-4">
            <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="h-[300px] lg:h-[400px] bg-gray-200 rounded-lg animate-pulse"></div>
      </div>

      <div className="mb-16">
        <div className="grid grid-cols-4 gap-2 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-10 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-40 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <div className="h-8 w-64 mx-auto bg-gray-200 rounded mb-6 animate-pulse"></div>
        <div className="flex justify-center gap-4">
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}
