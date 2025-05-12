export default function CaseStudyDetailSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="animate-pulse">
        {/* Back button skeleton */}
        <div className="h-10 w-40 bg-gray-200 dark:bg-gray-700 rounded mb-8"></div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content skeleton */}
          <div className="lg:col-span-2">
            {/* Image skeleton */}
            <div className="h-80 bg-gray-200 dark:bg-gray-700 rounded-xl mb-8"></div>

            {/* Title skeleton */}
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-6"></div>

            {/* Content sections */}
            <div className="space-y-10">
              {/* Challenge section */}
              <div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
                <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
              </div>

              {/* Solution section */}
              <div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
                <div className="space-y-4">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                </div>
              </div>

              {/* Results section */}
              <div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar skeleton */}
          <div className="lg:col-span-1">
            <div className="h-80 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
            <div className="h-60 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
