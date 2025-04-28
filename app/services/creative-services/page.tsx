import { Suspense } from "react"
import ServiceDetail from "@/components/service-detail"

export const dynamic = "force-static"

export default function CreativeServicesPage() {
  const serviceData = {
    title: "Creative Services",
    description: "Bring your brand to life with our creative design and content services.",
    // Add other service-specific data here
  }

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
      <ServiceDetail service={serviceData} />
    </Suspense>
  )
}
