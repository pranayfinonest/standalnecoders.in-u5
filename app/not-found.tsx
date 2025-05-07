import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function NotFound() {
  return (
    <div className="container flex items-center justify-center min-h-[70vh] px-4 py-12">
      <Card className="w-full max-w-md border-2 border-gray-200 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold text-primary">404</CardTitle>
          <CardDescription className="text-xl font-semibold mt-2">Page Not Found</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-6 text-muted-foreground">
            We're sorry, but the page you're looking for doesn't exist or has been moved.
          </p>
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Popular pages you might be looking for:</h3>
            <ul className="space-y-1 text-sm text-blue-600 dark:text-blue-400">
              <li>
                <Link href="/services/website-development" className="hover:underline">
                  Website Development
                </Link>
              </li>
              <li>
                <Link href="/services/cybersecurity" className="hover:underline">
                  Cybersecurity Services
                </Link>
              </li>
              <li>
                <Link href="/services/digital-marketing" className="hover:underline">
                  Digital Marketing
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:underline">
                  Our Portfolio
                </Link>
              </li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild variant="default">
            <Link href="/">Return to Home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">Contact Support</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
