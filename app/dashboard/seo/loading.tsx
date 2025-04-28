export default function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <div className="flex flex-col items-center space-y-4">
        <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
        <h3 className="text-xl font-medium text-gray-700">Loading SEO dashboard...</h3>
        <p className="text-sm text-gray-500">Please wait while we fetch your SEO data</p>
      </div>
    </div>
  )
}
