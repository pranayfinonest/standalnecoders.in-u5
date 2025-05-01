export default function ProfileSkeleton() {
  return (
    <div className="container max-w-5xl py-8 px-4 md:px-6">
      <div className="h-8 w-48 bg-gray-200 rounded mb-6 animate-pulse"></div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Summary Card Skeleton */}
        <div className="bg-white rounded-lg shadow p-6 animate-pulse">
          <div className="flex flex-col items-center">
            <div className="h-24 w-24 rounded-full bg-gray-200 mb-4"></div>
            <div className="h-6 w-32 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 w-48 bg-gray-200 rounded"></div>
          </div>
          <div className="mt-6">
            <div className="h-10 w-full bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* Main Content Area Skeleton */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow p-6 animate-pulse">
            <div className="flex mb-6">
              <div className="h-10 w-1/3 bg-gray-200 rounded mr-2"></div>
              <div className="h-10 w-1/3 bg-gray-200 rounded mr-2"></div>
              <div className="h-10 w-1/3 bg-gray-200 rounded"></div>
            </div>
            <div className="space-y-4">
              <div className="h-6 w-48 bg-gray-200 rounded mb-2"></div>
              <div className="h-10 w-full bg-gray-200 rounded"></div>
              <div className="h-6 w-48 bg-gray-200 rounded mb-2"></div>
              <div className="h-10 w-full bg-gray-200 rounded"></div>
              <div className="h-6 w-48 bg-gray-200 rounded mb-2"></div>
              <div className="h-10 w-full bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
