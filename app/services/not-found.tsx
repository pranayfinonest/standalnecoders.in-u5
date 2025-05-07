import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function ServicesNotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
      <p className="text-xl mb-8">The service you're looking for doesn't exist or may have been moved.</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild>
          <Link href="/services">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Services
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">Go to Homepage</Link>
        </Button>
      </div>
    </div>
  )
}
