import Link from "next/link"

export default function ServiceCityNotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
      <p className="text-lg mb-8">The service or city you're looking for doesn't exist or is not available.</p>
      <Link
        href="/services"
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
      >
        View All Services
      </Link>
    </div>
  )
}
