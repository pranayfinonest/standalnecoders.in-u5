import type { Metadata } from "next"
import OffersManagement from "@/components/admin/offers-management"

export const metadata: Metadata = {
  title: "Offers Management | Admin Dashboard",
  description: "Manage special offers and discounts for your services",
}

export default function OffersPage() {
  return <OffersManagement />
}
