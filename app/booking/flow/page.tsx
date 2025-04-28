import { Suspense } from "react"
import BookingFlow from "@/components/booking/booking-flow"

export const dynamic = "force-static"

export default function BookingFlowPage() {
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
      <BookingFlow />
    </Suspense>
  )
}
