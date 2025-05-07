import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CybersecurityNotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        The cybersecurity service you're looking for could not be found.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button asChild>
          <Link href="/services/cybersecurity">View All Cybersecurity Services</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/contact">Contact Us</Link>
        </Button>
      </div>
    </div>
  )
}
