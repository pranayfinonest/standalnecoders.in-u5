import type { Metadata } from "next"
import ServicesManagement from "@/components/admin/services-management"

export const metadata: Metadata = {
  title: "Services Management | Admin Dashboard",
  description: "Manage service offerings and details",
}

export default function ServicesPage() {
  return <ServicesManagement />
}
