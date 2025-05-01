import type { Metadata } from "next"
import BookingManagement from "@/components/admin/booking-management"

export const metadata: Metadata = {
  title: "Booking Management | Admin Dashboard",
  description: "View and manage project bookings",
}

export default function BookingsPage() {
  return <BookingManagement />
}
