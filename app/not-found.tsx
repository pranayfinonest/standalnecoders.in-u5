import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Suspense } from "react"
import NotFoundClient from "@/components/not-found-client"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-6">
          Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
        </p>

        <Suspense fallback={<p className="text-sm text-muted-foreground mb-8">Loading...</p>}>
          <div className="mb-8">
            <NotFoundClient />
          </div>
        </Suspense>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
