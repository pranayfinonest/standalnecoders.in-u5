import { Suspense } from "react"
import WebsiteTemplates from "@/components/booking/website-templates"

export const metadata = {
  title: "Website Templates | StandaloneCoders",
  description: "Choose from our professionally designed website templates for your business or personal website.",
}

export default function TemplatesPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-12 flex justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
            <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      }
    >
      <WebsiteTemplates />
    </Suspense>
  )
}
